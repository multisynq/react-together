import { PatchedMenuItem } from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
interface DocumentationPageProps {
  content?: React.ReactNode | React.ReactNode[] | string
  navItems: PatchedMenuItem[]
}
export function DocumentationPage({ content, navItems }: DocumentationPageProps) {
  return (
    <>
      <div className='flex flex-col items-start gap-4 w-full bg-white px-8 py-4 line-border'>{content}</div>
      <PageNav items={navItems} />
    </>
  )
}
