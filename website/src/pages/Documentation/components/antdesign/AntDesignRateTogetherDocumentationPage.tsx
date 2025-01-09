import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'RateTogether'
const originalName = 'Rate'

const codes = {
  demo: {
    basic: `
    UNDER CONSTRUCTION
import { RateTogether } from 'react-together-ant-design'

export function AntDesignRateTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <RateTogether rtKey='datepicker-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Rate, RateProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface RateTogetherProps
  extends Omit<RateProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function RateTogether({
  rtKey,
  ...props
}: RateTogetherProps) {
  const [value, setValue] = useStateTogether<number>(rtKey, 0)
  return <Rate {...props} value={value} onChange={(e) => setValue(e)} />
}
`,
  },
}

export function AntDesignRateTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('RateTogether') }} />
}
