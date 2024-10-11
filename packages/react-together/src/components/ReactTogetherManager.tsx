import { useLeaveSession } from '@croquet/react'
import 'primeicons/primeicons.css'
import { useCreateRandomSession, useIsTogether, useJoinUrl } from '..'

export function ReactTogetherManager() {
  const leaveSession = useLeaveSession()
  const createRandomSession = useCreateRandomSession()
  const isTogether = useIsTogether()
  const joinUrl = useJoinUrl()
  /*   const offlineItems = [
    {
      label: 'Start a React Together session',
      icon: 'pi pi-link',
      command: () => {
        createNewSession()
      }
    }
  ]
  const onlineItems = [
    {
      label: 'Leave session',
      icon: 'pi pi-sign-out',
      command: () => {
        leaveSession()
      }
    }
  ] */

  return (
    <>
      <button
        className="bg-gray-700 text-white px-2 rounded"
        onClick={() => (isTogether ? leaveSession() : createRandomSession())}
      >
        {isTogether ? 'disconnect' : 'connect'}
      </button>
      <p>Join URL: {joinUrl ?? 'null'}</p>
    </>
    /*     <>
      <Tooltip
        target=".react-together-speeddial .p-speeddial-action"
        style={{ fontSize: '0.8rem' }}
      />
      <SpeedDial
        className="react-together-speeddial"
        model={isTogether ? onlineItems : offlineItems}
        style={{
          position: 'fixed',
          right: '1rem',
          bottom: '1rem',
          padding: '0.1rem'
        }}
        buttonClassName="p-button-outlined"
        // showIcon={<img src={logo} style={{ width: '100%', height: '100%' }} />}
        showIcon={
          <img src={undefined} style={{ width: '100%', height: '100%' }} />
        }
      ></SpeedDial>
    </> */
  )
}
