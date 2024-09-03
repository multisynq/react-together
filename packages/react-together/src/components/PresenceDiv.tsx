import { useViewId } from '@croquet/react'
import ColorHash from 'color-hash'
import { useHoveringViews } from '../hooks'

const colorHash = new ColorHash()

type PresenceDivProps = {
  rtKey: string
  children: ReactChildren
  className?: string
  highlightMyself?: boolean
}
export default function PresenceDiv({
  rtKey,
  children,
  className,
  highlightMyself
}: PresenceDivProps) {
  const debug = false
  const [ref, hoveringViews, isHovering] = useHoveringViews(rtKey)
  const viewId = useViewId()

  let style = {}
  const views = highlightMyself
    ? hoveringViews
    : hoveringViews.filter((v) => v !== viewId)
  if (views.length > 0 || (highlightMyself && isHovering)) {
    const color = colorHash.hex(views[0] ?? rtKey)
    style = {
      outline: `2px solid ${color}`,
      animation: 'clippath 3s linear infinite',
      borderRadius: '10px'
    }
  }

  return (
    <>
      {debug && <div>Hovering Ids: {JSON.stringify(hoveringViews)}</div>}
      <div ref={ref} style={style} {...{ className }}>
        {children}
      </div>
    </>
  )
}
