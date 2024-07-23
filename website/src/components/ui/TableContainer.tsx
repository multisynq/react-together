export function TableContainer({ tableContent }) {
  const items = tableContent

  const headers = items.length > 0 ? Object.keys(items[0]) : []

  return (
    <div className='px-3 py-2 border-2 border-gray-700 rounded-lg shadow-lineStyle w-full'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-300'>
            {headers.map((header, index) => (
              <th key={index} className='text-left p-2 font-semibold w-1/6'>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='border-b border-gray-300 last:border-b-0'>
              <td className='p-2 w-1/6'>
                <div
                  className={`inline-block rounded px-2 py-1 ${
                    item.name.status === 'removed' ? 'bg-red-100' : item.name.status === 'added' ? 'bg-green-100' : ''
                  }`}
                >
                  {item.name.text}
                </div>
              </td>
              <td className='p-2 w-1/6 font-mono text-sm'>{item.type}</td>
              <td className='p-2 w-1/6'>
                <div className='inline-block border border-gray-300 rounded px-2 py-1 font-light'>{item.default}</div>
              </td>
              <td className='p-2 w-1/2'>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
