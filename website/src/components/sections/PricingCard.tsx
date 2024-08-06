function EachPrice() {
  return <div className='bg-slate-200 h-full w-full rounded-lg'></div>
}

export function PricingCard() {
  return (
    <div className='w-full h-[28rem] flex justify-center rounded-lg gap-8 flex-col'>
      <div className='flex flex-col gap-2 mx-16'>
        <h2 className=''>Plans & Prices</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div className='w-full h-full flex gap-8 mx-8'>
        <EachPrice />
        <EachPrice />
        <EachPrice />
      </div>
    </div>
  )
}
