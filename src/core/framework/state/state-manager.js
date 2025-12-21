/**
 * BMAD Framework - State Management System
 *
 * Provides centralized state management with:
 * - Immutable state updates
 * - State persistence
 * - State subscriptions
 * - Transaction support
 * - State history/undo
 *
 * @module framework/state/state-manager
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');

// ============================================================================
// Constants
// ============================================================================

const STATE_DOMAINS = {
  SESSION: 'session',
  WORKFLOW: 'workflow',
  AGENT: 'agent',
  CONFIG: 'config',
  USER: 'user',
};

const EVENTS = {
  STATE_CHANGE: 'state:change',
  STATE_RESET: 'state:reset',
  TRANSACTION_START: 'transaction:start',
  TRANSACTION_COMMIT: 'transaction:commit',
  TRANSACTION_ROLLBACK: 'transaction:rollback',
  PERSIST: 'persist',
  RESTORE: 'restore',
};

// ============================================================================
// State Store Class
// ============================================================================

/**
 * Immutable state store for a single domain.
 */
class StateStore {
  constructor(domain, initialState = {}) {
    this.domain = domain;
    this.state = { ...initialState };
    this.history = [];
    this.maxHistory = 50;
    this.version = 0;
  }

  /**
   * Get current state.
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Get a specific path from state.
   */
  get(path, defaultValue = undefined) {
    const parts = path.split('.');
    let current = this.state;

    for (const part of parts) {
      if (current === undefined || current === null) {
        return defaultValue;
      }
      current = current[part];
    }

    return current !== undefined ? current : defaultValue;
  }

  /**
   * Set state at a specific path (immutable update).
   */
  set(path, value) {
    const previousState = this.state;

    // Save to history
    if (this.history.length >= this.maxHistory) {
      this.history.shift();
    }
    this.history.push({
      version: this.version,
      state: previousState,
      timestamp: Date.now(),
    });

    // Create new state
    this.state = this.setPath(this.state, path, value);
    this.version++;

    return {
      previous: previousState,
      current: this.state,
      path,
      value,
      version: this.version,
    };
  }

  /**
   * Merge partial state.
   */
  merge(partial) {
    const previousState = this.state;

    this.history.push({
      version: this.version,
      state: previousState,
      timestamp: Date.now(),
    });

    this.state = this.deepMerge(this.state, partial);
    this.version++;

    return {
      previous: previousState,
      current: this.state,
      version: this.version,
    };
  }

  /**
   * Delete a path from state.
   */
  delete(path) {
    const previousState = this.state;

    this.history.push({
      version: this.version,
      state: previousState,
      timestamp: Date.now(),
    });

    this.state = this.deletePath(this.state, path);
    this.version++;

    return {
      previous: previousState,
      current: this.state,
      path,
      version: this.version,
    };
  }

  /**
   * Reset state to initial or provided state.
   */
  reset(newState = {}) {
    const previousState = this.state;

    this.history.push({
      version: this.version,
      state: previousState,
      timestamp: Date.now(),
    });

    this.state = { ...newState };
    this.version++;

    return {
      previous: previousState,
      current: this.state,
      version: this.version,
    };
  }

  /**
   * Undo last change.
   */
  undo() {
    if (this.history.length === 0) {
      return null;
    }

    const previousEntry = this.history.pop();
    this.state = previousEntry.state;
    this.version = previousEntry.version;

    return {
      restored: this.state,
      version: this.version,
    };
  }

  /**
   * Get state history.
   */
  getHistory(limit = 10) {
    return this.history.slice(-limit);
  }

  // --------------------------------------------------------------------------
  // Internal Helpers
  // --------------------------------------------------------------------------

  /**
   * Set value at path immutably.
   */
  setPath(obj, path, value) {
    const parts = path.split('.');
    const result = { ...obj };
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      current[part] = current[part] ? { ...current[part] } : {};
      current = current[part];
    }

    current[parts[parts.length - 1]] = value;
    return result;
  }

  /**
   * Delete value at path immutably.
   */
  deletePath(obj, path) {
    const parts = path.split('.');
    const result = { ...obj };

    if (parts.length === 1) {
      delete result[parts[0]];
      return result;
    }

    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) return result;
      current[part] = { ...current[part] };
      current = current[part];
    }

    delete current[parts[parts.length - 1]];
    return result;
  }

  /**
   * Deep merge objects.
   */
  deepMerge(target, source) {
    const result = { ...target };

    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Serialize store for persistence.
   */
  toJSON() {
    return {
      domain: this.domain,
      state: this.state,
      version: this.version,
      historyLength: this.history.length,
    };
  }
}

// ============================================================================
// Transaction Class
// ============================================================================

/**
 * Transaction for atomic state updates.
 */
class Transaction {
  constructor(manager, id) {
    this.id = id;
    this.manager = manager;
    this.operations = [];
    this.committed = false;
    this.rolledBack = false;
    this.startedAt = Date.now();
  }

  /**
   * Add a set operation to transaction.
   */
  set(domain, path, value) {
    if (this.committed || this.rolledBack) {
      throw new Error('Transaction already finalized');
    }

    this.operations.push({
      type: 'set',
      domain,
      path,
      value,
      previousValue: this.manager.get(domain, path),
    });

    return this;
  }

  /**
   * Add a merge operation to transaction.
   */
  merge(domain, partial) {
    if (this.committed || this.rolledBack) {
      throw new Error('Transaction already finalized');
    }

    this.operations.push({
      type: 'merge',
      domain,
      partial,
      previousState: this.manager.getStore(domain)?.getState(),
    });

    return this;
  }

  /**
   * Add a delete operation to transaction.
   */
  delete(domain, path) {
    if (this.committed || this.rolledBack) {
      throw new Error('Transaction already finalized');
    }

    this.operations.push({
      type: 'delete',
      domain,
      path,
      previousValue: this.manager.get(domain, path),
    });

    return this;
  }

  /**
   * Commit all operations.
   */
  commit() {
    if (this.committed || this.rolledBack) {
      throw new Error('Transaction already finalized');
    }

    const results = [];

    for (const op of this.operations) {
      const store = this.manager.getStore(op.domain);

      switch (op.type) {
        case 'set':
          results.push(store.set(op.path, op.value));
          break;
        case 'merge':
          results.push(store.merge(op.partial));
          break;
        case 'delete':
          results.push(store.delete(op.path));
          break;
      }
    }

    this.committed = true;
    this.manager.endTransaction(this);

    return results;
  }

  /**
   * Rollback all operations.
   */
  rollback() {
    if (this.committed || this.rolledBack) {
      throw new Error('Transaction already finalized');
    }

    this.rolledBack = true;
    this.manager.endTransaction(this);
  }
}

// ============================================================================
// State Manager Class
// ============================================================================

/**
 * Central state manager for the framework.
 */
class StateManager extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      persistOnChange: false,
      maxHistory: 50,
      ...options,
    };

    this.stores = new Map();
    this.subscriptions = new Map();
    this.transactions = new Map();
    this.persistenceHandler = options.persistenceHandler || null;
    this.sessionId = crypto.randomUUID();

    // Initialize default domains
    for (const domain of Object.values(STATE_DOMAINS)) {
      this.createStore(domain);
    }
  }

  // --------------------------------------------------------------------------
  // Store Management
  // --------------------------------------------------------------------------

  /**
   * Create a new state store.
   */
  createStore(domain, initialState = {}) {
    if (this.stores.has(domain)) {
      return this.stores.get(domain);
    }

    const store = new StateStore(domain, initialState);
    store.maxHistory = this.options.maxHistory;
    this.stores.set(domain, store);

    return store;
  }

  /**
   * Get a store by domain.
   */
  getStore(domain) {
    return this.stores.get(domain);
  }

  /**
   * Delete a store.
   */
  deleteStore(domain) {
    this.subscriptions.delete(domain);
    return this.stores.delete(domain);
  }

  // --------------------------------------------------------------------------
  // State Operations
  // --------------------------------------------------------------------------

  /**
   * Get state value.
   */
  get(domain, path, defaultValue) {
    const store = this.stores.get(domain);
    if (!store) {
      return defaultValue;
    }
    return store.get(path, defaultValue);
  }

  /**
   * Get entire domain state.
   */
  getState(domain) {
    const store = this.stores.get(domain);
    return store ? store.getState() : {};
  }

  /**
   * Set state value.
   */
  set(domain, path, value) {
    const store = this.stores.get(domain);
    if (!store) {
      throw new Error(`Unknown domain: ${domain}`);
    }

    const result = store.set(path, value);
    this.notifySubscribers(domain, path, result);

    this.emit(EVENTS.STATE_CHANGE, {
      domain,
      path,
      ...result,
    });

    if (this.options.persistOnChange) {
      this.persist(domain);
    }

    return result;
  }

  /**
   * Merge partial state.
   */
  merge(domain, partial) {
    const store = this.stores.get(domain);
    if (!store) {
      throw new Error(`Unknown domain: ${domain}`);
    }

    const result = store.merge(partial);
    this.notifySubscribers(domain, null, result);

    this.emit(EVENTS.STATE_CHANGE, {
      domain,
      ...result,
    });

    if (this.options.persistOnChange) {
      this.persist(domain);
    }

    return result;
  }

  /**
   * Delete state at path.
   */
  delete(domain, path) {
    const store = this.stores.get(domain);
    if (!store) {
      throw new Error(`Unknown domain: ${domain}`);
    }

    const result = store.delete(path);
    this.notifySubscribers(domain, path, result);

    this.emit(EVENTS.STATE_CHANGE, {
      domain,
      path,
      ...result,
    });

    return result;
  }

  /**
   * Reset domain state.
   */
  reset(domain, newState = {}) {
    const store = this.stores.get(domain);
    if (!store) {
      throw new Error(`Unknown domain: ${domain}`);
    }

    const result = store.reset(newState);
    this.notifySubscribers(domain, null, result);

    this.emit(EVENTS.STATE_RESET, {
      domain,
      ...result,
    });

    return result;
  }

  /**
   * Undo last change in domain.
   */
  undo(domain) {
    const store = this.stores.get(domain);
    if (!store) {
      throw new Error(`Unknown domain: ${domain}`);
    }

    const result = store.undo();
    if (result) {
      this.notifySubscribers(domain, null, { current: result.restored });
    }

    return result;
  }

  // --------------------------------------------------------------------------
  // Transactions
  // --------------------------------------------------------------------------

  /**
   * Begin a new transaction.
   */
  beginTransaction() {
    const id = crypto.randomUUID();
    const transaction = new Transaction(this, id);
    this.transactions.set(id, transaction);

    this.emit(EVENTS.TRANSACTION_START, { transactionId: id });

    return transaction;
  }

  /**
   * End a transaction.
   */
  endTransaction(transaction) {
    this.transactions.delete(transaction.id);

    if (transaction.committed) {
      this.emit(EVENTS.TRANSACTION_COMMIT, {
        transactionId: transaction.id,
        operationCount: transaction.operations.length,
      });
    } else if (transaction.rolledBack) {
      this.emit(EVENTS.TRANSACTION_ROLLBACK, {
        transactionId: transaction.id,
        operationCount: transaction.operations.length,
      });
    }
  }

  // --------------------------------------------------------------------------
  // Subscriptions
  // --------------------------------------------------------------------------

  /**
   * Subscribe to state changes in a domain.
   */
  subscribe(domain, path, callback) {
    const key = `${domain}:${path || '*'}`;

    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, new Set());
    }

    const subscription = {
      id: crypto.randomUUID(),
      domain,
      path,
      callback,
    };

    this.subscriptions.get(key).add(subscription);

    // Return unsubscribe function
    return () => {
      const subs = this.subscriptions.get(key);
      if (subs) {
        subs.delete(subscription);
        if (subs.size === 0) {
          this.subscriptions.delete(key);
        }
      }
    };
  }

  /**
   * Notify subscribers of state change.
   */
  notifySubscribers(domain, path, change) {
    // Notify specific path subscribers
    if (path) {
      const key = `${domain}:${path}`;
      const subs = this.subscriptions.get(key);
      if (subs) {
        for (const sub of subs) {
          try {
            sub.callback(change);
          } catch (error) {
            console.error('Subscription callback error:', error);
          }
        }
      }
    }

    // Notify wildcard subscribers
    const wildcardKey = `${domain}:*`;
    const wildcardSubs = this.subscriptions.get(wildcardKey);
    if (wildcardSubs) {
      for (const sub of wildcardSubs) {
        try {
          sub.callback(change);
        } catch (error) {
          console.error('Subscription callback error:', error);
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // Persistence
  // --------------------------------------------------------------------------

  /**
   * Persist domain state.
   */
  async persist(domain) {
    if (!this.persistenceHandler) {
      return;
    }

    const store = this.stores.get(domain);
    if (!store) {
      return;
    }

    try {
      await this.persistenceHandler.save(domain, store.toJSON());

      this.emit(EVENTS.PERSIST, {
        domain,
        version: store.version,
      });
    } catch (error) {
      console.error(`Failed to persist domain ${domain}:`, error);
    }
  }

  /**
   * Persist all domains.
   */
  async persistAll() {
    for (const domain of this.stores.keys()) {
      await this.persist(domain);
    }
  }

  /**
   * Restore domain state from persistence.
   */
  async restore(domain) {
    if (!this.persistenceHandler) {
      return;
    }

    try {
      const data = await this.persistenceHandler.load(domain);
      if (data && data.state) {
        const store = this.stores.get(domain);
        if (store) {
          store.state = data.state;
          store.version = data.version || 0;
        }

        this.emit(EVENTS.RESTORE, {
          domain,
          version: data.version,
        });
      }
    } catch (error) {
      console.error(`Failed to restore domain ${domain}:`, error);
    }
  }

  /**
   * Restore all domains from persistence.
   */
  async restoreAll() {
    for (const domain of this.stores.keys()) {
      await this.restore(domain);
    }
  }

  // --------------------------------------------------------------------------
  // Selectors
  // --------------------------------------------------------------------------

  /**
   * Create a selector for derived state.
   */
  createSelector(dependencies, computeFn) {
    let cachedResult = null;
    let cachedDeps = null;

    return () => {
      // Get current dependency values
      const currentDeps = dependencies.map(({ domain, path }) => this.get(domain, path));

      // Check if dependencies changed
      const depsChanged =
        !cachedDeps ||
        currentDeps.some((val, i) => val !== cachedDeps[i]);

      if (depsChanged) {
        cachedResult = computeFn(...currentDeps);
        cachedDeps = currentDeps;
      }

      return cachedResult;
    };
  }

  // --------------------------------------------------------------------------
  // Utilities
  // --------------------------------------------------------------------------

  /**
   * Get snapshot of all state.
   */
  getSnapshot() {
    const snapshot = {};

    for (const [domain, store] of this.stores) {
      snapshot[domain] = store.toJSON();
    }

    return {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      domains: snapshot,
    };
  }

  /**
   * Restore from snapshot.
   */
  restoreSnapshot(snapshot) {
    for (const [domain, data] of Object.entries(snapshot.domains)) {
      const store = this.stores.get(domain);
      if (store && data.state) {
        store.state = data.state;
        store.version = data.version || 0;
      }
    }
  }

  /**
   * Get statistics.
   */
  getStats() {
    const stats = {
      sessionId: this.sessionId,
      domains: {},
      subscriptionCount: 0,
      activeTransactions: this.transactions.size,
    };

    for (const [domain, store] of this.stores) {
      stats.domains[domain] = {
        version: store.version,
        historyLength: store.history.length,
        keyCount: Object.keys(store.state).length,
      };
    }

    for (const subs of this.subscriptions.values()) {
      stats.subscriptionCount += subs.size;
    }

    return stats;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let globalManager = null;

/**
 * Get or create the global state manager.
 */
function getStateManager(options = {}) {
  if (!globalManager) {
    globalManager = new StateManager(options);
  }
  return globalManager;
}

/**
 * Reset the global state manager (for testing).
 */
function resetStateManager() {
  globalManager = null;
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Classes
  StateStore,
  StateManager,
  Transaction,

  // Constants
  STATE_DOMAINS,
  EVENTS,

  // Singleton
  getStateManager,
  resetStateManager,
};
