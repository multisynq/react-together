import ColorHash from 'color-hash'
import { useHoveringViews } from '../hooks'
import { useHoveringViewsOptions } from '../hooks/useHoveringViews'

const colorHash = new ColorHash()

type PresenceDivProps = {
  rtKey: string
  children: ReactChildren
  className?: string
  options?: useHoveringViewsOptions
}
export default function PresenceDiv({
  rtKey,
  children,
  className,
  options
}: PresenceDivProps) {
  const debug = false
  const [ref, hoveringViews] = useHoveringViews(rtKey, options)

  let style = {}
  if (hoveringViews.length > 0) {
    const color = colorHash.hex(hoveringViews[0])
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
