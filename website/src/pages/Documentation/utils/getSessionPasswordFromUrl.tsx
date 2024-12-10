import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

export default function GetSessionPasswordFromUrlDocumentationPage() {
  const description = (
    <>
      <p>Retrieves the session password from a URL.</p>
    </>
  )
  const usage = (
    <>
      <CodeBlock
        code={{
          typescript: `\
import { utils } from 'react-together'
const { getSessionPasswordFromUrl } = utils`,
        }}
      />
      <CodeBlock
        code={{
          typescript: `\
const url = new URL('https://reacttogether.dev?rtName=session1#rtPwd=secret');
const sessionName = getSessionPasswordFromUrl(url); // 'secret'

const url2 = new URL('https://reacttogether.dev?rtName=session1#rtPassword=secret');
const sessionName2 = getSessionPasswordFromUrl(url2, { passwordKey: 'rtPassword' }); // 'secret'
`,
        }}
      />
    </>
  )
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
    <GenericDocPage id='getSessionPasswordFromUrl' title='getSessionPasswordFromUrl' description={description} usage={usage} api={api} />
  )
}
