import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'SelectButtonTogether'
const originalName = 'SelectButton'

const codes = {
  demo: {
    basic: `
import { SelectButtonTogether } from 'react-together-primereact'

export function PrimeReactSelectButtonTogetherDemo() {
  const items = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3, disabled: false },
  ]
  return (
    <div className='flex-col place-items-center'>
      <SelectButtonTogether rtKey='select-button-doc-demo' options={items} optionLabel='name' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import { useStateTogether } from '@multisynq/react-together'

export default function SelectButtonTogether({ rtKey, options, ...props }) {
  const [value, set_value] = useStateTogether<unknown>(rtKey, null)

  return (
    <SelectButton
      {...props}
      onChange={(e) => set_value(e.value || false)}
      options={options}
      value={value || options?.[0]}
      pt={{
        button: (ctx) => ({
          className: \`border h-[15px] \${(ctx || { props: {} }).props.className}\`
        })
      }}
    />
  )
}
`,
  },
}

export default function PrimeReactSelectButtonTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtKey',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
          {
            removed: true,
            name: 'value',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage
      {...{
        name,
        originalName,
        api,
        demo: { code: codes.demo },
        source: { code: codes.source },
      }}
    />
  )

  return <DocumentationPage {...{ content, navItems: GenericDocNav('SelectButtonTogether') }} />
}
