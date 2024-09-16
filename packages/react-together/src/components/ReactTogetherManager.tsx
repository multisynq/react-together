import { useLeaveSession } from '@croquet/react'
import 'primeicons/primeicons.css'
import {
  useIsTogether,
  useJoinSessionUrl,
  useReactTogetherContext
} from '../hooks'

export function ReactTogetherManager() {
  const { createNewSession } = useReactTogetherContext()
  const leaveSession = useLeaveSession()
  const isTogether = useIsTogether()
  const joinUrl = useJoinSessionUrl()
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
        onClick={() => (isTogether ? leaveSession() : createNewSession())}
      >
        {isTogether ? 'disconnect' : 'connect'}
      </button>
      {joinUrl && <p>Join URL: {joinUrl}</p>}
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
