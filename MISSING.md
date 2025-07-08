
# Missing Content for Comprehensive Multisynq Manual

This document outlines the topics missing from `multisynq-js.txt` to make it a complete, standalone developer manual for the `@multisynq/client` library. The existing file is a good quick-reference and AI instruction set, but lacks the conceptual depth required for a comprehensive guide.

---

## 1. Core Concepts & Architecture

The manual needs a foundational chapter explaining the "why" and "how" of Multisynq's architecture.

-   **"What is Multisynq?"**: A high-level introduction explaining the client-side synchronized architecture and its benefits over traditional client-server models. This should cover the core value proposition: building real-time multiuser apps without backend code.
-   **The Deterministic Virtual Machine**: An explanation of the "Teatime" architecture. This is the heart of Multisynq. The manual should explain that all model code runs inside a VM that ensures every user computes the exact same state at the exact same virtual time.
-   **The Reflector/Synchronizer Network**: A description of the role of the network. It should clarify that reflectors are simple, stateless message-passing servers responsible for ordering events and providing a unified source of time, not for running game logic.
-   **The Model-View Separation**: A more detailed explanation of this core principle, emphasizing that models must be completely self-contained and that views must never mutate model state directly.

## 2. In-Depth Feature Guides

Several key features are either mentioned only in passing or are missing entirely.

-   **Time Management**: A dedicated section on time.
    -   **Simulation Time vs. Wall-Clock Time**: Explain the difference and why it matters for determinism.
    -   **`now()`**: How to get the current, discrete simulation time.
    -   **`future(ms)`**: A detailed guide on scheduling future messages, its use in game loops, and the fact that it operates on simulation time.
    -   **`tps` (Ticks Per Second)**: An explanation of the `tps` parameter in `Session.join()` and its role as a heartbeat to advance time when no events are occurring.
-   **State Management: Snapshots vs. Persistence**:
    -   **Snapshots**: Explain the automatic snapshotting process, how it enables new users to join quickly, and its role in session continuity.
    -   **Persistence API (`persistSession`)**: A full guide on how to persist data across code changes. This is critical for production apps. It should cover when to use it, how it differs from snapshots, and best practices for data versioning.
-   **Data API (`Data.store` & `Data.fetch`)**: A complete section on handling large binary data. This is essential for apps that allow users to upload images, files, or other assets. It should include an explanation of `DataHandle` and the security implications of shareable vs. non-shareable handles.
-   **Security Model**:
    -   **End-to-End Encryption**: A clear statement about the security model, explaining that all session traffic is E2E encrypted using the session password.
    -   **Password Importance**: Emphasize that the password is the key and should be kept secret. Explain the security trade-offs of storing passwords on a server vs. generating them client-side.

## 3. Advanced Topics & Best Practices

To help developers build robust and performant applications, the manual needs a section on advanced techniques.

-   **View Smoothing & Interpolation**: This is a critical pattern for creating smooth visuals when the model updates at a lower frequency than the render loop. The manual should provide a conceptual explanation and a code example, similar to the "View Smoothing" tutorial.
-   **Structuring Complex Applications**: Guidance on how to organize larger apps. This should include patterns for managing nested models and communication between different parts of the model hierarchy.
-   **Performance Considerations**:
    -   **Event Throttling**: Best practices for limiting the rate of events published from the view to avoid network congestion, as demonstrated in the 3D animation tutorial.
    -   **`oncePerFrame` Subscriptions**: A clear recommendation to use this for high-frequency model updates (like position changes) to optimize view performance.
    -   **Model Complexity**: A brief discussion on how the complexity of the model can impact performance, especially during snapshotting.
-   **Debugging Strategies**: A dedicated chapter on debugging a Multisynq application.
    -   Explanation of the `debug` flags in `Session.join()`.
    -   Tips for identifying the cause of desynchronization ("divergence").
    -   How to use browser developer tools to inspect model and view state.

## 4. API Reference Enhancements

The existing API reference is a good start, but could be more comprehensive.

-   **`Session.join()` Parameters**: A detailed table explaining *all* available parameters, including `tps`, `autoSleep`, `rejoinLimit`, `eventRateLimit`, `viewData`, and `location`.
-   **`App` Object**: A full section documenting the `App` utility object, including `makeWidgetDock`, `autoSession`, and `autoPassword`.
-   **System Events**: A dedicated section for system-generated events like `"view-join"`, `"view-exit"`, and `"synced"`, explaining what they are, when they fire, and what data they provide.
