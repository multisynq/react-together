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
  const [sessionValue, setSessionValue] =
    useStateTogether<ColorPickerValueType>(rtKey, undefined)

  const inline = props.inline

  const handleChange = useCallback(
    (e: ColorPickerChangeEvent) => {
      if (e.value === null) {
        e.value = undefined
      }
      if (inline || publishWhileOpen) {
        setSessionValue(e.value)
      } else {
        setLocalValue(e.value)
      }
      onChange?.(e)
    },
    [setSessionValue, setLocalValue, inline, publishWhileOpen, onChange]
  )

  const handleHide = useCallback(() => {
    setSessionValue(localValue)
  }, [setSessionValue, localValue])

  useEffect(() => {
    setLocalValue(sessionValue)
  }, [sessionValue, setLocalValue])

  return (
    <ColorPicker
      {...props}
      value={localValue}
      onChange={handleChange}
      onHide={handleHide}
    />
  )
}
