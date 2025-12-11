/**
 * MDS Framework - Context Manager
 *
 * Handles context injection, document discovery, and context lifecycle.
 * Implements smart loading strategies for efficient context management.
 *
 * @module core/engine/context-manager
 * @version 1.0.0
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { glob } from 'glob';
import {
  ExecutionContext,
  LoadedDocument,
  ClientConfig,
  InputPattern,
  MDSConfig
} from './types';

// ============================================================================
// TYPES
// ============================================================================

export interface ContextManagerConfig {
  projectRoot: string;
  configPath?: string;
  outputFolder?: string;
  client?: ClientConfig;
}

export interface DocumentDiscoveryOptions {
  patterns: InputPattern[];
  maxSize?: number;
  recursive?: boolean;
  excludePatterns?: string[];
}

export interface ContextSnapshot {
  id: string;
  timestamp: string;
  context: Partial<ExecutionContext>;
  documents: string[];
  variables: Record<string, any>;
}

// ============================================================================
// CONTEXT MANAGER CLASS
// ============================================================================

export class ContextManager {
  private config: ContextManagerConfig;
  private baseContext: Partial<ExecutionContext> = {};
  private loadedDocuments: Map<string, LoadedDocument> = new Map();
  private configCache: Map<string, any> = new Map();
  private snapshots: ContextSnapshot[] = [];

  constructor(config: ContextManagerConfig) {
    this.config = config;
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------

  async initialize(options: {
    client?: ClientConfig;
    projectRoot?: string;
  }): Promise<void> {
    console.log('[MDS:Context] Initializing context manager...');

    // Load configuration hierarchy
    await this.loadConfigHierarchy();

    // Set up base context
    this.baseContext = {
      sessionId: this.generateSessionId(),
      projectId: this.config.projectRoot,
      client: options.client || this.config.client,
      user: {
        name: await this.getConfigValue('user_name', 'User'),
        role: 'delivery_lead',
        skillLevel: await this.getConfigValue('user_skill_level', 'intermediate')
      },
      variables: {},
      options: {
        mode: 'interactive',
        checkpoints: true
      }
    };

    console.log('[MDS:Context] Context manager initialized');
  }

  // --------------------------------------------------------------------------
  // CONFIGURATION LOADING
  // --------------------------------------------------------------------------

  /**
   * Load configuration from multiple levels:
   * 1. Core defaults
   * 2. Module configurations
   * 3. Client/project overrides
   */
  private async loadConfigHierarchy(): Promise<void> {
    const configPaths = [
      path.join(this.config.projectRoot, 'core/config/default.yaml'),
      path.join(this.config.projectRoot, '.mds/config.yaml')
    ];

    for (const configPath of configPaths) {
      try {
        const content = await fs.readFile(configPath, 'utf-8');
        const config = yaml.load(content) as Record<string, any>;
        this.mergeConfig(config);
      } catch (error) {
        // Config file doesn't exist - that's okay
      }
    }
  }

  private mergeConfig(config: Record<string, any>): void {
    for (const [key, value] of Object.entries(config)) {
      this.configCache.set(key, value);
    }
  }

  async getConfigValue(key: string, defaultValue?: any): Promise<any> {
    return this.configCache.get(key) ?? defaultValue;
  }

  // --------------------------------------------------------------------------
  // CONTEXT ACCESS
  // --------------------------------------------------------------------------

  getBaseContext(): Partial<ExecutionContext> {
    return { ...this.baseContext };
  }

  updateContext(updates: Partial<ExecutionContext>): void {
    this.baseContext = {
      ...this.baseContext,
      ...updates
    };
  }

  // --------------------------------------------------------------------------
  // DOCUMENT DISCOVERY
  // --------------------------------------------------------------------------

  /**
   * Smart document discovery using multiple strategies
   */
  async discoverDocuments(options: DocumentDiscoveryOptions): Promise<LoadedDocument[]> {
    const documents: LoadedDocument[] = [];

    for (const pattern of options.patterns) {
      const discovered = await this.loadByStrategy(pattern, options);
      documents.push(...discovered);
    }

    return documents;
  }

  /**
   * Load documents based on strategy type
   */
  private async loadByStrategy(
    pattern: InputPattern,
    options: DocumentDiscoveryOptions
  ): Promise<LoadedDocument[]> {
    switch (pattern.strategy) {
      case 'full_load':
        return this.fullLoadStrategy(pattern, options);
      case 'selective_load':
        return this.selectiveLoadStrategy(pattern, options);
      case 'index_guided':
        return this.indexGuidedStrategy(pattern, options);
      default:
        return this.fullLoadStrategy(pattern, options);
    }
  }

  /**
   * FULL_LOAD: Load all files matching pattern
   */
  private async fullLoadStrategy(
    pattern: InputPattern,
    options: DocumentDiscoveryOptions
  ): Promise<LoadedDocument[]> {
    const files = await glob(pattern.pattern, {
      cwd: this.config.projectRoot,
      ignore: options.excludePatterns
    });

    const documents: LoadedDocument[] = [];
    for (const file of files) {
      const doc = await this.loadDocument(file);
      if (doc) documents.push(doc);
    }

    return documents;
  }

  /**
   * SELECTIVE_LOAD: Load specific file based on context variables
   */
  private async selectiveLoadStrategy(
    pattern: InputPattern,
    options: DocumentDiscoveryOptions
  ): Promise<LoadedDocument[]> {
    // Resolve pattern with context variables
    const resolvedPattern = this.resolvePatternVariables(pattern.pattern);

    const files = await glob(resolvedPattern, {
      cwd: this.config.projectRoot
    });

    if (files.length === 0) {
      return [];
    }

    // Load first matching file
    const doc = await this.loadDocument(files[0]);
    return doc ? [doc] : [];
  }

  /**
   * INDEX_GUIDED: Load index first, then relevant documents
   */
  private async indexGuidedStrategy(
    pattern: InputPattern,
    options: DocumentDiscoveryOptions
  ): Promise<LoadedDocument[]> {
    const documents: LoadedDocument[] = [];

    // Find and load index file
    const baseDir = path.dirname(pattern.pattern);
    const indexPath = path.join(baseDir, 'index.md');

    try {
      const indexDoc = await this.loadDocument(indexPath);
      if (indexDoc) {
        documents.push(indexDoc);

        // Parse index to find relevant documents
        const relevantFiles = this.parseIndexForRelevantFiles(indexDoc.content, baseDir);

        for (const file of relevantFiles) {
          const doc = await this.loadDocument(file);
          if (doc) documents.push(doc);
        }
      }
    } catch (error) {
      // Fall back to full load if no index
      return this.fullLoadStrategy(pattern, options);
    }

    return documents;
  }

  // --------------------------------------------------------------------------
  // DOCUMENT LOADING
  // --------------------------------------------------------------------------

  async loadDocument(filePath: string): Promise<LoadedDocument | null> {
    // Check cache first
    if (this.loadedDocuments.has(filePath)) {
      return this.loadedDocuments.get(filePath)!;
    }

    try {
      const fullPath = path.isAbsolute(filePath)
        ? filePath
        : path.join(this.config.projectRoot, filePath);

      const content = await fs.readFile(fullPath, 'utf-8');
      const doc: LoadedDocument = {
        path: filePath,
        name: path.basename(filePath),
        content,
        type: this.getDocumentType(filePath),
        loadedAt: new Date().toISOString()
      };

      // Cache the document
      this.loadedDocuments.set(filePath, doc);

      return doc;
    } catch (error) {
      console.warn(`[MDS:Context] Failed to load document: ${filePath}`);
      return null;
    }
  }

  private getDocumentType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const typeMap: Record<string, string> = {
      '.md': 'markdown',
      '.yaml': 'yaml',
      '.yml': 'yaml',
      '.json': 'json',
      '.xml': 'xml',
      '.txt': 'text'
    };
    return typeMap[ext] || 'unknown';
  }

  // --------------------------------------------------------------------------
  // VARIABLE RESOLUTION
  // --------------------------------------------------------------------------

  /**
   * Resolve variables in patterns like {{variable}} or {config:key}
   */
  private resolvePatternVariables(pattern: string): string {
    // Resolve {{variable}} patterns from context
    let resolved = pattern.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
      return this.baseContext.variables?.[varName] || '';
    });

    // Resolve {config:key} patterns from config
    resolved = resolved.replace(/\{config:(\w+)\}/g, (_, key) => {
      return this.configCache.get(key) || '';
    });

    // Resolve {system:key} patterns
    resolved = resolved.replace(/\{system:(\w+)\}/g, (_, key) => {
      return this.getSystemVariable(key);
    });

    return resolved;
  }

  private getSystemVariable(key: string): string {
    const systemVars: Record<string, string> = {
      date: new Date().toISOString().split('T')[0],
      datetime: new Date().toISOString(),
      projectRoot: this.config.projectRoot,
      outputFolder: this.config.outputFolder || 'docs'
    };
    return systemVars[key] || '';
  }

  // --------------------------------------------------------------------------
  // CONTEXT INJECTION
  // --------------------------------------------------------------------------

  /**
   * Build full execution context for a workflow/agent
   */
  async buildExecutionContext(options: {
    agentId?: string;
    workflowId?: string;
    input?: Record<string, any>;
    documentPatterns?: InputPattern[];
  }): Promise<ExecutionContext> {
    const context: ExecutionContext = {
      ...this.baseContext as ExecutionContext,
      sessionId: this.baseContext.sessionId!,
      projectId: this.baseContext.projectId!,
      client: this.baseContext.client!,
      user: this.baseContext.user!,
      request: {
        type: options.agentId ? 'agent' : 'workflow',
        target: options.agentId || options.workflowId || 'unknown',
        timestamp: new Date().toISOString()
      },
      input: options.input || {},
      variables: { ...this.baseContext.variables }
    };

    // Load documents if patterns provided
    if (options.documentPatterns?.length) {
      context.documents = await this.discoverDocuments({
        patterns: options.documentPatterns
      });
    }

    return context;
  }

  /**
   * Inject project context (single source of truth)
   */
  async injectProjectContext(): Promise<LoadedDocument | null> {
    const patterns = [
      '**/project-context.md',
      '.mds/project-context.md',
      'docs/project-context.md'
    ];

    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: this.config.projectRoot });
      if (files.length > 0) {
        return this.loadDocument(files[0]);
      }
    }

    return null;
  }

  // --------------------------------------------------------------------------
  // SNAPSHOT MANAGEMENT
  // --------------------------------------------------------------------------

  /**
   * Create a snapshot of current context state
   */
  createSnapshot(): ContextSnapshot {
    const snapshot: ContextSnapshot = {
      id: this.generateSnapshotId(),
      timestamp: new Date().toISOString(),
      context: { ...this.baseContext },
      documents: Array.from(this.loadedDocuments.keys()),
      variables: { ...this.baseContext.variables }
    };

    this.snapshots.push(snapshot);
    return snapshot;
  }

  /**
   * Restore context from a snapshot
   */
  restoreSnapshot(snapshotId: string): boolean {
    const snapshot = this.snapshots.find(s => s.id === snapshotId);
    if (!snapshot) return false;

    this.baseContext = { ...snapshot.context };
    return true;
  }

  // --------------------------------------------------------------------------
  // HELPER METHODS
  // --------------------------------------------------------------------------

  private parseIndexForRelevantFiles(indexContent: string, baseDir: string): string[] {
    const files: string[] = [];

    // Extract links from markdown index
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(indexContent)) !== null) {
      const link = match[2];
      if (link.endsWith('.md') && !link.startsWith('http')) {
        files.push(path.join(baseDir, link));
      }
    }

    return files;
  }

  private generateSessionId(): string {
    return `mds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSnapshotId(): string {
    return `snap-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  }

  // --------------------------------------------------------------------------
  // CLEANUP
  // --------------------------------------------------------------------------

  clearDocumentCache(): void {
    this.loadedDocuments.clear();
  }

  clearAllCache(): void {
    this.loadedDocuments.clear();
    this.configCache.clear();
    this.snapshots = [];
  }
}

export default ContextManager;
