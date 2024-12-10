import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'ColorPickerTogether'
const originalName = 'ColorPicker'
const docUrl = `https://primereact.org/colorpicker`

const sourceCode = `
import {
  ColorPicker,
  ColorPickerChangeEvent,
  ColorPickerHSBType,
  ColorPickerProps,
  ColorPickerRGBType
} from 'primereact/colorpicker'
import { useCallback, useEffect, useState } from 'react'
import { useStateTogether } from 'react-together'


export default function ColorPickerTogether({
  rtKey,
  publishWhileOpen = false,
  onChange,
  ...props
}) {
  const [localValue, setLocalValue] = useState(undefined)
  const [remoteValue, setRemoteValue] = useStateTogether(rtKey, undefined)

  const inline = props.inline

  const handleChange = useCallback(
    (e: ColorPickerChangeEvent) => {
      if (e.value === null) {
        e.value = undefined
      }
      if (inline || publishWhileOpen) {
        setRemoteValue(e.value)
      } else {
        setLocalValue(e.value)
      }
      onChange?.(e)
    },
    [setRemoteValue, setLocalValue, inline, publishWhileOpen, onChange]
  )

  const handleHide = useCallback(() => {
    setRemoteValue(localValue)
  }, [setRemoteValue, localValue])

  useEffect(() => {
    setLocalValue(remoteValue)
  }, [remoteValue, setLocalValue])

  return (
    <ColorPicker
      {...props}
      value={localValue}
      onChange={handleChange}
      onHide={handleHide}
    />
  )
}
`

const demoCode = `
import { ColorPickerTogether } from 'react-together-primereact'

export function PrimeReactColorPickerTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ColorPickerTogether rtKey='color-picker-doc-demo' publishWhileOpen />
    </div>
  )
}
`

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
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('ColorPickerTogether')} />
}
