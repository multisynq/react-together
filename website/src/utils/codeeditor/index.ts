import sdk, { type Project } from '@stackblitz/sdk'

import { CodeBlockCodeMetaData } from '@components/ui/CodeBlock'
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
// const defaultOpenFiles = ['src/App.tsx', '.env.example']
const defaultOpenFiles = ['src/App.tsx']

//  Open the project in a new window on StackBlitz
type StackBlitzProps = {
  template?: keyof typeof TEMPLATES
  files?: Record<string, string>
  codeMetadata?: CodeBlockCodeMetaData
}
export function openStackBlitz({ template = 'typescript', files = null, codeMetadata = null }: StackBlitzProps) {
  console.log('openStackBlitz', template, files)

  // Add files to the template project, depending on what template is selected
  const selected_template = TEMPLATES[template]

  function getFilesFromTemplate(fileNames: string[]) {
    const files: Record<string, string> = {}
    fileNames.forEach((fileName) => (files[fileName] = selected_template.files[fileName]))
    return files
  }

  files = { ...getFilesFromTemplate(defaultOpenFiles), ...files } as Record<string, string>

  const newProject = {
    ...selected_template,
    files: { ...selected_template.files, ...files },
  } as Project

  const component = codeMetadata?.componentName || 'Component'

  // Add the Import statement
  const importStatement = `import ${component} from '${`./${component}`}'`
  newProject.files['src/App.tsx'] = newProject.files['src/App.tsx']
    .replace('//%%%IMPORT%%%', importStatement)
    .replace('%%%IMPORT%%%', importStatement)

  // Add the Component itself
  newProject.files['src/App.tsx'] = newProject.files['src/App.tsx'].replace('%%%USAGE%%%', codeMetadata.usage || '"<CONFIGURE USAGE>"')

  // Open the files that are passed in, if none, open "src/App.tsx"
  // If there are more than 1 file passed in, add them into a string and separate it by a single comma
  const filesToOpen = files ? Object?.keys(files) : ['src/App.tsx']
  const openFile = filesToOpen?.length > 1 ? filesToOpen.join(',') : filesToOpen[0]

  sdk.openProject(newProject, {
    devToolsHeight: 50,
    hideDevTools: false,
    terminalHeight: 1,
    openFile,
  })
}

type CodePenProps = {
  template?: keyof typeof TEMPLATES
  files?: Record<string, string>
  codeMetadata?: CodeBlockCodeMetaData
}

export function openCodePen({ template = 'typescript', files = null, codeMetadata = null }: CodePenProps) {
  if (!files && !codeMetadata) return

  // Get the selected template
  // const selected_template = TEMPLATES[template]

  // Get the HTML content from the template's index.html
  const htmlContent = `
  <body>
    <div id="root"></div>
    <script type="module" src="./index.js"></script>
  </body>
  `

  // Create a form to submit to CodePen
  const form = document.createElement('form')
  form.action = 'https://codepen.io/pen/define'
  form.method = 'POST'
  form.target = '_blank'

  // Merge css files into one: (broken atm)
  // const cssFiles = Object.entries(files || {}).filter(([fileName]) => fileName.endsWith('.css'))
  // const cssContent = cssFiles.map(([, content]) => content).join('\n')

  // Merge all TS files into one:
  const tsFiles = Object.entries(files || {}).filter(([fileName]) => fileName.endsWith('.ts') || fileName.endsWith('.tsx'))
  // tsFiles.forEach(([fileName, content]) => (files[fileName] = content.replace(/export /g, '')))
  // Remove any exports

  const tsContent = tsFiles.map(([, content]) => content).join('\n')

  // Prepare the data for CodePen
  const data = {
    title: codeMetadata?.componentName || 'React Component',
    description: 'Created with React Together',
    html: htmlContent.trim(),
    // css: cssContent,
    js: tsContent,
    css_pre_processor: 'none',
    js_pre_processor: 'TypeScript',
    js_external: [
      'https://unpkg.com/react@18/umd/react.development.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    ].join(';'),
    editors: '101', // Show HTML and JS editors
  }

  // Create a hidden input with the stringified data
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'data'
  input.value = JSON.stringify(data)

  // Add the input to the form and submit
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export function useCodeEditor() {
  return {
    openStackBlitz,
    openCodePen,
  }
}
