import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'

export default function ConnectedUsersDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'maxAvatars',
            type: 'number',
            default: '3',
            description: (
              <p>
                The maximum number of circles rendered by this component. If <CodeSpan text='maxAvatars' /> is 3 and there are 3 users
                connected, it will render three circles, one for each user. If there are four users connected, it will render the circles
                for two users, and one circle displaying <CodeSpan text='+2' />.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='ConnectedUsers'
      description={
        <>
          <p>
            This component uses the <LinkSpan to='/useConnectedUsers' text='useConnectedUsers' /> hook to display the users connected to the
            current React Together session.
          </p>
          <DocumentationDemo url='ConnectedUsers' />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ConnectedUsers } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <ConnectedUsers/>`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ConnectedUsers')} />
}
