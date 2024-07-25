import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { CheckboxTogether } from '../../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const originalName = 'Checkbox'
const name = 'CheckboxTogether'
const docUrl = 'https://primereact.org/checkbox/'

function PrimeReactCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <CheckboxTogether rtid='checkbox-test' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactCheckboxTogetherDocumentationPage() {
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
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactCheckboxTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('CheckboxTogether')} keyToLookupWith='' />
}
