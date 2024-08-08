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
    // <div className='w-full h-[20rem] bg-blue-100 relative mt-28 flex items-center justify-center gap-4'>
    <div className='w-full md:h-[20rem] bg-blue-100 relative mt-28 flex flex-col md:flex-row items-center justify-center gap-4'>
      <div className='w-1/2 h-full flex flex-col justify-center items-end'>
        {/* <div className='flex flex-col gap-5 ml-16'> */}
        <div className='flex flex-col gap-5 md:ml-16'>
          {/* <h2 className='' style={{ fontSize: '38px', fontWeight: '700', lineHeight: '1.25' }}> */}
          <h2 className='text-center md:text-left' style={{ fontSize: '38px', fontWeight: '700', lineHeight: '1.25' }}>
            Crazy Affordable Networked,
            <br />
            Multiuser Experiences
          </h2>
          {/* <span
            className='max-w-[36rem] text-gray-700'
            style={{ fontWeight: '300', fontSize: '18px', lineHeight: '1.25', fontFamily: 'Inter' }}
          > */}
          <span
            className='max-w-[36rem] text-gray-700 text-center md:text-left'
            style={{ fontWeight: '300', fontSize: '18px', lineHeight: '1.25', fontFamily: 'Inter' }}
          >
            This project is open source and free. Using the DePIN infra has its{' '}
            <a
              href={COST_LINK}
              onClick={() => window.scrollTo(0, 0)}
              className='border-b-2 border-blue-700 italic font-medium px-2 hover:border-white hover:bg-blue-50 hover:rounded-lg'
            >
              costs
            </a>
            , but you can earn money from it by being a{' '}
            <a
              href={SYNQER_LINK}
              target='_blank'
              className='border-b-2 border-blue-700 italic font-medium px-2 hover:border-white hover:bg-blue-50 hover:rounded-lg'
            >
              synqer
            </a>
            .
          </span>
        </div>
      </div>
      <div className='w-1/2 h-full relative'>
        <div className='hidden md:block' style={divStyle}>
          <div className='h-[16rem] w-[16rem] bg-white absolute top-[-2rem] left-1/2 transform -translate-x-1/2 line-border flex items-center justify-center p-1 z-10 ${styles.animatedLogo}'>
            <img src={MSQ_logo} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}
