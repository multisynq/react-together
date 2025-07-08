<documentation>
    <metadata>
        <library>@multisynq/react</library>
        <version>latest</version>
        <purpose>A comprehensive guide for an AI assistant on building real-time, collaborative React applications using the `@multisynq/react` library, which is built on top of `@multisynq/client`.</purpose>
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
                <command>npm install @multisynq/react @multisynq/client</command>
                <import_example>import { MultisynqRoot, useReactModelRoot } from '@multisynq/react';</import_example>
            </method>
            <method type="cdn">
                <import_example>import { MultisynqRoot, useReactModelRoot } from 'https://cdn.jsdelivr.net/npm/@multisynq/react@latest/+esm';</import_example>
            </method>
        </installation>
    </setup>

    <concepts>
        <title>Core Concepts</title>
        <explanation>
            `@multisynq/react` is a library for building real-time, collaborative applications with React and Multisynq. It bridges the gap between the deterministic, shared Model layer of Multisynq and the dynamic, user-facing View layer of React.

            - **MultisynqRoot**: A React component that wraps your application and manages the Multisynq session lifecycle.
            - **ReactModel**: A base class for your models that extends `Multisynq.Model` and integrates with React's reactivity system.
            - **Hooks**: A set of React hooks to interact with the shared model state and session from your components.
        </explanation>
    </concepts>

    <api>
        <title>API Reference</title>
        <provider>
            <component name="MultisynqRoot">
                <description>The root provider that enables all `@multisynq/react` functionality. It should wrap the parts of your application that require real-time collaboration.</description>
                <props>
                    <prop name="sessionParams" type="object" required="true">
                        <description>An object containing session configuration, including `apiKey`, `appId`, `name`, `password`, and your root `model` class.</description>
                    </prop>
                    <prop name="deferSession" type="boolean" default="false">
                        <description>If `true`, the session will not be joined automatically. You can join later using the function returned by `useSetSession`.</description>
                    </prop>
                    <prop name="showChildrenWithoutSession" type="boolean" default="false">
                        <description>If `true`, child components will be rendered even when not connected to a session.</description>
                    </prop>
                </props>
                <example>
                    ```tsx
                    import { MultisynqRoot } from '@multisynq/react';
                    import { MyRootModel } from './MyRootModel';

                    function App() {
                      return (
                        <MultisynqRoot
                          sessionParams={{
                            apiKey: 'YOUR_API_KEY',
                            appId: 'com.example.myapp',
                            name: 'my-session',
                            password: 'my-password',
                            model: MyRootModel,
                          }}
                        >
                          {/* Your collaborative components */}
                        </MultisynqRoot>
                      );
                    }
                    ```
                </example>
            </component>
        </provider>

        <hooks>
            <hook name="useReactModelRoot">
                <signature>useReactModelRoot&lt;M extends ReactModel&gt;()</signature>
                <description>Returns a reactive proxy of the root model. Your component will re-render whenever the model's data changes. This is the primary way to display shared state.</description>
                <example>
                    ```tsx
                    import { useReactModelRoot } from '@multisynq/react';

                    function SharedCounter() {
                      const model = useReactModelRoot<CounterModel>();
                      if (!model) return <div>Loading...</div>;

                      const increment = () => model.increment();

                      return <button onClick={increment}>Count: {model.count}</button>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useModelSelector">
                <signature>useModelSelector&lt;M, R&gt;(selector: (model: M) => R)</signature>
                <description>Selects a specific piece of data from the root model. The component will only re-render if the selected data changes. This is more performant than `useReactModelRoot` for components that only need a small part of the model state.</description>
                <example>
                    ```tsx
                    import { useModelSelector } from '@multisynq/react';

                    function PlayerScore() {
                      const score = useModelSelector((model: GameModel) => model.playerScore);
                      return <div>Score: {score}</div>;
                    }
                    ```
                </example>
            </hook>
            <hook name="usePublish">
                <signature>usePublish&lt;T&gt;(callback: (data: T) => [scope: string, event: string, data?: any])</signature>
                <description>Creates a function to publish an event from the view to the model. This is the primary way to send user input to the shared simulation.</description>
                <example>
                    ```tsx
                    import { usePublish, useModelRoot } from '@multisynq/react';

                    function MoveButton() {
                      const model = useModelRoot<GameModel>();
                      const publishMove = usePublish((direction: string) => [model.id, 'move', { direction }]);

                      return <button onClick={() => publishMove('up')}>Move Up</button>;
                    }
                    ```
                </example>
            </hook>
            <hook name="useSubscribe">
                <signature>useSubscribe&lt;T&gt;(scope: string, event: string, callback: (data: T) => void)</signature>
                <description>Subscribes a component to an event published by the model. This is useful for transient events that don't represent persistent state (e.g., sound effects, one-off animations).</description>
                <example>
                    ```tsx
                    import { useSubscribe, useModelRoot } from '@multisynq/react';

                    function GameNotifications() {
                      const model = useModelRoot<GameModel>();
                      useSubscribe(model.id, 'player-scored', (data) => {
                        console.log(`${data.playerName} scored ${data.points} points!`);
                      });
                      return null; // This component only handles side effects
                    }
                    ```
                </example>
            </hook>
            <hook name="useSession">
                <signature>useSession&lt;M extends ReactModel&gt;()</signature>
                <description>Returns the raw Multisynq session object, which contains the `id`, `view`, `model`, and `leave` function. Useful for advanced cases.</description>
            </hook>
            <hook name="useSetSession">
                <signature>useSetSession()</signature>
                <description>Returns a function to join a new session. You can pass new session parameters (e.g., a different `name` or `password`). This will leave the current session and join a new one.</description>
            </hook>
            <hook name="useLeaveSession">
                <signature>useLeaveSession()</signature>
                <description>Returns a function to leave the current session.</description>
            </hook>
            <hook name="useViewId">
                <signature>useViewId()</signature>
                <description>Returns the unique ID for the current user's view in the session.</description>
            </hook>
            <hook name="useJoinedViews">
                <signature>useJoinedViews()</signature>
                <description>Returns an object containing information about all currently connected views, including their `viewId`s and a total count.</description>
            </hook>
            <hook name="useSyncedCallback">
                <signature>useSyncedCallback(callback: (isSynced: boolean) => void)</signature>
                <description>Registers a callback that fires when the session's synchronization status changes. Useful for showing loading indicators.</description>
            </hook>
        </hooks>

        <model>
            <class name="ReactModel">
                <description>The base class for your models when using `@multisynq/react`. It extends `Multisynq.Model` and provides the necessary wiring to make the model state reactive in your React components.</description>
                <methods>
                    <method name="init">
                        <description>Called once when the model is first created. Use this to set up initial state and subscribe to events.</description>
                    </method>
                    <method name="handleViewJoin">
                        <signature>handleViewJoin(viewId: string, viewInfo: object)</signature>
                        <description>An overridable method that is called when a new view joins the session.</description>
                    </method>
                    <method name="handleViewExit">
                        <signature>handleViewExit(viewId: string, viewInfo: object)</signature>
                        <description>An overridable method that is called when a view leaves the session.</description>
                    </method>
                </methods>
                <example>
                    ```typescript
                    import { ReactModel } from '@multisynq/react';

                    export class MyGameModel extends ReactModel {
                      players: Map<string, { x: number, y: number }>;

                      init() {
                        super.init({});
                        this.players = new Map();
                        this.subscribe(this.id, 'move', this.handleMove);
                      }

                      handleViewJoin(viewId: string) {
                        this.players.set(viewId, { x: 0, y: 0 });
                      }

                      handleViewExit(viewId: string) {
                        this.players.delete(viewId);
                      }

                      handleMove({ viewId, x, y }) {
                        const player = this.players.get(viewId);
                        if (player) {
                          player.x = x;
                          player.y = y;
                        }
                      }
                    }

                    MyGameModel.register('MyGameModel');
                    ```
                </example>
            </class>
        </model>
    </api>

    <how_to>
        <title>How-To Guides</title>
        <guide name="display_qr_code">
            <question>How do I display a QR code for others to join the session?</question>
            <answer>
                You can use the `App.makeQRCanvas()` utility from `@multisynq/client`. Call it inside a `useEffect` hook to generate a canvas element with the QR code and append it to your component.
            </answer>
            <example>
                ```tsx
                import { App } from '@multisynq/client';
                import { useSession } from '@multisynq/react';
                import { useEffect, useRef } from 'react';

                function QRCode() {
                  const session = useSession();
                  const qrRef = useRef(null);

                  useEffect(() => {
                    if (session && qrRef.current) {
                      const canvas = App.makeQRCanvas();
                      if (canvas) {
                        qrRef.current.innerHTML = '';
                        qrRef.current.appendChild(canvas);
                      }
                    }
                  }, [session]);

                  return <div ref={qrRef}></div>;
                }
                ```
            </example>
        </guide>
        <guide name="custom_loading_animation">
            <question>How do I show a custom loading animation while the session is connecting?</question>
            <answer>
                Use the `useSyncedCallback` hook to track the session's sync status. You can show a loading component until the callback indicates the session is synced. To disable the default Multisynq spinner, you can set `App.sync = false;` before joining the session.
            </answer>
            <example>
                ```tsx
                import { useSyncedCallback } from '@multisynq/react';
                import { useState } from 'react';

                function MyAppComponent() {
                  const [isSynced, setIsSynced] = useState(false);
                  useSyncedCallback(synced => setIsSynced(synced));

                  if (!isSynced) {
                    return <div>Connecting to the collaborative session...</div>;
                  }

                  return <MyCollaborativeApp />;
                }
                ```
            </example>
        </guide>
        <guide name="user_identity">
            <question>How do I manage user identities and nicknames?</question>
            <answer>
                The `viewId` is the unique identifier for each user's connection. Use the `useViewId()` hook to get the current user's `viewId`. In your `ReactModel`, you can override `handleViewJoin` to be notified of new users. Inside this method, you can assign a random nickname and store it in a `Map` from `viewId` to the nickname.
            </answer>
            <example>
                ```typescript
                // In your ReactModel
                init() {
                  super.init({});
                  this.nicknames = new Map();
                }

                handleViewJoin(viewId: string) {
                  const randomName = `User${Math.floor(Math.random() * 1000)}`;
                  this.nicknames.set(viewId, randomName);
                }
                ```
                ```tsx
                // In your component
                import { useJoinedViews, useModelSelector } from '@multisynq/react';

                function UserList() {
                  const { viewIds } = useJoinedViews();
                  const nicknames = useModelSelector(m => m.nicknames);

                  return (
                    <ul>
                      {viewIds.map(id => (
                        <li key={id}>{nicknames.get(id) || '...'}</li>
                      ))}
                    </ul>
                  );
                }
                ```
            </example>
        </guide>
    </how_to>
</documentation>
