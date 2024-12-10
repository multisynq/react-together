import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

const codes = {
  usage_1: {
    basic: `
import { utils } from 'react-together'
const { getSessionPasswordFromUrl } = utils
`,
  },

  usage_2: {
    basic: `
const url = new URL('https://reacttogether.dev?rtName=session1#rtPwd=secret');
const sessionName = getSessionPasswordFromUrl(url); // 'secret'

const url2 = new URL('https://reacttogether.dev?rtName=session1#rtPassword=secret');
const sessionName2 = getSessionPasswordFromUrl(url2, { passwordKey: 'rtPassword' }); // 'secret'
`,
  },
}

export default function GetSessionPasswordFromUrlDocumentationPage() {
  const api = (
    <>
      <FunctionArgsApi
        items={[
          {
            name: 'url',
            type: 'URL',
            description: 'The URL object to extract the session password from',
          },
          {
            name: 'options.passwordKey',
            type: 'string',
            default: 'rtPwd',
            description: 'The query parameter key for the session password.',
          },
        ]}
      />
      <FunctionReturnApi
        items={[
          {
            name: 'password',
            type: 'string | null',
            description: (
              <span>
                The session password value, or <CodeSpan text='null' /> if it does not exist.
              </span>
            ),
          },
        ]}
      />
    </>
  )
  return (
    <GenericDocPage
      {...{
        id: 'getSessionPasswordFromUrl',
        title: 'getSessionPasswordFromUrl',
        description: 'Retrieves the session password from a URL.',
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
