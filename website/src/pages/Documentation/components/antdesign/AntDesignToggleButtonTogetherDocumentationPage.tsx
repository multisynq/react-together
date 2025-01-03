import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'ToggleButtonTogether'
const originalName = 'Button'

const codes = {
  demo: {
    basic: `
import { ToggleButtonTogether } from 'react-together-ant-design'

export function AntDesignToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ToggleButtonTogether rtKey='toggle-button-doc-demo'
        onIcon={ '🌞 '}  onLabel='Day'
        offIcon={'🌙 '} offLabel='Night' 
      />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Button, ButtonProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface ToggleButtonTogetherProps
  extends Omit<ButtonProps, 'checked' | 'onChange'> {
  rtKey: string
  onLabel?: string
  offLabel?: string
  onIcon?: React.ReactNode
  offIcon?: React.ReactNode
}
export default function ToggleButtonTogether({
  rtKey,
  onLabel  = 'Yes',
  offLabel = 'No',
  onIcon,
  offIcon,
  ...props
}: ToggleButtonTogetherProps) {
  const [isOn, setIsOn] = useStateTogether<boolean>(rtKey, false);
  const label = isOn ? onLabel : offLabel;
  const icon  = isOn ? onIcon  : offIcon;

  return (
    <Button {...props} type={isOn ? 'primary' : 'default'} onClick={() => setIsOn(!isOn)}>
      {icon}
      {label}
    </Button>
  )
}
`,
  },
}

export function AntDesignToggleButtonTogetherDocumentationPage() {
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
            removed: false,
            name: 'onLabel',
            type: 'string',
            description: 'The label to display when the button is on.',
          },
          {
            removed: false,
            name: 'offLabel',
            type: 'string',
            description: 'The label to display when the button is off.',
          },
          {
            removed: false,
            name: 'onIcon',
            type: 'React.ReactNode',
            description: 'The icon to display when the button is on.',
          },
          {
            removed: false,
            name: 'offIcon',
            type: 'React.ReactNode',
            description: 'The icon to display when the button is off.',
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('ToggleButtonTogether') }} />
}
