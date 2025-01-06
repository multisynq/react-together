import Chat from './Chat'
import ConnectedUsers from './ConnectedUsers'
import HoverHighlighter from './HoverHighlighter'
import ReactTogether from './ReactTogether'
import SessionManager from './SessionManager'

// Backwards compatible alias
const ConnectedViews = ConnectedUsers
const PresenceDiv = HoverHighlighter

export * from './Chat'
export {
  Chat,
  ConnectedUsers,
  ConnectedViews,
  HoverHighlighter,
  PresenceDiv,
  ReactTogether,
  SessionManager
}
