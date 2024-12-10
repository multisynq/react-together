import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'ToggleButtonTogether'
const originalName = 'ToggleButton'
const docUrl = `https://primereact.org/togglebutton`

const sourceCode = `
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
import { useStateTogether } from 'react-together'

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
`

const demoCode = `
import { ToggleButtonTogether } from 'react-together-primereact'

export function PrimeReactToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ToggleButtonTogether rtKey='toggle-button-doc-demo' />
    </div>
  )
}
`

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
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('ToggleButtonTogether')} />
}
