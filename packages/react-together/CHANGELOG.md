## Next release
 - Added `Cursors` component
 - Added `useCursors` hook
 - Added `useNicknames` hook
 - Added `useAllNicknames` hook
 - Added `throttleDelay` option to `useStateTogether`
 - Added `throttleDelay` option to `useStateTogetherWithPerUserValues`
 - Added `rememberUsers` prop to `ReactTogether` component
 - Added `deriveNickname` prop to `ReactTogether` component
 - Added `nickname` property to `ConnectedUser` interface
 - Deprecated `name` property in `ConnectedUser` interface

## 0.3.2
`2025-01-10`

 - Fixed `useStateTogether` bug with `undefined` values
 - Added `ChatMessage` interface

## 0.3.1
`2025-01-09`

 - Added `omitMyValue` option flag in `useStateTogetherWithPerUserValues`
 - Added `useChat` hook
 - Added `<Chat/>` component

## 0.3.0
`2024-12-13`

 - Added `resetOnDisconnect` option flag in `useStateTogether`
 - Added `resetOnDisconnect` option flag in `useStateTogetherWithPerUserValues`
 - Added `resetOnConnect` option flag in `useStateTogetherWithPerUserValues`
 - Added `keepValues` option flag in `useStateTogetherWithPerUserValues`
 - Added `overwriteSessionValue` option flag in `useStateTogetherWithPerUserValues`
 - Added `userId` prop to `ReactTogether` component
 - Removed `sessionIgnoresUrl` attribute from `ReactTogether.sessionParams` property
 - Added `sessionIgnoresUrl` prop to `ReactTogether` component
 - Include `CHANGELOG.md` in package

## 0.2.0
`2024-11-01`

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
 - Added `<ReactTogether/>` context provider
