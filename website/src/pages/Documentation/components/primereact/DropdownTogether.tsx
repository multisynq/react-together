import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { DropdownTogether } from '../../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'DropdownTogether'
const originalName = 'Dropdown'
const docUrl = `https://primereact.org/dropdown`

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
            name: 'value',
            description: 'Removed, since this value will be controlled by the useStateTogether hook',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactDropdownTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('DropdownTogether')} keyToLookupWith='' />
}
