// import { useViewId } from '@croquet/react'
import { useHover } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useStateTogetherWithPerUserValues } from '../hooks'

export default function useHoveringViews(
  key: string
): [(instance: Element | null) => void, string[]] {
  const [ref, hovering] = useHover()
  // const myViewId = useViewId()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, set_hovering, allHovered] = useStateTogetherWithPerUserValues(
    key,
    hovering
  ) // a value per user that all users see

  useEffect(() => {
    // This does not create a loop
    // hovering comes from the useHover hook
    // and set_hovering sets the stateTogether
    set_hovering(hovering)
  }, [set_hovering, hovering])

  const hoveringViews = Object.entries(allHovered)
    // .filter(([viewId, isHovering]) => viewId !== myViewId && isHovering)
    .filter(([isHovering]) => isHovering)
    .map(([viewId]) => viewId)

  return [ref, hoveringViews]
}
