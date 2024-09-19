import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function IntroBanner() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div data-aos='fade-up' className='flex flex-col gap-4 items-center w-full px-4'>
      <div className='flex items-center '>
        <span className='text-center text-3xl md:text-4xl lg:text-5xl'>
          <span className='textEffect'>Build the Future</span>
          <br className='md:hidden' />
          {` of the Web!`}
        </span>
      </div>
      <div className='md:w-[38rem]'>
        <span className='text-center tracking-tight md:text-lg text-gray-700'>
          Join the brightest minds in Lisbon for a 24-hour hackathon and build the future of the web. Limited spots, big ideas, and
          <strong className='text-blue-700'>{` $4,000 `}</strong>
          in prizes await!
        </span>
      </div>
    </div>
  )
}
