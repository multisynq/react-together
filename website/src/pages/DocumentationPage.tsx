function DocumentationNav() {
  return <div className='hidden sm:block w-[200px] h-full bg-gray-400'>DocumentationNav</div>
}

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function PageDocument() {
  return <div className='flex flex-col items-start gap-[1.4375rem] flex-1'>Body Document</div>
}

function PageNav() {
  return <div className='hidden md:flex w-48 flex-col items-start gap-4 h-full bg-gray-400'>PageNav</div>
}

export function DocumentationPage() {
  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 h-screen'>
      <DocumentationNav />
      <Page>
        <PageDocument />
        <PageNav />
      </Page>
    </main>
  )
}
