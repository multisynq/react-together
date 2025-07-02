<documentation>
    <metadata>
        <library>@multisynq/client</library>
        <version>v3</version>
        <purpose>A comprehensive guide for an AI assistant on building real-time, multiplayer web applications using the Multisynq JavaScript SDK. This document combines conceptual explanations, API references, best practices, and full examples.</purpose>
    </metadata>

    <instructions>
        <role>
            You are an expert Multisynq web application builder who specializes in real-time multi-user experiences. You respond with high energy and enthusiasm about building multiplayer experiences. Your primary function is to generate a complete, elegant, executable web application. The application should include thoughtful and interactive features such as username input, drop-down menus, dynamic text and content, clickable buttons, and relevant state management. Ensure that the design is visually appealing, responsive, and user-friendly. The HTML, CSS, and JavaScript code should be well-structured, efficiently organized, and properly commented for readability and maintainability.
        </role>
        <output_format>
            When you do not have local filesystem access to an existing project, select the format that best matches your capabilities and environment:
            - HTML: Single standalone HTML file with embedded CSS/JavaScript
            - React: Single functional React component (JSX/TSX) with embedded CSS/JavaScript including all necessary dependencies
        </output_format>
        <initialization_protocol>
            1. If the user has not specified what to build, suggest 2-4 creative multi-user application concepts.
            2. If the user does not provide an apiKey, direct them to https://multisynq.io/coder.
        </initialization_protocol>
        <technical_requirements>
            <multisynq_integration>
                Load MultiSynq either in the HTML head:
                ```html
                <meta charset="utf-8">
                <script src="https://cdn.jsdelivr.net/npm/@multisynq/client@latest/bundled/multisynq-client.min.js"></script>
                ```
                or directly in the javascript function:
                ```javascript
                import * as Multisynq from "https://cdn.jsdelivr.net/npm/@multisynq/client@latest/bundled/multisynq-client.esm.js";
                ```
            </multisynq_integration>
            <styling_framework>
                Import TailwindCSS with:
                ```html
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                ```
                - Use TailwindCSS classes as the primary styling method.
                - For React components: use inline style objects, never CSS strings.
                - Design for mobile-first responsive layouts.
            </styling_framework>
            <dependency_constraints>
                - All imports must use public CDN URLs.
                - Create single-file standalone applications.
                - No external dependencies beyond CDN imports.
            </dependency_constraints>
        </technical_requirements>
        <implementation_standards>
            <code_structure>
                - HTML: Include complete `<html>`, `<head>`, and `<body>` structure.
                - React: Export single functional component as default.
                - Embed all CSS and JavaScript inline.
                - Include a username input field where appropriate.
                - Include a reset/restart or clear button as needed.
            </code_structure>
            <multisynq_compliance>
                <api_key_requirements>
                    - API keys must be obtained from https://multisynq.io/coder.
                    - Never generate or fabricate API keys.
                </api_key_requirements>
                - Follow Multisynq object and attribute names exactly as documented.
                - The values for `apiKey` and `appId` MUST be provided for Multisynq to connect properly.
                - `appId` must be a string of dot.separated.words, similar to android package ids (e.g. "com.example.myapp").
                - Do not guess parameter names, method signatures, or API patterns.
                - Do not use Promises, async/await, or constructor overrides in Model code (use `init()` instead).
                - Unless instructed otherwise, always call `Multisynq.App.makeWidgetDock()` to display the session QR code.
            </multisynq_compliance>
            <quality_standards>
                - Create polished, professional user interfaces.
                - Include thoughtful interactions and visual feedback.
                - Demonstrate real-time state synchronization clearly.
                - Build complete, functional applications rather than prototypes.
            </quality_standards>
        </implementation_standards>
    </instructions>

    <concepts>
        <title>Core Concepts & Architecture</title>
        <concept name="Client-Side Synchronization">
            <explanation>Multisynq applications are built on a client-side synchronized architecture. All application logic resides and executes on the client, eliminating the need for custom server-side code.</explanation>
        </concept>
        <concept name="Deterministic Virtual Machine (Teatime)">
            <explanation>The core of Multisynq is a deterministic JavaScript virtual machine. All code within a `Model` is executed inside this VM. The VM guarantees that given the same initial state and the same sequence of events, every client will produce the exact same resulting state. This is the foundation of the synchronization model.</explanation>
        </concept>
        <concept name="Reflector/Synchronizer Network">
            <explanation>The network consists of simple, stateless message-passing servers. Their sole responsibilities are to order events from all clients into a single, canonical stream and to provide a unified, monotonous source of time (heartbeat ticks). Reflectors do not execute any application logic.</explanation>
        </concept>
        <concept name="Model-View Separation">
            <explanation>This is a strict architectural pattern. The Model must be completely self-contained and deterministic. The View handles all user input and output, can read from the model, but **must never** write to it directly. All changes to the model must be initiated via events.</explanation>
        </concept>
    </concepts>

    <api_reference>
        <session_api>
            <title>Session Management</title>
            <method name="Session.join">
                <description>Starts the app, connects to a reflector, instantiates the model and view, and begins the simulation loop.</description>
                <parameters>
                    | Parameter | Required | Description |
                    | :--- | :--- | :--- |
                    | `apiKey` | Yes | Your Multisynq API key from https://multisynq.io/coder. |
                    | `appId` | Yes | A unique, dot-separated identifier for your application (e.g., "com.example.myapp"). |
                    | `model` | Yes | The root model class for your application. |
                    | `view` | No | The root view class for your application (defaults to `Multisynq.View`). |
                    | `name` | No | The name of the session. Can be provided by `App.autoSession()`. If omitted, a random name is generated. |
                    | `password` | No | The password for the session (used for E2E encryption). Can be provided by `App.autoPassword()`. If omitted, a random password is generated. |
                    | `tps` | No | Ticks Per Second. The heartbeat rate from the reflector (default: 20). |
                    | `autoSleep` | No | Seconds of inactivity before the session goes dormant (default: 10). `false` disables it. |
                    | `eventRateLimit` | No | Maximum number of events per second to send to the reflector (default: 20). |
                    | `viewData` | No | Custom data to be included in `view-join` and `view-exit` events. This is the primary way to associate a persistent `userId` with a temporary `viewId`. |
                    | `location` | No | If `true`, includes coarse-grained location data in `view-join` events. |
                </parameters>
            </method>
        </session_api>

        <app_api>
            <title>App Utilities & UI</title>
            <method name="App.autoSession">
                <description>Returns a `Promise<string>` that resolves to a session name, typically read from the `?q=` URL parameter. If not present, a random name is generated and added to the URL. Ideal for development and sharing.</description>
                <example>Multisynq.Session.join({ ..., name: Multisynq.App.autoSession() });</example>
            </method>
            <method name="App.autoPassword">
                <description>Returns a `Promise<string>` that resolves to a session password, read from the `#pw=` URL hash. If not present, a random password is generated and added to the URL hash. Using the hash prevents the password from being sent to web servers.</description>
                <example>Multisynq.Session.join({ ..., password: Multisynq.App.autoPassword() });</example>
            </method>
            <method name="App.makeWidgetDock">
                <description>Creates a floating UI widget with a QR code for joining the session, as well as stats and debug controls. Essential for easy multi-device testing.</description>
            </method>
        </app_api>

        <model_api>
            <title>Model API</title>
            <lifecycle>
                <method name="init">
                    <signature>init(options, persistentData)</signature>
                    <description>Initialization hook. Called **only once** when a session is first created. Use this for initial setup and subscriptions. `persistentData` will be populated if `persistSession` was used in a previous version of this app.</description>
                </method>
                <method name="create">
                    <signature>static create(options)</signature>
                    <description>Factory method for creating instances of Model subclasses. **Do not use `new Model()`**. This method registers the new model with the snapshot system.</description>
                </method>
                <method name="destroy">
                    <signature>destroy()</signature>
                    <description>Cleans up a model instance, removing all its subscriptions and future messages. Essential for preventing memory leaks when models are removed dynamically.</description>
                </method>
            </lifecycle>
            <event_system>
                <method name="publish">
                    <signature>publish(scope, event, data?)</signature>
                    <description>Emits an event. Model-to-model events are synchronous. Model-to-view events are queued and processed in the next view update cycle.</description>
                </method>
                <method name="subscribe">
                    <signature>subscribe(scope, event, handler)</signature>
                    <description>Registers an event listener. The handler must be a method of the model instance (e.g., `this.myHandler`).</description>
                </method>
            </event_system>
            <time_control>
                <method name="future">
                    <signature>future(offsetInMs)</signature>
                    <description>Schedules a deterministic, synchronized function call. Returns a proxy; the subsequent method call is what gets scheduled. Example: `this.future(1000).myMethod(arg1);`</description>
                </method>
                <method name="now">
                    <signature>now()</signature>
                    <description>Returns the current, synchronized simulation time in milliseconds.</description>
                </method>
                <method name="random">
                    <signature>random()</signature>
                    <description>Returns a deterministic, synchronized pseudo-random number between 0 and 1. Use this instead of `Math.random()` in model code.</description>
                </method>
            </time_control>
            <state_management>
                <method name="persistSession">
                    <signature>persistSession(callback)</signature>
                    <description>Persists a JSON-serializable object to be loaded by future versions of the application code. The `callback` function should return the object to save. This data is passed to the root model's `init` method in new sessions.</description>
                </method>
            </state_management>
            <serialization>
                <method name="types">
                    <signature>static types()</signature>
                    <description>Defines custom serializers for non-Model classes you wish to store in the model state. Returns an object mapping a unique string ID to either the class itself (for default serialization) or a spec with `cls`, `write`, and `read` methods.</description>
                </method>
            </serialization>
        </model_api>

        <view_api>
            <title>View API</title>
            <lifecycle>
                <method name="constructor">
                    <signature>constructor(model)</signature>
                    <description>Receives the synchronized root model. Use this to set up the initial view state and subscribe to events.</description>
                </method>
                <method name="detach">
                    <signature>detach()</signature>
                    <description>Cleans up view-specific resources and event listeners. Called automatically when a session is interrupted.</description>
                </method>
                <method name="update">
                    <signature>update(time)</signature>
                    <description>The main render loop callback, driven by `requestAnimationFrame`. Use this for animations and continuous updates. `time` is the high-resolution wall-clock time from the browser.</description>
                </method>
            </lifecycle>
            <event_system>
                <method name="publish">
                    <signature>publish(scope, event, data)</signature>
                    <description>Sends an event from the view. If a model is subscribed, the event is sent via the reflector to all clients. If only views are subscribed, it's a local event.</description>
                </method>
                <method name="subscribe">
                    <signature>subscribe(scope, eventSpec, handler)</signature>
                    <description>Listens for events from the model or other views. `eventSpec` can be a string or an object like `{ event: "moved", handling: "oncePerFrame" }`. The `handling` option can be `"queued"` (default), `"oncePerFrame"` (for high-frequency state updates), or `"immediate"`.</description>
                </method>
            </event_system>
            <session_access>
                <property name="viewId">
                    <description>The unique identifier for the local user's connection to the session.</description>
                </property>
                <property name="session">
                    <description>The session object returned by `Session.join()`, providing access to the Data API and other session-level methods.</description>
                </property>
            </session_access>
        </view_api>

        <data_api>
            <title>Data API (for Large Binary Data)</title>
            <explanation>The Data API is used for storing and retrieving large files (images, audio, etc.) that are too large for the model snapshot. It is accessed via `session.data`.</explanation>
            <method name="session.data.store">
                <signature>store(data: ArrayBuffer, options?: { shareable?: boolean, keep?: boolean })</signature>
                <description>Encrypts and uploads an `ArrayBuffer` to the Multisynq file server. Returns a `Promise<DataHandle>`.</description>
            </method>
            <method name="session.data.fetch">
                <signature>fetch(handle: DataHandle)</signature>
                <description>Downloads and decrypts data associated with a `DataHandle`. Returns a `Promise<ArrayBuffer>`.</description>
            </method>
            <object name="DataHandle">
                <description>An opaque, serializable object that references data stored on the file server. It can be safely stored in a model.</description>
            </object>
        </data_api>

        <types_reference>
            <title>TypeScript Definitions</title>
            <content>
                <![CDATA[
                declare module "@multisynq/client" {
                    export type ClassId = string;
                    export interface Class<T> extends Function {
                        new (...args: any[]): T;
                    }
                    export type InstanceSerializer<T, IS> = {
                        cls: Class<T>;
                        write: (value: T) => IS;
                        read: (state: IS) => T;
                    }
                    export type StaticSerializer<S> = {
                        writeStatic: () => S;
                        readStatic: (state: S) => void;
                    }
                    export type InstAndStaticSerializer<T, IS, S> = {
                        cls: Class<T>;
                        write: (value: T) => IS;
                        read: (state: IS) => T;
                        writeStatic: () => S;
                        readStatic: (state: S) => void;
                    }
                    export type Serializer = InstanceSerializer<any, any> | StaticSerializer<any> | InstAndStaticSerializer<any, any, any>;
                    export type SubscriptionHandler<T> = ((e: T) => void) | string;
                    export abstract class PubSubParticipant<SubOptions> {
                        publish<T>(scope: string, event: string, data?: T): void;
                        subscribe<T>(scope: string, event: string | {event: string} | {event: string} & SubOptions, handler: SubscriptionHandler<T>): void;
                        unsubscribe<T>(scope: string, event: string, handler?: SubscriptionHandler<T>): void;
                        unsubscribeAll(): void;
                    }
                    export type FutureHandler<T extends any[]> = ((...args: T) => void) | string;
                    export type QFuncEnv = Record<string, any>;
                    export type EventType = {
                        scope: string;
                        event: string;
                        source: "model" | "view";
                    }
                    export class Model extends PubSubParticipant<{}> {
                        id: string;
                        static create<T extends typeof Model>(this: T, options?: any): InstanceType<T>;
                        static register(classId:ClassId): void;
                        static wellKnownModel<M extends Model>(name: string): Model | undefined;
                        static types(): Record<ClassId, Class<any> | Serializer>;
                        static gatherClassTypes<T extends Object>(dummyObject: T, prefix: string): Record<ClassId, Class<any>>;
                        init(_options: any, persistentData?: any): void;
                        destroy(): void;
                        publish<T>(scope: string, event: string, data?: T): void;
                        subscribe<T>(scope: string, event: string, handler: SubscriptionHandler<T>): void;
                        unsubscribe<T>(scope: string, event: string, handler?: SubscriptionHandler<T>): void;
                        unsubscribeAll(): void;
                        get activeSubscription(): EventType | undefined;
                        future<T extends any[]>(tOffset?:number, method?: FutureHandler<T>, ...args: T): this;
                        cancelFuture<T extends any[]>(method: FutureHandler<T>): boolean;
                        random(): number;
                        now(): number;
                        beWellKnownAs(name: string): void;
                        wellKnownModel<M extends Model>(name: string): Model | undefined;
                        getModel<M extends Model>(id: string): M | undefined;
                        modelOnly(errorMessage?: string): boolean;
                        createQFunc<T extends Function>(env: QFuncEnv, func: T|string): T;
                        createQFunc<T extends Function>(func: T|string): T;
                        persistSession(func: () => any): void;
                        sessionId: string;
                        viewCount: number;
                    }
                    export type ViewLocation = {
                        country: string;
                        region: string;
                        city?: {
                            name: string;
                            lat: number;
                            lng: number;
                        }
                    }
                    export type ViewInfo<T> = {
                        viewId: string
                        viewData: T
                        location?: ViewLocation
                    }
                    export type ViewSubOptions = {
                        handling?: "queued" | "oncePerFrame" | "immediate"
                    }
                    export class View extends PubSubParticipant<ViewSubOptions> {
                        constructor(model: Model);
                        detach(): void;
                        publish<T>(scope: string, event: string, data?: T): void;
                        subscribe(scope: string, eventSpec: string | {event: string, handling: "queued" | "oncePerFrame" | "immediate"}, callback: (e: any) => void): void;
                        unsubscribe<T>(scope: string, event: string, handler?: SubscriptionHandler<T>): void;
                        unsubscribeAll(): void;
                        get activeSubscription(): EventType | undefined;
                        viewId: string;
                        future(tOffset: number): this;
                        random(): number;
                        now(): number;
                        externalNow(): number;
                        extrapolatedNow(): number;
                        update(time: number): void;
                        wellKnownModel<M extends Model>(name: string): Model | undefined;
                        get session(): MultisynqSession<View>;
                    }
                    export type MultisynqSession<V extends View> = {
                        id: string,
                        view: V,
                        step: (time: number) => void,
                        leave: () => Promise<void>,
                        data: {
                            fetch: (handle: DataHandle) => Promise<ArrayBuffer>,
                            store: (data: ArrayBuffer, options?: { shareable?: boolean, keep?: boolean }) => Promise<DataHandle>
                            toId: (handle: DataHandle) => string,
                            fromId: (id: string) => DataHandle,
                        }
                    }
                    export type MultisynqModelOptions = object;
                    export type MultisynqViewOptions = object;
                    export type MultisynqDebugOption = "session" | "messages" | "sends" | "snapshot" | "data" | "hashing" | "subscribe" | "publish" | "events" | "classes" | "ticks" | "write" | "offline";
                    type ClassOf<M> = new (...args: any[]) => M;
                    export type MultisynqSessionParameters<M extends Model, V extends View, T> = {
                        apiKey?: string,
                        appId: string,
                        name?: string|Promise<string>,
                        password?: string|Promise<string>,
                        model: ClassOf<M>,
                        view?: ClassOf<V>,
                        options?: MultisynqModelOptions,
                        viewOptions?: MultisynqViewOptions,
                        viewData?: T,
                        location?: boolean,
                        step?: "auto" | "manual",
                        tps?: number|string,
                        autoSleep?: number|boolean,
                        rejoinLimit?: number,
                        eventRateLimit?: number,
                        reflector?: string,
                        files?: string,
                        box?: string,
                        debug?: MultisynqDebugOption | Array<MultisynqDebugOption>
                    }
                    export class Session {
                        static join<M extends Model, V extends View, T>(
                            parameters: MultisynqSessionParameters<M, V, T>
                        ): Promise<MultisynqSession<V>>;
                    }
                    export var Constants: Record<string, any>;
                    export const VERSION: string;
                    interface IApp {
                        sessionURL:string;
                        root:HTMLElement|null;
                        sync:boolean;
                        messages:boolean;
                        badge:boolean;
                        stats:boolean;
                        qrcode:boolean;
                        makeWidgetDock(options?:{debug?:boolean, iframe?:boolean, badge?:boolean, qrcode?:boolean, stats?:boolean, alwaysPinned?:boolean, fixedSize?:boolean}):void;
                        makeSessionWidgets(sessionId:string):void;
                        makeQRCanvas(options?:{text?:string, width?:number, height?:number, colorDark?:string, colorLight?:string, correctLevel?:("L"|"M"|"Q"|"H")}):any;
                        clearSessionMoniker():void;
                        showSyncWait(bool:boolean):void;
                        messageFunction(msg:string, options?:{duration?:number, gravity?:("bottom"|"top"), position?:("right"|"left"|"center"|"bottom"), backgroundColor?:string, stopOnFocus?:boolean}):void;
                        showMessage(msg:string, options?:any):void;
                        isMultisynqHost(hostname:string):boolean;
                        referrerURL():string;
                        autoSession:(name:string) => Promise<string>;
                        autoPassword:(options?:{key?:string, scrub:boolean, keyless:boolean}) => Promise<string>;
                        randomSession:(len?:number) => string;
                        randomPassword:(len?:number) => string;
                    }
                    export var App:IApp;
                    interface DataHandle {}
                    export var Data: DataHandle;
                }
                ]]>
            </content>
        </types_reference>
    </api_reference>

    <examples>
        <title>Full Application Examples</title>
        <example name="multiblaster.html">
            <description>A complete 2D multiplayer space shooter game demonstrating player movement, shooting, collision detection, scoring, and persistence.</description>
            <code>
                <![CDATA[
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
                        <title>Multiblaster</title>
                        <style>
                            html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; background: #999; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; touch-action: none; }
                            #canvas { background: #000; object-fit: contain; max-width: 100%; max-height: 100%; }
                            #joystick { position: absolute; right: 50px; bottom: 50px; width: 120px; height: 120px; border: 3px solid #FFF; border-radius: 60px; opacity: 0.5; }
                            #knob { position: absolute; left: 20px; top: 20px; width: 80px; height: 80px; border-radius: 40px; background-color: #FFF; }
                            #initials { position: fixed; bottom: 10px; right: 70px; padding: .5em; border-radius: 30px; opacity: 50%; background: lightgray; box-shadow: 1px 1px 5px black; border: none; color: #000; text-align: center; font-size: 1.2em; }
                        </style>
                        <script src="https://cdn.jsdelivr.net/npm/@multisynq/client@latest/bundled/multisynq-client.min.js"></script>
                    </head>
                    <body>
                        <canvas id="canvas" width="1000" height="1000"></canvas>
                        <div id="joystick"><div id="knob"></div></div>
                        <input id="initials" type="text" maxlength="10" size="10" placeholder="Initials">
                        <script>
                const C = Multisynq.Constants;
                C.SHIP_ACCELERATION = 0.5;
                C.SHIP_TURN_SPEED = 0.2;
                C.SHIP_MAX_SPEED = 10;

                class Game extends Multisynq.Model {
                    init(_, persisted) {
                        this.highscores = persisted?.highscores ?? {};
                        this.ships = new Map();
                        this.asteroids = new Set();
                        this.blasts = new Set();
                        this.subscribe(this.sessionId, "view-join", this.viewJoined);
                        this.subscribe(this.sessionId, "view-exit", this.viewExited);
                        Asteroid.create({});
                        this.mainLoop();
                    }

                    viewJoined(viewId) {
                        const ship = Ship.create({ viewId });
                        this.ships.set(viewId, ship);
                    }

                    viewExited(viewId) {
                        const ship = this.ships.get(viewId);
                        if (ship) {
                            this.ships.delete(viewId);
                            ship.destroy();
                        }
                    }

                    setHighscore(initials, score) {
                        if (this.highscores[initials] >= score) return;
                        this.highscores[initials] = score;
                        this.persistSession(() => ({ highscores: this.highscores }));
                    }

                    mainLoop() {
                        for (const ship of this.ships.values()) ship.move();
                        for (const asteroid of this.asteroids) asteroid.move();
                        for (const blast of this.blasts) blast.move();
                        this.checkCollisions();
                        this.future(50).mainLoop();
                    }

                    checkCollisions() {
                        for (const asteroid of this.asteroids) {
                            if (asteroid.wasHit) continue;
                            const minx = asteroid.x - asteroid.size;
                            const maxx = asteroid.x + asteroid.size;
                            const miny = asteroid.y - asteroid.size;
                            const maxy = asteroid.y + asteroid.size;
                            for (const blast of this.blasts) {
                                if (blast.x > minx && blast.x < maxx && blast.y > miny && blast.y < maxy) {
                                    asteroid.hitBy(blast);
                                    break;
                                }
                            }
                            for (const ship of this.ships.values()) {
                                if (!ship.wasHit && ship.x + 10 > minx && ship.x - 10 < maxx && ship.y + 10 > miny && ship.y - 10 < maxy) {
                                    if (!ship.score && Math.abs(ship.x-500) + Math.abs(ship.y-500) < 40) continue;
                                    ship.hitBy(asteroid);
                                    break;
                                }
                            }
                        }
                    }
                }
                Game.register("Game");

                class SpaceObject extends Multisynq.Model {
                    get game() { return this.wellKnownModel("modelRoot"); }
                    init() {
                        this.x = 0; this.y = 0; this.a = 0;
                        this.dx = 0; this.dy = 0; this.da = 0;
                    }
                    move() {
                        this.x = (this.x + this.dx + 1000) % 1000;
                        this.y = (this.y + this.dy + 1000) % 1000;
                        this.a = (this.a + this.da + 2 * Math.PI) % (2 * Math.PI);
                    }
                }

                class Ship extends SpaceObject {
                    init({ viewId }) {
                        super.init();
                        this.viewId = viewId;
                        this.initials = '';
                        this.subscribe(viewId, "left-thruster", this.leftThruster);
                        this.subscribe(viewId, "right-thruster", this.rightThruster);
                        this.subscribe(viewId, "forward-thruster", this.forwardThruster);
                        this.subscribe(viewId, "fire-blaster", this.fireBlaster);
                        this.subscribe(viewId, "set-initials", this.setInitials);
                        this.reset();
                    }
                    reset() {
                        this.x = 480 + 40 * this.random();
                        this.y = 480 + 40 * this.random();
                        this.a = -Math.PI / 2;
                        this.dx = 0; this.dy = 0;
                        this.left = false; this.right = false; this.forward = false;
                        this.score = 0;
                        this.wasHit = 0;
                    }
                    leftThruster(active) { this.left = active; }
                    rightThruster(active) { this.right = active; }
                    forwardThruster(active) { this.forward = active; }
                    fireBlaster() {
                        if (this.wasHit) return;
                        const dx = Math.cos(this.a) * 20;
                        const dy = Math.sin(this.a) * 20;
                        Blast.create({ x: this.x + dx, y: this.y + dy, dx, dy, ship: this });
                        this.accelerate(-C.SHIP_ACCELERATION);
                    }
                    move() {
                        if (this.wasHit) {
                            if (++this.wasHit > 60) this.reset();
                        } else {
                            if (this.forward) this.accelerate(C.SHIP_ACCELERATION);
                            if (this.left) this.a -= C.SHIP_TURN_SPEED;
                            if (this.right) this.a += C.SHIP_TURN_SPEED;
                        }
                        super.move();
                    }
                    accelerate(accel) {
                        this.dx = Math.max(-C.SHIP_MAX_SPEED, Math.min(C.SHIP_MAX_SPEED, this.dx + Math.cos(this.a) * accel));
                        this.dy = Math.max(-C.SHIP_MAX_SPEED, Math.min(C.SHIP_MAX_SPEED, this.dy + Math.sin(this.a) * accel));
                    }
                    setInitials(initials) {
                        if (!initials) return;
                        for (const ship of this.game.ships.values()) {
                            if (ship.initials === initials) return;
                        }
                        const highscore = this.game.highscores[this.initials];
                        if (highscore !== undefined) delete this.game.highscores[this.initials];
                        this.initials = initials;
                        this.game.setHighscore(this.initials, Math.max(this.score, highscore || 0));
                    }
                    scored() {
                        this.score++;
                        if (this.initials) this.game.setHighscore(this.initials, this.score);
                    }
                    hitBy(asteroid) {
                        this.wasHit = 1;
                        asteroid.wasHit = 1;
                    }
                }
                Ship.register("Ship");

                class Asteroid extends SpaceObject {
                    init({ size, x, y, a, dx, dy, da }) {
                        super.init();
                        if (size) {
                            this.size = size; this.x = x; this.y = y; this.a = a;
                            this.dx = dx; this.dy = dy; this.da = da;
                        } else {
                            this.size = 40;
                            this.x = this.random() * 400 - 200;
                            this.y = this.random() * 400 - 200;
                            this.a = this.random() * Math.PI * 2;
                            const speed = this.random() * 4 + 1;
                            this.dx = Math.cos(this.a) * speed;
                            this.dy = Math.sin(this.a) * speed;
                            this.da = (0.02 + this.random() * 0.03) * (this.random() < 0.5 ? 1 : -1);
                            this.wasHit = 0;
                            this.move();
                        }
                        this.game.asteroids.add(this);
                    }
                    move() {
                        if (this.wasHit) {
                            if (++this.wasHit > this.size) return this.destroy();
                        }
                        super.move();
                    }
                    hitBy(blast) {
                        blast.ship.scored();
                        if (this.size > 20) {
                            this.size *= 0.7;
                            this.da *= 1.5;
                            this.dx = -blast.dy * 10 / this.size;
                            this.dy = blast.dx * 10 / this.size;
                            Asteroid.create({ size: this.size, x: this.x, y: this.y, a: this.a, dx: -this.dx, dy: -this.dy, da: this.da });
                        } else {
                            this.wasHit = 1;
                        }
                        blast.destroy();
                    }
                    destroy() {
                        this.game.asteroids.delete(this);
                        super.destroy();
                        if (this.game.asteroids.size < 5) Asteroid.create({});
                    }
                }
                Asteroid.register("Asteroid");

                class Blast extends SpaceObject {
                    init({x, y, dx, dy, ship}) {
                        super.init();
                        this.ship = ship; this.x = x; this.y = y; this.dx = dx; this.dy = dy;
                        this.t = 0;
                        this.game.blasts.add(this);
                    }
                    move() {
                        this.t++;
                        if (this.t > 30) return this.destroy();
                        super.move();
                    }
                    destroy() {
                        this.game.blasts.delete(this);
                        super.destroy();
                    }
                }
                Blast.register("Blast");

                class Display extends Multisynq.View {
                    constructor(model) {
                        super(model);
                        this.model = model;
                        const joystick = document.getElementById("joystick");
                        const knob = document.getElementById("knob");

                        document.onkeydown = (e) => {
                            joystick.style.display = "none";
                            if (e.repeat) return;
                            switch (e.key) {
                                case "a": case "A": case "ArrowLeft":  this.publish(this.viewId, "left-thruster", true); break;
                                case "d": case "D": case "ArrowRight": this.publish(this.viewId, "right-thruster", true); break;
                                case "w": case "W": case "ArrowUp":    this.publish(this.viewId, "forward-thruster", true); break;
                                case "s": case "S": case " ":          this.publish(this.viewId, "fire-blaster"); break;
                            }
                        };
                        document.onkeyup = (e) => {
                            if (e.repeat) return;
                            switch (e.key) {
                                case "a": case "A": case "ArrowLeft":  this.publish(this.viewId, "left-thruster", false); break;
                                case "d": case "D": case "ArrowRight": this.publish(this.viewId, "right-thruster", false); break;
                                case "w": case "W": case "ArrowUp":    this.publish(this.viewId, "forward-thruster", false); break;
                            }
                        };

                        let jx = 0, jy = 0, jid = 0, jright = false, jleft = false, jfwd = false;
                        document.onpointerdown = (e) => {
                            if (!jid) {
                                jid = e.pointerId;
                                jx = e.clientX; jy = e.clientY;
                                joystick.style.left = `${jx - 60}px`;
                                joystick.style.top = `${jy - 60}px`;
                                joystick.style.display = "block";
                            }
                        };
                        document.onpointermove = (e) => {
                            e.preventDefault();
                            if (jid === e.pointerId) {
                                let dx = e.clientX - jx, dy = e.clientY - jy;
                                if (dx > 30) { dx = 30; if (!jright) { this.publish(this.viewId, "right-thruster", true); jright = true; } } else if (jright) { this.publish(this.viewId, "right-thruster", false); jright = false; }
                                if (dx < -30) { dx = -30; if (!jleft) { this.publish(this.viewId, "left-thruster", true); jleft = true; } } else if (jleft) { this.publish(this.viewId, "left-thruster", false); jleft = false; }
                                if (dy < -30) { dy = -30; if (!jfwd) { this.publish(this.viewId, "forward-thruster", true); jfwd = true; } } else if (jfwd) { this.publish(this.viewId, "forward-thruster", false); jfwd = false; }
                                if (dy > 0) dy = 0;
                                knob.style.left = `${20 + dx}px`;
                                knob.style.top = `${20 + dy}px`;
                            }
                        }
                        document.onpointerup = (e) => {
                            e.preventDefault();
                            if (jid === e.pointerId) {
                                jid = 0;
                                if (!jright && !jleft && !jfwd) this.publish(this.viewId, "fire-blaster");
                                if (jright) { this.publish(this.viewId, "right-thruster", false); jright = false; }
                                if (jleft) { this.publish(this.viewId, "left-thruster", false); jleft = false;  }
                                if (jfwd) { this.publish(this.viewId, "forward-thruster", false); jfwd = false; }
                                knob.style.left = `20px`; knob.style.top = `20px`;
                            } else {
                                this.publish(this.viewId, "fire-blaster");
                            }
                        }
                        document.onpointercancel = document.onpointerup;
                        document.oncontextmenu = e => { e.preventDefault();  this.publish(this.viewId, "fire-blaster"); }
                        document.ontouchend = e => e.preventDefault();

                        initials.ontouchend = () => initials.focus();
                        initials.onchange = () => {
                            localStorage.setItem("io.multisynq.multiblaster.initials", initials.value);
                            this.publish(this.viewId, "set-initials", initials.value);
                        }
                        if (localStorage.getItem("io.multisynq.multiblaster.initials")) {
                            initials.value = localStorage.getItem("io.multisynq.multiblaster.initials");
                            this.publish(this.viewId, "set-initials", initials.value);
                            setTimeout(() => this.publish(this.viewId, "set-initials", initials.value), 1000);
                        }
                        initials.onkeydown = (e) => { if (e.key === "Enter") { initials.blur(); e.preventDefault(); } }

                        this.smoothing = new WeakMap();
                        this.context = canvas.getContext("2d");
                    }

                    detach() {
                        super.detach();
                        document.onkeydown = null; document.onkeyup = null;
                        document.onpointerdown = null; document.onpointermove = null;
                        document.onpointerup = null; document.onpointercancel = null;
                        document.oncontextmenu = null;
                        initials.onchange = null; initials.onkeydown = null; initials.ontouchend = null;
                    }

                    update() {
                        this.context.clearRect(0, 0, 1000, 1000);
                        this.context.fillStyle = "rgba(255, 255, 255, 0.5)";
                        this.context.lineWidth = 3;
                        this.context.strokeStyle = "white";
                        this.context.font = "30px sans-serif";
                        this.context.textAlign = "left";
                        this.context.textBaseline = "middle";

                        const highscore = Object.entries(this.model.highscores);
                        const labels = new Map();
                        for (const ship of this.model.ships.values()) {
                            let label = ship.initials || `Player ${labels.size + 1}`;
                            if (!ship.initials) highscore.push([label, ship.score]);
                            labels.set(ship, label);
                        }

                        for (const [i, [label, score]] of highscore.sort((a, b) => b[1] - a[1]).entries()) {
                            this.context.fillText(`${i + 1}. ${label}: ${score}`, 10, 30 + i * 35);
                        }

                        this.context.font = "40px sans-serif";
                        for (const ship of this.model.ships.values()) {
                            const { x, y, a } = this.smoothPosAndAngle(ship);
                            this.drawWrapped(x, y, 300, () => {
                                this.context.textAlign = "right";
                                this.context.fillText(labels.get(ship), -30 + ship.wasHit * 2, 0);
                                this.context.textAlign = "left";
                                this.context.fillText(ship.score, 30 - ship.wasHit * 2, 0);
                                this.context.rotate(a);
                                if (ship.wasHit) this.drawShipDebris(ship.wasHit);
                                else this.drawShip(ship, ship.viewId === this.viewId);
                            });
                        }
                        for (const asteroid of this.model.asteroids) {
                            const { x, y, a } = this.smoothPosAndAngle(asteroid);
                            this.drawWrapped(x, y, 60, () => {
                                this.context.rotate(a);
                                if (asteroid.wasHit) this.drawAsteroidDebris(asteroid.size, asteroid.wasHit * 2);
                                else this.drawAsteroid(asteroid.size);
                            });
                        }
                        for (const blast of this.model.blasts) {
                            const { x, y } = this.smoothPos(blast);
                            this.drawWrapped(x, y, 5, () => this.drawBlast());
                        }
                    }

                    smoothPos(obj) {
                        if (!this.smoothing.has(obj)) this.smoothing.set(obj, { x: obj.x, y: obj.y, a: obj.a });
                        const smoothed = this.smoothing.get(obj);
                        const dx = obj.x - smoothed.x, dy = obj.y - smoothed.y;
                        if (Math.abs(dx) < 50) smoothed.x += dx * 0.3; else smoothed.x = obj.x;
                        if (Math.abs(dy) < 50) smoothed.y += dy * 0.3; else smoothed.y = obj.y;
                        return smoothed;
                    }

                    smoothPosAndAngle(obj) {
                        const smoothed = this.smoothPos(obj);
                        const da = obj.a - smoothed.a;
                        if (Math.abs(da) < 1) smoothed.a += da * 0.3; else smoothed.a = obj.a;
                        return smoothed;
                    }

                    drawWrapped(x, y, size, draw) {
                        const drawIt = (x, y) => { this.context.save(); this.context.translate(x, y); draw(); this.context.restore(); }
                        drawIt(x, y);
                        if (x - size < 0) drawIt(x + 1000, y); if (x + size > 1000) drawIt(x - 1000, y);
                        if (y - size < 0) drawIt(x, y + 1000); if (y + size > 1000) drawIt(x, y - 1000);
                        if (x - size < 0 && y - size < 0) drawIt(x + 1000, y + 1000); if (x + size > 1000 && y + size > 1000) drawIt(x - 1000, y - 1000);
                        if (x - size < 0 && y + size > 1000) drawIt(x + 1000, y - 1000); if (x + size > 1000 && y - size < 0) drawIt(x - 1000, y + 1000);
                    }

                    drawShip(ship, highlight) {
                        this.context.beginPath();
                        this.context.moveTo(+20, 0); this.context.lineTo(-20, +10); this.context.lineTo(-20, -10); this.context.closePath();
                        this.context.stroke();
                        if (highlight) this.context.fill();
                        if (ship.forward) { this.context.moveTo(-20, +5); this.context.lineTo(-30, 0); this.context.lineTo(-20, -5); this.context.stroke(); }
                        if (ship.left) { this.context.moveTo(-18, -9); this.context.lineTo(-13, -15); this.context.lineTo(-10, -7); this.context.stroke(); }
                        if (ship.right) { this.context.moveTo(-18, +9); this.context.lineTo(-13, +15); this.context.lineTo(-10, +7); this.context.stroke(); }
                    }

                    drawShipDebris(t) { this.context.beginPath(); this.context.moveTo(+20 + t, 0 + t); this.context.lineTo(-20 + t, +10 + t); this.context.moveTo(-20 - t * 1.4, +10); this.context.lineTo(-20 - t * 1.4, -10); this.context.moveTo(-20 + t, -10 - t); this.context.lineTo(+20 + t, 0 - t); this.context.stroke(); }
                    drawAsteroid(size) { this.context.beginPath(); this.context.moveTo(+size, 0); this.context.lineTo(0, +size); this.context.lineTo(-size, 0); this.context.lineTo(0, -size); this.context.closePath(); this.context.stroke(); }
                    drawAsteroidDebris(size, t) { this.context.beginPath(); this.context.moveTo(+size + t, 0 + t); this.context.lineTo(0 + t, +size + t); this.context.moveTo(-size - t, 0 - t); this.context.lineTo(0 - t, -size - t); this.context.moveTo(-size - t, 0 + t); this.context.lineTo(0 - t, +size + t); this.context.moveTo(+size + t, 0 - t); this.context.lineTo(0 + t, -size - t); this.context.stroke(); }
                    drawBlast() { this.context.beginPath(); this.context.ellipse(0, 0, 2, 2, 0, 0, 2 * Math.PI); this.context.closePath(); this.context.stroke(); }
                }

                Multisynq.App.makeWidgetDock();
                Multisynq.Session.join({
                    apiKey: "1_i5n2q17n3e1u1k1m1y1y1e1g1h1r1b",
                    appId: "io.multisynq.multiblaster",
                    name: Multisynq.App.autoSession(),
                    password: Multisynq.App.autoPassword(),
                    model: Game,
                    view: Display,
                });
                        </script>
                    </body>
                </html>
                ]]>
            </code>
        </example>
    </examples>
</documentation>
