import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'CheckboxTogether'
const originalName = 'Checkbox'

const codes = {
  demo: {
    basic: `
import { CheckboxTogether } from '@multisynq/react-together-ant-design'

export function AntDesignCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <CheckboxTogether rtKey='checkbox-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Checkbox, CheckboxProps } from 'antd'
import { useStateTogether } from '@multisynq/react-together'

export interface CheckboxTogetherProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtKey: string
  className?: string
}
export default function CheckboxTogether({
  rtKey,
  ...props
}: CheckboxTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false) // one value that all users see

  return (
    <>
      <Checkbox
        {...props}
        onChange={(e) => setChecked(e.target.checked || false)}
        checked={checked}
        className={\`outline outline-1 outline-gray-400 rounded \${props.className}\`}
      />
    </>
  )
}
`,
  },
}

export function AntDesignCheckboxTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('CheckboxTogether') }} />
}
