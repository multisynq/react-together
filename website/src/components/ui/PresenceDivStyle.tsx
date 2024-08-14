import ColorHash from 'color-hash'
import { useHoveringViews } from 'react-together'
import { useHoveringViewsOptions } from 'react-together/dist/hooks/useHoveringViews'

const colorHash = new ColorHash()

type PresenceDivStyleProps = {
  rtKey: string
  children: React.ReactNode
  className?: string
  options?: useHoveringViewsOptions
  style?: React.CSSProperties // New style prop
}

export function PresenceDivStyle({
  rtKey,
  children,
  className,
  options,
  style: externalStyle, // Destructure style prop
}: PresenceDivStyleProps) {
  const debug = false
  const [ref, hoveringViews] = useHoveringViews(rtKey, options)

  let style: React.CSSProperties = { ...externalStyle } // Start with external styles

  if (hoveringViews.length > 0) {
    const color = colorHash.hex(hoveringViews[0])
    style = {
      ...style, // Merge with existing styles
      outline: `3px solid ${color}`,
      animation: 'clippath 10s linear infinite',
      borderRadius: '12px',
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
