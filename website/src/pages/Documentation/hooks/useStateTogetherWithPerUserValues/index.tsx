import { Markdown } from '@components/Markdown'
import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import InterfaceApi from '@pages/Documentation/InterfaceApi'
import DocumentationDemo from '../../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import HookParamsApi from '../HookParamsApi'
import HookReturnApi from '../HookReturnApi'
import description from './description.md'

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
        {
          name: 'options',
          type: <LinkSpan text='UseStateTogetherWithPerUserValuesOptions' to='#options' />,
          description: 'An option object that allows configuring the behavior of the hook. See more details below.',
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
    <InterfaceApi
      title='UseStateTogetherWithPerUserValuesOptions'
      id='options'
      items={[
        {
          name: 'keyOverride',
          type: 'string',
          description: (
            <Markdown>
              By default, user's state is associated with their `userId`. This option allows associating state with custom identifiers (e.g.
              an external ID). When multiple users share the same `keyOverride`, their values are synchronized. If `keepValues` is false,
              values associated with a `keyOverride` are only removed from the session after all users with that key disconnect.
            </Markdown>
          ),
        },
        {
          name: 'resetOnConnect',
          type: 'boolean',
          default: 'false',
          description: (
            <Markdown>If `true`, the user's state will be reset to `initialValue` when the user connects to the session.</Markdown>
          ),
        },
        {
          name: 'resetOnDisconnect',
          type: 'boolean',
          default: 'false',
          description: (
            <Markdown>
              If `true`, the user's state will be reset to `initialValue` after the user disconnects from the session. Note that this only
              affects the user's local state, *after* the user disconnects.
            </Markdown>
          ),
        },
        {
          name: 'keepValues',
          type: 'boolean',
          default: 'false',
          description: "If true, the user's state will be persisted in the session even after disconnection.",
        },
        {
          name: 'overwriteSessionValue',
          type: 'boolean',
          default: 'false',
          description: (
            <Markdown>
              By default, when a user connects to a session and a value associated with the user's identifier already exists (either a
              persisted value or another user with the same identifier is already connected to the session), the connecting user will update
              their local state to match the session value. If this flag is `true` the user will force its local value into the session.
            </Markdown>
          ),
        },
      ]}
    />
    <Markdown>
      **Note**: The values passed to these options (except for `keyOverride`) must be the same for all users in the session (make them
      constants in the code). When this does not apply, you may experience unexpected behavior.
    </Markdown>
  </>
)
const content = (
  <GenericDocPage
    title='useStateTogetherWithPerUserValues'
    description={
      <>
        <Markdown>{description}</Markdown>
        <p>
          In the example below, each user displays a series of numbers, representing the <CodeSpan text='count' /> associated with each
          connected user. The local count is highlighted with a darker background. Although each user can only change its local count (by
          clicking on it), everyone can see the count values of everyone else!
        </p>
        <DocumentationDemo url='useStateTogetherWithPerUserValues' />
      </>
    }
    usage={
      <>
        <CodeBlock language='jsx' code1={`import { useStateTogetherWithPerUserValues } from 'react-together'`} />
        <CodeBlock
          language='jsx'
          code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-key', 0)

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
