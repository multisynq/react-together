import { useState } from 'react'
import {
  Chat,
  ChatInputProps,
  ChatMinimizedProps,
  ReactTogether,
  SessionManager
} from 'react-together'

function MyInputBar({ sendMessage }: ChatInputProps) {
  const [msg, setMsg] = useState('')

  const handleSend = () => {
    sendMessage(msg)
    setMsg('')
  }

  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        className="px-2 grow rounded"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Custom Placeholder"
      />
      <button
        onClick={handleSend}
        className="text-white bg-blue-500 p-2 rounded"
      >
        Custom Send!!
      </button>
    </div>
  )
}

function MyChatMinimized({ expandChat }: ChatMinimizedProps) {
  return (
    <button
      className="rounded p-2 background-teal-700"
      onClick={() => expandChat()}
    >
      My collapsed component
    </button>
  )
}

function App() {
  return (
    <div className="absolute bottom-0 right-[2rem] flex gap-2 flex items-end">
      <Chat
        rtKey="chat"
        chatName="Chat 1"
        components={
          {
            // ChatHeader: ({ chatName, minimizeChat }: ChatHeaderProps) => {
            //   return <div onClick={minimizeChat}>{chatName}</div>
            // },
            // ChatMinimized: ({ chatName, expandChat }: ChatMinimizedProps) => {
            //   return <div onClick={expandChat}>{chatName}</div>
            // },
            // MessageAvatar: ({ isMe, senderId }: MessageAvatarProps) => {
            //   return (
            //     <div className="bg-green-500 px-2 rounded-full">
            //       {senderId.slice(0, 2)} {isMe ? '(you)' : ''}
            //     </div>
            //   )
            // },
            //   MessageRow: ({
            //     message,
            //     senderId,
            //     isMe,
            //     sentAt,
            //     MessageAvatar,
            //     MessageBody
            //   }: MessageRowProps) => {
            //     return (
            //       <div className="flex flex-row-reverse items-end">
            //         <MessageAvatar senderId={senderId} isMe={isMe} />
            //         <span>Separator</span>
            //         <MessageBody
            //           message={message}
            //           senderId={senderId}
            //           isMe={isMe}
            //           sentAt={sentAt}
            //           formatTime={(t: number) => t.toString()}
            //         />
            //       </div>
            //     )
            //   }
            // ChatInput: MyInputBar,
            // MessageBody: ({ senderId, ...props }: MessageBodyProps) => {
            //   return <MessageBody {...props} senderId={''} />
            // },
            // ChatHeader: () => <></>
          }
        }
      />
    </div>
  )
}

export default function Wrapper() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'Playground Chat',
        password: 'mandatory',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <App />
      <SessionManager />
    </ReactTogether>
  )
}
