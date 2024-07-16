import 'primeicons/primeicons.css'
import { SpeedDial } from 'primereact/speeddial'
import { Tooltip } from 'primereact/tooltip'
import useReactTogetherContext from '../hooks/useReactTogetherContext'
// import logo from '../multisynq.png'

export function ReactTogetherManager() {
  const { isTogether, leaveSession, createNewSession } =
    useReactTogetherContext()
  const offlineItems = [
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
  ]

  return (
    <>
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
        showIcon={<img src={undefined} style={{ width: '100%', height: '100%' }} />}
      ></SpeedDial>
    </>
  )
  // return (
  //   <div
  //     style={{
  //       width: '2rem',
  //       height: '2rem',
  //       backgroundColor: 'red',
  //       borderRadius: '1rem',
  //       position: 'fixed',
  //       bottom: '1.5rem',
  //       right: '1.5rem',
  //       cursor: 'pointer'
  //     }}
  //     onClick={handleClick}
  //   >
  //     <span
  //       className={`pi ${isTogether ? 'pi-sign-out' : 'pi-link'}`}
  //       style={{ fontSize: '1rem', color: 'white' }}
  //     />
  //   </div>
  // )
  // return (
  //   <button onClick={handleClick}>
  //     {isTogether ? 'Leave Session' : 'Create new Session'}
  //   </button>
  // )
}
