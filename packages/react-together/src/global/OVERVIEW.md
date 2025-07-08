# ActivitySynq Global Feature

This directory implements the "ActivitySynq Global" pattern for `react-together`.

## Purpose

The primary goal is to provide a single, application-wide `ActivitySynq` session that persists independently of the React component tree. This allows for global, real-time features that are not tied to a specific view or component lifecycle.

Key use cases include:
- Global notification systems.
- Live user counters visible across the entire application.
- A persistent connection for background tasks or analytics.
- Any feature that needs to send or receive real-time events regardless of the current page or view.

## Architecture

The pattern is built around a few key files:

- **`ActivitySynqGlobalManager.ts`**: A singleton class that manages the underlying Multisynq session. It handles initialization, connection, reconnection, and event publishing/subscription. It is designed to be instantiated once and live for the duration of the application.

- **`ActivitySynqGlobal.tsx`**: A React component that initializes the `ActivitySynqGlobalManager` with a given configuration. It should be mounted high up in the component tree (e.g., in the root layout) to ensure the manager is initialized early.

- **`useActivitySynqGlobal.tsx`**: A React hook that serves as the primary interface for components to interact with the global manager. It provides access to the session status, shared activities, and methods to register new activities.

- **`BrowserEventEmitter.ts`**: A simple, browser-compatible event emitter used by the manager to communicate with the `useActivitySynqGlobal` hook and other potential listeners.

## How it Works

1. The `<ActivitySynqGlobal />` component is mounted, which initializes the `ActivitySynqGlobalManager` singleton.
2. The manager establishes and maintains a persistent connection to a Multisynq session.
3. Any component can then use the `useActivitySynqGlobal()` hook to tap into this global session.
4. The hook subscribes to events from the manager to get live updates (new activities, connection status changes) and re-renders the component when necessary.
5. Components can use the `registerActivity` function returned by the hook to publish events to the global session, which are then broadcast to all connected clients.
