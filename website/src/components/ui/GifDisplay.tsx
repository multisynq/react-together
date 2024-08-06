export function GifDisplay({ imageSource, imageTitle }) {
  return (
    <>
      <div className='border-[1.5px] border-black rounded-lg w-full flex justify-center items-center'>
        <img src={imageSource} alt={imageTitle} className='max-w-[20rem]' />
      </div>
    </>
  )
}
