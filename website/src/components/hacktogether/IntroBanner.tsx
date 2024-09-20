import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Countdown from './CountDown'

function Bold({ children }) {
  return <strong className='font-bold text-blue-700'>{children}</strong>
}

export default function IntroBanner() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  function Description() {
    return (
      <div className='flex px-[2rem] rounded-xl w-full md:w-2/3'>
        <span className='text-black text-lg tracking-tight font-poppins font-light leading-7 sm:leading-8 sm:text-2xl'>
          Calling all hackers and innovators for a <Bold>24-hour</Bold> hackathon! Bring your ideas to life and compete for a{' '}
          <Bold>$4,000</Bold> prize pool!
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col pt-[0.25rem] sm:pt-[2rem]'>
      <div className='flex flex-col gap-[4rem]'>
        <Description />
        <div className='w-full flex justify-end'>
          <div className='w-full h-[16rem] max-w-[30rem]'>
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  )
}
