
# AI ADDENDUM: Comprehensive Guide to react-together

**Purpose:** This document provides a comprehensive knowledge base for an AI assistant on the `react-together` library. It is intended to supplement the existing `multisynq-react.txt` file with more detailed conceptual explanations and API documentation.

---

## 0. Setup and Initialization

### 0.1. Installation and Imports

To use `react-together`, it must be installed and imported into your React project.

1.  **NPM Package:** For projects using a bundler like Vite or Webpack.

    ```bash
    npm install react-together@latest
    ```

    ```javascript
    import { ReactTogether, useStateTogether, useFunctionTogether, useChat, useCursors, useHoveringUsers, useAllNicknames, useConnectedUsers, useCreateRandomSession, useIsTogether, useJoinUrl, useLeaveSession, useMyId, useNicknames, Chat, Cursors, ConnectedUsers, HoverHighlighter, SessionManager, utils } from 'react-together';
    ```

2.  **ES Module Import (CDN):** For modern JavaScript projects that use modules without a bundler.

    ```html
    <script type="module">
        import { ReactTogether } from 'https://cdn.jsdelivr.net/npm/react-together@latest/+esm';
        // ... and other components/hooks
    </script>
    ```

## 1. Core Concepts & Architecture

### 1.1. `react-together` and `@multisynq/client`

-   `react-together` is a high-level React library that simplifies the process of building real-time, collaborative applications.
-   It is built on top of `@multisynq/client` (formerly Croquet), and it abstracts away much of the boilerplate and session management code.
-   While `@multisynq/client` provides the core `Model` and `View` classes for building deterministic, synchronized applications, `react-together` provides a set of React hooks and components that handle the synchronization of state and function calls automatically.
-   For most common use cases (e.g., shared state, chat, cursors), `react-together` is sufficient. For more complex applications with custom, state-dependent logic (e.g., a multiplayer game with complex rules), you may need to use a custom `ReactTogetherModel` to leverage the full power of the underlying `@multisynq/client` architecture.

## 2. In-Depth Feature Guides

### 2.1. The `<ReactTogether />` Provider

This is the root component that enables all `react-together` functionality. It should wrap your entire application or the parts of it that require real-time collaboration.

**Props:**

-   `sessionParams`: An object containing your `appId` and `apiKey`.
-   `rememberUsers`: If `true`, the user's ID and nickname will be persisted in local storage.

**Example:**

```tsx
import { ReactTogether } from 'react-together';

function App() {
  return (
    <ReactTogether
      sessionParams={{
        appId: 'your-app-id',
        apiKey: 'your-api-key',
      }}
      rememberUsers={true}
    >
      {/* Your application components */}
    </ReactTogether>
  );
}
```

### 2.2. Hooks API

#### `useStateTogether<T>(rtKey, initialValue, options)`

Synchronizes a single piece of state across all clients.

**Example:**

```tsx
import { useStateTogether } from 'react-together';

function SharedCounter() {
  const [count, setCount] = useStateTogether('counter', 0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
```

#### `useStateTogetherWithPerUserValues<T>(rtKey, initialValue, options)`

Synchronizes a piece of state for each user individually.

**Example:**

```tsx
import { useStateTogetherWithPerUserValues } from 'react-together';

function UserStatuses() {
  const [myStatus, setMyStatus, allStatuses] = useStateTogetherWithPerUserValues('status', 'Online');

  return (
    <div>
      <input value={myStatus} onChange={e => setMyStatus(e.target.value)} />
      <ul>
        {Object.entries(allStatuses).map(([userId, status]) => (
          <li key={userId}>{userId}: {status}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### `useFunctionTogether<T>(rtKey, callback)`

Synchronizes a function call across all clients.

**Example:**

```tsx
import { useFunctionTogether } from 'react-together';
import { useCallback } from 'react';

function GlobalAlerter() {
  const alertEveryone = useFunctionTogether('global-alert', useCallback((message: string) => {
    alert(message);
  }, []));

  return <button onClick={() => alertEveryone('Hello, everyone!')}>Alert All</button>;
}
```

### 2.3. Components API

#### `<Chat rtKey="..." />`

A ready-to-use chat component.

**Example:**

```tsx
import { Chat } from 'react-together';

function MyChat() {
  return <Chat rtKey="global-chat" />;
}
```

#### `<Cursors />`

Displays the cursors of all connected users.

**Example:**

```tsx
import { Cursors } from 'react-together';

function CollaborativeCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Cursors />
      {/* Other content */}
    </div>
  );
}
```

#### `<ConnectedUsers />`

Displays the avatars of all connected users.

**Example:**

```tsx
import { ConnectedUsers } from 'react-together';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ConnectedUsers />
    </header>
  );
}
```

#### `<HoverHighlighter rtKey="..." />`

A wrapper component that highlights its children when any user hovers over it.

**Example:**

```tsx
import { HoverHighlighter } from 'react-together';

function SharedButton() {
  return (
    <HoverHighlighter rtKey="shared-button">
      <button>Hover over me!</button>
    </HoverHighlighter>
  );
}
```

#### `<SessionManager />`

Provides a UI for managing the session (create, join, leave).

**Example:**

```tsx
import { SessionManager } from 'react-together';

function AppControls() {
  return <SessionManager />;
}
```

## 3. Advanced: Custom Model Logic

For complex applications that require state-dependent logic, you can extend the `ReactTogetherModel`.

### 3.1. When to Use a Custom Model

-   When you need to enforce complex rules or constraints on the shared state (e.g., a game where two players cannot occupy the same space).
-   When you need to perform calculations on the model side that depend on the current state.
-   When you need to use the `future()` messaging system for time-based events.

### 3.2. Creating a Custom Model

1.  **Create a new model class that extends `ReactTogetherModel`.**
2.  **Implement your custom logic and event handlers in the model.**
3.  **Register your model.**
4.  **Pass your model to the `<ReactTogether />` provider.**

**Example:**

```typescript
// src/models/MyGameModel.ts
import { ReactTogetherModel } from 'react-together';

export class MyGameModel extends ReactTogetherModel {
  init() {
    super.init({});
    this.subscribe(this.id, 'move-player', this.handleMovePlayer);
  }

  handleMovePlayer({ playerId, x, y }) {
    // Your custom game logic here
    // e.g., check for collisions, update scores, etc.
  }
}

MyGameModel.register('MyGameModel');
```

```tsx
// src/App.tsx
import { ReactTogether, MultisynqReact } from 'react-together';
import { MyGameModel } from './models/MyGameModel';

const { usePublish, useModel } = MultisynqReact;

function Game() {
  const model = useModel();
  const publishMove = usePublish(d => [model.id, 'move-player', d]);

  function handleMove(x, y) {
    publishMove({ playerId: 'player-1', x, y });
  }

  return <button onClick={() => handleMove(10, 20)}>Move</button>;
}

function App() {
  return (
    <ReactTogether
      sessionParams={{
        appId: 'your-app-id',
        apiKey: 'your-api-key',
        model: MyGameModel,
      }}
    >
      <Game />
    </ReactTogether>
  );
}
```
