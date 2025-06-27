# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

**Main Repository (Monorepo)**
```bash
npm install              # Install all dependencies across workspaces
npm run build           # Build all packages
npm run website         # Start the documentation website (localhost:5173)
npm run playground      # Start the playground development environment
```

**React Together Package** (`packages/react-together/`)
```bash
npm run build          # TypeScript compilation + Vite build
npm run watch          # Build in watch mode for development
npm run lint           # ESLint validation
npm run prettier       # Code formatting check
npm test              # Run Jest tests
```

**Standalone Demos**
```bash
# Context pattern demo
cd standalone-activitysynq-test && npm run build

# Global pattern demo 
cd standalone-activitysynq-global-demo && npm run build
```

**Testing**
```bash
npm run test:e2e       # Run Playwright end-to-end tests
npm run test:e2e:ui    # Run Playwright tests with UI
npm run test:e2e:headed # Run Playwright tests in headed mode with debug
```

## Architecture Overview

React Together is a real-time multi-user collaboration library built on top of **@multisynq/react** (Croquet framework). The architecture follows a Model-View pattern where:

### Core Architecture Patterns

**1. Multisynq Foundation**
- All real-time functionality built on `@multisynq/react` (Croquet)
- ReactModel classes serve as single source of truth for shared state
- Models run deterministically across all connected clients
- Views subscribe to model changes using `useModelSelector`, `usePublish`, `useView`

**2. ActivitySynq - Dual Implementation Pattern**
The flagship ActivitySynq feature has **two distinct implementation patterns**:

**Context Pattern** (Traditional React Context):
```typescript
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

// Requires provider wrapper
<ActivitySynqProvider config={config}>
  <App />
</ActivitySynqProvider>

// Hook only works inside provider
const { registerActivity, activities } = useActivitySynq()
```

**Global Pattern** (Singleton like react-toastify):
```typescript
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

// Single component placement anywhere
<ActivitySynqGlobal config={config} />

// Hook works globally without provider
const { registerActivity, activities } = useActivitySynqGlobal()
```

**Key Implementation Details:**
- Both patterns use identical `ActivityModel` for state synchronization
- Global pattern uses `ActivitySynqGlobalManager` singleton with `BrowserEventEmitter`
- Context pattern uses `MultisynqRoot` with direct `@multisynq/react` hooks
- Clean export separation prevents pattern confusion

### Package Structure

**Main Package** (`packages/react-together/src/`):
- `/context/` - Context pattern implementation
- `/global/` - Global pattern implementation (new)
- `/models/` - Multisynq ReactModel classes (ActivityModel, ChatModel, etc.)
- `/hooks/` - React hooks wrapping Multisynq functionality
- `/components/` - Pre-built UI components (Chat, Cursors, SessionManager)
- `/utils/` - Utility functions for session management

**Key Models:**
- `ActivityModel` - Real-time activity tracking and synchronization
- `ChatModel` - Multi-user chat functionality
- `ReactTogetherModel` - Core session and state management

### Development Patterns

**Multisynq/Croquet Integration:**
- Models extend `ReactModel` and must call `ReactModel.register('ModelName')`
- Models use `this.subscribe()` for event handling and `this.publish()` for broadcasting
- Views use `useModelSelector()` for reactive state access
- All state changes go through Models for proper synchronization

**Session Management:**
- Sessions require `apiKey`, `appId`, `sessionName`, `sessionPassword`
- User identification through `userId` in `viewData`
- Stable session configuration prevents reconnection loops

**Testing Strategy:**
- Playwright for end-to-end multi-user testing
- Jest for unit tests
- Standalone demos for pattern verification
- Mock utilities in `/testing/test-utils.tsx`

## Important Files

**Architecture Documentation:**
- `ACTIVITYSYNQ_ARCHITECTURE.md` - Complete ActivitySynq implementation guide
- `ACTIVITYSYNQ_MULTI_USER.md` - Multi-user testing patterns

**Package Entry Points:**
- `packages/react-together/src/index.ts` - Main exports with clean pattern separation
- `packages/react-together/src/context/index.ts` - Context pattern exports
- `packages/react-together/src/hooks/index.ts` - All React hooks

**Models:**
- `packages/react-together/src/models/ActivityModel.ts` - Core activity synchronization
- `packages/react-together/src/models/ReactTogetherModel.ts` - Session management

**Global Pattern Implementation:**
- `packages/react-together/src/global/ActivitySynqGlobalManager.ts` - Singleton manager
- `packages/react-together/src/global/BrowserEventEmitter.ts` - Browser-compatible EventEmitter
- `packages/react-together/src/global/ActivitySynqGlobal.tsx` - Portal-based component

## Coding Standards

**Variable Naming:**
- Use `camelCase` for variables and functions
- Use descriptive full names: `numberOfUsers` not `numUsers`
- Boolean variables with verbs: `isLoggedIn`, `canAccess`, `hasPermission`

**React Together Specific:**
- Models should handle all state changes through deterministic methods
- Views should only read state and publish events, never directly mutate
- Session configurations should be memoized to prevent reconnection loops
- Activity data should include `userId` for proper attribution

**TypeScript:**
- Full type safety required - package exports comprehensive type definitions
- Generic activity types: `ActivityEvent<T>` for typed activity data
- Proper interface definitions for all public APIs

## Environment Setup

**Required Environment Variables:**
- `VITE_API_KEY` - Multisynq API key for development
- `VITE_APP_ID` - Application identifier for session isolation

**Browser Compatibility:**
- Custom `BrowserEventEmitter` replaces Node.js `events` module
- Portal-based rendering for global pattern components
- CSS imports handled via Vite side effects configuration