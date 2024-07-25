import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
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
            description: 'The key used to identify this state, passed to the useStateTogether hook',
          },
          {
            removed: true,
            name: 'checked',
            description: 'Removed, since this value will be controlled by the useStateTogether hook',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactInputSwitchTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('InputSwitchTogether')} keyToLookupWith='' />
}
