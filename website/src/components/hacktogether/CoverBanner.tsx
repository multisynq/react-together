import { Button } from 'primereact/button'
import { HashLink } from 'react-router-hash-link'
import msq_blue from '../../images/logo/msq_long_blue.png'

export default function CoverBanner() {
  return (
    <div
      className='w-full pt-[8rem] pb-[4rem] flex flex-col items-center justify-between border-b h-[40rem] border border-gray-800 rounded-2xl shadow-lineStyle'
      style={{ background: 'radial-gradient(205.94% 160.17% at 52.57% -45.87%, #2563EB 0%, #93C5FD 69.16%, #BFDBFE 100%)' }}
    >
      <div className='flex flex-col justify-center'>
        <div className='w-[24rem] h-[12rem] items-center justify-center flex flex-col gap-2'>
          <div className='w-[15rem]'>
            <img src={msq_blue} alt='MSQ Blue Logo' />
          </div>
          <div>
            <span className='text-5xl tracking-tighter'>
              Hack<span className='font-bold'>Together</span>
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-1 text-center'>
        <span className='tracking-tight text-lg font-bold'>
          Nov 9 - 10, 24
          <br />
          Lisbon Portugal
        </span>
      </div>
      <div className='flex flex-col gap-4'>
        <HashLink smooth to='#register'>
          <Button label='Register Now' />
        </HashLink>
        <span className='tracking-tight text-xs font-light'>Interested in partnering?</span>
      </div>
    </div>
  )
}
