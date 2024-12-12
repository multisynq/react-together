import { CodeBlock, CodeSpan, Link } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: {
    basic: `import { useStateTogetherWithPerUserValues } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-key', 0)

  const increment = () => setCount((prev) => prev + 1)
  const reset = () => setCount(0)

  return (
    <div>
      {Object.entries(countPerUser).map(([userId, count]) => {
        return <div key={userId}>{count}</div>
      })}
    </div>
  )
}
`,
  },

  demo: {
    basic: `
import { CroquetReact, useStateTogetherWithPerUserValues } from 'react-together'

const { useViewId } = CroquetReact

function Score({ score, clickable, onClick, onContextMenu }) {
  const clickableStyle = clickable ? 'cursor-pointer shadow-sm bg-slate-500 text-white' : ''
  return (
    <div className='flex flex-col align-items-start'>
      <div
        className={'py-2 px-4 flex items-center justify-center bg-slate-100 rounded-lg select-none ' + clickableStyle}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        {score}
      </div>
    </div>
  )
}
export function UseStateTogetherWPUVDemo() {
  const [, setMyScore, scoresByUser] = useStateTogetherWithPerUserValues<number>('useStateTogetherWithValuesPerUser-demo', 0)

  const increment = () => setMyScore((p) => p + 1)
  const reset = () => setMyScore(0)

  const myId = useViewId()
  return (
    <div className='flex flex-col items-center gap-2 mx-2'>
      <div className='flex gap-5 flex-wrap'>
        {Object.entries(scoresByUser).map(([userId, score]) => {
          const clickable = userId === myId
          return (
            <Score
              key={userId}
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
      <p style={{ color: '#888888', fontSize: '0.7rem' }}>Right click to reset to zero</p>
    </div>
  )
}
`,
  },
}

const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'rtKey',
          type: 'string',
          description: 'The key used to identify this state.',
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
          description: 'The current local state.',
        },
        {
          name: '1',
          type: '(T | (T) => T) => void',
          description: 'The set function that allows updating the local state to a different value.',
        },
        {
          name: '2',
          type: '[key: string]: T',
          description:
            'An object containing a mapping between each user and its current state. Users that are not rendered in the hook will not appear in mapping, even if they are connected in the session.',
        },
      ]}
    />
  </>
)
const content = (
  <GenericDocPage
    {...{
      title: 'useStateTogetherWithPerUserValues',
      description: (
        <>
          <p>
            The <CodeSpan text='useStateTogetherWithValuesPerUser' /> hook allows users to read the state of all their peers. If the user is
            not connected to any session, the hook behaves like a normal{' '}
            <Link to='https://react.dev/reference/react/useState' target='_blank'>
              useState
            </Link>
            , and the peer state object will be empty. The example below illustrates a possible usage of this hook.
          </p>
          <p>
            {' '}
            Each user displays a series of numbers, representing the <CodeSpan text='count' /> associated with each connected user. The
            local count is highlighted with a darker background. Although each user can only change its local count (by clicking on it),
            everyone can see the count values of everyone else!
          </p>
          <PreviewSourceCodeTabs
            {...{
              preview: <DocumentationDemo url='useStateTogetherWithPerUserValues' />,
              code: (
                <CodeBlock
                  {...{
                    code: codes.demo,
                    github: getDocLinks({ rt_name: 'UseStateTogetherWPUV' }).github_demo,
                  }}
                />
              ),
            }}
          />
          {/* <DocumentationDemo url='useStateTogetherWithPerUserValues' /> */}
        </>
      ),
      usage: (
        <>
          <CodeBlock code={codes.usage_1} />
          <CodeBlock code={codes.usage_2} />
        </>
      ),
      api,
    }}
  />
)
export default function UseStateTogetherWithPerUserValuesDocumentationPage() {
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useStateTogetherWithPerUserValues') }} />
}
