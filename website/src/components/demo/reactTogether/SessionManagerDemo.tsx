import { CroquetReact, SessionManager, useIsTogether } from 'react-together'
import CountButtonTogether from '../CountButtonTogether'
import { DynamicUrlWrapper } from '../DynamicUrlWrapper'

const { useSessionParams } = CroquetReact

function ConnectionStatus({ connectionStatus, name }: { connectionStatus: boolean; name: string | null }) {
  return (
    <div className='flex gap-2 items-center justify-center border border-gray-400 rounded-xl py-1 px-2 bg-gray-50 h-[2rem]'>
      <div className={`w-3 h-3 rounded-3xl ${connectionStatus ? 'bg-green-500' : 'bg-red-500'}`} />
      <label className='text-xs font-semibold'>{connectionStatus ? `Connected: ${name}` : 'Disconnected'}</label>
    </div>
  )
}

export function SessionManagerDemo() {
  const isTogether = useIsTogether()
  const { name } = useSessionParams()

  return (
    <DynamicUrlWrapper>
      <div className='flex flex-col h-full'>
        <div className='flex-1 flex w-full flex-col gap-8 items-center justify-center'>
          <CountButtonTogether />
        </div>

        <div className='flex flex-col px-2 gap-2'>
          <div className='flex justify-between w-full items-center'>
            <SessionManager />
            <ConnectionStatus connectionStatus={isTogether} name={name} />
            <div className='w-[2rem]' />
          </div>
        </div>
      </div>
    </DynamicUrlWrapper>
  )
}
