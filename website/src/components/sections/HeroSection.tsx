import antDesignLogo from '@images/antDesignLogo.svg'
import primeReactLogo from '@images/primeReactLogo.svg'
import { Link } from 'react-router-dom'
import HeroDemoSD from './HeroDemoSD'
import PageHeaderSD from './PageHeaderSD'

export default function HeroSection() {
  return (
    <>
      {/* <SizeHelper /> */}
      <main className='w-full flex justify-center items-center bg-[radial-gradient(162.17%_100%_at_100%_0%,#EFF6FF_0%,#EFF6FF_23%,#FFF_100%)]'>
        <div className='flex-1 flex flex-col xl:flex-row items-start md:flex-row justify-center max-w-[98rem] mx-[1rem] mt-[2rem]'>
          <div className='w-full md:w-1/3 lg:flex-1 items-center flex flex-col max-w-[42rem] xl:pr-[2rem] mb-[2rem] md:mt-[4rem] lg:mt-[8rem]'>
            <PageHeaderSD />
            <div className='py-2 px-4 flex justify-center items-end md:items-center rounded-2xl mx-[1rem] md:flex-col lg:flex-row'>
              <span className='text-end md:text-center lg:text-end font-medium'>
                Supporting UI
                <br className='md:hidden lg:block' /> Libraries:
              </span>
              <div className='flex gap-2 ml-[1rem] md:ml-[0rem] lg:ml-[1rem] mr-[0rem]'>
                <Link to={'/antdesign/Checkbox'}>
                  <div className='aspect-square w-[3.5rem] rounded-[90rem] border border-primary shadow-lineStyleDark hover:shadow-lineStyleLight bg-white p-1'>
                    <img className='w-full' src={antDesignLogo} />
                  </div>
                </Link>
                <Link to={'/antdesign/Checkbox'}>
                  <div className='aspect-square w-[3.5rem] rounded-[90rem] border border-primary shadow-lineStyleDark hover:shadow-lineStyleLight bg-white p-1'>
                    <img className='w-full' src={primeReactLogo} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full md:w-2/3 max-w-[42rem] flex flex-col gap-[1rem]'>
            <HeroDemoSD />
            {/* <DemoSection />
            <DemoSection /> */}
          </div>
        </div>
      </main>
    </>
  )
}
