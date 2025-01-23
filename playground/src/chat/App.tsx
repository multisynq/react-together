import { useEffect, useState } from 'react'
import {
  Chat,
  ChatInputProps,
  ChatMinimizedProps,
  ReactTogether,
  SessionManager,
  useNicknames
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
  const [nickname, setNickname] = useNicknames()
  const [localNickname, setLocalNickname] = useState(nickname)

  useEffect(() => {
    setLocalNickname(nickname)
  }, [nickname])

  return (
    <>
      <div className="flex flex-col gap-2 bg-white p-2 rounded-md">
        <span className="text-sm font-bold">Nickname:</span>
        <input
          type="text"
          className="rounded px-2 py-1"
          value={localNickname}
          onChange={(e) => setLocalNickname(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-2 py-1 rounded"
          onClick={() => setNickname(localNickname)}
          disabled={localNickname === nickname}
        >
          Set Nickname
        </button>
      </div>
      <div className="absolute bottom-0 right-[2rem] flex gap-2 items-end">
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
    </>
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
      rememberUsers
      userId="123"
    >
      <App />
      <SessionManager />
    </ReactTogether>
  )
}
