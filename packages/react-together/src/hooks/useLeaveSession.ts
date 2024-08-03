import useReactTogetherContext from './useReactTogetherContext'

export default function useLeaveSession() {
  const { leaveSession } = useReactTogetherContext()
  return leaveSession
}
