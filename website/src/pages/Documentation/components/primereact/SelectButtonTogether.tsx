import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { SelectButtonTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactSelectButtonTogetherDemo() {
  const items = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3, disabled: false },
  ]
  return (
    <div className='flex-col place-items-center'>
      {/* <SelectButtonTogether rtid='select-button-doc-demo' options={items} optionLabel='name' /> */}
      Demo {JSON.stringify(items)}
    </div>
  )
}

export default function PrimeReactSelectButtonTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='SelectButtonTogether'
      originalName='SelectButton'
      docUrl={`https://primereact.org/selectbuttontogether/`}
      ComponentDemo={PrimeReactSelectButtonTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('SelectButtonTogether')} keyToLookupWith='' />
}
