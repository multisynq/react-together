import { CELL_SIZE } from '../constants'
import CoinSVG from './CoinSVG'

interface CoinProps {
  x: number
  y: number
}
export default function Coin({ x, y }: CoinProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        left: `${x * CELL_SIZE}px`,
        top: `${y * CELL_SIZE}px`
      }}
    >
      <CoinSVG />
    </div>
  )
}
