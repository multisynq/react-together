import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'

function CenterRow() {
  return (
    <div className='w-full h-full flex gap-3'>
      <div className='flex w-full flex-col h-full border-black gap-3'>
        {/* --Main-- */}
        <div className='w-full h-full bg-rose-500 flex px-8 py-4 flex-col justify-end rounded-xl border border-gray-800 shadow-lineStyleDark text-white'>
          {/* TITLE */}
          <div className='flex flex-col'>
            <span className='text-5xl font-light tracking-tighter'>Hack</span>
            <span className='font-bold text-5xl tracking-tighter'>Together</span>
          </div>
          <Divider />
          {/* MOTTO */}
          <div>
            <span className='text-xl font-light tracking-tight'>Join us building the web of tomorrow</span>
          </div>
        </div>
        {/* EVENT INFO */}
        <div className='display sm:hidden md:display w-full h-[10rem] md:flex'>
          <EventContentHorizontal />
        </div>

        {/* --BUTTON-- */}
        <div className='w-full h-[5rem] bg-blue-300 md:hidden overflow-hidden rounded-xl border border-gray-800 shadow-lineStyleDark hover:shadow-lineStyleLight'>
          <Button label='Register' className='w-full h-full' />
        </div>
      </div>
      <div className='w-[16rem] hidden sm:flex flex-col gap-3'>
        <div className='w-full h-[14rem] md:h-full bg-yellow-200 rounded-xl border border-gray-800 shadow-lineStyleDark' />
        <div className='h-full w-full md:hidden'>
          <EvenContentVertical />
        </div>
        <div className='w-full h-[5rem] bg-blue-300 hidden md:block overflow-hidden rounded-xl border border-gray-800 shadow-lineStyleDark'>
          <Button label='Register' className='w-full h-full' />
        </div>
      </div>
    </div>
  )
}
function EvenContentVertical() {
  return (
    <div className='w-full h-full bg-indigo-600 flex display text-white px-8 py-4 items-end justify-center border rounded-xl border-gray-800 shadow-lineStyleDark'>
      <div className='flex flex-col gap-1'>
        <div className='w-[8rem]'>
          <span className='text-lg font-bold'>
            November
            <br /> 9-10 2024
          </span>
        </div>
        <Divider />
        <div className='w-[8rem] '>
          <span className='text-lg font-bold'>Lisbon, Portugal</span>
        </div>
        <Divider />
        <div className='w-[8rem] '>
          <span className='text-lg font-bold'>
            $4,000
            <br />
            in prizes
          </span>
        </div>
      </div>
    </div>
  )
}

function EventContentHorizontal() {
  return (
    <div className='w-full h-full bg-indigo-600 flex display text-white px-8 py-4 items-center justify-center border rounded-xl border-gray-800 shadow-lineStyleDark'>
      <div className='flex gap-1'>
        <div className='w-[5.5rem]'>
          <span className='text-lg font-bold'>Nov, 9-10 2024</span>
        </div>
        <Divider layout='vertical' />
        <div className='w-[5.5rem] '>
          <span className='text-lg font-bold'>Lisbon, Portugal</span>
        </div>
        <Divider layout='vertical' />
        <div className='w-[5.5rem] '>
          <span className='text-lg font-bold'>
            $4,000
            <br />
            in prizes
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CoverBanner() {
  return (
    // --BACKGROUND--
    <div className={`w-full flex items-center gap-3 border-b h-[42rem] border-gray-800 bg py-2 `}>
      {/* --ROW 01--  */}
      <div className='w-3 h-full flex flex-col gap-3 md:w-full'>
        <div className='border border-l-0 border-gray-800 shadow-lineStyleDark rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none w-full h-full bg-cyan-100 ' />
        <div className='border border-l-0 border-gray-800 shadow-lineStyleDark rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none w-full h-[25rem] bg-lime-100' />
      </div>
      {/* --ROW 02-- */}
      <div className='w-full h-full md:max-w-[50rem] md:min-w-[46rem]'>
        <CenterRow />
      </div>
      {/* --ROW 03-- */}
      <div className='w-3 h-full flex flex-col gap-3 md:w-full'>
        <div className='border border-r-0 border-gray-800 shadow-lineStyleDark rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-full h-[32rem] bg-orange-300' />
        <div className='border border-r-0 border-gray-800 shadow-lineStyleDark rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-full h-full bg-blue-100' />
      </div>
    </div>
  )
}
