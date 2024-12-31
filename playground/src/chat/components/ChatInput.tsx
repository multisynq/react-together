import { useCallback, useState } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
}
export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = useCallback(() => {
    if (input === '') return
    onSend(input)
    setInput('')
  }, [input, onSend])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }
  return (
    <div className="message-editor">
      <div className="input-container">
        <input
          className="px-2 py-1 rounded"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="px-2 py-1 rounded bg-gray-500" onClick={handleSend}>
        Send
      </button>
    </div>
  )
}
