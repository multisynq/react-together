import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { MultiSelectTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'MultiSelectTogether'
const originalName = 'MultiSelect'
const docUrl = `https://primereact.org/multiselect`

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
      <MultiSelectTogether rtid='multi-select-doc-demo' options={cities} optionLabel='name' multiple display='chip' />
    </div>
  )
}

export default function PrimeReactMultiSelectTogetherDocumentationPage() {
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
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactMultiSelectTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('MultiSelectTogether')} />
}
