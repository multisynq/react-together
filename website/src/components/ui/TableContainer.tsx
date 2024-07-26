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
    <div className='px-3 py-2 border-2 border-gray-700 rounded-lg shadow-lineStyleDark w-full overflow-auto4 bg-white'>
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
