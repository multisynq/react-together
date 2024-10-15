import { Route, Routes } from 'react-router-dom'
import Chat from './chat'
import Gallery from './gallery'
import TinyRpg from './tinyRpg'
import SessionDemo from './SessionDemo'

export default function App() {
  return (
    <Routes>
      <Route path="rpg" element={<TinyRpg />} />
      <Route path="chat" element={<Chat />} />
      <Route path="*" element={<Gallery />} />
      <Route path="session" element={<SessionDemo />} />
    </Routes>
  )
}
