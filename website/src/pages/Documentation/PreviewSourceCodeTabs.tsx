import { TabPanel, TabView } from 'primereact/tabview'

interface PreviewSourceCodeTabsProps {
  preview: React.ReactNode
  code: React.ReactNode
}
export function PreviewSourceCodeTabs({ preview, code }: PreviewSourceCodeTabsProps) {
  return (
    <TabView>
      <TabPanel header='Preview'>{preview}</TabPanel>
      <TabPanel header='Code'>{code}</TabPanel>
    </TabView>
  )
}
