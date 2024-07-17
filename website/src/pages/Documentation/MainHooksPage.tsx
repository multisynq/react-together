import { NavItem } from './types'
import { GifDisplay } from '../../../src/components/ui/GifDisplay'
import stateTogetherGif from '../../images/useStateTogether_v1.gif'
import sharedStateGif from '../../images/useSharedState_v1.gif'
import { CodeBlock } from '@components/ui/CodeBlock'

export const MainHooksPage: React.FC = () => {
  const sampleCode1 = `export default function SharedCountButton() {
  const [count, set_count] = useSharedState('count', 0)
  return (
    <button onClick={() => set_count((prev) => prev + 1)}>
      Count: {count}
    </button>
  )
}
`
  const sampleCode2 = `export default function EverybodysScores() {
 const [myScore, setMyScore, scoresByUser] =
   useStateTogetherWithValuePerUser<number>('scores', 0)
 return (
   <div>
     <h1>Everybody's Scores</h1>
     <p>Your score: {myScore}</p>
     <p>Everybody's scores:</p>
     <ul>
       {Object.entries(scoresByUser).map(([user, score]) => (
         <li key={user}>
           {iconFromString(user}: {score}
         </li>
       ))}
     </ul>
     <button onClick={() => setMyScore(myScore + 1)}>Increment my score</button>
   </div>
 )
}

`
  return (
    <>
      <h2>Main Hooks</h2>
      <h3 id='overview'>Overview</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <h4 id='useSharedState'>useSharedState(rtid, initial_value)</h4>
      <p>
        The useSharedState hook makes every user see the same state simultaneously. If the user is not connected to any session, then this
        hook behaves as a normal useState.
      </p>
      <div>
        <h6 className='text-gray-800'>Params:</h6>
        <ul>
          <li>
            <strong>rtid</strong> - the id that will identify this synchronized piece of state.
          </li>
          <li>
            <strong>initialValue</strong> - the initial value to use the first time the state is created.
          </li>
        </ul>
      </div>
      <GifDisplay imageSource={stateTogetherGif} imageTitle='Shared State' />
      <CodeBlock language='javascript' code1={sampleCode1} />
      <h4 id='useStateTogether'>useStateTogetherWithValuePerUser(rtid, initial_value)</h4>
      <p>
        The useStateTogether hook allows users to read the state of all of their peers. If the user is not connected to any session, then
        the hook will behave as a normal useState, and the peer state object will be empty.
      </p>
      <p>
        Params: rtid - the id that will identify this synchronized piece of state initialValue - the initial value to use the first time the
        state is created.
      </p>
      <GifDisplay imageSource={sharedStateGif} imageTitle='Shared State' />
      <CodeBlock language='javascript' code1={sampleCode2} />
    </>
  )
}

export const mainHooksNavItems: NavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'useSharedState', label: 'useSharedState' },
  { key: 'useStateTogether', label: 'useStateTogether' },
]
