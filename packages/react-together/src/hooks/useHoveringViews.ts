import { useViewId } from '@croquet/react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useStateTogetherWithPerUserValues } from '../hooks'

interface CustomMouseEvent extends MouseEvent {
  rtProcessedBy?: string
}

export interface UseHoveringViewsOptions {}
export default function useHoveringViews(
  rtKey: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: UseHoveringViewsOptions = {}
): [MutableRefObject<HTMLDivElement | null>, string[], boolean] {
  const myViewId = useViewId()

  const ref = useRef<HTMLDivElement | null>(null)
  const [isHovering, set_hovering, allHovered] =
    useStateTogetherWithPerUserValues<boolean>(rtKey, false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    /**
     * The goal is to ensure that only the innermost element that was hovered
     * over is marked as being hovered, and none of its parent elements are
     * marked as hovered.
     *
     * To achieve this, we use the `rtProcessedBy` property to keep track of the
     * `rtKey` of the first element that processed this mouse over event.
     *
     * If the `rtProcessedBy` property is `undefined`, it means this is the first
     * element in the hierarchy that has processed the event. In this case, we
     * set the `hovering` state to `true` and update the `rtProcessedBy` property
     * with the current `rtKey`.
     *
     * If the `rtProcessedBy` property is defined and does not match the current
     * `rtKey`, it means this event has already been processed by a child element.
     * In this case, we set the `hovering` state to `false` to ensure that this
     * element is not marked as hovered.
     *
     *
     * It's important to note that we cannot use the current value of the `hovering`
     * state to minimize the number of events published to the model. This is because
     * the `hovering` state may not reflect the most up to date state of the component.
     *
     * E.g. If a user runs their mouse through the component, the `handleMouseOver`
     * and `handleMouseLeave` handlers will be executed. It's possible that
     * `handleMouseLeave` executes *before* the `set_hovering` event is processed by
     * the model. In this scenario, the value of `hovering` will be `false` during
     * the execution of `handleMouseLeave`, and if we use it to suppress publishing
     * a `set_hovering` to the model, `hovering` will end up with a stale `true` value.
     */
    const handleMouseOver = (e: CustomMouseEvent) => {
      const rtProcessedBy = e.rtProcessedBy
      if (rtProcessedBy === undefined) {
        set_hovering(true)
        e.rtProcessedBy = rtKey
      } else if (rtProcessedBy !== rtKey) {
        set_hovering(false)
      }
    }

    const handleMouseLeave = () => set_hovering(false)

    node.addEventListener('mouseover', handleMouseOver)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseover', handleMouseOver)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [set_hovering, rtKey])

  const hoveringViews = Object.entries(allHovered)
    .filter(([, isHovering]) => isHovering)
    .map(([viewId]) => viewId)

  return [ref, hoveringViews, isHovering]
}
