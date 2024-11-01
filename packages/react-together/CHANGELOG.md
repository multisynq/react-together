### 0.2.0
 - Added `useFunctionTogether` hook
 - Added `useCreateRandomSession` hook
 - Added `useIsTogether` hook
 - Added `useJoinUrl`
 - Added `useLeaveSession` hook
 - Added `useMyId` hook
 - Added `SessionManager` component
 - Added `name` prop to `ReactTogether.sessionParams`
 - Added `password` prop to `ReactTogether.sessionParams`
 - Added `highlightMyself` prop to `HoverHighlighter` component
 - Added `utils` module with:
   - `getSessionNameFromUrl` function
   - `getSessionPasswordFromUrl` function
   - `getJoinUrl` function
   - `getCleanUrl` function
 - Renamed `ConnectedViews` to `ConnectedUsers`
 - Renamed `PresenceDiv` to `HoverHighlighter`
 - Renamed `useConnectedViews` to `useConnectedUsers`
 - Renamed `useHoveringViews` to `useHoveringUsers`
 - `useHoveringUsers` now returns whether the local user is hovering the targeted element
 - `useHoveringUsers` options do not receive the `highlightMyself` parameter anymore
 - `ReactTogether` component joins session if `rtName` and `rtPwd` specified in URL
 - Reexport `@croquet/react` as `CroquetReact` obj
 - Removed `useReactTogetherContext`

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
