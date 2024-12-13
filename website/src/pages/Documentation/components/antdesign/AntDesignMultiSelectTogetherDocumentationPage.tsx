import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'MultiSelectTogether'
const originalName = 'MultiSelect'

const codes = {
  demo: {
    basic: `
import { MultiSelectTogether } from '@multisynq/react-together-ant-design'

const options = [
  { label: 'Rome',     value: 'RM' },
  { label: 'London',   value: 'LDN' },
  { label: 'Paris',    value: 'PRS' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'New York', value: 'NY' },
]

export function AntDesignMultiSelectTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <MultiSelectTogether rtKey="ant-multi-select" 
        options={options} 
        className='w-[250px]' 
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
import { useStateTogether } from '@multisynq/react-together'

export interface MultiSelectTogetherProps 
  extends Omit<SelectProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function MultiSelectTogether({
  rtKey,
  ...props
}: MultiSelectTogetherProps) {
  const [values, set_values] = useStateTogether(rtKey, [])
  return (
    <Select 
      mode='multiple'
      {...props} 
      value={values||[]} 
      onChange={(vals) => set_values(vals)} 
    />
  )
}
`,
  },
}

export function AntDesignMultiSelectTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('MultiSelectTogether') }} />
}
