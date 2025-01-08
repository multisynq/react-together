import { useCallback, useState } from 'react'
import { ChatInputProps } from './types'

export default function ChatInput({ sendMessage }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = useCallback(() => {
    if (input === '') return
    sendMessage(input)
    setInput('')
  }, [input, sendMessage])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }
  return (
    <div className="flex w-full p-2 overflow-hidden gap-2 rt-input-container">
      <input
        className="rt-input-text"
        value={input}
        placeholder="Type your message..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="rt-input-button" onClick={handleSend}>
        Send
      </button>
    </div>
  )
}
