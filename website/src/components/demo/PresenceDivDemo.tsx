import { PresenceDiv } from '../../../../react-together'

function getDarkerShade(hexColor: string): string {
  // Remove the hash if it's there
  const hex = hexColor.replace(/^#/, '')

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Darken each component by 20%
  const darkenFactor = 0.8
  const newR = Math.floor(r * darkenFactor)
  const newG = Math.floor(g * darkenFactor)
  const newB = Math.floor(b * darkenFactor)

  // Convert back to hex
  const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')

  return `#${newHex}`
}
interface PresenceDivDemoProps {
  height?: number
  rgb?: string
  rtidSuffix?: string
}
export function PresenceDivDemo({ height = 3, rtidSuffix = '', rgb = '#fff58c' }: PresenceDivDemoProps) {
  const rtid = 'useHoveringVeiwsDemo-' + rtidSuffix === '' ? 'root' : rtidSuffix

  const childRgb = getDarkerShade(rgb)
  return (
    <PresenceDiv rtid={rtid}>
      <div className={`min-w-5 min-h-5 border border-black rounded grid grid-cols-2 gap-2 p-2 `} style={{ backgroundColor: rgb }}>
        {height > 1 && (
          <>
            <PresenceDivDemo height={height - 1} rtidSuffix={`${rtidSuffix}a`} rgb={childRgb} />
            <PresenceDivDemo height={height - 1} rtidSuffix={`${rtidSuffix}b`} rgb={childRgb} />
            <PresenceDivDemo height={height - 1} rtidSuffix={`${rtidSuffix}c`} rgb={childRgb} />
            {/* <PresenceDivDemo height={height - 1} rtidSuffix={`${rtidSuffix}d`} rgb={childRgb} /> */}
          </>
        )}
      </div>
    </PresenceDiv>
  )
}
