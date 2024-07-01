import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function DocBreadCrumb() {
  const items = [{ label: 'Get Started' }, { label: 'Introduction' }]
  const home = { label: 'Documentation' }

  return (
    <div className='p-4'>
      {' '}
      {/* Tailwind class for padding */}
      <BreadCrumb model={items} home={home} /> {/* Tailwind class for padding */}
    </div>
  )
}
