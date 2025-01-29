import CodeSpan from '@components/ui/CodeSpan'
import { DocumentationPage } from './DocumentationPage'
import { NavItem } from './types'
import DeriveNicknameDocumentationPage from './utils/deriveNickname'
import GetCleanUrlDocumentationPage from './utils/getCleanUrl'
import GetJoinUrlDocumentationPage from './utils/getJoinUrl'
import GetSessionNameFromUrlDocumentationPage from './utils/getSessionNameFromUrl'
import GetSessionPasswordFromUrlDocumentationPage from './utils/getSessionPasswordFromUrl'

const navItems: NavItem[] = [
  { key: 'deriveNickname', label: 'deriveNickname' },
  { key: 'getSessionNameFromUrl', label: 'getSessionNameFromUrl' },
  { key: 'getSessionPasswordFromUrl', label: 'getSessionPasswordFromUrl' },
  { key: 'getJoinUrl', label: 'getJoinUrl' },
  { key: 'getCleanUrl', label: 'getCleanUrl' },
]

const content = (
  <>
    <h1>Utils module</h1>
    <p>
      React Together exports a <CodeSpan text='utils' /> module containing a series of helper functions that make it easier for you to
      integrate React Together in your applications. Such functions are documented in this page
    </p>
    <br />
    <DeriveNicknameDocumentationPage />
    <br />
    <GetSessionNameFromUrlDocumentationPage />
    <br />
    <GetSessionPasswordFromUrlDocumentationPage />
    <br />
    <GetJoinUrlDocumentationPage />
    <br />
    <GetCleanUrlDocumentationPage />
  </>
)

export default function HelpersDocumentationPage() {
  return <DocumentationPage {...{ content, navItems }} />
}
