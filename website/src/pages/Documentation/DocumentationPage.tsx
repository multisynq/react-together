import { PatchedMenuItem } from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
interface DocumentationPageProps {
  content?: React.ReactNode | React.ReactNode[] | string
  navItems: PatchedMenuItem[]
}
export function DocumentationPage({ content, navItems }: DocumentationPageProps) {
  return (
    // <main className='flex justify-center items-start gap-12 self-stretch p-6 px-16 relative'>
    <>
      <div className='flex flex-col items-start gap-[1.5rem] w-full'>{content}</div>
      <PageNav items={navItems} />
    </>
  )
}
