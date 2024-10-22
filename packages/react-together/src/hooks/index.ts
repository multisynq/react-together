import useConnectedUsers from './useConnectedUsers'
import useCreateRandomSession from './useCreateRandomSession'
import useFunctionTogether from './useFunctionTogether'
import useHoveringUsers from './useHoveringUsers'
import useJoinUrl from './useJoinUrl'
import useLeaveSession from './useLeaveSession'
import useStateTogether from './useStateTogether'
import useStateTogetherWithPerUserValues from './useStateTogetherWithPerUserValues'

// Create hook alias from @croquet/react
import { useIsJoined, useViewId } from '@croquet/react'
const useIsTogether = useIsJoined
const useMyId = useViewId

export {
  useConnectedUsers,
  useCreateRandomSession,
  useFunctionTogether,
  useHoveringUsers,
  useIsTogether,
  useJoinUrl,
  useLeaveSession,
  useMyId,
  useStateTogether,
  useStateTogetherWithPerUserValues
}
