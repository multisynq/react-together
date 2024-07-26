import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function EachFeature({ header, body, color, imgSource }) {
  return (
    <div className={`${color} w-full border-[2.5px] border-gray-800 shadow-lineStyleDark rounded-xl overflow-hidden`}>
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
  const color1 = 'bg-sky-100'
  // const color2 = 'bg-indigo-100'
  // const color3 = 'bg-blue-100'

  const gif1 = '/src/images/reactTogehter-install.gif'
  const gif2 = '/src/images/reactTogether-wrap.gif'
  const gif3 = '/src/images/reactTogether-sharedCheckbox.gif'

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  // const featureHeadTitle = 'No server required!'
  // const featureHeadDescription =
  //   "We've made it simple for you. Just follow three easy steps to bring a seamless multi-user experience to your project!"

  return (
    <div data-aos='fade-up'>
      <div className='w-full px-8 flex flex-col items-center gap-4'>
        {/* <div className='px-8 py-4 justify-center gap-8 bg-sky-100 border-2 border-gray-700 rounded-xl shadow-lineStyleDark flex flex-wrap w-3/4 sm:w-1/2'> */}
        {/* <div className='px-4 py-4 justify-center gap-8 border-gray-700 rounded-xl flex flex-wrap'> */}
        {/* <h2 className='text-lg font-bold text-gray-800 mt-0 text-center'>{featureHeadTitle}</h2> */}
        {/* <div className='max-w-[472px]'><p className='text-gray-800 mb-1 break-words'>{featureHeadDescription}</p></div> */}
        {/* </div> */}

        <div className='w-full flex flex-col md:flex-row gap-6'>
          <EachFeature header={'Install'} body={'Use npm to install react-together'} color={color1} imgSource={gif1} />
          <EachFeature header={'Wrap'} body={'Wrap your application inside <ReactTogether/> component'} color={color1} imgSource={gif2} />
          <EachFeature
            header={'Synchronize'}
            body={'Use our hooks to instantly create interactive experiences!'}
            color={color1}
            imgSource={gif3}
          />
        </div>
      </div>
    </div>
  )
}
