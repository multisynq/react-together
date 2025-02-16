import ConnectedUsers from './ConnectedUsers'
import HoverHighlighter from './HoverHighlighter'
import ReactTogether from './ReactTogether'
import SessionManager from './SessionManager'

// Backwards compatible alias
const ConnectedViews = ConnectedUsers
const PresenceDiv = HoverHighlighter

export * from './Chat'
export * from './Cursors'
export {
  ConnectedUsers,
  ConnectedViews,
  HoverHighlighter,
  PresenceDiv,
  ReactTogether,
  SessionManager
}
