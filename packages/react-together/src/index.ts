// Re-export @multisynq/react as is into MultisynqReact
import * as MultisynqReact from '@multisynq/react'
export { MultisynqReact }

// Context Pattern (Traditional React Context)
export {
  ActivitySynqProvider,
  useActivitySynq,
  type ActivityEvent,
  type ActivitySynqConfig,
  type ConnectionStatus,
  type IActivitySynqContext
} from './context/ActivitySynqContext'

// Global Pattern (Singleton/Portal Pattern like react-toastify)
export {
  ActivitySynqGlobal
} from './global/ActivitySynqGlobal'
export {
  useActivitySynqGlobal,
  type IActivitySynqGlobalContext
} from './global/useActivitySynqGlobal'

// Other hooks and components
export * from './hooks'
export * from './components'
export * from './context'

// Shared exports
export * from './models'
export * as testing from './testing'
export * as utils from './utils'
