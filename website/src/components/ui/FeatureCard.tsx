function EachFeature({ header, body, color, imgSource }) {
  return (
    <div className={`${color} w-full border-[2.5px] border-gray-800 shadow-lineStyle rounded-xl overflow-hidden`}>
      <div className={'aspect-video w-full shadow-md'}>
        <img src={imgSource} />
      </div>
      <div className='w-full flex flex-col items-center px-4 my-8'>
        <h4 className='text-center font-bold'>{header}</h4>
        <p className='text-center text-gray-800 mb-1 text-sm sm:text-base'>{body}</p>
      </div>
    </div>
  )
}

export function FeatureCard() {
  const title1 = 'Install'
  const title2 = 'Wrap'
  const title3 = 'Calibrate!'

  const color1 = 'bg-sky-100'
  // const color2 = 'bg-indigo-100'
  // const color3 = 'bg-blue-100'

  const gif1 = '/src/images/reactTogehter-install.gif'
  const gif2 = '/src/images/reactTogether-wrap.gif'
  const gif3 = '/src/images/reactTogether-sharedCheckbox.gif'

  const featureHeadTitle = 'No Server Needed!'
  // const featureHeadDescription =
  //   "We've made it simple for you. Just follow three easy steps to bring a seamless multi-user experience to your project!"

  return (
    <div className='w-full px-8 flex flex-col items-center gap-4'>
      <div className='px-8 py-4 justify-center gap-8 bg-sky-100 border-2 border-gray-700 rounded-xl shadow-lineStyle flex flex-wrap w-3/4 sm:w-1/2'>
        {/* <div className='px-4 py-4 justify-center gap-8 border-gray-700 rounded-xl flex flex-wrap'> */}
        <h2 className='text-gray-800 mb-0 text-center'>{featureHeadTitle}</h2>
        {/* <div className='max-w-[472px]'><p className='text-gray-800 mb-1 break-words'>{featureHeadDescription}</p></div> */}
      </div>

      <div className='w-full flex flex-col md:flex-row gap-6'>
        <EachFeature
          header={title1}
          body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}
          color={color1}
          imgSource={gif1}
        />
        <EachFeature
          header={title2}
          body={'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'}
          color={color1}
          imgSource={gif2}
        />
        <EachFeature
          header={title3}
          body={'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia '}
          color={color1}
          imgSource={gif3}
        />
      </div>
    </div>
  )
}
