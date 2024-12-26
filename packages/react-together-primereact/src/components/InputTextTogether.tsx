import { InputText, InputTextProps } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import { useStateTogether } from 'react-together'

const PUBLISH_TIMEOUT = 10

export interface InputTextTogetherProps
  extends Omit<InputTextProps, 'value' | 'onInput'> {
  rtKey: string
}
export default function InputTextTogether({
  rtKey,
  ...props
}: InputTextTogetherProps) {
  const [value, setValue] = useStateTogether<string>(rtKey, '')
  const [localValue, setLocalValue] = useState<string>(value)

  // This set stores the updates we published but not yet received
  // This is important to prevent the local state from transitioning to a previous
  // value, but to receive other updates published by other users
  const pendingUpdatesRef = useRef<Set<string>>(new Set())

  const nextPublishRef = useRef<number>(0)
  const timeoutRef = useRef<Timer | null>(null)

  useEffect(() => {
    if (!pendingUpdatesRef.current.delete(value)) {
      setLocalValue(value)
    }
  }, [value, setLocalValue])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.currentTarget.value)

    const now = Date.now()
    if (now < nextPublishRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    } else {
      nextPublishRef.current = now + PUBLISH_TIMEOUT
    }

    // We need to get a direct reference to the value
    // so that we don't lose it when the timeout executes
    const value = e.currentTarget.value
    timeoutRef.current = setTimeout(() => {
      pendingUpdatesRef.current.add(value)
      setValue(value)
      timeoutRef.current = null
    }, nextPublishRef.current - now)
  }

  return <InputText {...props} value={localValue} onInput={handleInput} />
}
