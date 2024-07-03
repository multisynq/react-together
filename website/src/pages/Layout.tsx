import { SiteHeader, SiteFooter } from '@components'
import { HomePage } from './HomePage'
import { DocumentationPage } from './DocumentationPage'
import { useState } from 'react'
import { SiteHeaderTemp } from '../../src/components/site-header2'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <>{children}</>
}
