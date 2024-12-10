import { CodeBlock } from '@components/ui'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

const codes = {
  usage_1: {
    basic: `
import { utils } from 'react-together'
const { getJoinUrl } = utils
`,
  },

  usage_2: {
    basic: `
const url = new URL('https://reacttogether.dev');
const joinUrl = getJoinUrl(url, 'session1', 'password123');
console.log(joinUrl.toString()); // 'https://reacttogether.dev?rtName=session1#rtPwd=password123'

const joinUrl2 = getJoinUrl(url, 'session1', 'password123', { nameKey: 'name', rtPwd: 'secret' });
console.log(joinUrl2.toString()); // 'https://reacttogether.dev?name=session1#secret=password123'
`,
  },
}

export default function GetJoinUrlDocumentationPage() {
  const api = (
    <>
      <FunctionArgsApi
        items={[
          {
            name: 'url',
            type: 'URL',
            description: 'The base URL to modify.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'The session name to add to the URL.',
          },
          {
            name: 'password',
            type: 'string',
            description: 'The session password to add to the URL',
          },
          {
            name: 'options.nameKey',
            type: 'string',
            default: 'rtName',
            description: 'The query parameter key for the session name.',
          },
          {
            name: 'options.passwordKey',
            type: 'string',
            default: 'rtPwd',
            description: 'The hash parameter key for the session password.',
          },
        ]}
      />
      <FunctionReturnApi
        items={[
          {
            name: 'url',
            type: 'URL',
            description: 'A new URL instance with the specified session name and password parameters.',
          },
        ]}
      />
    </>
  )
  return (
    <GenericDocPage
      {...{
        id: 'getJoinUrl',
        title: 'getJoinUrl',
        description: 'Creates a new URL with specified session name and password parameters in the query string and hash.',
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
}
