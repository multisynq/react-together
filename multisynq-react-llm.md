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
        <title>Core Concepts</title>
        <explanation>
            `react-together` is a high-level React library that simplifies building real-time, collaborative applications. It is built on `@multisynq/client` and abstracts away much of the session management and boilerplate code. For most common use cases, `react-together` is sufficient. For more complex applications with custom, state-dependent logic, you may need to use a custom `ReactTogetherModel`.
        </explanation>
    </concepts>

    <api>
        <title>API Reference</title>
        <provider>
            <component name="ReactTogether">
                <description>The root provider that enables all `react-together` functionality. It should wrap the parts of your application that require real-time collaboration.</description>
                <props>
                    <prop name="sessionParams" type="object" required="true">
                        <description>An object containing your `appId` and `apiKey`.</description>
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
                <description>Synchronizes a single piece of state across all clients.</description>
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
                <description>Synchronizes a piece of state for each user individually.</description>
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
                <description>Synchronizes a function call across all clients.</description>
                <example>
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
                </example>
            </hook>
        </hooks>

        <components>
            <component name="Chat">
                <description>A ready-to-use chat component.</description>
                <props>
                    <prop name="rtKey" type="string" required="true" />
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
                <description>Displays the cursors of all connected users.</description>
                <example>
                    ```tsx
                    import { Cursors } from 'react-together';

                    function CollaborativeCanvas() {
                      return (
                        <div style={{ width: '100vw', height: '100vh' }}>
                          <Cursors />
                        </div>
                      );
                    }
                    ```
                </example>
            </component>
            <component name="ConnectedUsers">
                <description>Displays the avatars of all connected users.</description>
                <example>
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
                </example>
            </component>
            <component name="HoverHighlighter">
                <description>A wrapper component that highlights its children when any user hovers over it.</description>
                <props>
                    <prop name="rtKey" type="string" required="true" />
                </props>
                <example>
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
                </example>
            </component>
            <component name="SessionManager">
                <description>Provides a UI for managing the session (create, join, leave).</description>
                <example>
                    ```tsx
                    import { SessionManager } from 'react-together';

                    function AppControls() {
                      return <SessionManager />;
                    }
                    ```
                </example>
            </component>
        </components>
    </api>

    <advanced>
        <title>Advanced: Custom Model Logic</title>
        <when_to_use>
            <reason>When you need to enforce complex rules or constraints on the shared state.</reason>
            <reason>When you need to perform calculations on the model side that depend on the current state.</reason>
            <reason>When you need to use the `future()` messaging system for time-based events.</reason>
        </when_to_use>
        <how_to_use>
            <step>Create a new model class that extends `ReactTogetherModel`.</step>
            <step>Implement your custom logic and event handlers in the model.</step>
            <step>Register your model using `MyModel.register('MyModel')`.</step>
            <step>Pass your model to the `<ReactTogether />` provider.</step>
        </how_to_use>
        <example>
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
        </example>
    </advanced>

</documentation>