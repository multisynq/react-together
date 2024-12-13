import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'KnobTogether'
const originalName = 'Knob'

const codes = {
  demo: {
    basic: `
import { KnobTogether } from '@multisynq/react-together-primereact'

export function PrimeReactKnobTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <KnobTogether rtKey='knob-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Knob, KnobProps } from 'primereact/knob'
import { useStateTogether } from '@multisynq/react-together'

export default function KnobTogether({ rtKey, ...props }) {
  const [value, set_value] = useStateTogether<number>(rtKey, 0)

  return (
    <Knob {...props} value={value || 0} onChange={(e) => set_value(e.value)} />
  )
}
`,
  },
}

export default function PrimeReactKnobTogetherDocumentationPage() {
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

  return <DocumentationPage {...{ content, navItems: GenericDocNav('KnobTogether') }} />
}
