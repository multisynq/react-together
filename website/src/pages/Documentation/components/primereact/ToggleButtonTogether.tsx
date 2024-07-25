import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { ToggleButtonTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'ToggleButtonTogether'
const originalName = 'ToggleButton'
const docUrl = `https://primereact.org/togglebutton`

function PrimeReactToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ToggleButtonTogether rtid='toggle-button-doc-demo' />
    </div>
  )
}

export default function PrimeReactToggleButtonTogetherDocumentationPage() {
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
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactToggleButtonTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('ToggleButtonTogether')} />
}
