import { useCallback, useState } from 'react'
import { ChatInputProps } from './types'

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
    // <div className="message-editor">
    //   <div className="input-container">
    //     <input
    //       className="px-2 py-1 rounded"
    //       value={input}
    //       placeholder="Type your message..."
    //       onChange={(e) => setInput(e.target.value)}
    //       onKeyDown={handleKeyDown}
    //     />
    //   </div>
    //   <button className="px-2 py-1 rounded bg-gray-500" onClick={handleSend}>
    //     Send
    //   </button>
    // </div>
    <div className="border-t border-gray-300 bg-gray-200">
      <div className="flex w-full p-2 overflow-hidden gap-2">
        <input
          className="rounded-lg px-4 flex-1"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-gray-500 p-2 rounded-lg font-semibold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}
