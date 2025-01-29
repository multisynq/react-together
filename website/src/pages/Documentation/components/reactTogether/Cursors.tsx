import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import InterfaceApi from '@pages/Documentation/InterfaceApi'
import { PreviewSourceCodeTabs } from '@pages/Documentation/PreviewSourceCodeTabs'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import ComponentPropsTable from '../ComponentPropsTable'

const codes = {
  usage: {
    basic: `
import { Cursors } from 'react-together'

return <Cursors />`,
  },

  demo: {
    basic: `
import { Cursors } from 'react-together'

export function CursorsDemo() {
  return (
    <>
      <Cursors deleteOnLeave />
      <div className='h-screen w-screen px-4 text-center flex items-center justify-center'>
        <h6 className='text-lg font-bold'>Move your cursor in this area to broadcast it to other users</h6>
      </div>
    </>
  )
}
`,
  },
}

export default function CursorsDocumentationPage() {
  const api = (
    <>
      <h5>Props</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'deleteOnLeave',
            type: 'boolean',
            default: 'false',
            description: (
              <p>
                Whether to remove the cursor when the user's mouse leaves the window. This option will be passed to{' '}
                <LinkSpan to='/useCursors' text='useCursors' /> hook.
              </p>
            ),
          },
          {
            name: 'components',
            type: 'CursorsComponents',
            description: <p>The components to use for the cursors. This allows to customize the cursors interface.</p>,
          },
          {
            name: 'getUserColor',
            type: '(userId: string) => string',
            // default: 'defaultGetUserColor',
            description: (
              <p>
                A function that returns the color for a given userId. This option will be passed to the <CodeSpan text='UserCursor' />{' '}
                component.
              </p>
            ),
          },
          {
            name: 'omitMyValue',
            type: 'boolean',
            default: 'true',
            description: (
              <p>
                Whether to exclude the current user's cursor from the rendered cursors. This option will be passed to{' '}
                <LinkSpan to='/useCursors' text='useCursors' /> hook.
              </p>
            ),
          },
          {
            name: 'throttleDelay',
            type: 'number',
            default: '50',
            description: (
              <p>
                Delay in milliseconds between cursor position updates. This option will be passed to{' '}
                <LinkSpan to='/useCursors' text='useCursors' /> hook.
              </p>
            ),
          },
          {
            name: 'transitionDuration',
            type: 'number',
            default: '100',
            description: (
              <p>
                The duration of the cursor transition in milliseconds. This option will be passed to the <CodeSpan text='UserCursor' />{' '}
                component.
              </p>
            ),
          },
        ]}
      />
      <InterfaceApi
        title='CursorsComponents'
        items={[
          {
            name: 'UserCursor',
            type: 'Component<UserCursorProps>',
            description: <p>The component to use for the user cursor.</p>,
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      {...{
        title: 'Cursors',
        description: (
          <>
            <p>
              The <CodeSpan text='Cursors' /> component enables real-time cursor tracking and visualization in a React Together session. It
              displays the cursor positions of all connected users.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='Cursors' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'Cursors' }).github_demo,
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('Cursors', { exclude: ['source'] }) }} />
}
