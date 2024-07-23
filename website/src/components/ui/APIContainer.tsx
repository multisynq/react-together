export function APIContainer() {
  const items = [
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 2',
      type: 'Type 2',
      default: 'Default 2',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 3',
      type: 'Type 3',
      default: 'Default 3',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 4',
      type: 'Type 4',
      default: 'Default 4',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 5',
      type: 'Type 5',
      default: 'Default 5',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 6',
      type: 'Type 6',
      default: 'Default 6',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
  ]

  return (
    <div className='px-3 py-2 border-2 border-gray-700 rounded-lg shadow-lineStyle w-full'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='text-left p-2 font-semibold w-1/6'>Name</th>
            <th className='text-left p-2 font-semibold w-1/6'>Type</th>
            <th className='text-left p-2 font-semibold w-1/6'>Default</th>
            <th className='text-left p-2 font-semibold w-1/2'>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='border-b border-gray-300 last:border-b-0'>
              <td className='p-2 w-1/6'>
                <div className='inline-block bg-blue-100 rounded px-2 py-1'>{item.name}</div>
              </td>
              <td className='p-2 w-1/6'>{item.type}</td>
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
