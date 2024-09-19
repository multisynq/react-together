import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Countdown from './CountDown'

export default function IntroBanner() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  function Description() {
    return (
      <div className='flex px-[2rem] rounded-xl w-full md:w-2/3'>
        <span className='text-black text-lg tracking-tight font-poppins font-light leading-7 sm:leading-8 sm:text-2xl'>
          Join the brightest minds in Lisbon for a <strong className='font-bold text-blue-700'>24-hour</strong> hackathon and build the
          future of the web. Limited spots, big ideas, and <strong className='font-bold text-blue-700'>{` $4,000 `}</strong>
          in prizes await!
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col pt-[0.25rem] sm:pt-[2rem]'>
      <div className='flex flex-col gap-[4rem]'>
        <Description />
        <div className='w-full flex justify-end'>
          <div className='w-full h-[16rem] max-w-[40rem]'>
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  )
}
