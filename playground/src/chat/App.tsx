import { useState } from 'react'
import {
  Chat,
  ChatCollapsedProps,
  ReactTogether,
  SessionManager
} from 'react-together'

interface MyInputBarProps {
  onSend: (msg: string) => void
}
function MyInputBar({ onSend }: MyInputBarProps) {
  const [msg, setMsg] = useState('')

  const handleSend = () => {
    onSend(msg)
    setMsg('')
  }

  return (
    <div className="flex gap-2 px-2">
      <input
        className="grow"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="color-red bg-blue-500 px-2 rounded"
      >
        Send!!
      </button>
    </div>
  )
}

function MyCollapsedChat({ expandChat }: ChatCollapsedProps) {
  return (
    <button
      className="rounded p-2 background-slate-500"
      onClick={() => expandChat()}
    >
      My collapsed component
    </button>
  )
}

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'Playground Chat',
        password: 'mandatory',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <Chat components={{ input: MyInputBar, collapsed: MyCollapsedChat }} />
      <SessionManager />
    </ReactTogether>
  )
}
