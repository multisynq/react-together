
# AI ADDENDUM: Comprehensive Guide to @multisynq/client (v3)

**Purpose:** This document provides a comprehensive knowledge base for an AI assistant on the `@multisynq/client` library. It is intended to supplement the existing `multisynq-js.txt` file with more detailed conceptual explanations and API documentation.

---

## 0. Setup and Initialization

### 0.1. Importing the Library

To use Multisynq, it must be loaded into the project. The `Multisynq` object becomes the global entry point.

1.  **HTML Script Tag (CDN):** For simple, standalone HTML files.

    ```html
    <head>
      <meta charset="utf-8">
      <script src="https://cdn.jsdelivr.net/npm/@multisynq/client@latest/bundled/multisynq-client.min.js"></script>
    </head>
    <script>
        // All Multisynq APIs are available on the global `Multisynq` object.
        const { Model, View, Session, App } = Multisynq;
    </script>
    ```

2.  **ES Module Import (CDN):** For modern JavaScript projects that use modules without a bundler.

    ```javascript
    import * as Multisynq from "https://cdn.jsdelivr.net/npm/@multisynq/client@latest/bundled/multisynq-client.esm.js";
    const { Model, View, Session, App } = Multisynq;
    ```

3.  **NPM Package:** For projects using a bundler like Vite or Webpack.

    ```bash
    npm install @multisynq/client
    ```

    ```javascript
    import { Model, View, Session, App } from "@multisynq/client";
    ```

**Note:** The `charset="utf-8"` declaration is critical for ensuring deterministic code hashing across different browsers.

## 1. Core Concepts & Architecture

### 1.1. Multisynq Architecture Overview

-   **Client-Side Synchronization**: Multisynq applications are built on a client-side synchronized architecture. All application logic resides and executes on the client, eliminating the need for custom server-side code.
-   **Deterministic Virtual Machine (Teatime)**: The core of Multisynq is a deterministic JavaScript virtual machine. All code within a `Model` is executed inside this VM. The VM guarantees that given the same initial state and the same sequence of events, every client will produce the exact same resulting state. This is the foundation of the synchronization model.
-   **Reflector/Synchronizer Network**: The network consists of simple, stateless message-passing servers. Their sole responsibilities are:
    1.  To order events from all clients into a single, canonical stream.
    2.  To provide a unified, monotonous source of time (heartbeat ticks).
    Reflectors do not execute any application logic.
-   **Model-View Separation**: This is a strict architectural pattern.
    -   **Model**: Represents the shared, synchronized state of the application. It must be entirely self-contained and deterministic. It should not access any external state (e.g., DOM, `Date.now()`).
    -   **View**: Represents the local, non-synchronized part of the application. It handles all user input and output. It can read from the model but **must never** write to it directly. All changes to the model must be initiated via events.

## 2. In-Depth Feature Guides

### 2.1. Time Management

-   **Simulation Time vs. Wall-Clock Time**: It is crucial to distinguish between the two.
    -   **Simulation Time**: A discrete, virtual time that is synchronized across all clients. It only advances when the model processes an event or a heartbeat tick. All model logic should be based on this time.
    -   **Wall-Clock Time**: The local system time of the client. It is not synchronized and should not be used within the model.
-   **API**:
    -   **`model.now()`**: Returns the current simulation time in milliseconds. This value is constant during the execution of an event handler.
    -   **`model.future(ms)`**: Schedules a message to be executed `ms` milliseconds in the future, based on simulation time. This is the primary mechanism for creating game loops, animations, and other time-based logic within the model.
    -   **`tps` (Ticks Per Second)**: A parameter in `Session.join()` that configures the heartbeat rate of the reflector. This ensures that simulation time advances even when there are no user-generated events.

### 2.2. State Management

-   **Snapshots**:
    -   The Multisynq runtime automatically takes snapshots of the entire model state at regular intervals.
    -   When a new client joins a session, it receives the latest snapshot and all events that have occurred since that snapshot was taken. The client then replays these events to catch up to the current state.
    -   This process is transparent to the developer.
-   **Persistence API (`model.persistSession`)**:
    -   Used to persist data across different versions of the application code.
    -   When `persistSession` is called, the provided data is stored on the Multisynq network, associated with the session's `persistentId`.
    -   When a new session is created (i.e., the code has changed), the persisted data is passed as the second argument to the root model's `init` method.
    -   This is essential for production applications where you need to maintain user data across updates.
    -   **Best Practice**: Include a version number in your persisted data to handle data migrations in future versions of your app.

### 2.3. Data API

Used for handling large binary data (e.g., images, files) that should not be stored directly in the model state.

-   **Accessing the API**: The Data API is accessed through the `session` object returned by `Session.join()`.
-   **`session.data.store(data)`**: Uploads an `ArrayBuffer` to the Multisynq file server. Returns a `Promise<DataHandle>`.
-   **`session.data.fetch(handle)`**: Downloads data associated with a `DataHandle`. Returns a `Promise<ArrayBuffer>`.
-   **`DataHandle`**: An opaque, serializable object that acts as a reference to the stored data. It can be safely stored in a model.

#### 2.3.1. Data API: Practical Example

This example shows how a user can upload an image, have it be displayed to all participants, and have it persist in the session.

**View-Side: Uploading the File**

```javascript
// In your View class
constructor(model) {
    super(model);
    const fileInput = document.getElementById('file-input');
    fileInput.onchange = (evt) => this.handleFileSelect(evt);
}

async handleFileSelect(evt) {
    const file = evt.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();

    // Use the session object to access the Data API
    const handle = await this.session.data.store(buffer);

    // Publish the handle to the model
    this.publish("image", "new", { handle, type: file.type });
}
```

**Model-Side: Storing the Handle**

```javascript
// In your Model class
init() {
    this.imageHandle = null;
    this.imageType = null;
    this.subscribe("image", "new", this.onNewImage);
}

onNewImage({ handle, type }) {
    this.imageHandle = handle;
    this.imageType = type;
    // Notify all views of the change
    this.publish(this.id, "image-updated");
}
```

**View-Side: Displaying the Image**

```javascript
// In your View class
constructor(model) {
    super(model);
    this.model = model;
    this.subscribe(this.model.id, "image-updated", this.displayImage);
    // Display image on initial load if it exists
    if (this.model.imageHandle) {
        this.displayImage();
    }
}

async displayImage() {
    const handle = this.model.imageHandle;
    if (!handle) return;

    const buffer = await this.session.data.fetch(handle);
    const blob = new Blob([buffer], { type: this.model.imageType });
    const url = URL.createObjectURL(blob);

    const imgElement = document.getElementById('display-image');
    imgElement.src = url;
}
```

### 2.4. Security Model

-   **End-to-End Encryption**: All data transmitted between the client and the reflector network (events, snapshots, persisted data) is end-to-end encrypted using the session password.
-   **Password**: The session password is the key to the encryption. It should be treated as a secret. If the password is lost, the data cannot be recovered.

## 3. Advanced Topics & Best Practices

-   **View Smoothing & Interpolation**: To create smooth animations, the view should interpolate between model states. The model may update at a lower frequency (e.g., 20 TPS), while the view renders at a higher frequency (e.g., 60 FPS). The view should use the model's velocity and last known position to extrapolate the current position for rendering.
-   **Structuring Complex Applications**: For larger applications, use a hierarchy of nested models. The root model can create and manage child models using `Model.create()`.
-   **Performance Considerations**:
    -   **Event Throttling**: For high-frequency user input (e.g., mouse movement), throttle the events published from the view to avoid overwhelming the network.
    -   **`oncePerFrame` Subscriptions**: When subscribing to high-frequency model updates (e.g., position changes), use the `oncePerFrame` handling option to ensure the view only processes the latest event per frame.
    -   **Model Complexity**: The size and complexity of the model can affect snapshotting performance. For very large models, consider strategies to reduce the amount of data that needs to be snapshotted.
-   **Debugging Strategies**:
    -   Use the `debug` flags in `Session.join()` to enable console logging for various parts of the system.
    -   Divergence occurs when the state of two clients in the same session becomes different. This is usually caused by non-deterministic code in the model.

## 4. API Reference

### 4.1. `Session.join(parameters)`

| Parameter | Required | Description |
| :--- | :--- | :--- |
| `apiKey` | Yes | Your Multisynq API key. |
| `appId` | Yes | A unique, dot-separated identifier for your application. |
| `model` | Yes | The root model class for your application. |
| `view` | No | The root view class for your application. |
| `name` | No | The name of the session. Can be provided by `App.autoSession()`. |
| `password` | No | The password for the session (used for E2E encryption). Can be provided by `App.autoPassword()`. |
| `tps` | No | The number of heartbeat ticks per second (default: 20). |
| `autoSleep` | No | The number of seconds of inactivity before the session goes dormant (default: 10). |
| `rejoinLimit` | No | The time in milliseconds to wait before destroying the view after a disconnection (default: 1000). |
| `eventRateLimit` | No | The maximum number of events per second to send to the reflector (default: 20). |
| `viewData` | No | Custom data to be included in `view-join` and `view-exit` events. **This is how you associate an application-level `userId` with a `viewId`.** |
| `location` | No | Whether to include location data in `view-join` events. |

### 4.2. `App` Object & URL-Based Configuration

The `App` object provides utilities for managing session configuration via the URL, which is ideal for development and sharing.

-   **`App.autoSession()`**: This function returns a `Promise<string>` that resolves to a session name. It works by:
    1.  Looking for a `q` parameter in the URL's query string (e.g., `?q=my-session`).
    2.  If not found, it generates a new random string.
    3.  It then updates the URL in the address bar to include the session name, making it easy to share.
    **Usage**: `name: Multisynq.App.autoSession()` in `Session.join()`.

-   **`App.autoPassword()`**: This function returns a `Promise<string>` that resolves to a session password. It works by:
    1.  Looking for a `pw` parameter in the URL's hash (e.g., `#pw=my-secret`). The hash is used so the password is not sent to the server.
    2.  If not found, it generates a new random string.
    3.  It updates the URL hash, making the full session URL (with password) shareable.
    **Usage**: `password: Multisynq.App.autoPassword()` in `Session.join()`.

-   **`App.makeWidgetDock()`**: Creates a floating UI widget with a QR code for joining the session, as well as stats and debug controls.

### 4.3. User and View Identification

-   **`viewId`**: An automatically assigned, temporary identifier for a single client's connection to a session. If a user disconnects and reconnects, they may get a new `viewId`. It is the primary identifier in system events like `view-join`.
-   **`userId`**: An application-defined, persistent identifier for a user (e.g., a username, or a database ID). To associate a `userId` with a `viewId`, pass it in the `viewData` property of `Session.join()`:

    ```javascript
    Multisynq.Session.join({
      // ... other params
      viewData: { userId: "my-user-123", username: "Alice" }
    });
    ```

    The model will then receive this `viewData` object in the `view-join` event, allowing it to map the temporary `viewId` to the persistent `userId`.

### 4.4. System Events

-   **`"view-join"`**: Published to the model when a new user joins the session. The event data is the `viewId` of the joining user, or a `ViewInfo` object if `viewData` was provided.
-   **`"view-exit"`**: Published to the model when a user leaves the session.
-   **`"synced"`**: Published to the view when the local client has caught up with the simulation and is fully synchronized.
