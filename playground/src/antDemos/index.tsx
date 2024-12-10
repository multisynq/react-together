// import { antNewMqPackage } from 'npm-thingy'
// import { CheckboxTogether } from 'react-together-ant-design'
import { ReactTogether } from 'react-together'
import AntGallery from './AntGallery'

export default function App() {
  return <div>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY'],
        name: 'antd2',
        password: 'antd-password',
      }}
    >
      <AntGallery />
    </ReactTogether>
  </div>
}
