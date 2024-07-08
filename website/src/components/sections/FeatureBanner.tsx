export function FeatureBanner() {
  return (
    <div className='flex flex-col md:flex-row w-full gap-10 py-8'>
      <div className='flex-1 min-w-0'>
        <h3 className='mb-4'>Feature Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='w-full aspect-[5/3] bg-gray-200'></div>
      </div>
    </div>
  );
}
