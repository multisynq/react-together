import { useEffect, useState } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

const addToCalendarUrl =
  'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MGZnbHI1ZGN2dTM2MzhwYWdqM3JrYnMyN2IgY19iNmVlZjMxZWNlMzlhYjFjMmJiZjQ3NGZlYmU0NTQ5ZGZiNTdkNzg5YzM1ZWUzYTM3YWFiNzk3MzM2YWViZDNlQGc&tmsrc=c_b6eef31ece39ab1c2bbf474febe4549dfb57d789c35ee3a37aab797336aebd3e%40group.calendar.google.com'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, min: 0, sec: 0 })

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
        min: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='border border-black shadow-lineStyleMedium rounded-xl bg-amber-300 flex flex-col w-full gap-4 px-[2rem] py-[1rem] '>
      <div className='flex w-2/3'>
        <span className='text-3xl tracking-tight font-poppins font-medium'>Hacking starts in...</span>
      </div>
      <div className='w-full flex justify-end'>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className='flex flex-col w-[4rem] sm:w-[5rem] items-center'>
            <span className='text-2xl font-bold font-poppins'>{value.toString().padStart(2, '0')}</span>
            <p className='text-baseline font-poppins font-medium'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
          </div>
        ))}
      </div>
      <a href={addToCalendarUrl} target='_blank' className='font-semibold cursor-pointer text-gray-900 hover:text-gray-700'>
        <span
          className='leading-loose'
          style={{
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationSkipInk: 'none',
            textDecorationColor: 'blue',
          }}
        >
          Add to your calendar
        </span>
      </a>
    </div>
  )
}
