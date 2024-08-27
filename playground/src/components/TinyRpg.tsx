import {
  ReactModel,
  useModelSelector,
  usePublish,
  useViewId
} from '@croquet/react'
import { useCallback, useEffect } from 'react'
import TinyRpgModel, { MoveArgs, numberToPosition } from '../TinyRpgModel'

const CELL_SIZE = 40

const CoinSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="coinGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#ffcc4d" />
        <stop offset="100%" stopColor="#ffac33" />
      </radialGradient>
    </defs>
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="url(#coinGradient)"
      stroke="#ffcc4d"
      strokeWidth="2"
    />
  </svg>
)

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
function Player({ id }: PlayerProps) {
  const position = useModelSelector(
    (model: ReactModel) => (model as TinyRpgModel).playerData.get(id)?.position
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

function Players() {
  const players = useModelSelector((m) => [
    ...(m as TinyRpgModel).playerData.keys()
  ])

  return players.map((viewId) => <Player key={viewId} id={viewId} />)
}

interface CoinProps {
  x: number
  y: number
}
function Coin({ x, y }: CoinProps) {
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

function Board() {
  const GRID_HEIGHT = useModelSelector((m) => (m as TinyRpgModel).BOARD_HEIGHT)
  const GRID_WIDTH = useModelSelector((m) => (m as TinyRpgModel).BOARD_WIDTH)
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

function Coins() {
  const coins = useModelSelector((model: ReactModel) =>
    Array.from((model as TinyRpgModel).coins)
  )
  const BOARD_WIDTH = useModelSelector((m) => (m as TinyRpgModel).BOARD_WIDTH)

  // console.log(`<Coins coins=${JSON.stringify(coins)}/>`)
  return coins.map((position, index) => {
    const { x, y } = numberToPosition(position, BOARD_WIDTH)

    return <Coin key={index} {...{ x, y }} />
  })
}

interface LabelProps {
  label: string
  value: string
}
function Label({ label, value }: LabelProps) {
  return (
    <div className="bg-white px-2 py-1 rounded shadow z-10 text-black">
      {label}: {value}
    </div>
  )
}

function ScoreLabel() {
  const viewId = useViewId()!
  const value = useModelSelector(
    (m: ReactModel) => (m as TinyRpgModel).playerData.get(viewId)?.score
  ) as number | null

  // console.log(`<ScoreLabel value=${value}/>`)
  return <Label label="Score" value={value !== null ? value.toString() : '?'} />
}

function TeamScoreLabel() {
  const value = useModelSelector((m: ReactModel) =>
    [...(m as TinyRpgModel).playerData.values()].reduce(
      (p, { score }) => p + score,
      0
    )
  )
  // console.log(`<TeamScoreLabel value=${value}/>`)
  return <Label label="Team Score" value={value.toString()} />
}

function Scores() {
  return (
    <div className="flex gap-5">
      <ScoreLabel />
      <TeamScoreLabel />
    </div>
  )
}

interface ArrowButtonsProps {
  moveCharacter: (s: string) => void
}
function ArrowButtons({ moveCharacter }: ArrowButtonsProps) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <button
        onClick={() => moveCharacter('w')}
        className="p-2 bg-gray-200 rounded text-2xl mb-2 w-12 h-12 flex items-center justify-center"
      >
        ↑
      </button>
      <div className="flex">
        <button
          onClick={() => moveCharacter('a')}
          className="p-2 bg-gray-200 rounded text-2xl mr-2 w-12 h-12 flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => moveCharacter('s')}
          className="p-2 bg-gray-200 rounded text-2xl mr-2 w-12 h-12 flex items-center justify-center"
        >
          ↓
        </button>
        <button
          onClick={() => moveCharacter('d')}
          className="p-2 bg-gray-200 rounded text-2xl w-12 h-12 flex items-center justify-center"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default function TinyRpgTogether() {
  // console.log('<TinyRpg/>')
  const viewId = useViewId()!
  const modelId = useModelSelector((m) => m.id)

  const publishMove = usePublish<MoveArgs>((d) => [modelId, 'move', d])

  const moveCharacter = useCallback(
    (direction: string) => {
      switch (direction) {
        case 'w':
        case 'arrowup':
          publishMove({ viewId, direction: 'up' })
          break
        case 's':
        case 'arrowdown':
          publishMove({ viewId, direction: 'down' })
          break
        case 'a':
        case 'arrowleft':
          publishMove({ viewId, direction: 'left' })
          break
        case 'd':
        case 'arrowright':
          publishMove({ viewId, direction: 'right' })
          break
      }
    },
    [viewId, publishMove]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (
        [
          'w',
          'arrowup',
          's',
          'arrowdown',
          'a',
          'arrowleft',
          'd',
          'arrowright'
        ].includes(key)
      ) {
        e.preventDefault()
        moveCharacter(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCharacter])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-2">
      <style>{`
        @keyframes bounce {
          0%,
          100% {
            transform: scale(1, 1) translateY(0);
          }
          50% {
            transform: scale(1, 0.9) translateY(5%);
          }
        }
        .character {
          animation: bounce 1s infinite;
          transform-origin: bottom center;
        }
      `}</style>
      <Scores />
      <div className="relative">
        <Board />
        <Coins />
        <Players />
      </div>
      <ArrowButtons moveCharacter={moveCharacter} />
    </div>
  )
}
