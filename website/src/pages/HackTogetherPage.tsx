import Countdown from '@components/hacktogether/CountDown'
import CoverBanner from '@components/hacktogether/CoverBanner'
import InfoTable from '@components/hacktogether/InfoTable'
import IntroBanner from '@components/hacktogether/IntroBanner'
import Partners from '@components/hacktogether/Partners'
import RegistrationForm from '@components/hacktogether/RegistrationForm'
import { Mail } from 'lucide-react'
import { Button } from 'primereact/button'

export function HackTogetherPage() {
  return (
    <div className='bg-blue-50 w-full'>
      <div className='p-2 flex items-center w-full justify-center'>
        <CoverBanner />
      </div>
      <div className='flex justify-center items-center flex-col'>
        <div className='max-w-[20rem] flex flex-col gap-[4rem] mt-[4rem] pb-[4rem] md:max-w-[46rem] md:gap-[5rem] md:pb-[8rem] items-center lg:max-w-[90rem]'>
          <IntroBanner />
          <Countdown />
        </div>
        <div className='flex justify-center items-center flex-col bg-blue-100 w-full border-t border-gray-800'>
          <div className='max-w-[20rem] flex flex-col gap-[5rem] my-[4rem] md:max-w-[46rem]'>
            <InfoTable />
          </div>
          <div className='flex justify-center items-center flex-col bg-blue-300 w-full border-t border-gray-800'>
            <div className='flex flex-col gap-[5rem] mt-[4rem]'>
              <RegistrationForm />
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
          {/* <div className='px-2 max-w-[80rem]'>
            <Divider />

            <Divider />
          </div> */}
        </div>
      </div>
    </div>
  )
}
