import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { TriStateCheckboxTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const originalName = 'TriStateCheckbox'
const name = 'TriStateCheckboxTogether'
const docUrl = 'https://primereact.org/tristatecheckbox/'

function PrimeReactTriStateTriStateCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <TriStateCheckboxTogether rtid='tri-state-checkbox-doc-demo' />
    </div>
  )
}

export default function PrimeReactTriStateTriStateCheckboxTogetherDocumentationPage() {
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
    <PrimeReactComponentDocumentationPage
      {...{ name, originalName, docUrl, api }}
      ComponentDemo={PrimeReactTriStateTriStateCheckboxTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('TriStateTriStateCheckboxTogether')} />
}
