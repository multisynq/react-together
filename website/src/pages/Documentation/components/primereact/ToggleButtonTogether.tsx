import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { ToggleButtonTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <ToggleButtonTogether rtid='input-switch-doc-demo' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactToggleButtonTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='ToggleButtonTogether'
      originalName='ToggleButton'
      docUrl={`https://primereact.org/togglebuttontogether/`}
      ComponentDemo={PrimeReactToggleButtonTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('ToggleButtonTogether')} keyToLookupWith='' />
}
