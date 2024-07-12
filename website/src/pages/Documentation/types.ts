export interface NavItem {
  key: string
  label: string
}

export interface ComponentReturn {
  content: JSX.Element
  navItems: NavItem[]
}
