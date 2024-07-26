import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
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
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
          {
            removed: true,
            name: 'value',
            description: (
              <p>
                Removed, since this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
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

  return <DocumentationPage content={content} navItems={GenericDocNav('TriStateTriStateCheckboxTogether')} />
}
