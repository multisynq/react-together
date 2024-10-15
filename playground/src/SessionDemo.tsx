import { Dialog } from 'primereact/dialog'
import { useState } from 'react'

function UrlContainer() {
  const [url, setUrl] = useState('https://current-address.com/294spwd') // Replace with your dynamic URL

  const handleUrlChange = (e) => {
    setUrl(e.target.value) // Update the state with the new input value
  }

  return (
    <div className="flex align-items-center gap-2 border rounded-xl border-gray-800 items-center py-2 px-4 w-full justify-between shadow-lineStyleDark">
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="w-full bg-transparent border-none outline-none"
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
      <button>
        <i className="pi pi-arrow-right"></i>
      </button>
    </div>
  )
}

function AddressContainer({ urlAddress }: { urlAddress: string }) {
  const [url] = useState(urlAddress)
  const [copied, setCopied] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  function copyToClipboard() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function toggleQRCode() {
    setShowQRCode((prev) => !prev)
  }

  return (
    <>
      {showQRCode && (
        <div className="w-[12rem] h-[12rem] bg-blue-100 rounded-xl" />
      )}
      <div className="flex align-items-center gap-3 border rounded-xl border-gray-800 items-center py-2 px-4 w-full justify-between shadow-lineStyleDark">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-3 justify-between w-full"
        >
          <span className="w-[16rem]">{copied ? 'Copied!' : url}</span>
          <i className={copied ? 'pi pi-check' : 'pi pi-copy'}></i>
        </button>
        <button onClick={toggleQRCode}>
          <i className="pi pi-qrcode" />
        </button>
      </div>
    </>
  )
}

function MangeContent() {
  return (
    <div className="flex flex-col items-center gap-4 text-black">
      {/* ---TOP--- */}
      <div className="flex flex-col">
        <p className="font-bold leading-tight tracking-tight">
          Send this url to your friends to
          <br /> join the current session!
        </p>
      </div>
      {/* ---MIDDLE---  */}
      <div className="flex flex-col items-center w-full gap-4">
        <AddressContainer urlAddress=".../id=1249&pwd=riw9" />
      </div>
      {/* ---BOTTTOM--- */}
      <button className="border border-gray-800 px-4 rounded-xl py-2 shadow-lineStyleDark hover:bg-red-600 hover:shadow-lineStyleMedium bg-red-500 w-full">
        <span className="text-lg font-bold text-white">Leave Session</span>
      </button>
    </div>
  )
}

function MangerStyled() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className="border w-[2.5rem] h-[2.5rem] border-gray-800 rounded-lg shadow-lineStyleDark bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lineStyleMedium"
        onClick={() => setIsOpen(true)}
      >
        <i
          className="pi pi-asterisk
"
        />
      </button>
      <Dialog
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        pt={{
          root: {
            className:
              'border-gray-800 shadow-lineStyleDark rounded-xl overflow-hidden'
          },
          header: { className: 'p-2' },
          content: { className: 'pb-4' }
        }}
      >
        <MangeContent />
      </Dialog>
    </>
  )
}

export default function SessionDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[24rem] h-[24rem] bg-white  text-black justify-between flex flex-col p-4">
        {/* ---TOP--- */}
        <UrlContainer />
        {/* ---MIDDLE---  */}
        <span>COUNT BOX</span>
        {/* ---BOTTTOM--- */}
        <div className="flex w-full justify-between items-center">
          <div>User Count</div>
          <MangerStyled />
        </div>
      </div>
    </div>
  )
}
