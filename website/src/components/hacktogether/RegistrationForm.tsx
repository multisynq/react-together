// import { useState } from 'react'

// const API_URL = import.meta.env.VITE_API_URL

// function isEmailValid(email: string): boolean {
//   const result = String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
//   return !!result
// }

const registrationUrl = 'https://taikai.network/multisynq/hackathons/hacktogether'

export default function RegistrationForm() {
  // const [email, setEmail] = useState('')
  // const [showConfirm, setShowConfirm] = useState(false)
  // const [showEmailError, setShowEmailError] = useState(false)
  // const [isSubmitting, setIsSubmitting] = useState(false)

  // const submitEmail = async () => {
  //   if (!isEmailValid(email)) {
  //     setShowEmailError(true)
  //     return
  //   }

  //   setIsSubmitting(true)
  //   try {
  //     const { hostname } = window.location
  //     const url = new URL(API_URL)
  //     url.searchParams.set('action', 'pre_register')
  //     url.searchParams.set('email', email)
  //     if (!hostname.match(/\.reacttogether\.(pages\.)?dev$/)) url.searchParams.set('prod', 'true')

  //     const res = await fetch(url)
  //     if (res.ok) {
  //       setEmail('')
  //       setShowConfirm(true)
  //       setTimeout(() => setShowConfirm(false), 10000)
  //     } else throw new Error('Failed to pre-register')
  //   } catch (error) {
  //     console.error('Error submitting email:', error)
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   submitEmail()
  // }

  // const handleEnter = (e: React.KeyboardEvent) => {
  //   setShowEmailError(false)
  //   if (e.key !== 'Enter') return
  //   submitEmail()
  // }

  return (
    <div className='w-full items-center justify-center flex py-[1rem]'>
      <div className='flex gap-3 flex-col md:flex-row max-w-[64rem] w-full'>
        {/* --SEAT COUNT-- */}
        <div className='bg-blue-800 px-[2rem] py-[1rem] border-gray-800 border rounded-xl shadow-lineStyleDark w-[18rem] h-[6.5rem] flex items-center justify-center md:min-w-[18rem]'>
          <span className='text-2xl text-white tracking-tight font-poppin font-medium text-center'>
            Limited to <strong>100 seats</strong>
            <br />
            <a href={registrationUrl} target='_blank' className='cursor-pointer underline text-white hover:text-gray-300'>
              {/* <span
                className='leading-loose'
                style={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'wavy',
                  textDecorationSkipInk: 'none',
                  textDecorationColor: 'blue',
                }}
              > */}
              Save your seat now!
              {/* </span> */}
            </a>
          </span>
        </div>

        {/* <div className='bg-white border rounded-xl border-gray-800 shadow-lineStyleMedium w-full p-[1rem]'>
          <a id='register' />
          <form onSubmit={handleSubmit} className='px-3 flex flex-col gap-3 py-3'>
            <div className='p-inputgroup'>
              <InputText
                {...{
                  placeholder: 'Email address',
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onKeyDown: handleEnter,
                  invalid: showEmailError,
                }}
              />
              <Button {...{ type: 'submit', label: 'Pre-register', disabled: isSubmitting }} />
            </div>
            <div className='w-full px-2 flex items-center '>
              <p className='text-md tracking-tight md:text-left font-poppins text-gray-500 font-light'>
                Registrations open on October 7th, 2024.
              </p>
            </div>
          </form>
          {showEmailError && <p className='text-red-500'>Please insert a valid email</p>}
          {showConfirm && <p className='text-green-500'>Your spot is saved! Thanks for joining our hackathon!!</p>}
        </div> */}
      </div>
    </div>
  )
}

// ;<div className='flex flex-col items-center bg-blue-600 rounded-xl border-gray-800 border shadow-lineStyleDark overflow-hidden max-w-[24rem] md:max-w-[32rem] lg:max-w-[90rem] lg:flex-row'>
//   <div className='flex flex-col items-center mt-6 mb-1 lg:min-w-[18rem]'>
//     <span className='text-xl text-white tracking-tight animate-bounce'>
//       Limited to <strong>100 seats</strong>
//       <br />
//       Save your seat now!
//     </span>
//   </div>
//   <div className='bg-white border rounded-xl border-gray-800 lg:p-[1rem]'>
//     <a id='register' />
//     <form onSubmit={handleSubmit} className='px-3 flex flex-col gap-3 py-3'>
//       <div className='w-full px-2 flex items-center justify-center'>
//         <p className='text-sm tracking-tight text-center md:text-left'>
//           Registrations open on October 4th, 2024. <br className='md:hidden' />
//           Save your spot now by pre-registering!
//         </p>
//       </div>
//       <div className='p-inputgroup'>
//         <InputText
//           {...{
//             placeholder: 'Email address',
//             value: email,
//             onChange: (e) => setEmail(e.target.value),
//             onKeyDown: handleEnter,
//             invalid: showEmailError,
//           }}
//         />
//         <Button {...{ type: 'submit', label: 'Pre-register', disabled: isSubmitting }} />
//       </div>
//       <div className='w-full mt-2'>
//         <Button
//           disabled
//           type='submit'
//           label='Register now!'
//           tooltip='Registrations open October 4th, 2024'
//           size='small'
//           className='w-full shadow-lineStyleMedium'
//         />
//       </div>
//     </form>
//     {showEmailError && <p className='text-red-500'>Please insert a valid email</p>}
//     {showConfirm && <p className='text-green-500'>Your spot is saved! Thanks for joining our hackathon!!</p>}
//   </div>
// </div>
