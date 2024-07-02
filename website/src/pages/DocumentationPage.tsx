import { ModeToggle } from '@components'
import DocBreadCrumb from '@components/DocBreadCrumb'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DcoumentDemoBox from '@components/ui/DocumentDemoBox'
import DocumentationNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'

function DocNav() {
  return (
    <div className='hidden sm:block w-[200px] h-full'>
      <DocumentationNav />
      {/* <DocumentationNav /> */}
    </div>
  )
}

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function PageDocument() {
  return (
    <div className='flex flex-col items-start gap-[1.4375rem] flex-1'>
      <DocBreadCrumb />
      <h2>Introduction</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa tortor. Vestibulum dapibus molestie sem sed malesuada.
        Maecenas commodo blandit magna et tempus.
      </p>

      <DcoumentDemoBox />
      <CodeBlockExample />

      <div>sampleCode</div>
    </div>
  )
}

function PageDocNav() {
  return (
    <div className='hidden md:flex w-48 flex-col items-start gap-4 h-full'>
      {' '}
      <PageNav />
    </div>
  )
}

export function DocumentationPage() {
  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 h-screen'>
      <DocNav />
      <Page>
        <PageDocument />
        <PageDocNav />
      </Page>
    </main>
  )
}
