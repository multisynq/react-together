import MSQ_logo from '../../images/MSQ_logo.jpg'
import Background from '../../images/pricing_background.png'

export function PricingBanner() {
  const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    height: '100%',
    zIndex: 0,
  }

  return (
    <>
      <div className='w-full h-[20rem] bg-blue-200 sm:bg-red-200 md:bg-green-300 xl:bg-blue-100 relative mt-28 flex items-center justify-center gap-4'>
        <div className='w-1/2 h-full flex flex-col justify-center items-end'>
          <div className='flex flex-col gap-4 pl-4'>
            <h2 className='' style={{ fontWeight: '700', fontSize: '40px', lineHeight: '1.25' }}>
              Crazy Affordable Networked,
              <br />
              Multiuser Experiences
            </h2>
            <p className='max-w-[36rem]'>
              This project is open source and free. Using the DePIN infra has its costs, but you can earn money from it by being a synqer.
            </p>
          </div>
        </div>
        <div className='w-1/2 h-full relative'>
          <div style={divStyle}>
            {' '}
            <div className='h-[16rem] w-[16rem] bg-white absolute top-[-2rem] left-1/2 transform -translate-x-1/2 line-border flex items-center justify-center p-1 z-10'>
              <img src={MSQ_logo} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
