import { useCallback, useEffect } from 'react'
import { useModelSelector, usePublish, useViewId } from 'react-together'
import { ArrowButtons, Board, Coins, Players, Scores } from '.'
import { OverrideModel } from '../models'
import { MoveArgs } from '../models/TinyRpgModel'

export default function TinyRpgTogether() {
  // console.log('<TinyRpg/>')
  const viewId = useViewId()!
  const modelId = useModelSelector((m) => (m as OverrideModel).rpg.id)

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
    const handleKeyDown = (e: KeyboardEvent) => {
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
    <div className="flex flex items-center justify-center h-screen bg-gray-100 gap-2">
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
      <div className="relative">
        <Board />
        <Coins />
        <Players />
      </div>
      <div className="flex flex-col items-start gap-4">
        <Scores />
        <ArrowButtons moveCharacter={moveCharacter} />
      </div>
    </div>
  )
}