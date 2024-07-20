function GifContainer() {
  return <div className='bg-gray-200 aspect-video w-full'></div>
}

interface TextContainerProps {
  header: string
  body: string
}

function TextContainer({ header, body }: TextContainerProps) {
  return (
    <div className='w-full flex flex-col items-center px-12'>
      <h3 className='text-center'>{header}</h3>
      <p className='text-center'>{body}</p>
    </div>
  )
}

function EachFeature() {
  return (
    <div className='w-full'>
      <GifContainer />
      <TextContainer header='header' body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' />
    </div>
  )
}

export function FeatureCard() {
  return (
    <span className='w-full px-8'>
      <div className='w-full flex border-2 border-gray-700 shadow-lineStyle rounded-lg overflow-hidden'>
        <EachFeature />
        <EachFeature />
        <EachFeature />
      </div>
    </span>
  )
}
