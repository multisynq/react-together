import { CroquetContext } from '@croquet/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ReactTogetherModel, useStateTogether, useStateTogetherWithPerUserValues } from 'react-together';

const GRID_SIZE = 12
const CELL_SIZE = 32
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
const getRandomStartPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 2, // Ensures y is at least 2 (below second row)
})
const position0 = getRandomStartPosition()

//===================== ||||||||||||||| ======================

class StateAccessor<T> {
  id:string
  initialValue:T
  model:ReactTogetherModel_ButWaaayBetter

  constructor(id:string, initialValue: T, model:ReactTogetherModel_ButWaaayBetter){
    this.id = id
    this.initialValue = initialValue
    this.model = model
  }
  get() {
    if (!this.model.state.has(this.id)) this.set(this.initialValue)
    return this.model.state.get(this.id) as T
  }
  set(x:T) {
    this.model.modelOnly();
    this.model.setState({id: this.id, newValue: x})
 }
}

// this just exists so we can type-declare createQFunc
// and register StateAccessor
// (will be moved to ReactTogetherModel)
class ReactTogetherModel_ButWaaayBetter extends ReactTogetherModel{
  createQFunc<T>(env: Record<string, any>, func: T): T {
    (func as any).env = env
    return func
  }
  static types() { return { StateAccessor } }

  version = 11 // to force a model reset
}
ReactTogetherModel_ButWaaayBetter.register('ReactTogetherModel_ButWaaayBetter')



//===================== ||||||||||||||| ======================


type Mob = {
  x:number
  y:number
  color:string
}

function rnd(lo:number, hi:number):number{
  return Math.floor(Math.random() * (hi-lo)) + lo
}

function rndMob(color:string):Mob{
  return {x:rnd(0, GRID_SIZE), y:rnd(0, GRID_SIZE), color}
}

function rndMobs():Mob[]{
  return [rndMob('red'), rndMob('green'), rndMob('blue')]
}
const initialMobs = rndMobs()


export default function TinyRpgTogether() {

  // ---- Together states ----
  const [position, setPosition, everyonesPosition] = useStateTogetherWithPerUserValues<Position>(
    'tinyRpgPositions',
    position0
  )
  const [teamScore, setTeamScore] = useStateTogether('tiny-rpg-team-score', 49873)

  function useModelFunctionTogether(funcId:string, env: Record<string, any>, remoteFunc:(...args:any[])=>void){
    const croquetContext = useContext(CroquetContext)
    const {model, view} = croquetContext
    const {viewId} = view
    if (!model || !view) {
      console.warn('useModelFunctionTogether() called without a session')
      return ()=>{}
    }

    // just for type-checking, model is actually a ReactTogetherModel
    const betterModel = model as ReactTogetherModel_ButWaaayBetter
    if (!betterModel.modelFuncs.has(funcId)) {
      view.publish(betterModel.id, 'defineModelFuncTogether', {
        id: funcId,
        viewId,
        func: betterModel.createQFunc(env, remoteFunc)
      })
    }

    return (...args:any[])=> {
      view.publish(model.id, 'callModelFuncTogether', {
        id: funcId,
        viewId,
        args
      })
    }

  }

  function useStateTogether2<T>(id:string, initial_value:T):[T, (x:T)=>void, StateAccessor<T>]{
    const croquetContext = useContext(CroquetContext)
    const {model} = croquetContext
    const  [val, setter] = useStateTogether<T>(id, initial_value)
    return [val, setter, new StateAccessor(id, initial_value, model as ReactTogetherModel_ButWaaayBetter)]
  }

  const [mobs, setMobs, mobsCtx] = useStateTogether2('mobs', initialMobs)

  const moveMobsInModel = useModelFunctionTogether('moveMobs', {mobsCtx, GRID_SIZE}, () => {
    const newMobs = [...mobsCtx.get()];
    newMobs.forEach( m =>{
      m.x += Math.random() > 0.5 ? 1 : -1
      m.y += Math.random() > 0.5 ? 1 : -1
      if (m.x < 0) m.x = 0
      if (m.x >= GRID_SIZE) m.x = GRID_SIZE - 1
      if (m.y < 0) m.y = 0
      if (m.y >= GRID_SIZE) m.y = GRID_SIZE - 1
    })
    mobsCtx.set(newMobs)
  })

  const moveMobs = useCallback(() => moveMobsInModel(), [])

  // ---- Local states ----
  const [coins, setCoins] = useState<Position[]>([])
  const [score, setScore] = useState(0)

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
          default:
            return prev
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
      } else if (key === ' ') {
        e.preventDefault()
        moveMobs()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCharacter, moveMobs])

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
  }, [position, coins, setScore, setTeamScore, setCoins])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
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
      <div key={9348578967345} className='p-4 items-center justify-center gap-4 bg-[linear-gradient(224deg,_#9EE3FF_-1.37%,_#74D4FC_49.31%,_#5EBCF9_100%)] border-2 border-blue-200 rounded-xl shadow-md'>
        <div className='relative rounded-lg overflow-hidden shadow-sm'>
          <div
            className='grid'
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
            {mobs.map((mob, index) => (
              <div
                key={`mob-${index}`}
                className='mob absolute bg-blue-500 rounded-full flex items-center justify-center'
                style={{
                  width: `${CELL_SIZE - 4}px`,
                  height: `${CELL_SIZE - 8}px`,
                  left: `${mob.x * CELL_SIZE + 2}px`,
                  top: `${mob.y * CELL_SIZE + 4}px`,
                  transition: 'left 0.1s, top 0.1s',
                  background: mob.color,
                }}
              />
            ))}
          </div>
        </div>
        <div className='flex w-full mt-2 rounded-sm justify-between'>
          <div className='flex flex-col items-start justify-center bg-blue-500 p-2 rounded-xl shadow-md border-white border-2'>
            <span className='text-[1.5rem] font-bold leading-none text-white text-shadow-lg stroke-[1px] stroke-black'>tiny</span>
            <div className='flex'>
              <span className='text-[2rem] font-bold leading-none text-green-400'>R</span>
              <span className='text-[2rem] font-bold leading-none text-orange-400'>G</span>
              <span className='text-[2rem] font-bold leading-none text-red-500'>P</span>
            </div>
          </div>
          <div className='mt-2 flex flex-col items-center my-2'>
            <button
              onClick={() => moveCharacter('w')}
              className='p-2 bg-gray-50 text-2xl mb-2 w-10 h-10 flex items-center justify-center font-bold font-sans rounded-lg  shadow-lineStyleMedium hover:bg-gray-200 hover:border-neutral-400'
            >
              ↑
            </button>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => moveCharacter('a')}
                className='p-2 bg-gray-50 text-2xl mr-2 w-10 h-10 flex items-center justify-center font-bold font-sans rounded-lg  shadow-lineStyleMedium hover:bg-gray-200 hover:border-neutral-400'
              >
                ←
              </button>
              <button
                onClick={() => moveCharacter('s')}
                className='p-2 bg-gray-50 text-2xl mr-2 w-10 h-10 flex items-center justify-center font-bold font-sans rounded-lg  shadow-lineStyleMedium hover:bg-gray-200 hover:border-neutral-400'
              >
                ↓
              </button>
              <button
                onClick={() => moveCharacter('d')}
                className='p-2 bg-gray-50 text-2xl w-10 h-10 flex items-center justify-center font-bold font-sans rounded-lg  shadow-lineStyleMedium hover:bg-gray-200 hover:border-neutral-400'
              >
                →
              </button>
            </div>
          </div>
          <div className='flex gap-2 flex-col px-2 '>
            <div className='flex flex-col'>
              <span className='text-sm text-white font-semibold'>Score:</span>
              <div className='flex justify-end rounded-md bg-blue-100 shadow-md px-2'>
                <span className='font-bold text-blue-800'>{score.toLocaleString()}</span>
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-white font-bold'>Team Score:</span>
              <div className='flex justify-end rounded-md bg-blue-100 shadow-md px-2'>
                <span className='font-bold text-gray-800'>{teamScore.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
