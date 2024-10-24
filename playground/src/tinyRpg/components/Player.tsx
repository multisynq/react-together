import { Croquet } from 'react-together'
import { CELL_SIZE } from '../constants'
import { OverrideModel } from '../models'

const { useModelSelector } = Croquet

const stringToColor = (s: string) => {
  return [
    '#F00',
    '#F60',
    '#FC0',
    '#FF0',
    '#CF0',
    '#6F0',
    '#0F0',
    '#0F6',
    '#0FC',
    '#0FF',
    '#0CF',
    '#06F',
    '#00F',
    '#60F',
    '#C0F',
    '#F0F'
  ][s.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 16]
}

interface PlayerProps {
  id: string
}
export default function Player({ id }: PlayerProps) {
  const position = useModelSelector(
    (model: OverrideModel) => model.rpg.playerData.get(id)?.position || null
  )
  if (!position) return
  const { x, y } = position
  // console.log(`<Player id=${id} x=${x} y=${y}/>`)
  return (
    <div
      className="character absolute bg-blue-500 rounded-full flex items-center justify-center"
      id={`position-${id}`}
      style={{
        width: `${CELL_SIZE - 4}px`,
        height: `${CELL_SIZE - 8}px`,
        left: `${x * CELL_SIZE + 2}px`,
        top: `${y * CELL_SIZE + 4}px`,
        transition: 'left 0.1s, top 0.1s',
        background: stringToColor(id)
      }}
    >
      <div className="relative w-3/4 h-1/2 flex justify-around items-center">
        <div className="w-1/3 h-2/3 bg-white rounded-full flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-black rounded-full"></div>
        </div>
        <div className="w-1/3 h-2/3 bg-white rounded-full flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
