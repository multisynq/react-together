import CoverBanner from '@components/hacktogether/CoverBanner'
import InfoTable from '@components/hacktogether/InfoTable'
import IntroBanner from '@components/hacktogether/IntroBanner'
import Partners from '@components/hacktogether/Partners'
import RegistrationForm from '@components/hacktogether/RegistrationForm'
import { Mail } from 'lucide-react'
import { Button } from 'primereact/button'

export function HackTogetherPage() {
  return (
    <div className='w-full bg-blue-50'>
      <CoverBanner />
      <div className='w-full flex justify-center'>
        <div className='w-full  px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[0rem] max-w-[60rem] flex items-center justify-center py-[3rem] flex-col'>
          {/* --Register Section-- */}

          {/* --IntroText Section-- */}
          <div className='w-full'>
            <span className='text-6xl font-medium font-poppins text-black tracking-tighter'>Build the Future Web</span>
          </div>
          <IntroBanner />
          <RegistrationForm />
          {/* --Event Info-- */}
          <div className='w-full'>
            <span className='text-6xl font-medium font-poppins text-black tracking-tighter'>Event Information</span>
          </div>

          <InfoTable />
        </div>
      </div>
      <span>hi</span>

      <div className='flex justify-center items-center flex-col'>
        <div className='max-w-[20rem] flex flex-col gap-[4rem] mt-[4rem] pb-[4rem] md:max-w-[46rem] md:gap-[5rem] md:pb-[8rem] items-center lg:max-w-[90rem]'></div>
        <div className='flex justify-center items-center flex-col bg-blue-100 w-full border-t border-gray-800'>
          <div className='max-w-[20rem] flex flex-col gap-[5rem] my-[4rem] md:max-w-[46rem]'></div>
          <div className='flex justify-center items-center flex-col bg-blue-300 w-full border-t border-gray-800'>
            <div className='flex flex-col gap-[5rem] mt-[4rem]'>
              <Partners />
              <div className='p-4 text-center'>
                <Button
                  {...{
                    label: 'Contact Us',
                    icon: <Mail className='mr-2' />,
                    onClick: () => (window.location.href = 'mailto:hacktogether@multisynq.io'),
                    className: 'p-button-text',
                  }}
                  outlined
                  raised
                  className='bg-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
