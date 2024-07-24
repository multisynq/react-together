import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { DropdownTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactDropdownTogetherDemo() {
  const cities = [
    { name: 'Los Angeles', code: 'LA' },
    { name: 'London', code: 'LDN' },
    { name: 'Lisbon', code: 'LIS' },
  ]
  return (
    <div className='flex-col place-items-center'>
      {/* <DropdownTogether
        rtid='dropdown-doc-demo'
        options={cities}
        optionLabel='name'
        placeholder='Select a City'
        className='w-full md:w-14rem'
      /> */}
      Demo {JSON.stringify(cities)}
    </div>
  )
}

export default function PrimeReactDropdownTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='DropdownTogether'
      originalName='Dropdown'
      docUrl={`https://primereact.org/dropdowntogether/`}
      ComponentDemo={PrimeReactDropdownTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('DropdownTogether')} keyToLookupWith='' />
}
