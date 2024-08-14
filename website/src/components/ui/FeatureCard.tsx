import gif1 from '@images/reactTogehter-install.gif'
import gif3 from '@images/reactTogether-checkboxTogether.gif'
import gif2 from '@images/reactTogether-wrap.gif'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import CodeSpan from './CodeSpan'

function EachFeature({ header, body, color, imgSource }) {
  return (
    <div className={`${color} w-full line-border overflow-hidden`}>
      <div className={'aspect-video w-full shadow-md'}>
        <img className='h-[240px] w-full' src={imgSource} />
      </div>
      <div className='w-full flex flex-col items-center px-4 my-8'>
        <h4 className='text-center font-bold'>{header}</h4>
        <div className='text-center text-gray-800 text-sm sm:text-base'>{body}</div>
      </div>
    </div>
  )
}

export function FeatureCard() {
  const color1 = 'bg-sky-100'

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div data-aos='fade-up'>
      <div className='w-full px-8 flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col md:flex-row gap-6'>
          <EachFeature
            header={'Install'}
            body={
              <p>
                Use <CodeSpan text='npm' /> to install <CodeSpan text='react-together' />.
              </p>
            }
            color={color1}
            imgSource={gif1}
          />
          <EachFeature
            header={'Wrap'}
            body={
              <p>
                Wrap your application inside <CodeSpan text='<ReactTogether/>' /> component.
              </p>
            }
            color={color1}
            imgSource={gif2}
          />
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
