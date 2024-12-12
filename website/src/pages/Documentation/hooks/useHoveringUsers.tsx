import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import { codes as _codes } from '../components/HoverHighlighter'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: _codes.demo,

  usage_1: {
    basic: `import { useHoveringUsers } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const [ref, hoveringUsers, isHovering] = useHoveringUsers('hovering-views')

  return (
    <div>
      <div ref={ref}>{isHovering ? "You're hovering me!" : 'Hover me!'}</div>
      <h3>Hovering Ids:</h3>
      <ul>
        {hoveringUsers.map((userId) => (
          <li key={userId}>{userId}</li>
        )}
      </ul>
    </div>
  )
}
`,
  },
}

export default function UseHoveringUsersDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: 'The key used to identify this state.',
          },
          // {
          //   name: 'options',
          //   type: 'UseHoveringViewOptions',
          //   description: 'An options object used to configure the behavior of this hook',
          // },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: '0',
            type: 'MutableRefObject',
            description: 'The current local state.',
          },
          {
            name: '1',
            type: 'string[]',
            description: (
              <p>
                An array containing all the user IDs that are currently hovering over the element with the returned <CodeSpan text='ref' />.
              </p>
            ),
          },
          {
            name: '2',
            type: 'boolean',
            description: <p>A boolean indicating whether the local user is hovering the targeted element.</p>,
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useHoveringUsers',
        parameter: '(rtKey, options)',
        description: (
          <>
            <p>
              The <CodeSpan text='useHoveringUsers' /> hook identifies which users are hovering a given DOM element.
            </p>
            <p>
              If a user is hovering a component that is nested within other <CodeSpan text='hoverable' /> components, only the innermost
              component will indicate that it's being hovered.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='HoverHighlighter' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'HoverHighlighter' }).github_demo,
                    }}
                  />
                ),
              }}
            />
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useHoveringUsers') }} />
}
