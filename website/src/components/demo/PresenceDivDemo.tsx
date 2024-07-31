import { useState } from 'react'
import { PresenceDiv } from '../../../../react-together'
function getDarkerShade(hexColor: string, darkenFactor = 0.8): string {
  // Remove the hash if it's there
  const hex = hexColor.replace(/^#/, '')

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Darken each component
  const newR = Math.floor(r * darkenFactor)
  const newG = Math.floor(g * darkenFactor)
  const newB = Math.floor(b * darkenFactor)

  // Convert back to hex
  const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')

  return `#${newHex}`
}
interface PresenceDivDemoProps {
  height: number
  color?: string
  rtidSuffix?: string
}
export function PresenceDivDemoRecursive({ height, color = '66cdf2', rtidSuffix = '' }: PresenceDivDemoProps) {
  const rtKey = 'useHoveringViewsDemo-' + rtidSuffix === '' ? 'root' : rtidSuffix
  const childRgb = getDarkerShade(color, 0.85)
  return (
    <PresenceDiv rtKey={rtKey}>
      <div className={`min-w-5 min-h-5 border border-black rounded grid grid-cols-2 gap-2 p-2 `} style={{ backgroundColor: color }}>
        {height > 1 && (
          <>
            <PresenceDivDemoRecursive height={height - 1} rtidSuffix={`${rtidSuffix}a`} color={childRgb} />
            <PresenceDivDemoRecursive height={height - 1} rtidSuffix={`${rtidSuffix}b`} color={childRgb} />
            <PresenceDivDemoRecursive height={height - 1} rtidSuffix={`${rtidSuffix}c`} color={childRgb} />
            {/* <PresenceDivDemo height={height - 1} rtidSuffix={`${rtidSuffix}d`} rgb={childRgb} /> */}
          </>
        )}
      </div>
    </PresenceDiv>
  )
}

export function PresenceDivDemo() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState('66cdf2')

  return (
    <>
      {/* {color} */}
      {/* <ColorPicker format='hex' value={color} onChange={(e) => setColor(e.value as string)} /> */}
      <PresenceDivDemoRecursive height={3} color={`#${color}`} />
    </>
  )
}
