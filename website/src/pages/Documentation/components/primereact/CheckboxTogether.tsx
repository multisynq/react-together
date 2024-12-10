import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const originalName = 'Checkbox'
const name = 'CheckboxTogether'
const docUrl = 'https://primereact.org/checkbox/'

const sourceCode = `
import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { useStateTogether } from 'react-together'

export default function CheckboxTogether({ rtKey, ...props }) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false)

  return (
    <>
      <Checkbox
        {...props}
        onChange={(e) => setChecked(e.checked || false)}
        checked={checked}
        className={\`outline outline-1 outline-slate-400 rounded \${props.className}\`}
      />
    </>
  )
}
`

const demoCode = `
import { CheckboxTogether } from 'react-together-primereact'

export function PrimeReactCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <CheckboxTogether rtKey='checkbox-doc-demo' />
    </div>
  )
}
`

export default function PrimeReactCheckboxTogetherDocumentationPage() {
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
            name: 'checked',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('CheckboxTogether')} />
}
