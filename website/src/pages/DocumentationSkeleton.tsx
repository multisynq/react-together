import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentNav, { PatchedMenuItem } from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'

interface DocumentationSkeletonProps {
  keyToLookupWith: string
  content?: React.ReactNode | React.ReactNode[] | string
  navItems: PatchedMenuItem[]
}
export function DocumentationSkeleton({ keyToLookupWith, content, navItems }: DocumentationSkeletonProps) {
  return (
    // <main className='flex justify-center items-start gap-12 self-stretch p-6 px-16 relative'>
    <main className='flex justify-center items-start gap-12 p-6 px-16 relative bg-[radial-gradient(162.17%_100%_at_100%_0%,#f3f7fd_0%,#f3f7fd_23%,#FFF_100%)]'>
      <div className='hidden sm:block h-full'>
        <DocumentNav />
      </div>
      <div className='flex flex-col items-start gap-[1.5rem] w-full'>
        <DocumentBreadCrumb currentPath={keyToLookupWith} />
        {content}
      </div>
      <PageNav items={navItems} />
    </main>
  )
}
