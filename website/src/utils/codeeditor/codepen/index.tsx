const npm = (p) => import(`//unpkg.com/${p}?module`)

;(async () => {
  // Import dependencies
  const React = await npm('react')
  const ReactDOM = await npm('react-dom')
  const reactTogether = await npm('react-together')

  const { Component, StrictMode } = React
  const { ReactTogether } = reactTogether

  // Main App Component as a Class
  class App extends Component {
    render() {
      return (
        <div className='App'>
          <header className='App-header'>%%%USAGE%%%</header>
        </div>
      )
    }
  }

  // Mount the application
  const rootElement = document.getElementById('root')
  ReactDOM.render(
    <StrictMode>
      <ReactTogether
        sessionParams={{
          name: 'test',
          password: 'test',
          appId: 'io.multisynq.miguel.playground',
          apiKey: '2trfOD0qBHx3XXIxPNoC6hrDsZYVsOBLXhvd4G09VV',
        }}
      >
        <App />
      </ReactTogether>
    </StrictMode>,
    rootElement
  )
})()

//================================================================================
//================================================================================
//================================================================================
// Working example with npm import below
//================================================================================
//================================================================================
//================================================================================

// const npm = (p) => import(`//unpkg.com/${p}?module`)

// ;(async () => {
//   const { h, Component, render } = await npm('preact')

//   class Clock extends Component {
//     componentWillMount() {
//       const tick = () => this.setState({ time: new Date() })
//       setInterval(tick, 1000)
//       tick()
//     }

//     render({}, { time }) {
//       return h('time', { title: time + '' }, time.toLocaleTimeString())
//     }
//   }

//   render(h(Clock), document.body)
// })()
