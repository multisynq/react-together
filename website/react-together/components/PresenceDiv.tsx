import ColorHash from 'color-hash'
import useHoveringViews from '../hooks/useHoveringViews'

const colorHash = new ColorHash()

type PresenceDivProps = {
  id: string
  children: ReactChildren
  className?: string
}
export default function PresenceDiv({ id, children, className }: PresenceDivProps) {
  const debug = false
  const [ref, hoveringViews] = useHoveringViews(id)

  let style = {}
  if (hoveringViews.length > 0) {
    const color = colorHash.hex(hoveringViews[0])
    style = {
      outline: `2px solid ${color.replace(')', ', 0.5)')}`,
      animation: 'clippath 3s linear infinite',
      borderRadius: '8px',
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
