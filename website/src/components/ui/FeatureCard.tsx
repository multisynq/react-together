function EachFeature({ header, body, color, imgSource }) {
  return (
    <div className={`${color} w-full border-[2.5px] border-gray-800 shadow-lineStyle rounded-xl overflow-hidden`}>
      <div className={'aspect-video w-full shadow-md'}>
        <img src={imgSource} />
      </div>
      <div className='w-full flex flex-col items-center px-4 my-8'>
        <h4 className='text-center font-bold'>{header}</h4>
        <p className='text-center text-gray-800 mb-1'>{body}</p>
      </div>
    </div>
  )
}

export function FeatureCard() {
  const title1 = 'Install'
  const title2 = 'Wrap'
  const title3 = 'Calibrate!'

  const color1 = 'bg-sky-100'
  const color2 = 'bg-indigo-100'
  const color3 = 'bg-blue-100'

  const gif1 = '/src/images/reactTogehter-install.gif'
  const gif2 = '/src/images/reactTogether-wrap.gif'
  const gif3 = '/src/images/reactTogether-sharedCheckbox.gif'

  return (
    <span className='w-full px-8'>
      {/* <div className='w-full flex flex-col md:flex-row border-2 border-gray-500 shadow-lineStyleSecond rounded-xl overflow-hidden'> */}
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
          color={color2}
          imgSource={gif2}
        />
        <EachFeature
          header={title3}
          body={'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia '}
          color={color3}
          imgSource={gif3}
        />
      </div>
    </span>
  )
}
