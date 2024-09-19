// Import statements
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { HashLink } from 'react-router-hash-link'

// Helper Components
const EventContentHorizontal = () => (
  <div className='w-full h-full bg-indigo-600 flex text-white px-8 py-4 items-center justify-center border rounded-xl border-gray-800 shadow-lineStyleDark'>
    <div className='flex w-full justify-between'>
      <div className='w-[6rem]'>
        <span className='text-lg font-medium font-poppins'>November, 9-10 2024</span>
      </div>
      <Divider layout='vertical' />
      <div className='w-[6rem]'>
        <span className='text-lg font-medium font-poppins'>Lisbon, Portugal</span>
      </div>
      <Divider layout='vertical' />
      <div className='w-[6rem]'>
        <span className='text-lg font-medium font-poppins'>
          $4,000
          <br />
          in prizes
        </span>
      </div>
    </div>
  </div>
)

const EventContentVertical = () => (
  <div className='w-full h-full bg-indigo-600 flex text-white px-8 py-7 items-end justify-center border rounded-xl border-gray-800 shadow-lineStyleDark'>
    <div className='flex flex-col gap-1'>
      <div className='w-[8rem]'>
        <span className='text-xl font-medium font-poppins'>
          November,
          <br />
          9-10 2024
        </span>
      </div>
      <Divider />
      <div className='w-[8rem]'>
        <span className='text-xl font-medium font-poppins'>Lisbon, Portugal</span>
      </div>
      <Divider />
      <div className='w-[8rem]'>
        <span className='text-xl font-medium font-poppins'>
          $4,000
          <br />
          in prizes
        </span>
      </div>
    </div>
  </div>
)

// Main Components
const CenterRow = () => (
  <div className='w-full h-full flex gap-3'>
    <div className='flex w-full flex-col h-full border-black gap-3'>
      {/* Main Content */}
      <div className='w-full h-full bg-rose-500 flex px-8 py-6 flex-col justify-end rounded-xl border border-gray-800 shadow-lineStyleDark text-white'>
        <div className='w-[16rem] flex flex-col md:w-[22rem]'>
          <div className='flex flex-col'>
            <span className='text-[3rem] sm:text-[4rem] md:text-[5rem] font-thin tracking-tighter font-poppins leading-[0.9] md:leading-[0.8]'>
              hack
            </span>
            <span className='text-[3rem] sm:text-[4rem] md:text-[5rem] tracking-tighter font-semibold font-poppins leading-[0.8] md:leading-[1.0]'>
              Together
            </span>
          </div>
          <Divider />
          <div>
            <span className='text-2xl font-poppins font-light tracking-tight leading-[0.8]'>
              Join us building the
              <br /> web of tomorrow.
            </span>
          </div>
        </div>
      </div>

      {/* Event Info (mobile) */}
      <div className='display sm:hidden md:display w-full h-[10rem] md:flex'>
        <EventContentHorizontal />
      </div>

      {/* Register Button (mobile) */}
      <div className='w-full h-[5rem] bg-blue-300 md:hidden overflow-hidden rounded-xl border border-gray-800 shadow-lineStyleDark hover:shadow-lineStyleLight'>
        <HashLink smooth to='#register'>
          <Button label='Register' className='w-full h-full font-poppins text-2xl font-semibold' />
        </HashLink>
      </div>
    </div>

    {/* Side Column (desktop) */}
    <div className='w-[16rem] hidden sm:flex flex-col gap-3'>
      <div className='hidden w-full h-[12rem] bg-green-200 rounded-xl border border-gray-800 shadow-lineStyleDark lg:block' />
      <div className='w-full h-[14rem] md:h-full bg-yellow-200 rounded-xl border border-gray-800 shadow-lineStyleDark' />
      <div className='h-full w-full md:hidden'>
        <EventContentVertical />
      </div>
      <div className='w-full h-[5rem] bg-blue-300 hidden md:block overflow-hidden rounded-xl border border-gray-800 shadow-lineStyleDark'>
        <HashLink smooth to='#register'>
          <Button label='Register' className='w-full h-full font-poppins text-2xl font-semibold' />
        </HashLink>
      </div>
    </div>
  </div>
)

// Main Component
const CoverBanner = () => (
  <div className='w-full flex items-center gap-3 border-b h-[42rem] md:h-[50rem] border-gray-800 pt-[1rem] pb-[1rem] md:pt-[2rem] md:pb-[4rem] bg-neutral-50'>
    {/* Left Column */}
    <div className='w-3 h-full flex flex-col gap-3 md:w-full'>
      <div className='border border-l-0 border-gray-800 shadow-lineStyleDark rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none w-full h-full bg-cyan-100' />
      <div className='border border-l-0 border-gray-800 shadow-lineStyleDark rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none w-full h-[25rem] bg-lime-100' />
    </div>

    {/* Center Column */}
    <div className='w-full h-full md:max-w-[50rem] md:min-w-[46rem]'>
      <CenterRow />
    </div>

    {/* Right Column */}
    <div className='w-3 h-full flex flex-col gap-3 md:w-full'>
      <div className='border border-r-0 border-gray-800 shadow-lineStyleDark rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-full h-[32rem] bg-orange-300' />
      <div className='border border-r-0 border-gray-800 shadow-lineStyleDark rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-full h-full bg-blue-100' />
    </div>
  </div>
)

export default CoverBanner
