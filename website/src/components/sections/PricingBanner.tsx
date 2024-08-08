import MSQ_logo from '../../images/MSQ_logo.jpg'
import Background from '../../images/backclip.png'

export function PricingBanner() {
  const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%', // height 100% of the parent
    zIndex: 0,
  }

  return (
    <div className='w-full h-[18rem] bg-blue-300 sm:bg-red-200 md:bg-green-300 xl:bg-blue-200 relative mt-28 flex items-center justify-center'>
      <div className='w-full flex px-[12rem] items-stretch'>
        <div className='w-2/3 p-[2rem] flex flex-col gap-4 justify-center my-[1rem]'>
          <h2 className='' style={{ fontWeight: '700', fontSize: '40px', lineHeight: '1.25' }}>
            Crazy Affordable Networked,
            <br />
            Multiuser Experiences
          </h2>
          <p className='max-w-[36rem]'>
            This project is open source and free. Using the DePIN infra has its costs, but you can earn money from it by being a synqer.
          </p>
        </div>
        <div className='w-1/3 relative'>
          <div className='h-[16rem] w-[16rem] bg-white absolute top-[-2rem] left-1/2 transform -translate-x-1/2 line-border flex items-center justify-center p-1 z-10'>
            <img src={MSQ_logo} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
          </div>
        </div>
      </div>
      <div className='absolute h-full w-[50rem] top-0 right-0' style={divStyle} />
    </div>
  )
}
