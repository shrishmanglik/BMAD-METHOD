/**
 * BMAD Framework - Error Types and Handling
 *
 * Provides a comprehensive error handling system with:
 * - Typed error classes for different scenarios
 * - Error codes for categorization
 * - Recovery strategies
 * - User-friendly error messages
 *
 * @module framework/errors/error-types
 */

// ============================================================================
// Error Codes
// ============================================================================

const ErrorCodes = {
  // Configuration Errors (1xxx)
  CONFIG_NOT_FOUND: 'BMAD-1001',
  CONFIG_INVALID: 'BMAD-1002',
  CONFIG_PARSE_ERROR: 'BMAD-1003',
  CONFIG_VARIABLE_UNRESOLVED: 'BMAD-1004',
  CONFIG_MISSING_REQUIRED: 'BMAD-1005',

  // Agent Errors (2xxx)
  AGENT_NOT_FOUND: 'BMAD-2001',
  AGENT_LOAD_FAILED: 'BMAD-2002',
  AGENT_INVALID_DEFINITION: 'BMAD-2003',
  AGENT_COMMAND_NOT_FOUND: 'BMAD-2004',
  AGENT_ALREADY_ACTIVE: 'BMAD-2005',
  AGENT_NOT_ACTIVE: 'BMAD-2006',
  AGENT_LIFECYCLE_ERROR: 'BMAD-2007',
  AGENT_MEMORY_ERROR: 'BMAD-2008',

  // Workflow Errors (3xxx)
  WORKFLOW_NOT_FOUND: 'BMAD-3001',
  WORKFLOW_INVALID: 'BMAD-3002',
  WORKFLOW_STEP_FAILED: 'BMAD-3003',
  WORKFLOW_DEPENDENCY_FAILED: 'BMAD-3004',
  WORKFLOW_TIMEOUT: 'BMAD-3005',
  WORKFLOW_CANCELLED: 'BMAD-3006',
  WORKFLOW_STATE_ERROR: 'BMAD-3007',
  WORKFLOW_CHECKPOINT_ERROR: 'BMAD-3008',

  // Module Errors (4xxx)
  MODULE_NOT_FOUND: 'BMAD-4001',
  MODULE_LOAD_FAILED: 'BMAD-4002',
  MODULE_INVALID: 'BMAD-4003',
  MODULE_DEPENDENCY_MISSING: 'BMAD-4004',
  MODULE_VERSION_MISMATCH: 'BMAD-4005',

  // Plugin Errors (5xxx)
  PLUGIN_NOT_FOUND: 'BMAD-5001',
  PLUGIN_LOAD_FAILED: 'BMAD-5002',
  PLUGIN_INVALID: 'BMAD-5003',
  PLUGIN_HOOK_ERROR: 'BMAD-5004',
  PLUGIN_CONFLICT: 'BMAD-5005',

  // File System Errors (6xxx)
  FILE_NOT_FOUND: 'BMAD-6001',
  FILE_READ_ERROR: 'BMAD-6002',
  FILE_WRITE_ERROR: 'BMAD-6003',
  FILE_PERMISSION_ERROR: 'BMAD-6004',
  PATH_INVALID: 'BMAD-6005',

  // Validation Errors (7xxx)
  VALIDATION_FAILED: 'BMAD-7001',
  SCHEMA_MISMATCH: 'BMAD-7002',
  TYPE_ERROR: 'BMAD-7003',
  CONSTRAINT_VIOLATION: 'BMAD-7004',

  // Runtime Errors (8xxx)
  RUNTIME_ERROR: 'BMAD-8001',
  TIMEOUT_ERROR: 'BMAD-8002',
  RESOURCE_EXHAUSTED: 'BMAD-8003',
  CONCURRENCY_ERROR: 'BMAD-8004',

  // User Errors (9xxx)
  USER_CANCELLED: 'BMAD-9001',
  USER_INPUT_INVALID: 'BMAD-9002',
  USER_APPROVAL_REQUIRED: 'BMAD-9003',
};

// ============================================================================
// Recovery Strategies
// ============================================================================

const RecoveryStrategies = {
  RETRY: 'retry',
  SKIP: 'skip',
  ROLLBACK: 'rollback',
  PROMPT_USER: 'prompt_user',
  USE_DEFAULT: 'use_default',
  ABORT: 'abort',
  IGNORE: 'ignore',
};

// ============================================================================
// Base Error Class
// ============================================================================

/**
 * Base BMAD error class with enhanced capabilities.
 */
class BmadError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'BmadError';
    this.code = options.code || ErrorCodes.RUNTIME_ERROR;
    this.recoverable = options.recoverable !== false;
    this.recovery = options.recovery || RecoveryStrategies.PROMPT_USER;
    this.context = options.context || {};
    this.cause = options.cause;
    this.timestamp = new Date().toISOString();
    this.suggestions = options.suggestions || [];

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Convert to user-friendly message.
   */
  toUserMessage() {
    let msg = `Error: ${this.message}`;

    if (this.suggestions.length > 0) {
      msg += '\n\nSuggestions:\n';
      this.suggestions.forEach((s, i) => {
        msg += `  ${i + 1}. ${s}\n`;
      });
    }

    return msg;
  }

  /**
   * Convert to JSON for logging/serialization.
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      recoverable: this.recoverable,
      recovery: this.recovery,
      context: this.context,
      suggestions: this.suggestions,
      timestamp: this.timestamp,
      stack: this.stack,
      cause: this.cause ? this.cause.message : undefined,
    };
  }

  /**
   * Create a chained error.
   */
  chain(childError) {
    return new BmadError(childError.message, {
      ...this.toJSON(),
      cause: this,
      message: `${this.message} -> ${childError.message}`,
    });
  }
}

// ============================================================================
// Specific Error Classes
// ============================================================================

/**
 * Configuration-related errors.
 */
class ConfigError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.CONFIG_INVALID,
    });
    this.name = 'ConfigError';
    this.configPath = options.configPath;
    this.field = options.field;
  }
}

/**
 * Agent-related errors.
 */
class AgentError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.AGENT_LOAD_FAILED,
    });
    this.name = 'AgentError';
    this.agentId = options.agentId;
    this.instanceId = options.instanceId;
  }
}

/**
 * Workflow-related errors.
 */
class WorkflowError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.WORKFLOW_STEP_FAILED,
    });
    this.name = 'WorkflowError';
    this.workflowId = options.workflowId;
    this.executionId = options.executionId;
    this.stepId = options.stepId;
  }
}

/**
 * Module-related errors.
 */
class ModuleError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.MODULE_LOAD_FAILED,
    });
    this.name = 'ModuleError';
    this.moduleId = options.moduleId;
  }
}

/**
 * Plugin-related errors.
 */
class PluginError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.PLUGIN_LOAD_FAILED,
    });
    this.name = 'PluginError';
    this.pluginName = options.pluginName;
    this.hookName = options.hookName;
  }
}

/**
 * Validation-related errors.
 */
class ValidationError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.VALIDATION_FAILED,
      recoverable: false,
    });
    this.name = 'ValidationError';
    this.validationErrors = options.validationErrors || [];
    this.schema = options.schema;
  }

  /**
   * Format validation errors for display.
   */
  formatErrors() {
    if (this.validationErrors.length === 0) {
      return this.message;
    }

    const lines = ['Validation failed:'];
    this.validationErrors.forEach((err) => {
      lines.push(`  - ${err.path}: ${err.message}`);
    });
    return lines.join('\n');
  }
}

/**
 * File system errors.
 */
class FileSystemError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.FILE_NOT_FOUND,
    });
    this.name = 'FileSystemError';
    this.path = options.path;
    this.operation = options.operation;
  }
}

/**
 * Timeout errors.
 */
class TimeoutError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: ErrorCodes.TIMEOUT_ERROR,
      recovery: RecoveryStrategies.RETRY,
    });
    this.name = 'TimeoutError';
    this.timeoutMs = options.timeoutMs;
    this.operation = options.operation;
  }
}

/**
 * User-initiated errors.
 */
class UserError extends BmadError {
  constructor(message, options = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCodes.USER_CANCELLED,
      recoverable: false,
    });
    this.name = 'UserError';
  }
}

// ============================================================================
// Error Handler Class
// ============================================================================

/**
 * Centralized error handler with recovery strategies.
 */
class ErrorHandler {
  constructor(options = {}) {
    this.options = {
      logErrors: true,
      maxRetries: 3,
      retryDelay: 1000,
      ...options,
    };
    this.handlers = new Map();
    this.logger = options.logger || console;
  }

  /**
   * Register a handler for a specific error code.
   */
  registerHandler(code, handler) {
    this.handlers.set(code, handler);
    return this;
  }

  /**
   * Handle an error with appropriate recovery.
   */
  async handle(error, context = {}) {
    // Wrap non-BMAD errors
    if (!(error instanceof BmadError)) {
      error = new BmadError(error.message, {
        code: ErrorCodes.RUNTIME_ERROR,
        cause: error,
        context,
      });
    }

    // Log error
    if (this.options.logErrors) {
      this.logger.error(`[${error.code}] ${error.message}`, error.toJSON());
    }

    // Check for registered handler
    const handler = this.handlers.get(error.code);
    if (handler) {
      try {
        return await handler(error, context);
      } catch (handlerError) {
        this.logger.error('Error handler failed:', handlerError);
      }
    }

    // Apply default recovery strategy
    return this.applyRecovery(error, context);
  }

  /**
   * Apply recovery strategy.
   */
  async applyRecovery(error, context) {
    switch (error.recovery) {
      case RecoveryStrategies.RETRY:
        return this.retryOperation(context.operation, context);

      case RecoveryStrategies.SKIP:
        return { skipped: true, error };

      case RecoveryStrategies.ROLLBACK:
        if (context.rollback) {
          await context.rollback();
        }
        return { rolledBack: true, error };

      case RecoveryStrategies.USE_DEFAULT:
        return { value: context.defaultValue, error };

      case RecoveryStrategies.IGNORE:
        return { ignored: true, error };

      case RecoveryStrategies.PROMPT_USER:
        return { needsUserInput: true, error, prompt: error.toUserMessage() };

      case RecoveryStrategies.ABORT:
      default:
        throw error;
    }
  }

  /**
   * Retry an operation with exponential backoff.
   */
  async retryOperation(operation, context, attempt = 1) {
    if (!operation || typeof operation !== 'function') {
      throw new BmadError('No operation provided for retry', {
        code: ErrorCodes.RUNTIME_ERROR,
      });
    }

    try {
      return await operation();
    } catch (error) {
      if (attempt >= this.options.maxRetries) {
        throw error;
      }

      const delay = this.options.retryDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.retryOperation(operation, context, attempt + 1);
    }
  }

  /**
   * Create an error from validation results.
   */
  createValidationError(validationResult, context = {}) {
    const errors = validationResult.error?.issues || [];

    return new ValidationError('Validation failed', {
      validationErrors: errors.map((e) => ({
        path: e.path?.join('.') || '',
        message: e.message,
        code: e.code,
      })),
      context,
      suggestions: [
        'Check the schema documentation',
        'Verify all required fields are present',
        'Ensure field types match the schema',
      ],
    });
  }
}

// ============================================================================
// Error Utilities
// ============================================================================

/**
 * Wrap an async function with error handling.
 */
function withErrorHandling(fn, handler, context = {}) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handler.handle(error, { ...context, args });
    }
  };
}

/**
 * Create an error with suggestions based on type.
 */
function createErrorWithSuggestions(code, message, context = {}) {
  const suggestions = getSuggestionsForError(code);
  const ErrorClass = getErrorClassForCode(code);

  return new ErrorClass(message, {
    code,
    context,
    suggestions,
  });
}

/**
 * Get suggestions for a specific error code.
 */
function getSuggestionsForError(code) {
  const suggestionMap = {
    [ErrorCodes.CONFIG_NOT_FOUND]: [
      'Run "bmad install" to set up configuration',
      'Check that you are in the correct project directory',
      'Verify the .bmad directory exists',
    ],
    [ErrorCodes.AGENT_NOT_FOUND]: [
      'Check the agent name spelling',
      'Run "list-agents" to see available agents',
      'Ensure the module is installed',
    ],
    [ErrorCodes.WORKFLOW_NOT_FOUND]: [
      'Check the workflow name',
      'Run "list-workflows" to see available workflows',
      'Verify the workflow file exists',
    ],
    [ErrorCodes.VALIDATION_FAILED]: [
      'Review the error details above',
      'Check the schema documentation',
      'Ensure all required fields are present',
    ],
  };

  return suggestionMap[code] || ['Check the documentation for more information'];
}

/**
 * Get the appropriate error class for a code.
 */
function getErrorClassForCode(code) {
  if (code.startsWith('BMAD-1')) return ConfigError;
  if (code.startsWith('BMAD-2')) return AgentError;
  if (code.startsWith('BMAD-3')) return WorkflowError;
  if (code.startsWith('BMAD-4')) return ModuleError;
  if (code.startsWith('BMAD-5')) return PluginError;
  if (code.startsWith('BMAD-6')) return FileSystemError;
  if (code.startsWith('BMAD-7')) return ValidationError;
  return BmadError;
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Error codes
  ErrorCodes,
  RecoveryStrategies,

  // Error classes
  BmadError,
  ConfigError,
  AgentError,
  WorkflowError,
  ModuleError,
  PluginError,
  ValidationError,
  FileSystemError,
  TimeoutError,
  UserError,

  // Handler
  ErrorHandler,

  // Utilities
  withErrorHandling,
  createErrorWithSuggestions,
  getSuggestionsForError,
  getErrorClassForCode,
};
