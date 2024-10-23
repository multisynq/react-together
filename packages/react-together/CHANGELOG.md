## 0.2.0 Prerelease

### 0.2.0-3
 - Added `useCreateRandomSession` hook
 - Added `useIsTogether` hook
 - Added `useJoinUrl`
 - Added `useLeaveSession` hook
 - Added `useMyId` hook
 - Added `SessionManager` component
 - Added `name` prop to `ReactTogether.sessionParams`
 - Added `password` prop to `ReactTogether.sessionParams`
 - Added `highlightMyself` prop to `HoverHighlighter` component
 - Added `SESSION_NAME_PARAM` and `SESSION_PASSWORD_PARAM` constants
 - Renamed `ConnectedViews` to `ConnectedUsers` (old name still available as an alias)
 - Renamed `PresenceDiv` to `HoverHighlighter` (old name still available as an alias)
 - Renamed `useConnectedViews` to `useConnectedUsers` (old name still available as an alias)
 - Renamed `useHoveringViews` to `useHoveringUsers` (old name still available as an alias)
 - `useHoveringUsers` now returns whether the local user is hovering the targeted element
 - `useHoveringUsers` options do not receive the `highlightMyself` parameter anymore
 - `ReactTogether` component joins session if `rtName` and `rtPwd` specified in URL search parameters
 - Reexport `@croquet/react` as `CroquetReact` object
 - Removed `ReactTogetherContext`
 - Removed `useReactTogetherContext`

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
