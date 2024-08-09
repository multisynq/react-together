import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'ColorPickerTogether'
const originalName = 'ColorPicker'
const docUrl = `https://primereact.org/colorpicker`

export default function PrimeReactColorPickerTogetherDocumentationPage() {
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
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
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
          {
            removed: false,
            name: 'publishWhileOpen',
            type: 'boolean',
            default: <CodeSpan text='false' />,
            description: (
              <p>
                This flag determines how color changes sync with other users. When <CodeSpan text='true' />, changes are shared immediately,
                even while the picker is open. When <CodeSpan text='false' />, changes sync only after closing the picker. If the color
                picker is set to <LinkSpan text='inline' to='https://primereact.org/colorpicker/#api.ColorPicker.props.inline' /> mode,
                changes always sync immediately, regardless of this flag.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('ColorPickerTogether')} />
}
