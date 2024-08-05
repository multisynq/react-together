import { useCallback, useEffect, useState } from 'react'
import { useStateTogether, useStateTogetherWithPerUserValues } from 'react-together'

const GRID_SIZE = 10
const CELL_SIZE = 40
const MAX_COINS = 5

const CoinSVG = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <radialGradient id='coinGradient' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
        <stop offset='0%' stopColor='#ffcc4d' />
        <stop offset='100%' stopColor='#ffac33' />
      </radialGradient>
    </defs>
    <circle cx='12' cy='12' r='10' fill='url(#coinGradient)' stroke='#ffcc4d' strokeWidth='2' />
  </svg>
)

const stringToColor = (s: string) => {
  return ['#F00', '#F60', '#FC0', '#FF0', '#CF0', '#6F0', '#0F0', '#0F6', '#0FC', '#0FF', '#0CF', '#06F', '#00F', '#60F', '#C0F', '#F0F'][
    s.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 16
  ]
}

interface Position {
  x: number
  y: number
}
export default function TinyRpgTogether() {
  const getRandomStartPosition = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 2, // Ensures y is at least 2 (below second row)
  })

  const [position, setPosition, everyonesPosition] = useStateTogetherWithPerUserValues<Position>(
    'tiny-rpg-positions',
    getRandomStartPosition()
  )

  const [coins, setCoins] = useState<Position[]>([])
  const [score, setScore] = useState(0)
  const [teamScore, setTeamScore] = useStateTogether('tiny-rpg-team-score', 49873)

  const moveCharacter = useCallback(
    (direction: string) => {
      setPosition((prev) => {
        const newPos = { ...prev }
        switch (direction) {
          case 'w':
          case 'arrowup':
            newPos.y = Math.max(0, prev.y - 1)
            break
          case 's':
          case 'arrowdown':
            newPos.y = Math.min(GRID_SIZE - 1, prev.y + 1)
            break
          case 'a':
          case 'arrowleft':
            newPos.x = Math.max(0, prev.x - 1)
            break
          case 'd':
          case 'arrowright':
            newPos.x = Math.min(GRID_SIZE - 1, prev.x + 1)
            break
        }
        return newPos
      })
    },
    [setPosition]
  )
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (['w', 'arrowup', 's', 'arrowdown', 'a', 'arrowleft', 'd', 'arrowright'].includes(key)) {
        e.preventDefault()
        moveCharacter(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCharacter])

  useEffect(() => {
    const coinInterval = setInterval(() => {
      if (coins.length < MAX_COINS) {
        setCoins((prevCoins) => [
          ...prevCoins,
          {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          },
        ])
      }
    }, 3000)

    return () => clearInterval(coinInterval)
  }, [coins])

  useEffect(() => {
    const collectedCoinIndex = coins.findIndex((coin) => coin.x === position.x && coin.y === position.y)

    if (collectedCoinIndex !== -1) {
      setScore((prevScore) => prevScore + 1)
      setTeamScore((prev) => (Number.isNaN(prev) ? 42000 : prev + 1))
      setCoins((prevCoins) => prevCoins.filter((_, index) => index !== collectedCoinIndex))
    }
  }, [position, coins])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
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
      <div className='relative'>
        <div className='absolute top-2 left-2 flex gap-5'>
          <div className='bg-white px-2 py-1 rounded shadow z-10'>Score: {score}</div>
          <div className='bg-white px-2 py-1 rounded shadow z-10'>Team Score: {teamScore}</div>
        </div>
        <div
          className='relative grid'
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            backgroundImage: 'linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
            backgroundSize: `${CELL_SIZE * 2}px ${CELL_SIZE * 2}px`,
          }}
        >
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => (
            <div key={index} className='border border-gray-200' />
          ))}
          {coins.map((coin, index) => (
            <div
              key={`coin-${index}`}
              className='absolute flex items-center justify-center'
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                left: `${coin.x * CELL_SIZE}px`,
                top: `${coin.y * CELL_SIZE}px`,
              }}
            >
              <CoinSVG />
            </div>
          ))}
          {Object.entries(everyonesPosition).map(([viewId, position]) => (
            <div
              className='character absolute bg-blue-500 rounded-full flex items-center justify-center'
              id={`position-${viewId}`}
              style={{
                width: `${CELL_SIZE - 4}px`,
                height: `${CELL_SIZE - 8}px`,
                left: `${position.x * CELL_SIZE + 2}px`,
                top: `${position.y * CELL_SIZE + 4}px`,
                transition: 'left 0.1s, top 0.1s',
                background: stringToColor(viewId),
              }}
            >
              <div className='relative w-3/4 h-1/2 flex justify-around items-center'>
                <div className='w-1/3 h-2/3 bg-white rounded-full flex items-center justify-center'>
                  <div className='w-1/2 h-1/2 bg-black rounded-full'></div>
                </div>
                <div className='w-1/3 h-2/3 bg-white rounded-full flex items-center justify-center'>
                  <div className='w-1/2 h-1/2 bg-black rounded-full'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <button
          onClick={() => moveCharacter('w')}
          className='p-2 bg-gray-200 rounded text-2xl mb-2 w-12 h-12 flex items-center justify-center'
        >
          ↑
        </button>
        <div className='flex'>
          <button
            onClick={() => moveCharacter('a')}
            className='p-2 bg-gray-200 rounded text-2xl mr-2 w-12 h-12 flex items-center justify-center'
          >
            ←
          </button>
          <button
            onClick={() => moveCharacter('s')}
            className='p-2 bg-gray-200 rounded text-2xl mr-2 w-12 h-12 flex items-center justify-center'
          >
            ↓
          </button>
          <button
            onClick={() => moveCharacter('d')}
            className='p-2 bg-gray-200 rounded text-2xl w-12 h-12 flex items-center justify-center'
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}