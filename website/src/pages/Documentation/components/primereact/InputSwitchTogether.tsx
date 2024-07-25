import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { InputSwitchTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'InputSwitchTogether'
const originalName = 'InputSwitch'
const docUrl = `https://primereact.org/inputswitch`

function PrimeReactInputSwitchTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <InputSwitchTogether rtid='input-switch-doc-demo' />
    </div>
  )
}

export default function PrimeReactInputSwitchTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtid',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
          {
            removed: true,
            name: 'checked',
            description: (
              <p>
                Removed, since this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactInputSwitchTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('InputSwitchTogether')} />
}
