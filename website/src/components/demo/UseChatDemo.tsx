import { useState } from 'react'
import { useChat } from 'react-together'
import { DynamicUrlWrapper } from './DynamicUrlWrapper'

export function UseChatDemo() {
  // const { messages, sendMessage } = useChat('use-chat-demo')
  const { messages, sendMessage } = useChat('my-chat')

  const [message, setMessage] = useState('')

  function handleSendMessage(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  return (
    <DynamicUrlWrapper>
      {/* ---MESSAGE CONTAINER--- */}
      <div className='grow overflow-y-auto px-4'>
        <ul className='flex gap-1 flex-col mb-2'>
          {messages.map(({ id, senderId, message, sentAt }) => (
            <li key={id}>
              [{formatTime(sentAt)}] <strong>{senderId}</strong>: {message}
            </li>
          ))}
        </ul>
      </div>
      {/* ---INPUT CONTAINER--- */}
      <div className='flex gap-2 px-2'>
        <input
          className='border rounded-md p-2 grow'
          type='text'
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e)
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='rounded-md p-2 bg-blue-500 text-white' onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </DynamicUrlWrapper>
  )
}

function formatTime(time: number) {
  return new Date(time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
