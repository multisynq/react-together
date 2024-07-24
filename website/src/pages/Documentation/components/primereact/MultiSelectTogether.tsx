import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { MultiSelectTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactMultiSelectTogetherDemo() {
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]
  return (
    <div className='flex-col place-items-center'>
      {/* <MultiSelectTogether rtid='multi-select-doc-demo' options={cities} optionLabel='name' multiple display='chip' /> */}
      Demo {JSON.stringify(cities)}
    </div>
  )
}

export default function PrimeReactMultiSelectTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='MultiSelectTogether'
      originalName='MultiSelect'
      docUrl={`https://primereact.org/multiselecttogether/`}
      ComponentDemo={PrimeReactMultiSelectTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('MultiSelectTogether')} keyToLookupWith='' />
}
