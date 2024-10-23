import bellAudio from '@assets/tuningFork440Hz.mp3'
import { useState } from 'react'
// import { useCallback, useState } from 'react'
// import { useFunctionTogether } from 'react-together'

// Create audio context outside component to persist between renders
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const audio = new Audio(bellAudio)

// Create a gain node to control audio volume
const gainNode = audioContext.createGain()
const source = audioContext.createMediaElementSource(audio)
source.connect(gainNode)
gainNode.connect(audioContext.destination)

const FADE_AFTER = 2
const FADE_DURATION = 6

export function MeditationBell() {
  const [isRinging, setIsRinging] = useState(false)

  // const ringBell = useFunctionTogether(
  //   'meditation-bell',
  //   useCallback(() => {
  const ringBell = () => {
      // prettier-ignore-start
      if (isRinging) return

      // Reset gain to full volume
      gainNode.gain.cancelScheduledValues(audioContext.currentTime)
      gainNode.gain.setValueAtTime(1, audioContext.currentTime)

      // Schedule the fade out
      gainNode.gain.setValueAtTime(1, audioContext.currentTime + FADE_AFTER)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + FADE_AFTER + FADE_DURATION)

      // Play the bell sound
      audioContext.resume().then(() => {
        audio.currentTime = 0
        audio.play().catch(() => {
          // Sound failed to play - that's okay, we have visual feedback
        })
      })

      // Start animations
      setIsRinging(true)

      // Reset animations and audio
      setTimeout(
        () => {
          setIsRinging(false)
          audio.pause()
          audio.currentTime = 0
        },
        1000 * (FADE_AFTER + FADE_DURATION)
      )
      // prettier-ignore-stop
  }
  //   }, [isRinging, setIsRinging])
  // )

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-slate-100'>
      <div className='relative'>
        {/* Bell icon with bounce animation */}
        <button
          onClick={() => ringBell()}
          className={`text-6xl cursor-pointer transition-transform ${isRinging ? 'scale-110' : 'scale-100'} hover:scale-105`}
          aria-label='Ring meditation bell'
        >
          🔔
        </button>

        {/* Visual "Dong..." text that appears and fades */}
        {isRinging && (
          <div className='absolute -right-24 top-0'>
            <span className='text-2xl text-gray-600 italic'>Dong...</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className='absolute bottom-8 text-gray-500'>Click the bell to ring it</div>
    </div>
  )
}
