import { Croquet } from 'react-together'
import { CELL_SIZE } from '../constants'
import { OverrideModel } from '../models'

const { useModelSelector } = Croquet

export default function Board() {
  const GRID_HEIGHT =
    useModelSelector((m: OverrideModel) => m.rpg.BOARD_HEIGHT) ?? 1
  const GRID_WIDTH =
    useModelSelector((m: OverrideModel) => m.rpg.BOARD_WIDTH) ?? 1
  return (
    <div
      className="relative grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, ${CELL_SIZE}px)`,
        backgroundImage:
          'linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
        backgroundSize: `${CELL_SIZE * 2}px ${CELL_SIZE * 2}px`
      }}
    >
      {[...Array(GRID_WIDTH * GRID_HEIGHT)].map((_, index) => (
        <div key={index} className="border border-gray-200" />
      ))}
    </div>
  )
}
