import { CreateSession } from '@components/ui/CreateSession'
import { SessionMenu } from '@components/ui/SessionMenu'

export function DynamicsSession() {
  return (
    <div className='flex flex-col w-full'>
      <div className='h-[20rem] flex justify-end items-end relative'>
        <CreateSession label={'URL'} labelContent={'te.io/session=123abc'} />
      </div>
      <div className='w-full h-[20rem] flex gap-2  items-end gap-auto'>
        <div>user count</div>
        <div className='flex-grow' />
        <SessionMenu label={'URL'} labelContent={'te.io/session=123abc'} />
      </div>
    </div>
  )
}
