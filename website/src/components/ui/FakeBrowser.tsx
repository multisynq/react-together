import './FakeBrowser.css'

export function FakeBrowser() {
  return (
    <>
      <div className='fake-browser'>
        <header className='fake-browser-header'>
          <div className='action-btns'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className='address-bar'>
            <input type='text' value='https://your-website.com' onChange={() => {}} />
          </div>
          <div className='setting-more'>
            <span className='more-btn'></span>
          </div>
        </header>
        {/* <section className='fake-window-body'>{children}</section> */}
      </div>
    </>
  )
}
