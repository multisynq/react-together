import { Navigate, Route, Routes } from 'react-router-dom'
import { demos } from './demos'
import { HomePage } from './home/HomePage'
import { Layout } from './layout/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        {demos.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Layout>
  )
}
