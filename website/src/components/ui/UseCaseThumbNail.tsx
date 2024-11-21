interface ThumbNailCover {
  urlLink: string
  imageSource: string
}

export default function UseCaseThumbNail({ urlLink, imageSource }: ThumbNailCover) {
  return (
    <a href={urlLink} target='_blank'>
      <div className='group flex flex-col py-5 px-3 gap-4 '>
        <div
          className='aspect-[4/3] flex overflow-hidden relative active-border bg-cover bg-center'
          style={{ backgroundImage: `url(${imageSource})` }}
        >
          <div className='bg-blue-400 border-gray-800 w-full flex px-4 py-1 border-t h-[4rem] absolute bottom-[-5rem] group-hover:bottom-[0rem] transition-all duration-300'>
            <div className='text-lg font-bold flex items-center text-white'>
              Learn more!
              <i className='pi pi-arrow-right ml-2'></i>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
