<documentation>
    <metadata>
        <library>react-together</library>
        <version>latest</version>
        <purpose>A comprehensive guide for an AI assistant on building real-time, collaborative React applications using the `react-together` library, which is built on top of `@multisynq/client`.</purpose>
    </metadata>

    <instructions>
        <role>
            You are an expert web application builder specializing in real-time, multi-user experiences with Multisynq and React. Your primary function is to generate complete, elegant, and executable React applications. You should be enthusiastic, helpful, and precise in your execution.
        </role>
        <initialization>
            <if condition="user_has_not_specified_app_idea">
                <step>Suggest 2-4 creative, fun, multi-user app ideas.</step>
            </if>
            <if condition="user_has_not_provided_api_key">
                <step>Prompt the user to get a free API key from https://multisynq.io/coder.</step>
            </if>
        </initialization>
        <output_format>
            <format type="react">
                <instruction>Generate a single, standalone React component (JSX/TSX) with all necessary dependencies imported from a CDN. The component should be fully functional and ready to run.</instruction>
            </format>
        </output_format>
        <style_guide>
            <framework>TailwindCSS</framework>
            <import_method>Import via CDN: `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`</import_method>
            <guideline>Use TailwindCSS classes as the primary styling method.</guideline>
            <guideline>For React components, use inline style objects for dynamic styles, not CSS strings.</guideline>
            <guideline>Design for mobile-first, responsive layouts.</guideline>
        </style_guide>
    </instructions>

    <setup>
        <title>Setup and Initialization</title>
        <installation>
            <method type="npm">
                <command>npm install react-together@latest</command>
                <import_example>import { ReactTogether, useStateTogether } from 'react-together';</import_example>
            </method>
            <method type="cdn">
                <import_example>import { ReactTogether } from 'https://cdn.jsdelivr.net/npm/react-together@latest/+esm';</import_example>
            </method>
        </installation>
    </setup>

    <concepts>
        <title>Core Multisynq Concepts for AI Context</title>
        <explanation>
            `react-together` is a high-level React library that simplifies building real-time, collaborative applications. It is built on `@multisynq/client` and abstracts away much of the session management and boilerplate code. For most common use cases, `react-together` is sufficient. For more complex applications with custom, state-dependent logic, you may need to use a custom `ReactTogetherModel`.

            At its core, Multisynq operates on a Model-View-Synchronizer (MVS) architecture:
            - **Models**: Handle all application logic, calculations, and simulations. They are deterministic and guaranteed to be identical across all connected clients in a session. Models are the single source of truth for shared state.
            - **Views**: Handle user input and output (UI rendering). Views are local to each client and can differ. They read from the Model but *must never directly write to it*.
            - **Events**: The primary means of communication. Views publish events (e.g., user input) to the Model, and the Model publishes events (e.g., state changes) to the Views. Events from View to Model are synchronized via a reflector.
            - **Time**: Models operate on a synchronized "simulation time" that advances deterministically. This ensures all models process events in the same order at the same virtual time.
            - **Snapshots**: The system periodically saves the Model's state as snapshots. New clients joining an ongoing session load the latest snapshot and replay subsequent events to catch up.
            - **Determinism**: A fundamental principle. All Model code must be deterministic (e.g., `Math.random()` in a Model is synchronized). Avoid non-deterministic operations (like `Date.now()`, direct DOM access, or network calls) within Models.
        </explanation>
        <session_identity>
            <title>Session and User Identity</title>
            <description>
                Every Multisynq application runs within a session, identified by a unique `sessionId`. This ID is derived from the `appId`, session `name`, and a hash of all registered Model code. This ensures that only clients running the exact same application code can join the same session, preventing divergence.
                Each connected user (or browser tab) within a session is assigned a unique `viewId`. This `viewId` is crucial for identifying individual users and scoping user-specific data or events within the shared Model.
            </description>
            <properties>
                <property name="sessionId" type="string">
                    <description>A unique identifier for the shared session, consistent across all clients in that session. Accessible via `useSessionId()` hook or `Model.sessionId`.</description>
                </property>
                <property name="viewId" type="string">
                    <description>A unique identifier for the local client's connection to the session. This is consistent for a single user across different Models/Views on their device. Accessible via `useViewId()` hook or `View.viewId`.</description>
                </property>
            </properties>
            <events>
                <event name="view-join">
                    <description>Published by the system to the Model when a new client joins the session. The Model can subscribe to this event (e.g., `this.subscribe(this.sessionId, "view-join", this.handleNewUser)`) to track connected users. The event payload typically includes the `viewId` and optionally `viewData` (from `Session.join` parameters) or location information.</description>
                </event>
                <event name="view-exit">
                    <description>Published by the system to the Model when a client leaves the session. The Model can subscribe to this event (e.g., `this.subscribe(this.sessionId, "view-exit", this.handleUserExit)`) to update its internal state regarding active users.</description>
                </event>
            </events>
            <nickname_management>
                <description>
                    User nicknames are typically managed within the Model, mapping `viewId`s to chosen or generated nicknames. This ensures consistency across all clients.
                </description>
                <example>
                    ```typescript
                    // Example in a custom Model
                    class ChatModel extends ReactTogetherModel {
                        users: Map<string, string>; // Map<viewId, nickname>

                        init() {
                            super.init({});
                            this.users = new Map();
                            this.subscribe(this.sessionId, "view-join", this.handleViewJoin);
                            this.subscribe(this.sessionId, "view-exit", this.handleViewExit);
                        }

                        handleViewJoin(viewId: string, viewInfo?: any) {
                            if (!this.users.has(viewId)) {
                                const nickname = this.generateRandomNickname(); // Your logic to generate/assign nickname
                                this.users.set(viewId, nickname);
                            }
                            // Publish an event to notify Views about user list change
                            this.publish(this.sessionId, "user-list-changed", Array.from(this.users.values()));
                        }

                        handleViewExit(viewId: string) {
                            this.users.delete(viewId);
                            this.publish(this.sessionId, "user-list-changed", Array.from(this.users.values()));
                        }

                        generateRandomNickname(): string {
                            // ... (implementation using this.random())
                            return "User" + Math.floor(this.random() * 100);
                        }
                    }
                    ChatModel.register('ChatModel');
                    ```
                </example>
            </nickname_management>
        </session_identity>
    </concepts>

    <api>
        <title>API Reference</title>
        <provider>
            <component name="ReactTogether">
                <description>The root provider that enables all `react-together` functionality. It should wrap the parts of your application that require real-time collaboration. This component internally manages the Multisynq session lifecycle.</description>
                <props>
                    <prop name="sessionParams" type="object" required="true">
                        <description>
                            An object containing parameters for `Session.join()` from `@multisynq/client`.
                            Key parameters include:
                            - `appId` (string, required): A unique identifier for your application (e.g., "com.example.myapp").
                            - `apiKey` (string, required): Your API key from multisynq.io/coder.
                            - `name` (string, optional): The session name. If omitted or `undefined`, `App.randomSession()` will generate one.
                            - `password` (string, optional): The session password for end-to-end encryption. If omitted or `undefined`, `App.randomPassword()` will generate one.
                            - `model` (ReactTogetherModel, optional): Your root Model class. If using `useStateTogether` or `useFunctionTogether` without a custom model, `react-together` provides a default internal model.
                            - `tps` (number, optional): Ticks per second for heartbeat messages (default: 20).
                            - `autoSleep` (number | boolean, optional): Seconds of inactivity before going dormant (default: 10s).
                            - `rejoinLimit` (number, optional): Milliseconds to attempt seamless rejoin after disconnection (default: 1000ms).
                            - `eventRateLimit` (number, optional): Max events per second sent to reflector (default: 20).
                            - `viewData` (any, optional): Custom data sent with `view-join` event.
                            - `debug` (string | string[], optional): Comma-separated list of debug flags (e.g., "session", "snapshot", "messages").
                        </description>
                    </prop>
                    <prop name="rememberUsers" type="boolean" default="false">
                        <description>If `true`, the user's ID and nickname will be persisted in local storage.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { ReactTogether } from 'react-together';

                    function App() {
                      return (
                        <ReactTogether
                          sessionParams={{
                            appId: 'your-app-id',
                            apiKey: 'your-api-key',
                            name: 'my-shared-session', // Explicitly set session name
                            password: 'my-secret-password', // Explicitly set password
                            model: MyCustomRootModel, // Optional: if you have a custom root model
                            debug: 'session,messages', // Enable session and message logging
                          }}
                          rememberUsers={true}
                        >
                          {/* Your application components */}
                        </ReactTogether>
                      );
                    }
                    ```
                </example>
            </component>
        </provider>

        <hooks>
            <hook name="useStateTogether">
                <signature>useStateTogether&lt;T&gt;(rtKey: string, initialValue: T, options?: UseStateTogetherOptions)</signature>
                <description>Synchronizes a single piece of state across all clients. Changes made by any client are reflected in real-time for everyone.</description>
                <example>
                    ```tsx
                    import { useStateTogether } from 'react-together';

                    function SharedCounter() {
                      const [count, setCount] = useStateTogether('counter', 0);
                      return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useStateTogetherWithPerUserValues">
                <signature>useStateTogetherWithPerUserValues&lt;T&gt;(rtKey: string, initialValue: T, options?: UseStateTogetherWithPerUserValuesOptions)</signature>
                <description>Synchronizes a piece of state for each user individually. Each user sees their own value, and can also access the values of other users.</description>
                <example>
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
                </example>
            </hook>
            <hook name="useFunctionTogether">
                <signature>useFunctionTogether&lt;T&gt;(rtKey: string, callback: T)</signature>
                <description>Synchronizes a function call across all clients. When the returned function is invoked by one client, the `callback` is executed on all connected clients' Models.</description>
                <example>
                    ```tsx
                    import { useFunctionTogether } from 'react-together';
                    import { useCallback } from 'react';

                    function GlobalAlerter() {
                      const alertEveryone = useFunctionTogether('global-alert', useCallback((message: string) => {
                        alert(message); // This alert will pop up on all connected clients
                      }, []));

                      return <button onClick={() => alertEveryone('Hello, everyone!')}>Alert All</button>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useSession">
                <signature>useSession&lt;M extends ReactTogetherModel&gt;(): MultisynqSession&lt;MultisynqReactView&lt;M&gt;&gt; | null</signature>
                <description>Returns the current Multisynq session object. This object provides access to session-level properties and methods, including the Data API.</description>
                <example>
                    ```tsx
                    import { useSession } from 'react-together';

                    function SessionInfo() {
                      const session = useSession();
                      if (session) {
                        return <p>Session ID: {session.id}</p>;
                      }
                      return <p>Not connected to a session.</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useSessionId">
                <signature>useSessionId(): string | null</signature>
                <description>Returns the ID of the current Multisynq session. This is a convenience hook for `useSession().id`.</description>
                <example>
                    ```tsx
                    import { useSessionId } from 'react-together';

                    function SessionDisplay() {
                      const sessionId = useSessionId();
                      return <p>Current Session: {sessionId || 'N/A'}</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useSetSession">
                <signature>useSetSession&lt;M extends ReactTogetherModel&gt;(): (params: Partial&lt;SessionParameters&lt;M&gt;&gt;) => void</signature>
                <description>Returns a function to dynamically change the current Multisynq session's parameters (e.g., `name`, `password`). This will cause the client to leave the current session and join a new one with the updated parameters.</description>
                <example>
                    ```tsx
                    import { useSetSession } from 'react-together';

                    function SessionSwitcher() {
                      const setSession = useSetSession();
                      return (
                        <button onClick={() => setSession({ name: 'new-room', password: 'new-secret' })}>
                          Join New Room
                        </button>
                      );
                    }
                    ```
                </example>
            </hook>
            <hook name="useLeaveSession">
                <signature>useLeaveSession(): () => Promise&lt;boolean&gt;</signature>
                <description>Returns a function to explicitly leave the current Multisynq session. This will disconnect the client from the shared session.</description>
                <example>
                    ```tsx
                    import { useLeaveSession } from 'react-together';

                    function DisconnectButton() {
                      const leaveSession = useLeaveSession();
                      return (
                        <button onClick={() => leaveSession()}>
                          Leave Session
                        </button>
                      );
                    }
                    ```
                </example>
            </hook>
            <hook name="useModelRoot">
                <signature>useModelRoot&lt;M extends ReactTogetherModel&gt;(): M | null</signature>
                <description>Returns a _reference_ to the root Model instance of the current Multisynq session. Use this when you need direct access to the root model object. Note that changes to the model's properties will not automatically trigger React re-renders; for reactive updates, consider `useReactModelRoot` or `useModelSelector`.</description>
                <example>
                    ```tsx
                    import { useModelRoot } from 'react-together';

                    function GameStateDisplay() {
                      const gameModel = useModelRoot();
                      if (gameModel) {
                        return <p>Game Status: {gameModel.status}</p>; // Accessing a property directly
                      }
                      return null;
                    }
                    ```
                </example>
            </hook>
            <hook name="useReactModelRoot">
                <signature>useReactModelRoot&lt;M extends ReactTogetherModel&gt;(): M | null</signature>
                <description>Provides a reactive proxy to the root Model instance. Any changes to the model's properties will trigger a re-render of components using this hook. This is generally preferred for displaying model state in React components.</description>
                <example>
                    ```tsx
                    import { useReactModelRoot } from 'react-together';

                    function ScoreDisplay() {
                      const model = useReactModelRoot();
                      if (model) {
                        return <p>Score: {model.score}</p>; // This component will re-render when `model.score` changes
                      }
                      return null;
                    }
                    ```
                </example>
            </hook>
            <hook name="useModelSelector">
                <signature>useModelSelector&lt;M extends ReactTogetherModel, R&gt;(selector: (model: M) => R): R | null</signature>
                <description>Selects and returns a specific part of the Model state. This hook optimizes re-renders by only updating when the *selected data* changes (using deep equality comparison). Use this for fine-grained control over re-rendering.</description>
                <example>
                    ```tsx
                    import { useModelSelector } from 'react-together';

                    function PlayerNameDisplay() {
                      const playerName = useModelSelector(model => model.currentPlayer.name);
                      return <p>Current Player: {playerName}</p>; // Only re-renders if the player's name changes
                    }
                    ```
                </example>
            </hook>
            <hook name="usePublish">
                <signature>usePublish&lt;T&gt;(callback: (data: T) => [string, string, T]): (data: T) => void</signature>
                <description>Returns a function to publish an event from the View to the Model (and other Views). The `callback` defines the event's `scope`, `name`, and `data` based on the input `data`.</description>
                <example>
                    ```tsx
                    import { usePublish } from 'react-together';

                    function PlayerInput() {
                      const publishMove = usePublish(moveData => ['game', 'player-move', moveData]);
                      return (
                        <button onClick={() => publishMove({ x: 10, y: 20 })}>
                          Move Player
                        </button>
                      );
                    }
                    ```
                </example>
            </hook>
            <hook name="useSubscribe">
                <signature>useSubscribe&lt;T&gt;(scope: string, eventName: string, callback: (data: T) => void, handling?: "queued" | "oncePerFrame" | "immediate"): void</signature>
                <description>Subscribes a React component to a Multisynq event. The `callback` is invoked when the event is published. `handling` controls when the callback is executed: "queued" (default, all events), "oncePerFrame" (only latest event per frame), "immediate" (synchronous execution).</description>
                <example>
                    ```tsx
                    import { useSubscribe } from 'react-together';
                    import { useState } from 'react';

                    function MessageLog() {
                      const [messages, setMessages] = useState<string[]>([]);
                      useSubscribe<string>('chat', 'new-message', (message) => {
                        setMessages(prev => [...prev, message]);
                      });
                      return (
                        <ul>
                          {messages.map((msg, i) => <li key={i}>{msg}</li>)}
                        </ul>
                      );
                    }
                    ```
                </example>
            </hook>
            <hook name="useViewId">
                <signature>useViewId(): string | null</signature>
                <description>Returns the `viewId` of the current client. Useful for identifying the local user in shared contexts.</description>
                <example>
                    ```tsx
                    import { useViewId } from 'react-together';

                    function MyUserCard() {
                      const myViewId = useViewId();
                      return <p>My ID: {myViewId}</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useIsJoined">
                <signature>useIsJoined(): boolean</signature>
                <description>Returns `true` if the component is currently connected to a Multisynq session, `false` otherwise.</description>
                <example>
                    ```tsx
                    import { useIsJoined } from 'react-together';

                    function ConnectionStatus() {
                      const isJoined = useIsJoined();
                      return <p>Status: {isJoined ? 'Connected' : 'Disconnected'}</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useJoinedViews">
                <signature>useJoinedViews(): { viewIds: string[]; viewInfos: { [viewId: string]: any }; viewCount: number; }</signature>
                <description>Returns information about all clients currently connected to the session, including their `viewId`s and any associated `viewData`.</description>
                <example>
                    ```tsx
                    import { useJoinedViews } from 'react-together';

                    function ActiveUsers() {
                      const { viewIds, viewCount } = useJoinedViews();
                      return (
                        <div>
                          <p>Active Users: {viewCount}</p>
                          <ul>
                            {viewIds.map(id => <li key={id}>{id}</li>)}
                          </ul>
                        </div>
                      );
                    }
                    ```
                </example>
            </hook>
            <hook name="useDetachCallback">
                <signature>useDetachCallback(callback: () => void): void</signature>
                <description>Registers a callback function to be executed when the Multisynq View is detached (e.g., when the session goes dormant or is explicitly left). Useful for cleanup of local resources.</description>
                <example>
                    ```tsx
                    import { useDetachCallback } from 'react-together';

                    function MyComponent() {
                      useDetachCallback(() => {
                        console.log('View detached! Cleaning up local resources...');
                        // Perform cleanup here
                      });
                      return <p>Component active.</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useSyncedCallback">
                <signature>useSyncedCallback(callback: (isSynced: boolean) => void): void</signature>
                <description>Registers a callback function to be executed when the Multisynq View's synchronization status changes. The `isSynced` boolean indicates whether the client is caught up with the Model's simulation time.</description>
                <example>
                    ```tsx
                    import { useSyncedCallback } from 'react-together';
                    import { useState } from 'react';

                    function SyncStatusIndicator() {
                      const [synced, setSynced] = useState(false);
                      useSyncedCallback((isSynced) => {
                        setSynced(isSynced);
                        console.log(`Synchronization status: ${isSynced ? 'Synced' : 'Catching up...'}`);
                      });
                      return <p>Sync: {synced ? '✅' : '⏳'}</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useUpdateCallback">
                <signature>useUpdateCallback(callback: (time: number) => void): void</signature>
                <description>Registers a callback function to be executed at each simulation cycle (typically 60 times per second). The `time` parameter is the current animation frame timestamp. Useful for continuous animations or UI updates that need to be synchronized with the Model's progression.</description>
                <example>
                    ```tsx
                    import { useUpdateCallback } from 'react-together';
                    import { useRef } from 'react';

                    function AnimationFrameCounter() {
                      const frameCount = useRef(0);
                      useUpdateCallback((time) => {
                        frameCount.current++;
                        // console.log(`Frame: ${frameCount.current}, Time: ${time}`);
                      });
                      return <p>Animation running...</p>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useView">
                <signature>useView&lt;V extends MultisynqReactView&lt;any&gt;&gt;(): V | null</signature>
                <description>Returns the underlying Multisynq `View` instance. This is the low-level view object that interacts directly with the Multisynq client library. Use this for advanced scenarios where direct `View` methods are needed (e.g., `View.now()`, `View.externalNow()`, `View.extrapolatedNow()`).</description>
                <example>
                    ```tsx
                    import { useView } from 'react-together';

                    function ViewTimeDisplay() {
                      const view = useView();
                      if (view) {
                        return <p>Current View Time: {view.now()}</p>;
                      }
                      return null;
                    }
                    ```
                </example>
            </hook>
        </hooks>

        <components>
            <component name="Chat">
                <description>A ready-to-use chat component. It handles user input, displays messages, and manages user nicknames within the session.</description>
                <props>
                    <prop name="rtKey" type="string" required="true">
                        <description>A unique key for this chat instance, used for state synchronization.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { Chat } from 'react-together';

                    function MyChat() {
                      return <Chat rtKey="global-chat" />;
                    }
                    ```
                </example>
            </component>
            <component name="Cursors">
                <description>Displays the cursors of all connected users in real-time. This component automatically tracks mouse movements and renders a visual representation for each user's cursor.</description>
                <example>
                    ```tsx
                    import { Cursors } from 'react-together';

                    function CollaborativeCanvas() {
                      return (
                        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                          <Cursors />
                          {/* Your canvas content */}
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
            <component name="ConnectedUsers">
                <description>Displays the avatars (or simple representations) of all connected users in the session. It can show user IDs or nicknames if managed by the Model.</description>
                <example>
                    ```tsx
                    import { ConnectedUsers } from 'react-together';

                    function Header() {
                      return (
                        <header className="flex items-center space-x-4">
                          <h1 className="text-2xl font-bold">My App</h1>
                          <ConnectedUsers />
                        </header>
                      );
                    }
                    ```
                </example>
            </component>
            <component name="HoverHighlighter">
                <description>A wrapper component that highlights its children when any user hovers over it. Useful for indicating shared focus or interaction points.</description>
                <props>
                    <prop name="rtKey" type="string" required="true">
                        <description>A unique key for this hover highlighter instance.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { HoverHighlighter } from 'react-together';

                    function SharedButton() {
                      return (
                        <HoverHighlighter rtKey="shared-button">
                          <button className="p-4 bg-blue-500 text-white rounded">Hover over me!</button>
                        </HoverHighlighter>
                      );
                    }
                    ```
                </example>
            </component>
            <component name="SessionManager">
                <description>Provides a UI for managing the session (create, join, leave). This component offers a convenient way for users to control their session connection without custom UI development.</description>
                <example>
                    ```tsx
                    import { SessionManager } from 'react-together';

                    function AppControls() {
                      return <SessionManager />;
                    }
                    ```
                </example>
            </component>
            <component name="QRCodeDisplay">
                <description>Displays a QR code for the current session URL, allowing easy sharing and joining of sessions via mobile devices. This component leverages the underlying `@multisynq/client`'s QR code generation capabilities.</description>
                <props>
                    <prop name="size" type="number" default="128">
                        <description>The width and height of the QR code in pixels.</description>
                    </prop>
                    <prop name="colorDark" type="string" default="#000000">
                        <description>The color of the dark modules of the QR code.</description>
                    </prop>
                    <prop name="colorLight" type="string" default="#ffffff">
                        <description>The color of the light modules of the QR code.</description>
                    </prop>
                    <prop name="correctLevel" type="string" default="L">
                        <description>The error correction level of the QR code (L, M, Q, H).</description>
                    </prop>
                    <prop name="className" type="string" optional="true">
                        <description>Additional CSS classes for styling the container div.</description>
                    </prop>
                    <prop name="style" type="object" optional="true">
                        <description>Inline style object for the container div.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { QRCodeDisplay } from 'react-together';

                    function ShareSession() {
                      return (
                        <div className="p-4 bg-white rounded shadow">
                          <h2 className="text-lg font-semibold mb-2">Scan to Join</h2>
                          <QRCodeDisplay size={200} colorDark="#333333" />
                          <p className="text-sm mt-2">Share this QR code with others!</p>
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
            <component name="LoadingSpinner">
                <description>A customizable loading spinner component that indicates when the Multisynq session is synchronizing or catching up. This component wraps the underlying `@multisynq/client`'s synchronization wait UI.</description>
                <props>
                    <prop name="message" type="string" default="Catching up...">
                        <description>The message displayed below the spinner.</description>
                    </prop>
                    <prop name="className" type="string" optional="true">
                        <description>Additional CSS classes for styling the overlay div.</description>
                    </prop>
                    <prop name="style" type="object" optional="true">
                        <description>Inline style object for the overlay div.</description>
                    </prop>
                    <prop name="spinnerColor" type="string" default="#ffffff">
                        <description>The color of the spinner animation.</description>
                    </prop>
                    <prop name="overlayColor" type="string" default="#333333">
                        <description>The background color of the overlay.</description>
                    </prop>
                    <prop name="opacity" type="number" default="0.9">
                        <description>The opacity of the overlay (0 to 1).</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { LoadingSpinner } from 'react-together';
                    import { useIsJoined } from 'react-together';

                    function AppWithLoading() {
                      const isJoined = useIsJoined();
                      return (
                        <div>
                          {!isJoined && (
                            <LoadingSpinner message="Connecting to the shared world..." spinnerColor="#00ff00" overlayColor="#000000" />
                          )}
                          {/* Your main application content */}
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
        </components>
    </api>

    <advanced>
        <title>Advanced: Custom Model Logic</title>
        <explanation>
            While `react-together` provides convenient hooks for common shared state patterns, there are scenarios where you need more control over the Model's behavior. This is where custom Model classes come in.
        </explanation>
        <when_to_use>
            <reason>When you need to enforce complex rules or constraints on the shared state (e.g., game logic, business rules).</reason>
            <reason>When you need to perform calculations on the Model side that depend on the current state or historical events.</reason>
            <reason>When you need to use the `future()` messaging system for time-based events or scheduled actions.</reason>
            <reason>When you need to manage persistent data across different code versions using `persistSession()`.</reason>
            <reason>When you need to define custom serialization for non-Model objects stored within your Model using `Model.types()`.</reason>
            <reason>When you need to track `view-join` and `view-exit` events for custom user management.</reason>
        </when_to_use>
        <how_to_use>
            <step>Create a new model class that extends `ReactTogetherModel` (from `react-together`). This class is a wrapper around `@multisynq/client`'s `Model` and provides additional React-specific integrations.</step>
            <step>Implement your custom logic, state, and event handlers within this class.</step>
            <step>Register your model using `MyModel.register('MyModel')` to enable serialization and session ID hashing.</step>
            <step>Pass your custom root model to the `<ReactTogether />` provider via the `sessionParams.model` prop.</step>
        </how_to_use>
        <model_lifecycle>
            <title>Model Lifecycle and Core Methods</title>
            <method name="init(options?: object, persistentData?: any)">
                <description>
                    Called only once when a new Model instance is first created for a session. This is where you initialize the Model's state, set up subscriptions, and schedule initial `future` messages.
                    If `persistSession()` was used in a previous session with the same `appId` and `name`, `persistentData` will contain the saved data.
                    **Do not use a constructor for Model classes; use `init()` instead.**
                </description>
                <example>
                    ```typescript
                    class MyRootModel extends ReactTogetherModel {
                      init(options: any, persisted?: any) {
                        super.init(options);
                        this.counter = persisted?.initialCounter || 0;
                        this.subscribe(this.id, 'increment', this.handleIncrement);
                        this.future(1000).tick(); // Start a recurring tick
                      }
                      // ...
                    }
                    ```
                </example>
            </method>
            <method name="register(classId: string)">
                <description>
                    **Static method**: Must be called for every custom Model class you define. It registers the class with Multisynq, enabling proper serialization and deserialization from snapshots. The `classId` is a unique string identifier for your model class.
                </description>
                <example>
                    ```typescript
                    class MyCustomModel extends ReactTogetherModel { /* ... */ }
                    MyCustomModel.register('MyCustomModel');
                    ```
                </example>
            </method>
            <method name="create(options?: object)">
                <description>
                    **Static method**: Used to create instances of sub-Models within your Model hierarchy. Do not use `new` for Model instances.
                </description>
                <example>
                    ```typescript
                    class ParentModel extends ReactTogetherModel {
                      child: ChildModel;
                      init() {
                        super.init({});
                        this.child = ChildModel.create({ initialValue: 10 });
                      }
                    }
                    class ChildModel extends ReactTogetherModel { /* ... */ }
                    ChildModel.register('ChildModel');
                    ```
                </example>
            </method>
            <method name="destroy()">
                <description>
                    Removes the Model instance from the simulation and future snapshots. It also unsubscribes all its handlers and cancels future messages. Call this when a sub-Model is no longer needed to prevent memory leaks.
                </description>
                <example>
                    ```typescript
                    class GameModel extends ReactTogetherModel {
                      players: Map<string, PlayerModel>;
                      removePlayer(playerId: string) {
                        const player = this.players.get(playerId);
                        if (player) {
                          player.destroy(); // Clean up the player model
                          this.players.delete(playerId);
                        }
                      }
                    }
                    ```
                </example>
            </method>
            <method name="publish(scope: string, event: string, data?: any)">
                <description>
                    Publishes an event from the Model. This event can be subscribed to by other Models (local, synchronous execution) or Views (asynchronous, reflected execution). `data` must be serializable if intended for Views.
                </description>
                <example>
                    ```typescript
                    class GameModel extends ReactTogetherModel {
                      updateScore(newScore: number) {
                        this.score = newScore;
                        this.publish('game', 'score-updated', newScore); // Notify views
                      }
                    }
                    ```
                </example>
            </method>
            <method name="subscribe(scope: string, event: string, handler: Function | string)">
                <description>
                    Registers a handler method within the Model to respond to published events. The `handler` can be a reference to a method (e.g., `this.myMethod`) or its string name.
                </description>
                <example>
                    ```typescript
                    class PlayerModel extends ReactTogetherModel {
                      init() {
                        super.init({});
                        this.subscribe('game', 'player-move', this.handlePlayerMove);
                      }
                      handlePlayerMove(data: { x: number, y: number }) {
                        this.position = data;
                      }
                    }
                    ```
                </example>
            </method>
            <method name="future(tOffset: number): this">
                <description>
                    Schedules a method call to occur `tOffset` milliseconds in the Model's simulation time. This is the primary mechanism for time-based logic and animations within Models. Returns a proxy that allows chaining method calls (e.g., `this.future(100).myMethod(arg1, arg2)`).
                </description>
                <example>
                    ```typescript
                    class TimerModel extends ReactTogetherModel {
                      init() {
                        super.init({});
                        this.elapsedTime = 0;
                        this.future(100).tick(); // Start a timer
                      }
                      tick() {
                        this.elapsedTime += 100;
                        this.publish(this.id, 'time-updated', this.elapsedTime);
                        this.future(100).tick(); // Reschedule for next tick
                      }
                    }
                    ```
                </example>
            </method>
            <method name="cancelFuture(methodOrMessage: Function | object | '*')">
                <description>
                    Cancels a previously scheduled `future` message. Can take the method reference, the object returned by `future()`, or `'*'` to cancel all future messages for the current Model.
                </description>
                <example>
                    ```typescript
                    class AnimationModel extends ReactTogetherModel {
                      animationRunning: boolean;
                      startAnimation() {
                        this.animationRunning = true;
                        this.future(50).animateFrame();
                      }
                      stopAnimation() {
                        this.animationRunning = false;
                        this.cancelFuture(this.animateFrame); // Cancel the scheduled animation
                      }
                      animateFrame() {
                        if (this.animationRunning) {
                          // ... animation logic ...
                          this.future(50).animateFrame();
                        }
                      }
                    }
                    ```
                </example>
            </method>
            <method name="random(): number">
                <description>
                    Generates a synchronized pseudo-random number (0-1). This ensures that `random()` calls within the Model produce the same sequence across all clients, maintaining determinism. **Always use `this.random()` instead of `Math.random()` in Model code.**
                </description>
                <example>
                    ```typescript
                    class DiceModel extends ReactTogetherModel {
                      rollDice() {
                        const result = Math.floor(this.random() * 6) + 1;
                        this.publish('dice', 'rolled', result);
                      }
                    }
                    ```
                </example>
            </method>
            <method name="now(): number">
                <description>
                    Returns the Model's current simulation time in milliseconds. This time advances deterministically with events and ticks.
                </description>
                <example>
                    ```typescript
                    class EventLoggerModel extends ReactTogetherModel {
                      logEvent(message: string) {
                        console.log(`[${this.now()}] ${message}`);
                      }
                    }
                    ```
                </example>
            </method>
            <method name="persistSession(collectDataFunc: () => any)">
                <description>
                    Stores application-defined JSON data for long-term persistence. This data can be loaded into a new session (with the same `appId` and `name`) even if the Model code has changed. The `collectDataFunc` should return a serializable JSON object.
                </description>
                <example>
                    ```typescript
                    class EditorModel extends ReactTogetherModel {
                      content: string;
                      saveContent() {
                        this.persistSession(() => ({
                          version: 1,
                          text: this.content,
                          lastSaved: this.now(),
                        }));
                      }
                    }
                    ```
                </example>
            </method>
            <method name="types(): object">
                <description>
                    **Static method**: Used to define how non-Model JavaScript classes (e.g., custom data structures, classes from external libraries) should be serialized and deserialized when stored within a Model. This is crucial for ensuring that complex objects are correctly saved in snapshots.
                </description>
                <example>
                    ```typescript
                    // Define a non-Model class
                    class Vector2D {
                      constructor(public x: number, public y: number) {}
                    }

                    class GameStateModel extends ReactTogetherModel {
                      playerPos: Vector2D;

                      static types() {
                        return {
                          'Vector2D': {
                            cls: Vector2D,
                            write: (vec: Vector2D) => [vec.x, vec.y], // Serialize to array
                            read: (arr: [number, number]) => new Vector2D(arr[0], arr[1]), // Deserialize from array
                          },
                        };
                      }

                      init() {
                        super.init({});
                        this.playerPos = new Vector2D(0, 0);
                      }
                    }
                    GameStateModel.register('GameStateModel');
                    ```
                </example>
            </method>
            <method name="wellKnownModel(name: string): Model | undefined">
                <description>
                    **Static and instance method**: Allows Models to be registered with a global name (e.g., `this.beWellKnownAs('GameManager')`) and then retrieved by that name from anywhere in the Model code (e.g., `MyModel.wellKnownModel('GameManager')` or `this.wellKnownModel('GameManager')`). The root Model is automatically well-known as `"modelRoot"`.
                </description>
                <example>
                    ```typescript
                    class GameManager extends ReactTogetherModel {
                      init() {
                        super.init({});
                        this.beWellKnownAs('GameManager'); // Make this instance globally accessible
                      }
                    }
                    GameManager.register('GameManager');

                    class PlayerModel extends ReactTogetherModel {
                      init() {
                        super.init({});
                        const gameManager = this.wellKnownModel('GameManager'); // Access the game manager
                        // ...
                      }
                    }
                    PlayerModel.register('PlayerModel');
                    ```
                </example>
            </method>
            <method name="modelOnly(msg?: string): boolean">
                <description>
                    A utility method that throws an error if called from outside Model code. Use this to enforce strict separation and prevent accidental modification of Model state from Views.
                </description>
                <example>
                    ```typescript
                    class SecureModel extends ReactTogetherModel {
                      private _secretValue: string;
                      setSecret(value: string) {
                        this.modelOnly('Attempt to set secret from outside Model!');
                        this._secretValue = value;
                      }
                    }
                    SecureModel.register('SecureModel');
                    ```
                </example>
            </method>
        </model_lifecycle>

        <data_api>
            <title>Data API for Bulk Storage</title>
            <description>
                The Data API (`session.data`) provides secure, end-to-end encrypted bulk data storage for files (e.g., images, documents). It's designed for large, non-realtime data that doesn't need to be part of the Model's synchronized state but needs to be shared across clients. Data is uploaded to a file server, and a small "data handle" is returned, which can then be stored in the Model and shared. Other clients can use this handle to fetch the data.
            </description>
            <methods>
                <method name="session.data.store(data: ArrayBuffer, options?: { shareable?: boolean; keep?: boolean }): Promise&lt;DataHandle&gt;">
                    <description>
                        Uploads an `ArrayBuffer` of data to the file server. Returns a `Promise` that resolves to a `DataHandle`.
                        - `shareable` (boolean): If `true`, the handle includes the decryption key, allowing it to be shared outside the session (less secure).
                        - `keep` (boolean): If `true`, the original `ArrayBuffer` is not detached after upload.
                    </description>
                    <example>
                        ```tsx
                        import { useSession } from 'react-together';

                        function FileUploader() {
                          const session = useSession();
                          const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
                            const file = event.target.files?.[0];
                            if (file && session) {
                              const arrayBuffer = await file.arrayBuffer();
                              const handle = await session.data.store(arrayBuffer, { shareable: false });
                              // Now publish the handle to the Model to share with other clients
                              // model.publish('file', 'uploaded', handle);
                            }
                          };
                          return <input type="file" onChange={handleFileUpload} />;
                        }
                        ```
                    </example>
                </method>
                <method name="session.data.fetch(dataHandle: DataHandle): Promise&lt;ArrayBuffer&gt;">
                    <description>
                        Fetches the data associated with a `DataHandle` from the file server. Returns a `Promise` that resolves to an `ArrayBuffer`.
                    </description>
                    <example>
                        ```tsx
                        import { useSession, useSubscribe } from 'react-together';
                        import { useState } from 'react';

                        function ImageDisplay() {
                          const session = useSession();
                          const [imageUrl, setImageUrl] = useState<string | null>(null);

                          useSubscribe<any>('file', 'uploaded', async (handle) => {
                            if (session) {
                              const arrayBuffer = await session.data.fetch(handle);
                              const blob = new Blob([arrayBuffer], { type: 'image/png' }); // Adjust type as needed
                              setImageUrl(URL.createObjectURL(blob));
                            }
                          });

                          return imageUrl ? <img src={imageUrl} alt="Uploaded" /> : <p>Waiting for image...</p>;
                        }
                        ```
                    </example>
                </method>
                <method name="session.data.toId(handle: DataHandle): string">
                    <description>
                        Converts a `DataHandle` into a serializable string ID. Useful for storing handles in the Model's state, especially for persistence.
                    </description>
                </method>
                <method name="session.data.fromId(id: string): DataHandle">
                    <description>
                        Reconstructs a `DataHandle` from its string ID.
                    </description>
                    <example>
                        ```typescript
                        // In your Model for persistence
                        class MyPersistentModel extends ReactTogetherModel {
                          savedFileHandleId: string | null;

                          init(options: any, persisted?: any) {
                            super.init(options);
                            this.savedFileHandleId = persisted?.fileHandleId || null;
                          }

                          saveFileHandle(handle: any) { // DataHandle type
                            this.savedFileHandleId = this.session.data.toId(handle);
                            this.persistSession(() => ({ fileHandleId: this.savedFileHandleId }));
                          }

                          // When restoring, in a View:
                          // const handle = session.data.fromId(model.savedFileHandleId);
                          // const fileData = await session.data.fetch(handle);
                        }
                        MyPersistentModel.register('MyPersistentModel');
                        ```
                    </example>
                </method>
            </methods>
        </data_api>

        <ui_feedback>
            <title>UI Feedback and Loading Animations</title>
            <description>
                `@multisynq/client` provides built-in mechanisms for displaying synchronization status and loading animations. `react-together` wraps these functionalities, offering a convenient `LoadingSpinner` component.
            </description>
            <component name="LoadingSpinner">
                <description>A customizable loading spinner component that indicates when the Multisynq session is synchronizing or catching up. This component wraps the underlying `@multisynq/client`'s synchronization wait UI (`App.showSyncWait`).</description>
                <props>
                    <prop name="message" type="string" default="Catching up...">
                        <description>The message displayed below the spinner.</description>
                    </prop>
                    <prop name="className" type="string" optional="true">
                        <description>Additional CSS classes for styling the overlay div.</description>
                    </prop>
                    <prop name="style" type="object" optional="true">
                        <description>Inline style object for the overlay div.</description>
                    </prop>
                    <prop name="spinnerColor" type="string" default="#ffffff">
                        <description>The color of the spinner animation.</description>
                    </prop>
                    <prop name="overlayColor" type="string" default="#333333">
                        <description>The background color of the overlay.</description>
                    </prop>
                    <prop name="opacity" type="number" default="0.9">
                        <description>The opacity of the overlay (0 to 1).</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { LoadingSpinner, useIsJoined } from 'react-together';

                    function AppWithLoading() {
                      const isJoined = useIsJoined();
                      return (
                        <div>
                          {!isJoined && (
                            <LoadingSpinner message="Connecting to the shared world..." spinnerColor="#00ff00" overlayColor="#000000" />
                          )}
                          {/* Your main application content */}
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
            <raw_client_api>
                <title>Direct `@multisynq/client` UI API</title>
                <description>
                    For more granular control or custom UI, you can directly use the `App` object from `@multisynq/client`.
                </description>
                <method name="App.showSyncWait(bool: boolean | 'error' | 'fatal')">
                    <description>
                        Manually controls the visibility of the default synchronization spinner.
                        - `true`: Shows the spinner.
                        - `false`: Hides the spinner.
                        - `'error'`: Shows the spinner with an error state (red).
                        - `'fatal'`: Shows the spinner with a fatal error state (red, no animation).
                    </description>
                    <example>
                        ```typescript
                        import { App } from '@multisynq/client';

                        // Show loading spinner
                        App.showSyncWait(true);

                        // Hide loading spinner
                        App.showSyncWait(false);

                        // Show error state
                        App.showSyncWait('error');
                        ```
                    </example>
                </method>
                <method name="App.showMessage(msg: string, options?: object)">
                    <description>
                        Displays a transient message (toast notification) to the user.
                        - `options.level`: `'status'`, `'warning'`, `'error'`.
                        - `options.duration`: Display duration in milliseconds.
                        - `options.only: 'once'`: Display message only once.
                        - `options.showSyncWait`: `'error'` or `'fatal'` to also show sync wait UI.
                    </description>
                    <example>
                        ```typescript
                        import { App } from '@multisynq/client';

                        App.showMessage('Welcome to the session!', { level: 'status' });
                        App.showMessage('Something went wrong!', { level: 'error', duration: 5000 });
                        ```
                    </example>
                </method>
            </raw_client_api>
        </ui_feedback>

        <session_sharing>
            <title>Session Sharing and QR Codes</title>
            <description>
                Facilitating easy session sharing is crucial for collaborative applications. `react-together` provides a `QRCodeDisplay` component, which wraps the underlying `@multisynq/client`'s QR code generation.
            </description>
            <component name="QRCodeDisplay">
                <description>Displays a QR code for the current session URL, allowing easy sharing and joining of sessions via mobile devices. This component leverages the underlying `@multisynq/client`'s QR code generation capabilities.</description>
                <props>
                    <prop name="size" type="number" default="128">
                        <description>The width and height of the QR code in pixels.</description>
                    </prop>
                    <prop name="colorDark" type="string" default="#000000">
                        <description>The color of the dark modules of the QR code.</description>
                    </prop>
                    <prop name="colorLight" type="string" default="#ffffff">
                        <description>The color of the light modules of the QR code.</description>
                    </prop>
                    <prop name="correctLevel" type="string" default="L">
                        <description>The error correction level of the QR code (L, M, Q, H).</description>
                    </prop>
                    <prop name="className" type="string" optional="true">
                        <description>Additional CSS classes for styling the container div.</description>
                    </prop>
                    <prop name="style" type="object" optional="true">
                        <description>Inline style object for the container div.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { QRCodeDisplay } from 'react-together';

                    function ShareSession() {
                      return (
                        <div className="p-4 bg-white rounded shadow">
                          <h2 className="text-lg font-semibold mb-2">Scan to Join</h2>
                          <QRCodeDisplay size={200} colorDark="#333333" />
                          <p className="text-sm mt-2">Share this QR code with others!</p>
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
            <raw_client_api>
                <title>Direct `@multisynq/client` QR Code API</title>
                <description>
                    For more advanced use cases or custom UI integration, you can directly use the `App` object from `@multisynq/client` to generate QR codes.
                </description>
                <method name="App.makeQRCanvas(options?: object): HTMLCanvasElement | null">
                    <description>
                        Generates an HTML `canvas` element containing the QR code for the current `App.sessionURL`.
                        `options` are passed directly to the QR code library (e.g., `width`, `height`, `colorDark`, `colorLight`, `correctLevel`).
                    </description>
                    <example>
                        ```typescript
                        import { App } from '@multisynq/client';
                        import { useEffect, useRef } from 'react';

                        function CustomQRCode() {
                          const canvasRef = useRef<HTMLDivElement>(null);

                          useEffect(() => {
                            if (canvasRef.current) {
                              const qrCanvas = App.makeQRCanvas({ size: 150, colorDark: 'blue' });
                              if (qrCanvas) {
                                canvasRef.current.innerHTML = ''; // Clear previous
                                canvasRef.current.appendChild(qrCanvas);
                              }
                            }
                          }, []);

                          return (
                            <div ref={canvasRef} className="p-4 border rounded">
                              <p>Custom QR Code:</p>
                            </div>
                          );
                        }
                        ```
                    </example>
                </method>
                <method name="App.makeWidgetDock(options?: object): void">
                    <description>
                        Creates a default collapsible UI dock with session information, including a QR code, session badge, and stats. This is a quick way to add basic session UI.
                        `options` can control visibility of `badge`, `qrcode`, `stats`, `iframe`, `alwaysPinned`, `fixedSize`.
                    </description>
                    <example>
                        ```typescript
                        import { App } from '@multisynq/client';
                        import { useEffect } from 'react';

                        function AppWithDefaultDock() {
                          useEffect(() => {
                            App.makeWidgetDock({ qrcode: true, badge: true, stats: false });
                          }, []);
                          return (
                            <div className="p-4">
                              <p>Content here...</p>
                            </div>
                          );
                        }
                        ```
                    </example>
                </method>
            </raw_client_api>
        </session_sharing>

        <debugging_and_diagnostics>
            <title>Debugging and Diagnostics</title>
            <description>
                Multisynq provides various debugging flags that can be enabled via `sessionParams.debug` in `ReactTogether` or through URL parameters (`?debug=flag1,flag2`).
            </description>
            <flags>
                <flag name="session">Logs session ID, connection/disconnection events.</flag>
                <flag name="messages">Logs received messages (after decryption).</flag>
                <flag name="sends">Logs sent messages (before encryption).</flag>
                <flag name="snapshot">Logs snapshot-related activities (taking, uploading, downloading).</flag>
                <flag name="data">Logs Data API operations.</flag>
                <flag name="hashing">Logs code hashing process for session/persistent ID generation.</flag>
                <flag name="subscribe">Logs subscription additions/removals.</flag>
                <flag name="publish">Logs event publishing.</flag>
                <flag name="classes">Logs Model class registrations.</flag>
                <flag name="ticks">Logs each heartbeat tick received.</flag>
                <flag name="write">Enables debug proxying to detect accidental writes from View code to Model properties (throws an error).</flag>
                <flag name="offline">Runs the application in offline mode (no multiuser connection).</flag>
            </flags>
            <example>
                ```tsx
                import { ReactTogether } from 'react-together';

                function DebugApp() {
                  return (
                    <ReactTogether
                      sessionParams={{
                        appId: 'your-app-id',
                        apiKey: 'your-api-key',
                        debug: 'session,messages,write', // Enable multiple debug flags
                      }}
                    >
                      {/* Your application */}
                    </ReactTogether>
                  );
                }
                ```
            </example>
        </debugging_and_diagnostics>
    </advanced>

</documentation>