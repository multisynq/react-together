import MSQ_logo from '../../images/MSQ_logo.jpg'
import Background from '../../images/pricing_background.png'

export function PricingBanner() {
  const COST_LINK = '/#/pricing'
  const SYNQER_LINK = 'https://multisynq.io/'

  const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    height: '100%',
    zIndex: 0,
  }

  return (
    <div className='w-full md:h-[14rem] bg-blue-200 relative mt-12 flex flex-col md:flex-row items-center justify-center gap-4'>
      <div className='w-1/2 h-full flex flex-col justify-center items-end'>
        <div className='flex flex-col gap-4 md:ml-16 py-7'>
          <h2 className='text-center md:text-left md:text-2xl lg:text-3xl'>
            {'Crazy Affordable Networked, '}
            <br className='hidden md:block' />
            Multiuser Experiences
          </h2>
          <span
            className='max-w-[36rem] text-gray-800 text-center md:text-left'
            style={{ fontWeight: '300', fontSize: '14px', lineHeight: '1.5', fontFamily: 'Inter' }}
          >
            This project is open source and free. Using the DePIN infra has its{' '}
            <a
              href={COST_LINK}
              onClick={() => window.scrollTo(0, 0)}
              className='border-b text-black border-blue-600 font-medium px-1 rounded-sm bg-blue-50 hover:text-white hover:bg-blue-600 hover:border-b-white'
            >
              costs
            </a>
            , but you could be rewarded from it by being a{' '}
            <a
              href={SYNQER_LINK}
              rel='noopener noreferrer'
              target='_blank'
              className='border-b text-black border-blue-600 font-medium px-1 rounded-sm bg-blue-50 hover:text-white hover:bg-blue-600 hover:border-b-white'
            >
              synqer
            </a>
            .
          </span>
        </div>
      </div>
      <div className='w-1/2 h-full relative'>
        <div className='hidden md:block' style={divStyle}>
          <a href='SYNQER_LINK' target='_blank' rel='noopener noreferrer'>
            <div className='h-[10rem] w-[10rem] md:h-[12rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem] bg-white absolute top-[-2rem] left-1/2 transform -translate-x-1/2 border border-gray-700 rounded-xl shadow-lineStyleDark flex items-center justify-center p-1 z-10 animatedLogo'>
              <img src={MSQ_logo} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
