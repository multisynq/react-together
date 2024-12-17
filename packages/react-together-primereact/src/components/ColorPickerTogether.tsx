import {
    ColorPicker,
    ColorPickerChangeEvent,
    ColorPickerHSBType,
    ColorPickerProps,
    ColorPickerRGBType
} from 'primereact/colorpicker'
import { useCallback, useEffect, useState } from 'react'
import { useStateTogether } from 'react-together'

type ColorPickerValueType =
  | string
  | ColorPickerRGBType
  | ColorPickerHSBType
  | undefined

export interface ColorPickerTogetherProps
  extends Omit<ColorPickerProps, 'value'> {
  rtKey: string
  publishWhileOpen?: boolean
}
export default function ColorPickerTogether({
  rtKey,
  publishWhileOpen = false,
  onChange,
  ...props
}: ColorPickerTogetherProps) {
  const [localValue, setLocalValue] = useState<ColorPickerValueType>(undefined)
  const [remoteValue, setRemoteValue] = useStateTogether<ColorPickerValueType>(
    rtKey,
    undefined
  )

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
