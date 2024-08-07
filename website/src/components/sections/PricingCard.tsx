function EachPrice() {
  return <div className='bg-slate-200 h-full w-1/3 rounded-lg'></div>
}

export function PricingCard() {
  return (
    <div className='w-full h-[28rem] flex justify-center rounded-lg gap-8 flex-col'>
      <div className='flex gap-2 mx-16'>
        <span className='w-1/3 items-end'>
          <h2>Plans & Prices</h2>
        </span>
        <span className='w-2/3 items-end'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </span>
      </div>
      <div className='h-full flex gap-8 mx-16'>
        <EachPrice />
        <EachPrice />
        <EachPrice />
      </div>
    </div>
  )
}
