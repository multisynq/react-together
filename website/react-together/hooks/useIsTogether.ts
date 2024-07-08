import useReactTogetherContext from './useReactTogetherContext'

export default function useIsTogether() {
  const { isTogether } = useReactTogetherContext()
  return isTogether
}
