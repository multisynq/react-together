export default function SizeHelper() {
  return (
    <div className='flex w-full justify-center items-center bg-lime-300 sm:bg-red-300 md:bg-blue-300 lg:bg-yellow-300 xl:bg-green-300 2xl:bg-slate-300'>
      <span className='text-3xl sm:hidden'>Base</span>
      <span className='text-3xl hidden sm:block md:hidden'>Small</span>
      <span className='text-3xl hidden md:block lg:hidden'>Medium</span>
      <span className='text-3xl hidden lg:block xl:hidden'>Large</span>
      <span className='text-3xl hidden xl:block 2xl:hidden'>XL</span>
      <span className='text-3xl hidden 2xl:block'>2XL</span>
    </div>
  )
}
