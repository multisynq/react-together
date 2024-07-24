import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { CheckboxTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <CheckboxTogether rtid='checkbox-test' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactCheckboxTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='CheckboxTogether'
      originalName='Checkbox'
      docUrl={`https://primereact.org/checkboxtogether/`}
      ComponentDemo={PrimeReactCheckboxTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('CheckboxTogether')} keyToLookupWith='' />
}
