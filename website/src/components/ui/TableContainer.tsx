interface TableContainerKey {
  label: string
  key: string
}
interface TableContainerData {
  [key: string]: React.ReactNode | string
}
interface TableContainerProps {
  keys: TableContainerKey[]
  data: TableContainerData[]
}

export function TableContainer({ keys, data }: TableContainerProps) {
  return (
    <div className='px-3 py-2 border-2 border-gray-700 rounded-lg shadow-lineStyle w-full'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-300'>
            {keys.map(({ label, key }) => (
              <th key={key} className='text-left p-2 font-semibold w-1/6'>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((object, idx) => {
            const id = (object.id || idx) as string
            return (
              <tr key={id} className='border-b border-gray-300 last:border-b-0'>
                {keys.map(({ key }) => {
                  const content = object[key] || '--'
                  return (
                    <td key={`${id}-${key}`} className='p-2 w-1/6'>
                      {content}
                    </td>
                  )
                })}
                {/* <td className='p-2 w-1/6'>
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
                <td className='p-2 w-1/2'>{item.description}</td> */}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
