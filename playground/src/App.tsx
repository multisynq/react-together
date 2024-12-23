import { Navigate, Route, Routes } from 'react-router-dom'
import { demos } from './demos'
import { HomePage } from './home/HomePage'
import { Layout } from './layout/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        {/*
        To add a new demo, add it to the demos array in ./demos.tsx.
        Doing so will automatically add a route and card for the demo.
        */}
        {demos.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Layout>
  )
}
