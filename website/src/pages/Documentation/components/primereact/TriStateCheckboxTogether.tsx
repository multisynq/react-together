import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { TriStateCheckboxTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactTriStateCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <TriStateCheckboxTogether rtid='input-switch-doc-demo' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactTriStateCheckboxTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='TriStateCheckboxTogether'
      originalName='TriStateCheckbox'
      docUrl={`https://primereact.org/tristatecheckboxtogether/`}
      ComponentDemo={PrimeReactTriStateCheckboxTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('TriStateCheckboxTogether')} keyToLookupWith='' />
}
