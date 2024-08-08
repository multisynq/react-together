export function PricingBanner() {
  const divStyle = {
    backgroundImage: 'url(https://i.postimg.cc/Gt4bKKjP/background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%', // height 100% of the parent
  }

  return (
    <div className='w-full h-[20rem]'>
      <div style={divStyle}>
        <div className='w-full mt-12 pb-[2rem]' style={divStyle}>
          <div className='w-full flex px-[12rem] items-stretch '>
            <div className='w-2/3 p-[2rem] flex flex-col gap-4 justify-center my-[1rem]'>
              <h2 className='' style={{ fontWeight: '700', fontSize: '40px', lineHeight: '1.25' }}>
                Crazy Affordable Networked, Multiuser Experiences
              </h2>
              <p className=''>
                This project is open source and free. Using the DePIN infra has its costs, but you can earn money from it by being a synqer.
              </p>
            </div>
            <div className='w-1/3 relative'>
              <div className='h-[16rem] w-[16rem] bg-white absolute top-[-2rem] left-1/2 transform -translate-x-1/2 line-border flex items-center justify-center'>
                <img src={'../../images/MSQ_logo.jpg'} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
