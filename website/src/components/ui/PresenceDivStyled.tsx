import ColorHash from 'color-hash'
import { useHoveringViews } from 'react-together'
import { useHoveringViewsOptions } from 'react-together/dist/hooks/useHoveringViews'

const colorHash = new ColorHash()

type PresenceDivStyledProps = {
  rtKey: string
  children: React.ReactNode
  className?: string
  options?: useHoveringViewsOptions
}

export function PresenceDivStyled({ rtKey, children, className, options }: PresenceDivStyledProps) {
  const debug = false
  const [ref, hoveringViews] = useHoveringViews(rtKey, options)

  let style: React.CSSProperties = {} // Start with external styles

  if (hoveringViews.length > 0) {
    const color = colorHash.hex(hoveringViews[0])
    style = {
      outline: `3px solid ${color}`,
      animation: 'hoverBob 1.2s ease-in-out infinite',
      borderRadius: '8px',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
    }
  }

  return (
    <>
      {debug && <div>Hovering Ids: {JSON.stringify(hoveringViews)}</div>}
      <div ref={ref} style={style} className={className}>
        {children}
      </div>
    </>
  )
}
