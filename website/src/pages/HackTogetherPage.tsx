import CoverBanner from '@components/hacktogether/CoverBanner'
import InfoTable from '@components/hacktogether/InfoTable'
import IntroBanner from '@components/hacktogether/IntroBanner'
import Partners from '@components/hacktogether/Partners'
import RegistrationForm from '@components/hacktogether/RegistrationForm'

function SubHeader({ title }: { title: string }) {
  return (
    <div className='w-full my-10'>
      <span className='text-4xl font-medium font-poppins text-black tracking-tighter sm:text-6xl'>{title}</span>
    </div>
  )
}

export function HackTogetherPage() {
  return (
    <div className='w-full bg-blue-50'>
      <CoverBanner />
      <div className='w-full flex justify-center'>
        <div className='w-full  px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[0rem] max-w-[60rem] flex items-center justify-center py-[3rem] flex-col'>
          <SubHeader title='Build the Future Web' />
          <IntroBanner />
          <RegistrationForm />
          <SubHeader title='Event Information' />
          <InfoTable />
          <SubHeader title='Partners' />
          <Partners />
        </div>
      </div>
    </div>
  )
}
