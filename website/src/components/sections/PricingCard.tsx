// function EachPrice() {
//   return <div className='bg-slate-200 h-full w-1/3 rounded-lg'></div>
// }
const SYNQER_LINK = 'https://multisynq.io/'
const COST_LINK = '/#/pricing'

export function PricingCard() {
  return (
    // <div className='py-[3rem] justify-center rounded-xl bg-blue-100 mt-[8rem] border-2 shadow-md'>
    <div className='flex mx-16 items-center flex-col gap-3 my-[8rem] bg-slate-200'>
      <div className='items-end px-4 w-full'>
        <h2 className='text-left' style={{ fontWeight: '700', fontSize: '32px', lineHeight: '1.25' }}>
          Crazy Affordable Networked, Multiuser Experiences
        </h2>
      </div>
      <div className='px-4 h-full flex flex-col justify-start'>
        <p>
          This project is open source and free. Using the DePIN infra has its{' '}
          <a href={COST_LINK} onClick={() => window.scrollTo(0, 0)}>
            costs
          </a>
          , but you can earn money from it by being a{' '}
          <a href={SYNQER_LINK} target='_blank'>
            synqer.
          </a>
        </p>
      </div>
      {/* </div> */}
      {/* <div className='h-full flex gap-8 mx-16'>
        <EachPrice />
        <EachPrice />
        <EachPrice />
      </div> */}
    </div>
  )
}
