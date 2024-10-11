import ReactTogetherModel from './models/ReactTogetherModel'

// Re-export from @croquet/react -> into Croquet object
import {
  App,
  Constants,
  CroquetReactView,
  Data,
  Model,
  ReactModel,
  Session,
  View,
  createCroquetSession,
  // Not exporting this hook since we override it on react-together
  // useJoinedViews,
  useCroquetContext,
  useDetachCallback,
  useIsJoined,
  useLeaveSession,
  useModelById,
  useModelRoot,
  useModelSelector,
  usePublish,
  useReactModelRoot,
  useSession,
  useSessionId,
  useSetSession,
  useSubscribe,
  useSyncedCallback,
  useUpdateCallback,
  useView,
  useViewId
} from '@croquet/react'

export const Croquet = {
  App,
  Constants,
  CroquetReactView,
  Data,
  Model,
  ReactModel,
  Session,
  View,
  createCroquetSession,
  // Not exporting this hook since we override it on react-together
  // useJoinedViews,
  useCroquetContext,
  useDetachCallback,
  useIsJoined,
  useModelById,
  useModelRoot,
  useLeaveSession,
  useModelSelector,
  usePublish,
  useReactModelRoot,
  useSession,
  useSessionId,
  useSetSession,
  useSubscribe,
  useSyncedCallback,
  useUpdateCallback,
  useView,
  useViewId
}

export type { CroquetSession, CroquetSessionParameters } from '@croquet/react'
export * from './components'
export * from './hooks'
export { ReactTogetherModel, useLeaveSession }

// Create hook alias
const useIsTogether = useIsJoined
const useMyId = useViewId
export { useIsTogether, useMyId }
