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
      <div className='overflow-y-auto px-2 h-full w-full'>
        <ul className='flex gap-1 flex-col mb-2'>
          {messages.map(({ id, senderId, message, sentAt }) => (
            <li key={id}>
              [{formatTime(sentAt)}] <strong>{senderId}</strong>: {message}
            </li>
          ))}
        </ul>
      </div>
      {/* ---INPUT CONTAINER--- */}
      <div className='flex gap-2 px-2 w-full'>
        <input
          className='border rounded-md p-2 w-full'
          type='text'
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e)
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600 mr-[5rem]' onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </DynamicUrlWrapper>
  )
}

function formatTime(time: number) {
  return new Date(time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
