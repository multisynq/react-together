import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'InputSwitchTogether'
const originalName = 'InputSwitch'
const docUrl = `https://primereact.org/inputswitch`

const sourceCode = `
import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch'
import { useStateTogether } from 'react-together'

export default function InputSwitchTogether({ rtKey, ...props }) {
  const [checked, set_checked] = useStateTogether<boolean>(rtKey, false)

  return (
    <InputSwitch
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
`

const demoCode = `
import { InputSwitchTogether } from 'react-together-primereact'

export function PrimeReactInputSwitchTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <InputSwitchTogether rtKey='input-switch-doc-demo' />
    </div>
  )
}
`

export default function PrimeReactInputSwitchTogetherDocumentationPage() {
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
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('InputSwitchTogether')} />
}
