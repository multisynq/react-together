# Fixes for ActivitySynq Global

This document outlines the identified issues and the steps to fix them.

## 1. Robust Event Emission in `BrowserEventEmitter`

**Problem:** The `emit` method in `BrowserEventEmitter.ts` iterates over the set of listeners using `forEach`. If a listener unsubscribes itself or another listener during this iteration, it can lead to unpredictable behavior, as the set is being mutated while it's being iterated over.

**Fix:**
- Modify the `emit` method in `BrowserEventEmitter.ts`.
- Create a copy of the listeners set before iterating over it (e.g., using the spread operator `[...callbacks]`). This ensures that the iteration happens on a stable snapshot of the listeners that existed at the moment the event was emitted.

## 2. Incomplete Error Propagation

**Problem:** When the `ActivitySynqGlobalManager` encounters an error during initialization or reconnection, it emits a `status_changed` event with the status `'error'`, but it doesn't pass the actual error object along with the event. The `useActivitySynqGlobal` hook listens for this status change but has no way to access the error details, so its returned `error` state is always `null`.

**Fix:**
1.  **In `ActivitySynqGlobalManager.ts`:**
    -   Update the `emit` call for `status_changed` to include the error object as a second argument.
    -   In the `doInitialize` `catch` block: `this.eventEmitter.emit('status_changed', 'error', error)`.
    -   In `attemptReconnection` when max attempts are reached: `this.eventEmitter.emit('status_changed', 'error', new Error('Max reconnection attempts reached'))`.

2.  **In `useActivitySynqGlobal.tsx`:**
    -   Update the `handleStatusChanged` callback to accept an optional second argument for the error.
    -   When the status is `'error'`, set the `error` state with the received error object.
    -   Update the `manager.subscribe` call to correctly handle the new argument.
