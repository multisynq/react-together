import { CodeBlock } from '@components/ui/CodeBlock'
import { useViewId } from '@croquet/react'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { useStateTogetherWithPerUserValues } from '../../../../../react-together'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

function Score({ score, clickable, onClick, onContextMenu }) {
  const clickableStyle = clickable ? 'border-gray-800 cursor-pointer' : ''
  return (
    <div className='flex flex-col align-items-start'>
      {/* {clickable && (
        <span className='text-xs'>
          Your score: <br />
          (Click to increment)
        </span>
      )} */}
      <div className={'p-2 bg-gray-100 rounded border-2 border-gray-300 ' + clickableStyle} onClick={onClick} onContextMenu={onContextMenu}>
        {score}
      </div>
      {/* <span className='text-xs'>{label}</span> */}
    </div>
  )
}

function EverybodysScores() {
  const [_, setMyScore, scoresByUser] = useStateTogetherWithPerUserValues<number>('useStateTogetherWithValuesPerUser-demo', 0)

  const increment = () => setMyScore((p) => p + 1)
  const reset = () => setMyScore(0)

  const myViewId = useViewId()
  return (
    <div className='flex gap-5'>
      {Object.entries(scoresByUser).map(([viewId, score]) => {
        const clickable = viewId === myViewId
        return (
          <Score
            key={viewId}
            // label={viewId}
            score={score}
            clickable={clickable}
            onClick={() => clickable && increment()}
            onContextMenu={(e) => {
              if (clickable) {
                e.preventDefault()
                reset()
              }
            }}
          />
        )
      })}
    </div>
  )
}

const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'rtid',
          type: 'string',
          description: 'The key used to identify this state',
        },
        {
          name: 'initialValue',
          type: 'T',
          description: 'The initial value to use the first time the state is created.',
        },
      ]}
    />
    <HookReturnApi
      items={[
        {
          name: '0',
          type: 'T',
          description: 'The current local state',
        },
        {
          name: '1',
          type: '(T | (T) => T) => void',
          description: 'The set function that lets you update the local state to a different value',
        },
        {
          name: '2',
          type: '[key: string]: T',
          description:
            'An object containing a mapping between each view and the state it currently has. The views that are not rendering this hook will not exist in this mapping, even though they are connected to the React Together session.',
        },
      ]}
    />
  </>
)
const content = (
  <GenericDocPage
    title='useStateTogetherWithPerUserValues'
    description={
      <>
        <p>
          The useStateTogetherWithValuesPerUser hook allows users to <strong>read the state of all of their peers</strong>. If the user is
          not connected to any session, then the hook will behave as a normal useState, and the peer state object will be empty.
        </p>
        <DocumentationDemo>
          <EverybodysScores />
        </DocumentationDemo>
      </>
    }
    usage={
      <>
        <CodeBlock language='jsx' code1={`import { useStateTogetherWithPerUserValues } from 'react-together'`} />
        <CodeBlock
          language='jsx'
          code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
        />
      </>
    }
    api={api}
  />
)
export default function UseStateTogetherWithPerUserValuesDocumentationPage() {
  return <DocumentationPage content={content} navItems={GenericDocNav('useStateTogetherWithPerUserValues')} />
}
