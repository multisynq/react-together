import AOS from 'aos'
import 'aos/dist/aos.css'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'

interface DemoLinkProps {
  urlLink: string
}
export function DemoLink({ urlLink }: DemoLinkProps) {
  useEffect(() => {
    AOS.init({ duration: 500 })
  }, [])

  return (
    <div data-aos='fade-left' data-aos-anchor-placement='top-bottom'>
      <div className='bg-white border-[1.5px] rounded-lg p-1 flex flex-col'>
        <div className='w-[140px] h-[140px] rounded-sm flex justify-center items-center'>
          <QRCode value={urlLink} size={130} bgColor='#FFFFFF' fgColor='#373b43' level='H' includeMargin={false} />
        </div>
      </div>
    </div>
  )
}
