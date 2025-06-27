// Re-export @multisynq/react as is into MultisynqReact
// export type { MultisynqSession, MultisynqSessionParameters } from '@multisynq/react'
import * as MultisynqReact from '@multisynq/react'
export { MultisynqReact }

export * from './components'
export {
  activitySynq,
  default as ActivitySynqContainer
} from './components/ActivitySynqGlobal'
export * from './context'
export * from './hooks'
export { default as useActivitySynqGlobal } from './hooks/useActivitySynqGlobal'
export * from './models'
export * as testing from './testing'
export * as utils from './utils'
