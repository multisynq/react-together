import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'CheckboxTogether'
const originalName = 'Checkbox'

const codes = {
  demo: {
    basic: `
import { CheckboxTogether } from '@multisynq/react-together-primereact'

export function PrimeReactCheckboxTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <CheckboxTogether rtKey='checkbox-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    typescript: `
import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { useStateTogether } from '@multisynq/react-together'

export interface CheckboxTogetherProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtKey: string
  className?: string
}
export default function CheckboxTogether({
  rtKey,
  ...props
}: CheckboxTogetherProps) {
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
`,
  },
}

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
  const content = (
    <PrimeReactComponentDocumentationPage
      {...{
        name,
        originalName,
        api,
        demo: { code: codes.demo },
        source: {
          code: codes.source,
          stackBlitz: true,
          codepen: true,
          codeMetadata: { componentName: 'CheckboxTogether' },
        },
      }}
    />
  )

  return <DocumentationPage {...{ content, navItems: GenericDocNav('CheckboxTogether') }} />
}
