import { ModeToggle } from '@components'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentDemoBox from '@components/ui/DocumentDemoBox'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function PageDocument() {
  return (
    <div className='flex flex-col items-start gap-[1.4375rem] flex-1'>
      <DocumentBreadCrumb />
      <h2>Introduction</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa tortor. Vestibulum dapibus molestie sem sed malesuada.
        Maecenas commodo blandit magna et tempus.
      </p>
      <DocumentDemoBox />
      <CodeBlockExample />
    </div>
  )
}

export function DocumentationPage() {
  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 h-screen'>
      <DocumentNav />
      <Page>
        <PageDocument />
        <PageNav />
      </Page>
    </main>
  )
}
