import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const originalName = 'TriStateCheckbox'
const name = 'TriStateCheckboxTogether'

const codes = {
  demo: {
    basic: `
import { TriStateCheckboxTogether } from '@multisynq/react-together-primereact'

export function PrimeReactTriStateCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <TriStateCheckboxTogether rtKey='tri-state-checkbox-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import {
  TriStateCheckbox,
  TriStateCheckboxProps
} from 'primereact/tristatecheckbox'
import { Nullable } from 'primereact/ts-helpers'
import { useStateTogether } from '@multisynq/react-together'

export default function TriStateCheckboxTogether({ rtKey, ...props }) {
  const [value, setValue] = useStateTogether<Nullable<boolean>>(rtKey, false)

  return (
    <>
      <TriStateCheckbox
        {...props}
        onChange={(e) => setValue(e.value)}
        value={value}
        className={\`outline outline-1 outline-gray-400 rounded \${props.className}\`}
      />
    </>
  )
}
`,
  },
}

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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('TriStateCheckboxTogether') }} />
}
