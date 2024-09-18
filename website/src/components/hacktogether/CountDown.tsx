import { useEffect, useState } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2024-11-09T00:09:00').getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      data-aos='fade-up'
      className='border border-black shadow-lineStyleMedium rounded-xl bg-blue-200 overflow-hidden flex flex-col items-center justify-center max-w-[30rem]'
    >
      <div className='mt-3 mb-2'>
        <span className='text-xl tracking-tight font-semibold mb-3'>Let the Countdown Begin!</span>
      </div>
      <div className='flex border-t border-black bg-white w-full items-center justify-center'>
        <div className='flex justify-between m-2 '>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className='flex flex-col w-[5rem] items-center'>
              <span className='text-lg font-bold'>{value.toString().padStart(2, '0')}</span>
              <p className='text-sm'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
