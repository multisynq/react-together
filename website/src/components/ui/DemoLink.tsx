import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export function DemoLink() {
  useEffect(() => {
    AOS.init({ duration: 500 })
  }, [])
  return (
    <div data-aos='fade-up' data-aos-anchor-placement='top-bottom'>
      <div className='bg-white border-[1.5px] rounded-lg p-1 flex flex-col gap-1'>
        <div className='w-[140px] h-[140px] bg-slate-300 rounded-sm'></div>
        <div className='w-full px-2 rounded-lg bg-gray-50 border-gray-300 flex gap-1'>
          <p className='w-full text-sm'>link</p>
          <div className='w-[24px] h-[24px] bg-gray-700' />
          <div className='w-[24px] h-[24px] bg-gray-700' />
        </div>
      </div>
    </div>
  )
}
