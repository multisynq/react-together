## 0.2.0 Prerelease

### 0.2.0-3
 - Removed `ReactTogetherContext`
 - Removed `useReactTogetherContext`
 - Renamed `ConnectedViews` to `ConnectedUsers` (old name still available as an alias)
 - Renamed `PresenceDiv` to `HoverHighlighter` (old name still available as an alias)
 - Added prop `highlightMyself` to `HoverHighlighter` component
 - Exported `SESSION_NAME_PARAM` and `SESSION_PASSWORD_PARAM`
 - Added `name` prop to `ReactTogether`
 - Added `password` prop to `ReactTogether`
 - `ReactTogether` component joins session if `rtName` and `rtPwd` specified in URL search parameters
 - Added `SessionManager` component
 - Renamed `useConnectedViews` to `useConnectedUsers` (old name still available as an alias)
 - Renamed `useHoveringViews` to `useHoveringUsers` (old name still available as an alias)
 - Removed `useReactTogetherContext` hook
 - Added `useIsTogether` hook
 - Added `useMyId` hook
 - Added `useCreateRandomSession` hook
 - Added `useJoinUrl`
 - Added `useLeaveSession` hook

### 0.2.0-2
 - experimental `useFunctionTogether`

## 0.1.1
`2024-08-31`

 - Fixed bugs on `useStateTogether`
 - Fixed bugs on `useStateTogetherWithPerUserValues`

## 0.1.0
`2024-08-28`

 - Optimize `useStateTogether` and `useStateTogetherWithPerUserValues` to minimize unnecessary re-rendering
 - `useConnectedViews` does not return `null`
 - Allow to override the session model via `sessionParams.model` prop of the `<ReactTogether/>` component
 - Re-export `@croquet/react` module

## 0.0.2
`2024-08-15`

 - Added `sessionIgnoresUrl` param to `<ReactTogether/>` component

## 0.0.1
`2024-07-18`

 - Added `useStateTogether` hook
 - Added `useStateTogetherWithPerUserValues` hook
 - Added `useConnectedViews` hook
 - Added `useHoveringViews` hook
 - Added `useReactTogetherContext` hook
 - Added `<ConnectedViews/>` component
 - Added `<PresenceDiv/>` component
 - Added `<ReactTogether/>` context provider`
