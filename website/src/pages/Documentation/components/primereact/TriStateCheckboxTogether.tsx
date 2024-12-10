import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const originalName = 'TriStateCheckbox'
const name = 'TriStateCheckboxTogether'
const docUrl = 'https://primereact.org/tristatecheckbox/'

const sourceCode = `
import {
  TriStateCheckbox,
  TriStateCheckboxProps
} from 'primereact/tristatecheckbox'
import { Nullable } from 'primereact/ts-helpers'
import { useStateTogether } from 'react-together'

export default function TriStateCheckboxTogether({ rtKey, ...props }) {
  const [value, setValue] = useStateTogether<Nullable<boolean>>(rtKey, false)

  return (
    <>
      <TriStateCheckbox
        {...props}
        onChange={(e) => setValue(e.value)}
        value={value}
        className={\`outline outline-1 outline-slate-400 rounded \${props.className}\`}
      />
    </>
  )
}
`

const demoCode = `
import { TriStateCheckboxTogether } from 'react-together-primereact'

export function PrimeReactTriStateCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <TriStateCheckboxTogether rtKey='tri-state-checkbox-doc-demo' />
    </div>
  )
}
`

export default function PrimeReactTriStateTriStateCheckboxTogetherDocumentationPage() {
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
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('TriStateCheckboxTogether')} />
}
