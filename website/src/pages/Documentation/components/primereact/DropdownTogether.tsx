import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'DropdownTogether'
const originalName = 'Dropdown'
const docUrl = `https://primereact.org/dropdown`

const sourceCode = `
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { useStateTogether } from 'react-together'

export default function DropdownTogether({ rtKey, ...props }) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return (
    <Dropdown {...props} value={value} onChange={(e) => set_value(e.value)} />
  )
}
`

export default function PrimeReactDropdownTogetherDocumentationPage() {
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
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('DropdownTogether')} />
}
