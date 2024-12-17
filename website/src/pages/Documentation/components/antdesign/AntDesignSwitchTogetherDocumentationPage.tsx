import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'SwitchTogether'
const originalName = 'Switch'

const codes = {
  demo: {
    basic: `
import { SwitchTogether } from 'react-together-ant-design'

export function AntDesignSwitchTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SwitchTogether rtKey="input-switch-docs-demo" />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Switch, SwitchProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface SwitchTogetherProps
  extends Omit<SwitchProps, 'checked' | 'onChange'> {
  rtKey: string
}
export default function SwitchTogether({
  rtKey,
  ...props
}: SwitchTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false)
  return <Switch {...props} checked={checked} onChange={() => setChecked(!checked)} />
}
`,
  },
}

export function AntDesignSwitchTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('SwitchTogether') }} />
}
