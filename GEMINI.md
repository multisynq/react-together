# GEMINI.md Checkpoint

This document summarizes the key information and updates made to the `multisynq-react-llm.md` documentation, serving as a checkpoint for the AI assistant.

## Core Concepts and Architecture

The `react-together` library is built on `@multisynq/client` and simplifies the development of real-time, collaborative React applications. It adheres to the Model-View-Synchronizer (MVS) architecture:

-   **Models**: Handle all application logic, calculations, and simulations. They are deterministic and identical across all connected clients. Models are the single source of truth for shared state.
-   **Views**: Handle user input and output (UI rendering). Views are local to each client and can differ. They read from the Model but **must never directly write to it**.
-   **Events**: The primary means of communication. Views publish events (e.g., user input) to the Model, and the Model publishes events (e.g., state changes) to the Views. Events from View to Model are synchronized via a reflector.
-   **Time**: Models operate on a synchronized "simulation time" that advances deterministically, ensuring all models process events in the same order at the same virtual time.
-   **Snapshots**: The system periodically saves the Model's state. New clients joining an ongoing session load the latest snapshot and replay subsequent events to catch up.
-   **Determinism**: All Model code must be deterministic (e.g., `Math.random()` in a Model is synchronized). Avoid non-deterministic operations (like `Date.now()`, direct DOM access, or network calls) within Models.

## Session and User Identity

-   **`sessionId`**: A unique identifier for the shared session, consistent across all clients. Derived from `appId`, session `name`, and a hash of all registered Model code.
-   **`viewId`**: A unique identifier for the local client's connection to the session. Crucial for identifying individual users and scoping user-specific data or events.
-   **`view-join` event**: System-published event to the Model when a new client joins. The Model can subscribe to track connected users.
-   **`view-exit` event**: System-published event to the Model when a client leaves. The Model can subscribe to update its internal state.
-   **Nickname Management**: Typically handled within the Model, mapping `viewId`s to chosen or generated nicknames to ensure consistency across clients.

## API Reference Highlights

### Provider Component

-   **`<ReactTogether>`**: The root provider.
    -   `sessionParams`: Object containing `appId`, `apiKey`, `name`, `password`, `model`, `tps`, `autoSleep`, `rejoinLimit`, `eventRateLimit`, `viewData`, `debug` flags.
    -   `rememberUsers`: Boolean to persist user ID and nickname in local storage.

### Hooks

-   **`useStateTogether(rtKey, initialValue)`**: Synchronizes a single piece of state across all clients.
-   **`useStateTogetherWithPerUserValues(rtKey, initialValue)`**: Synchronizes state for each user individually.
-   **`useFunctionTogether(rtKey, callback)`**: Synchronizes a function call across all clients.
-   **`useSession()`**: Returns the current Multisynq session object.
-   **`useSessionId()`**: Returns the ID of the current Multisynq session.
-   **`useSetSession()`**: Returns a function to dynamically change session parameters.
-   **`useLeaveSession()`**: Returns a function to explicitly leave the current session.
-   **`useModelRoot()`**: Returns a reference to the root Model instance (non-reactive).
-   **`useReactModelRoot()`**: Provides a reactive proxy to the root Model instance (triggers re-renders).
-   **`useModelSelector(selector)`**: Selects a specific part of the Model state for optimized re-renders.
-   **`usePublish(callback)`**: Returns a function to publish an event from View to Model/Views.
-   **`useSubscribe(scope, eventName, callback, handling)`**: Subscribes a React component to a Multisynq event.
-   **`useViewId()`**: Returns the `viewId` of the current client.
-   **`useIsJoined()`**: Returns `true` if connected to a session.
-   **`useJoinedViews()`**: Returns information about all connected clients.
-   **`useDetachCallback(callback)`**: Registers a callback when the View is detached.
-   **`useSyncedCallback(callback)`**: Registers a callback when synchronization status changes.
-   **`useUpdateCallback(callback)`**: Registers a callback at each simulation cycle.
-   **`useView()`**: Returns the underlying Multisynq `View` instance.

### Components

-   **`Chat`**: Ready-to-use chat component.
-   **`Cursors`**: Displays cursors of all connected users.
-   **`ConnectedUsers`**: Displays avatars of connected users.
-   **`HoverHighlighter`**: Highlights children when any user hovers.
-   **`SessionManager`**: Provides UI for session management.
-   **`QRCodeDisplay`**: Displays a QR code for the current session URL.
-   **`LoadingSpinner`**: Customizable loading spinner for synchronization status.

## Advanced: Custom Model Logic

Custom Model classes (extending `ReactTogetherModel`) are used for complex rules, calculations, time-based events, persistence, custom serialization, and tracking `view-join`/`view-exit` events.

-   **`init(options, persistentData)`**: Called once for new Model instances; initializes state, subscriptions, `future` messages.
-   **`register(classId)`**: Static method; registers Model class for serialization.
-   **`create(options)`**: Static method; creates sub-Model instances.
-   **`destroy()`**: Removes Model instance from simulation and snapshots.
-   **`publish(scope, event, data)`**: Publishes events from Model to other Models/Views.
-   **`subscribe(scope, event, handler)`**: Registers Model handler for events.
-   **`future(tOffset)`**: Schedules method calls in Model's simulation time.
-   **`cancelFuture(methodOrMessage)`**: Cancels scheduled `future` messages.
-   **`random()`**: Generates synchronized pseudo-random numbers.
-   **`now()`**: Returns Model's current simulation time.
-   **`persistSession(collectDataFunc)`**: Stores application-defined JSON data for long-term persistence.
-   **`types()`**: Static method; defines serialization for non-Model classes.
-   **`wellKnownModel(name)`**: Accesses globally registered Models.
-   **`modelOnly(msg)`**: Throws error if called from outside Model code.

## Data API for Bulk Storage

-   **`session.data.store(data, options)`**: Uploads `ArrayBuffer` data, returns `DataHandle`.
-   **`session.data.fetch(dataHandle)`**: Fetches data from `DataHandle`.
-   **`session.data.toId(handle)`**: Converts `DataHandle` to serializable string ID.
-   **`session.data.fromId(id)`**: Reconstructs `DataHandle` from string ID.

## UI Feedback and Loading Animations

-   **`LoadingSpinner` component**: Customizable spinner for synchronization.
-   **`App.showSyncWait(bool)`**: Direct `@multisynq/client` API to control default spinner.
-   **`App.showMessage(msg, options)`**: Displays toast notifications.

## Session Sharing and QR Codes

-   **`QRCodeDisplay` component**: Displays a QR code for the current session URL.
-   **`App.makeQRCanvas(options)`**: Direct `@multisynq/client` API to generate QR code canvas.
-   **`App.makeWidgetDock(options)`**: Creates a default collapsible UI dock with session info.

## Debugging and Diagnostics

Various debug flags (`session`, `messages`, `sends`, `snapshot`, `data`, `hashing`, `subscribe`, `publish`, `classes`, `ticks`, `write`, `offline`) can be enabled via `sessionParams.debug` or URL parameters.
