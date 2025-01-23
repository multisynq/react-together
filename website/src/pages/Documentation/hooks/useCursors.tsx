import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: {
    basic: `
import { useCursors } from 'react-together'

export function UseCursorsDemo() {
  const { myCursor, allCursors } = useCursors({ deleteOnLeave: true })

  return (
    <div className='relative w-full h-screen overflow-hidden flex justify-center items-center'>
      {/* Render other users' cursors */}
      {Object.entries(allCursors).map(([userId, cursor]) => {
        if (!cursor) return null
        return (
          <div
            key={userId}
            className='fixed w-2 h-2 rounded-full bg-emerald-500'
            style={{
              left: cursor.pageX,
              top: cursor.pageY,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s linear',
            }}
          />
        )
      })}
      <p className='text-center px-4'>
        {myCursor ? (
          <>
            {myCursor.pageX} x {myCursor.pageY}
          </>
        ) : (
          <>Move your cursor to broadcast its position to other people in the room.</>
        )}
      </p>
    </div>
  )
}
`,
  },
  usage: {
    basic: `
import { useCursors } from 'react-together';

export default function UseCursorsDemo() {
  const { myCursor, allCursors } = useCursors({ omitMyValue: true })

  return (
    <>
      {myCursor && <p>Your cursor is at {myCursor.pageX} x {myCursor.pageY}</p>}
      <ul>
        {Object.entries(allCursors).map(
        ([userId, { pageX, pageY }]) =>
          cursor && (
            <li key={userId}>
              {userId}: ({pageX}, {pageY})
            </li>
          )
      )}
    </ul>
  )
}
  `,
  },
}

export default function UseCursors() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'options',
            type: 'UseCursorsOptions',
            description: 'Optional configuration object for the useCursors hook.',
            default: '{}',
          },
        ]}
      />
      <InterfaceApi
        title='UseCursorsOptions'
        id='useCursorsOptions'
        items={[
          {
            name: 'deleteOnLeave',
            type: 'boolean',
            default: 'false',
            description: "Whether to remove the cursor when the user's mouse leaves the window.",
          },
          {
            name: 'throttleDelay',
            type: 'number',
            default: '50',
            description: (
              <p>
                Delay in milliseconds between cursor position updates. This will be passed to{' '}
                <LinkSpan text='useStateTogetherWithPerUserValues' to='/useStateTogetherWithPerUserValues' />.
              </p>
            ),
          },
          {
            name: 'omitMyValue',
            type: 'boolean',
            default: 'true',
            description: (
              <p>
                Whether to exclude the current user's cursor from allCursors. This will be passed to{' '}
                <LinkSpan text='useStateTogetherWithPerUserValues' to='/useStateTogetherWithPerUserValues' />.
              </p>
            ),
          },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: 'myCursor',
            type: 'Cursor | null',
            description: "The current user's cursor position.",
          },
          {
            name: 'allCursors',
            type: 'Record<string, Cursor>',
            description: "An object containing all users' cursor positions.",
          },
        ]}
      />
      <InterfaceApi
        title='Cursor'
        id='cursor'
        items={[
          {
            name: 'clientX',
            type: 'number',
            description: (
              <p>
                The x-coordinate of the cursor position relative to the <strong>viewport</strong>. See{' '}
                <LinkSpan text='MDN' to='https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX' target='_blank' /> for more
                information.
              </p>
            ),
          },
          {
            name: 'clientY',
            type: 'number',
            description: (
              <p>
                The y-coordinate of the cursor position relative to the <strong>viewport</strong>. See{' '}
                <LinkSpan text='MDN' to='https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY' target='_blank' /> for more
                information.
              </p>
            ),
          },
          {
            name: 'pageX',
            type: 'number',
            description: (
              <p>
                The x-coordinate of the cursor position relative to the <strong>document</strong>. See{' '}
                <LinkSpan text='MDN' to='https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX' target='_blank' /> for more
                information.
              </p>
            ),
          },
          {
            name: 'pageY',
            type: 'number',
            description: (
              <p>
                The y-coordinate of the cursor position relative to the <strong>document</strong>. See{' '}
                <LinkSpan text='MDN' to='https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY' target='_blank' /> for more
                information.
              </p>
            ),
          },
          {
            name: 'percentX',
            type: 'number',
            description: (
              <p>
                The x-coordinate of the cursor position as a percentage of the <strong>document</strong> width.
              </p>
            ),
          },
          {
            name: 'percentY',
            type: 'number',
            description: (
              <p>
                The y-coordinate of the cursor position as a percentage of the <strong>document</strong> height.
              </p>
            ),
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      {...{
        title: 'useCursors',
        description: (
          <>
            <p>
              The <CodeSpan text='useCursors' /> hook enables real-time cursor tracking in a React Together session. It provides
              functionality to track and display cursor positions of all connected users.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useCursors' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'useCursors' }).github_demo,
                      // stackBlitz:
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useCursors', { exclude: ['source'] }) }} />
}
