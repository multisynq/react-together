import { BreadCrumb } from 'primereact/breadcrumb'

export default function DocumentBreadCrumb() {
  const items = [{ label: 'Get Started' }, { label: 'Introduction' }]
  const home = { label: 'Documentation' }

  return <BreadCrumb model={items} home={home} className='!pl-0 [&>ol]:!pl-0' />
}
