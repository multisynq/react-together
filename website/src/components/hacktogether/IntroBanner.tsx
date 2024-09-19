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
      <div className='flex px-[2rem] py-[1rem] rounded-xl w-full md:w-2/3'>
        <span className='text-black text-2xl tracking-tight font-poppins font-light leading-8'>
          Join the brightest minds in Lisbon for a <strong className='font-bold text-blue-700'>24-hour</strong> hackathon and build the
          future of the web. Limited spots, big ideas, and <strong className='font-bold text-blue-700'>{` $4,000 `}</strong>
          in prizes await!
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col pt-[2rem]'>
      <div className='flex flex-col gap-[4rem]'>
        <Description />
        <div className='w-full flex justify-end'>
          <div className='w-full h-[16rem] max-w-[40rem]'>
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
