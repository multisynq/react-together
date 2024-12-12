import sdk, { type Project } from '@stackblitz/sdk'

import { project as p_ts } from './typescript'
import { project as p_vite_ts } from './vite-ts'

const TEMPLATES = {
  typescript: p_ts,
  vite_ts: p_vite_ts,
}

// Embed the project
// async function embedProject() {
//   sdk.embedProject('embed', TEMPLATES.vite_ts, {
//     height: 400,
//     openFile: 'index.ts',
//     terminalHeight: 50,
//   })
// }

// const defaultOpenFiles = ['main.tsx', 'src/App.tsx', '.env.example']
const defaultOpenFiles = ['src/App.tsx', '.env.example']

//  Open the project in a new window on StackBlitz
type StackBlitzProps = {
  template?: keyof typeof TEMPLATES
  files?: Record<string, string>
}
export function openStackBlitz({ template = 'vite_ts', files = null }: StackBlitzProps) {
  console.log('openStackBlitz', template, files)

  // Add files to the template project, depending on what template is selected
  const selected_template = TEMPLATES[template]

  function getFilesFromTemplate(fileNames: string[]) {
    const files: Record<string, string> = {}
    fileNames.forEach((fileName) => (files[fileName] = selected_template.files[fileName]))
    return files
  }

  files = { ...getFilesFromTemplate(defaultOpenFiles), ...files } as Record<string, string>

  const newProject = { ...selected_template, files: { ...selected_template.files, ...files } } as Project

  // Open the files that are passed in, if none, open "src/App.tsx"
  // If there are more than 1 file passed in, add them into a string and separate it by a single comma
  const filesToOpen = files ? Object?.keys(files) : ['src/App.tsx']
  const openFile = filesToOpen?.length > 1 ? filesToOpen.join(',') : filesToOpen[0]

  sdk.openProject(newProject, { openFile })
}

export function useCodeEditor() {
  // const openCodeSandbox = useCodeSandbox(props)

  return {
    // openCodeSandbox,
    openStackBlitz,
  }
}
