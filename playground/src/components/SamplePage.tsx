import multisynqLogo from '../assets/multisynq.png'
import reactLogo from '../assets/react.svg'

export default function SamplePage() {
  return (
    <>
      <div>
        <a href="https://multisynq.io" target="_blank">
          <img src={multisynqLogo} className="logo" alt="Multisynq logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Together</h1>
      <div className="card">
        <p>This is a sample website that will be using React Together!</p>
      </div>
    </>
  )
}
