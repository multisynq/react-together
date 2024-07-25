// import { BrowserRouter, Route, Routes } from 'react-router-dom'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <>{children}</>
}
