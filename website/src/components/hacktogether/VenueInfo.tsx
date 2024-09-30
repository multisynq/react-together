import 'primeicons/primeicons.css'
import ht_image from '../../images/ht_CharlesSquare.jpg'

const MAP_URL_LINK = 'https://maps.app.goo.gl/PccWHKChX58e1ur67'

export default function VenueInfo() {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center px-3 gap-4 w-full sm:items-start'>
      <div className='w-full sm:w-2/3 aspect-[16/9] rounded-xl border border-gray-800 shadow-lineStyleDark overflow-hidden'>
        <img src={ht_image} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
      </div>
      <div className='flex w-full sm:w-1/3 px-4 pb-3 sm:mt-[2rem] gap-2 sm:flex-col'>
        <h5 style={{ fontSize: '40px', fontFamily: 'poppins', margin: '8px' }}>Hood</h5>
        <a href={MAP_URL_LINK} target='_blank' rel='noopener noreferrer' className='text-start flex gap-2 m-2'>
          <span className='font-light text-xl text-gray-950 hover:text-gray-600 leading-tight mt-4' style={{ fontFamily: 'poppins' }}>
            <i className='pi pi-map text-xl mr-2'></i>
            Rua 3 da Matinha
            <br />
            Edifício Altejo
            <br />
            101 - 1950-326 Lisboa
          </span>
        </a>
      </div>
    </div>
  )
}
