import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
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
      <SelectButtonTogether
        rtid='select-button-doc-demo'
        options={items}
        optionLabel='name'
        pt={{
          button: (ctx) => ({
            className: `border h-[15px] ${(ctx || { props: {} }).props.className}`,
          }),
        }}
      />
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
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactSelectButtonTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('SelectButtonTogether')} />
}
