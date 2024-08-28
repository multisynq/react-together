import { useState } from 'react';

interface ChatInputProps {
  onSend: ({ message, ts }: { message: string; ts: number }) => void
}
export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input === '') return
    onSend({ message: input, ts: Date.now() })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }
  return (
    <div className="message-editor">
      <div className="input-container">
        <input
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  )
}