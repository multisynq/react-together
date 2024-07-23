export function APIContainer() {
  const items = [
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
      description: 'Molevtie tellus sit venenatis morbi eget aenean massa diam lorem.',
    },
    {
      name: 'Name 1',
      type: 'Type 1',
      default: 'Default 1',
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
              <td className='p-2 w-1/6'>{item.name}</td>
              <td className='p-2 w-1/6'>{item.type}</td>
              <td className='p-2 w-1/6'>{item.default}</td>
              <td className='p-2 w-1/2'>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
