// function GifContainer() {
//   return <div className='bg-gray-200 aspect-video w-full '></div>
// }

// interface TextContainerProps {
//   header: string
//   body: string
// }

// function TextContainer({ header, body }: TextContainerProps) {
//   return (
//     <div className='w-full flex flex-col items-center px-12 my-4 gap-2'>
//       <h3 className='text-center'>{header}</h3>
//       <p className='text-center'>{body}</p>
//     </div>
//   )
// }

function EachFeature({ header, body }) {
  return (
    <div className='w-full'>
      <div className='bg-gray-200 aspect-video w-full '></div>
      <div className='w-full flex flex-col items-center px-12 my-4 gap-2'>
        <h3 className='text-center'>{header}</h3>
        <p className='text-center'>{body}</p>
      </div>
    </div>
  )
}

export function FeatureCard() {
  const title1 = '1. Install'
  const title2 = '2. Wrap'
  const title3 = '3. Enhance!'

  const gif1 = ''
  const gif2 = ''
  const gif3 = ''

  return (
    <span className='w-full px-8'>
      <div className='w-full flex flex-col md:flex-row border-2 border-gray-700 shadow-lineStyle rounded-lg overflow-hidden'>
        <EachFeature header={title1} body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'} />
        <EachFeature header={title2} body={'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum'} />
        <EachFeature header={title3} body={'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia '} />
      </div>
    </span>
  )
}
