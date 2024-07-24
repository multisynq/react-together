import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { InputSwitchTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactInputSwitchTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <InputSwitchTogether rtid='input-switch-doc-demo' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactInputSwitchTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='InputSwitchTogether'
      originalName='InputSwitch'
      docUrl={`https://primereact.org/inputswitchtogether/`}
      ComponentDemo={PrimeReactInputSwitchTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('InputSwitchTogether')} keyToLookupWith='' />
}
