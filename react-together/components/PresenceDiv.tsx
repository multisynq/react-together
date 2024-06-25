import ColorHash from 'color-hash'
import useHoveringViews from '../hooks/useHoveringViews'

const colorHash = new ColorHash()

type PresenceDivProps = {
  id: string
  children: ReactChildren
}
export default function PresenceDiv({ id, children }: PresenceDivProps) {
  const debug = false
  const [ref, hoveringViews] = useHoveringViews(id)

  let style = {}
  if (hoveringViews.length > 0) {
    const color = colorHash.hex(hoveringViews[0])
    style = {
      border: `2px solid ${color}`,
      animation: 'clippath 3s linear infinite',
      borderRadius: '10px'
    }
  }

  return (
    <>
      {debug && <div>Hovering Ids: {JSON.stringify(hoveringViews)}</div>}
      <div ref={ref} style={style}>
        {children}
      </div>
    </>
  )
}
