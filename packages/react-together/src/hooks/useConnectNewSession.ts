import useReactTogetherContext from './useReactTogetherContext'

export default function useCreateNewSession() {
  const { createNewSession } = useReactTogetherContext()
  return createNewSession
}
