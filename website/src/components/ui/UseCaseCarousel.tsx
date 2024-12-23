import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useEffect, useState } from 'react'

import learnTogether from '@images/projects/learnTogether.png'
import multiPlanner from '@images/projects/multiPlanner.png'
import scratchMapBanner from '@images/projects/scratchMap.png'
import slicrBanner from '@images/projects/slicr.png'
import synqCity from '@images/projects/synqCity.png'
import tripSync from '@images/projects/tripSync.png'

const ProductService = {
  getProductsSmall: () => {
    return Promise.resolve([
      {
        name: 'ScratchMap',
        description: 'The easiest way to coordinate ad hoc location-based events with groups of people.',
        imgSrc: scratchMapBanner,
        webSiteLink: 'https://scratch-map.pages.dev/',
        projectLink: 'https://scratchmap.app/',
      },
      {
        name: 'TripSync',
        description: 'A collaborative trip planning web app designed for seamless multiuser interaction.',
        imgSrc: tripSync,
        webSiteLink: 'https://hacktogether-ariel.pages.dev/',
        projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3347i7g05e9ao9a3hq50vsk/idea',
      },
      {
        name: 'Slicr',
        description: 'Collaboratively order food with friends, family & colleagues. Save time, delivery fees & have fun.',
        imgSrc: slicrBanner,
        webSiteLink: 'https://react-togather.vercel.app/',
        projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a6b7qy075kbssltzt81ksz/idea',
      },
      {
        name: 'syncCity',
        description:
          'Stay connected to what’s happening around you in real time. A location-based social network that keeps you in the loop.',
        image: 'blue-t-shirt.jpg',
        imgSrc: synqCity,
        webSiteLink: 'https://multisynq-hackathon-frontend.vercel.app/',
        projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a76znk07z1ao9a6r8y8nje/idea',
      },
      {
        name: 'Multi Planner',
        description: 'An app for collaborative shopping lists and trip planning!',
        imgSrc: multiPlanner,
        webSiteLink: 'https://deployrepo-a74.pages.dev/',
        projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3bme6jn07h0bssl0zgwri0w/idea',
      },
      {
        name: 'Learn Together',
        description: "A way to bring closer students and teachers, making online classes feel like you're really there.",
        imgSrc: learnTogether,
        webSiteLink: 'https://hack-together.vercel.app/',
        projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a9cvnf076jbssl3oazlry2/idea',
      },
    ])
  },
}

interface Product {
  name: string
  description: string
  imgSrc: string
  webSiteLink: string
  projectLink: string
}

export default function BasicDemo() {
  const [products, setProducts] = useState<Product[]>([])
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '900px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '700px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)))
  }, [])

  const productTemplate = (product: Product) => {
    return (
      <div className='group'>
        <div className='flex flex-col py-5 px-3 gap-4 '>
          <div
            className='aspect-[4/3] flex overflow-hidden relative line-border bg-cover bg-center'
            style={{ backgroundImage: `url(${product.imgSrc})` }}
          >
            <div className='absolute md:top-[-5rem] md:group-hover:top-[0rem] transition-all duration-300 flex right-4'>
              <a href={product.webSiteLink} target='_blank'>
                <div className='bg-blue-500 interactive-border w-full flex px-4 py-1 h-[3rem] items-center rounded-xl m-2 justify-center'>
                  <span className='text-lg font-bold text-center text-white'>Live demo</span>
                </div>
              </a>
            </div>
            <a href={product.projectLink} target='_blank'>
              <div className='bg-gray-700 border-gray-800 w-full flex px-4 py-1 border-t h-[4rem] absolute bottom-[0rem] md:bottom-[-5rem] md:group-hover:bottom-[0rem] transition-all duration-300'>
                <div className='text-lg font-bold flex items-center text-white'>
                  Learn more!
                  <i className='pi pi-arrow-right ml-2'></i>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='px-4'>
          <h5 style={{ marginTop: '0px' }}>{product.name}</h5>
          <p className='text-black leading-tight text-md'>{product.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='card px-[1rem] w-screen max-w-[92rem] mb-[6rem]'>
      <Carousel
        value={products}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        circular
      />
    </div>
  )
}
