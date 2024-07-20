import { useViewId } from '@croquet/react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useStateTogetherWithPerUserValues } from '../hooks'

export interface useHoveringViewsOptions {
  highlightMyself?: boolean
}

export default function useHoveringViews(
  rtid: string,
  options: useHoveringViewsOptions = {}
): [MutableRefObject<HTMLDivElement | null>, string[]] {
  const { highlightMyself = false } = options

  const myViewId = useViewId()

  const ref = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, set_hovering, allHovered] = useStateTogetherWithPerUserValues(
    rtid,
    false
  )

  useEffect(() => {
    const node = ref.current

    interface CustomMouseEvent extends MouseEvent {
      rtProcessedBy?: string
    }
    const handleMouseOver = (e: CustomMouseEvent) => {
      // We should only hover the innermost element, i.e. if an element
      // is hovered, none of its parents should be marked as hovered.

      // We use rtProcessedBy to record the rtid of the first element
      // that processed this event. If rtProcessedBy is defined,
      // then it was already processed by a child, and the current element
      // should not be hovered.
      const rtProcessedBy = e.rtProcessedBy
      if (rtProcessedBy === undefined) {
        set_hovering(true)
        e.rtProcessedBy = rtid
      } else if (rtProcessedBy !== rtid) {
        set_hovering(false)
      }
    }

    const handleMouseLeave = () => set_hovering(false)

    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [set_hovering, rtid])

  const hoveringViews = Object.entries(allHovered)
    .filter(
      ([viewId, isHovering]) =>
        isHovering && (viewId !== myViewId || highlightMyself)
    )
    .filter(([isHovering]) => isHovering)
    .map(([viewId]) => viewId)

  return [ref, hoveringViews]
}
