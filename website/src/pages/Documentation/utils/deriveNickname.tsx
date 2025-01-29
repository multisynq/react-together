import { CodeBlock, LinkSpan } from '@components/ui'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

const codes = {
  usage: {
    basic: `
import { utils } from 'react-together'
const { deriveNickname } = utils

const userId = 'random-looking-user-id'
const nickname = deriveNickname(userId); // 'Ecletic Mastodon'
`,
  },
}

export default function DeriveNicknameDocumentationPage() {
  const api = (
    <>
      <FunctionArgsApi
        items={[
          {
            name: 'userId',
            type: 'string',
            description: 'The user id to derive the nickname from',
          },
        ]}
      />
      <FunctionReturnApi
        items={[
          {
            name: 'nickname',
            type: 'string',
            description: 'The nickname derived from the user id',
          },
        ]}
      />
    </>
  )
  return (
    <GenericDocPage
      {...{
        id: 'deriveNickname',
        title: 'deriveNickname',
        description: (
          <p>
            Derives a nickname from a user id. The nickname is generated using the{' '}
            <LinkSpan text='unique-names-generator' to='https://npmjs.com/package/unique-names-generator' /> package.
          </p>
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
}
