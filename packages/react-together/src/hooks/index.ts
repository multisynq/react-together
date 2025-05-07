import useAllNicknames from './useAllNicknames'
import useChat from './useChat'
import useConnectedUsers from './useConnectedUsers'
import useCreateRandomSession from './useCreateRandomSession'
import useCursors from './useCursors'
import useFunctionTogether from './useFunctionTogether'
import useHoveringUsers from './useHoveringUsers'
import useIsSynchronized from './useIsSynchronized'
import useJoinUrl from './useJoinUrl'
import useLeaveSession from './useLeaveSession'
import useMyId from './useMyId'
import useNicknames from './useNicknames'
import useStateTogether from './useStateTogether'
import useStateTogetherWithPerUserValues from './useStateTogetherWithPerUserValues'

// Create hook alias from @multisynq/react
import { useIsJoined } from '@multisynq/react'
const useIsTogether = useIsJoined

export {
  useAllNicknames,
  useChat,
  useConnectedUsers,
  useCreateRandomSession,
  useCursors,
  useFunctionTogether,
  useHoveringUsers,
  useIsSynchronized,
  useIsTogether,
  useJoinUrl,
  useLeaveSession,
  useMyId,
  useNicknames,
  useStateTogether,
  useStateTogetherWithPerUserValues
}
