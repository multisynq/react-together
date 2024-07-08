import { TabPanel, TabView } from 'primereact/tabview'
// import { useState } from 'react'
import useStateTogether from '../../hooks/useStateTogether'

function NavTabs() {
  const [idx, setIdx] = useStateTogether<number>('nt-idx', 0)
  return (
    <TabView activeIndex={idx} onTabChange={(e) => setIdx(e.index)}>
      <TabPanel header="Tab1">Content Together 1</TabPanel>
      <TabPanel header="Tab2">Content Together 2</TabPanel>
      <TabPanel header="Tab3">Content Together 3</TabPanel>
    </TabView>
  )
}


// To demo this, 
// (1) delete the word Together from all places above
// (2) Cut this   "'nt-idx', "  to clipboard (keep space, skip "s)
// (3) Use Cmd-/ to comment out the import { useStateTogether } line
// (4) Use Cmd-/ to uncomment the import { useState } line
// (5) Start your recording program
// (7) Paste the clipboard value into the useState call before the 0 of useState<number>(0)
// (8) see the temporary error msg
// (9) Multiselect your cursor in all places where "Together" used to be (combo of Shift-Option click, then option click)
// (10) Type "Together" (no quotes)
// (11) Use Cmd-/ to comment out the import { useState } line
// (12) Use Cmd-/ to uncomment the   import { useStateTogether } line
// (13) Done! Stop recording






function Test() {
  return (
    <div>
      <NavTabs />
    </div>
  )
}