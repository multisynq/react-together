// import { ReactTogetherManager } from 'react-together/src/components/ReactTogetherManager'
import { useStateTogether } from 'react-together'
import TinyRpgTogether from './components/TinyRpg'

export default function App() {
  const [count, setCount] = useStateTogether('count', 0)

  return (
    <>
      <button onClick={() => setCount((p) => (p ? p + 1 : 1))}>{count}</button>
      <TinyRpgTogether />
    </>
  )
}
