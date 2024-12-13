import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'ToggleButtonTogether'
const originalName = 'ToggleButton'

const codes = {
  demo: {
    basic: `
import { ToggleButtonTogether } from '@multisynq/react-together-primereact'

export function PrimeReactToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ToggleButtonTogether rtKey='toggle-button-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
import { useStateTogether } from '@multisynq/react-together'

export default function ToggleButtonTogether({ rtKey, ...props }) {
  const [checked, set_checked] = useStateTogether<boolean>(rtKey, false)

  return (
    <ToggleButton
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
`,
  },
}

export default function PrimeReactToggleButtonTogetherDocumentationPage() {
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
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage
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
