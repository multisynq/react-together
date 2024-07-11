import { BreadCrumb } from 'primereact/breadcrumb'
import { useNavigate } from 'react-router-dom'

export default function DocumentBreadCrumb({ currentPath }) {
  const navigate = useNavigate()

  const pathParts = currentPath.split('/').filter(Boolean)

  const items = pathParts.map((part, index) => {
    const path = '/' + pathParts.slice(0, index + 1).join('/')
    return {
      label: part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      command: () => navigate(`/docs${path}`),
    }
  })

  const home = {
    label: 'Documentation',
    command: () => navigate('/docs'),
  }

  return <BreadCrumb model={items} home={home} className='!pl-0 [&>ol]:!pl-0' />
}
