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
      <div className='border flex bg-blue-800 px-[2rem] py-[1rem] rounded-xl border-gray-800 shadow-lineStyleDark w-4/5 md:w-2/2'>
        <span className='text-white'>
          Join the brightest minds in Lisbon for a 24-hour hackathon and build the future of the web. Limited spots, big ideas, and $4,000
          in prizes await!
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col px-[2rem] py-[4rem]'>
      <div className='flex flex-col gap-4'>
        {/* --Title-- */}
        <div className='w-full flex gap-4'>
          <div className='border flex items-center bg-blue-200 px-[2rem] py-[1rem] rounded-xl border-gray-800 shadow-lineStyleDark'>
            <span className='font-poppins font-semibold text-4xl leading-8'>
              Build the future
              <br />
              of the web!
            </span>
          </div>
        </div>
        {/* --Description-- */}
        <div className='w-full flex justify-end sm:hidden'>
          <Description />
        </div>
        <div className='w-full flex justify-end'>
          <div className='w-full h-[16rem]'>
            <Countdown />
          </div>
        </div>
      </div>
    </div>
    // <div data-aos='fade-up' className='flex flex-col gap-4 items-center w-full px-4'>
    //   <div className='flex items-center '>
    //     <span className='text-center text-3xl md:text-4xl lg:text-5xl'>
    //       <span className='textEffect'>Build the Future</span>
    //       <br className='md:hidden' />
    //       {` of the Web!`}
    //     </span>
    //   </div>
    //   <div className='md:w-[38rem]'>
    //     <span className='text-center tracking-tight md:text-lg text-gray-700'>
    //       Join the brightest minds in Lisbon for a 24-hour hackathon and build the future of the web. Limited spots, big ideas, and
    //       <strong className='text-blue-700'>{` $4,000 `}</strong>
    //       in prizes await!
    //     </span>
    //   </div>
    // </div>
  )
}
