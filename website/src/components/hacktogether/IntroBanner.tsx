import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Countdown from './CountDown'

const registrationUrl = 'https://taikai.network/multisynq/hackathons/hacktogether'

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

  function SaveSeatBanner() {
    return (
      <div className='bg-blue-800 px-[2rem] py-[1rem] border-gray-800 border rounded-xl shadow-lineStyleDark flex items-center justify-center '>
        <span className='text-2xl text-white tracking-tight font-poppin font-medium text-center'>
          Limited to <strong>100 seats</strong>
          <br />
          <a href={registrationUrl} target='_blank' className='cursor-pointer underline text-white hover:text-slate-300'>
            Save your seat now!
          </a>
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col pt-[0.25rem] sm:pt-[2rem]'>
      <div className='flex flex-col gap-[4rem]'>
        <Description />
        <div className='w-full flex flex-col justify-end gap-9 sm:flex-row'>
          <div className='w-full sm:w-1/2 md:w-1/3'>
            <SaveSeatBanner />
          </div>
          <div className='w-full sm:w-1/2 md:w-2/3'>
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  )
}
