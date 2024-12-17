import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'SelectTogether'
const originalName = 'Select'

const codes = {
  demo: {
    basic: `
import { SelectTogether } from 'react-together-ant-design'

const options = [
  { label: 'Rome',     value: 'RM' },
  { label: 'London',   value: 'LDN' },
  { label: 'Paris',    value: 'PRS' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'New York', value: 'NY' },
]

export function AntDesignSelectTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SelectTogether rtKey="ant_dropdown" 
        options={options} 
        className='w-[110px]' 
        placeholder="Select a City"
      />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Select, SelectProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface SelectTogetherProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  rtKey: string
}

export default function SelectTogether({
  rtKey,
  ...props
}: SelectTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return (
    <Select {...props} value={value} onChange={(e) => set_value(e)} />
  )
}
`,
  },
}

export function AntDesignSelectTogetherDocumentationPage() {
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
            name: 'checked',
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('SelectTogether') }} />
}
