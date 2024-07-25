import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { SelectButtonTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'SelectButtonTogether'
const originalName = 'SelectButton'
const docUrl = `https://primereact.org/selectbutton`

function PrimeReactSelectButtonTogetherDemo() {
  const items = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3, disabled: false },
  ]
  return (
    <div className='flex-col place-items-center'>
      <SelectButtonTogether rtid='select-button-doc-demo' options={items} optionLabel='name' />
    </div>
  )
}

export default function PrimeReactSelectButtonTogetherDocumentationPage() {
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
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactSelectButtonTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('SelectButtonTogether')} />
}
