import './FakeBrowser.css'

export function FakeBrowser({children}) {
  return (
    <div className="fake-browser">
    <header className="fake-browser-header">
      <div className="action-btns">
        <span></span>
        <span></span> <span></span>
      </div>
      <div className="address-bar">
        <input type="text" value="https://YourWebsite.com"/>
      </div>
      <div className="setting-more">
        <span className="more-btn"></span>
      </div>
    </header>
    <section className="fake-window-body">
      {children}
    </section>
  </div>
  )
}