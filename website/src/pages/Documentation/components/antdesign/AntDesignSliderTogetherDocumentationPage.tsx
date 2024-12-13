import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'SliderTogether'
const originalName = 'Slider'

const codes = {
  demo: {
    basic: `
import { SliderTogether } from '@multisynq/react-together-ant-design'

export function AntDesignSliderTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SliderTogether rtKey='ant-slider-doc-demo'
        value={50} 
        className='w-[150px]'
      />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Slider } from 'antd'
import type { SliderSingleProps } from 'antd/es/slider'
import { useStateTogether } from '@multisynq/react-together'

export interface SliderTogetherProps
  extends Omit<SliderSingleProps, 'onChange'> {
  rtKey: string
}
export default function SliderTogether({ rtKey, value, defaultValue, ...props }: SliderTogetherProps) {
  const [val, set_val] = useStateTogether<number>(rtKey, value || defaultValue || 0)
  return <Slider {...props} value={val} onChange={(e) => set_val(e)} />
}
`,
  },
}

export function AntDesignSliderTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtKey',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
          {
            removed: true,
            name: 'value',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <AntDesignComponentDocumentationPage
      {...{
        name,
        originalName,
        api,
        demo: { code: codes.demo },
        source: { code: codes.source },
      }}
    />
  )

  return <DocumentationPage {...{ content, navItems: GenericDocNav('SliderTogether') }} />
}
