import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'SelectButtonTogether'
const originalName = 'SelectButton'

const codes = {
  demo: {
    basic: `
import { SelectButtonTogether } from '@multisynq/react-together-ant-design'

const options = [
  { label: 'Rome',     value: 'RM' },
  { label: 'London',   value: 'LDN' },
  { label: 'Paris',    value: 'PRS' },
]

export function AntDesignSelectButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SelectButtonTogether rtKey="select-button" items={options.slice(0,3)} />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Radio, RadioProps } from 'antd'
import { useStateTogether } from '@multisynq/react-together'

export interface SelectButtonTogetherProps 
  extends Omit<RadioProps, 'value' | 'onChange'> {
  rtKey: string
  items: { label: string, value: string }[]
}

export default function SelectButtonTogether({
  rtKey,
  items,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return <Radio.Group {...props} value={value} onChange={(e) => set_value(e.target.value)}>
    {items.map((item) => (
      <Radio.Button key={item.value} value={item.value}>
        {item.label}
      </Radio.Button>
    ))}
  </Radio.Group>
}
`,
  },
}

export function AntDesignSelectButtonTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('SelectButtonTogether') }} />
}
