import { TabPanel, TabView } from 'primereact/tabview'

interface PreviewSourceCodeTabsProps {
  preview: React.ReactNode
  code: React.ReactNode
}
export function PreviewSourceCodeTabs({ preview, code }: PreviewSourceCodeTabsProps) {
  return (
    <div className='w-full'>
      {/* <TabView pt={{ panelContainer: { className: 'px-0' }, inkbar: { style: { borderColor: 'red' } } }}> */}
      <TabView pt={{}}>
        <TabPanel header='Preview'>{preview}</TabPanel>
        <TabPanel header='Code'>{code}</TabPanel>
      </TabView>
    </div>
  )
}
