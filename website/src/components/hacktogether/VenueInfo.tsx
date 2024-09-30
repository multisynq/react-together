import ht_image from '../../images/ht_CharlesSquare.jpg'

const MAP_URL_LINK = 'https://maps.app.goo.gl/PccWHKChX58e1ur67'

export default function VenueInfo() {
  return (
    <div className='flex flex-col-reverse sm:flex-row items-center justify-center px-3 gap-4 w-full sm:items-start'>
      <div className='w-full sm:w-2/3 bg-slate-200 aspect-[4/3] rounded-xl border border-gray-800 shadow-lineStyleDark overflow-hidden'>
        <img src={ht_image} alt='Multisynq Logo' className='w-full h-auto rounded-lg' />
      </div>
      <button
        className='flex flex-col w-full sm:w-1/3 px-4 pb-3 items-start border border-gray-800 rounded-xl shadow-lineStyleDark bg-black text-white hover:bg-gray-800 sm:mt-[2rem]'
        onClick={() => window.open(MAP_URL_LINK)}
      >
        <h5 style={{ fontSize: '40px', fontFamily: 'poppins' }}>Hood</h5>
        <span className='font-light text-xl text-start px-2'>
          Rua 3 da Matinha, Edifício Altejo
          <br /> 101 - 1950-326 Lisboa
        </span>
      </button>
    </div>
  )
}
