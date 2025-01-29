import sdk, { type Project } from '@stackblitz/sdk'

import { CodeBlockCodeMetaData } from '@components/ui/CodeBlock'
// import prettier from 'prettier'
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

  const newProject = ApplyTemplate(template, files, codeMetadata)

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

export async function openCodePen({ template = 'typescript', files = null, codeMetadata = null }: CodePenProps) {
  if (!files && !codeMetadata) return

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

  const newProject = ApplyTemplate(template, files, codeMetadata)

  // Get all all ts and tsx files, join them together and clean up the code
  const tsFiles = Object.entries(newProject.files)
    .filter(([fileName]) => fileName.endsWith('.ts') || fileName.endsWith('.tsx'))
    .map(([_, content]) => content)
    .join('\n')

  const tsContent = await FullCleanup(tsFiles)

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

//===============================================================
//===============================================================
//===============================================================
// The following functions are used to clean up the code snippets
//===============================================================
//===============================================================
//===============================================================

function ApplyTemplate(template: keyof typeof TEMPLATES, files: Record<string, string>, codeMetadata: CodeBlockCodeMetaData) {
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

  return newProject
}

async function FullCleanup(data: string): Promise<string> {
  const noExports = RemoveExports(data)
  const noUnwantedImports = RemoveUnwantedImports(noExports)
  const mergedImports = MergeImports(noUnwantedImports)
  const noTypes = RemoveTSSyntax(mergedImports)
  // apply prettier formatting to this string
  // const pretty = await prettier.format(noTypes, { parser: 'typescript' })
  return noTypes
}

function RemoveExports(data: string): string {
  // Remove 'export' keywords, handling various cases
  return data
    .replace(/export\s+default\s+/g, '') // Remove 'export default'
    .replace(/export\s+/g, '') // Remove 'export' keyword
    .replace(/export\s*{[^}]+}/g, '') // Remove 'export { something }'
    .replace(/^\s*export\s+/gm, '') // Remove 'export' at start of lines
}

function RemoveUnwantedImports(data: string): string {
  // Create a map to track all imports and their sources
  const seenImports = new Map<string, string>()

  // Regular expression to match import statements
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"]/g
  let match
  let result = data

  // First pass: collect all imports
  while ((match = importRegex.exec(data)) !== null) {
    const [fullMatch, imports, source] = match
    const importItems = imports.split(',').map((item) => item.trim())

    importItems.forEach((item) => {
      if (!seenImports.has(item)) {
        seenImports.set(item, source)
      } else {
        // If we've seen this import before, remove the duplicate
        const pattern = new RegExp(`(?:,\\s*)?${item}\\s*(?=,|})`, 'g')
        result = result.replace(pattern, '')
      }
    })
  }

  // Clean up empty import statements
  result = result.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\n?/g, '')

  // Clean up trailing commas in imports
  result = result.replace(/,\s*}/g, ' }')

  return result
}

function MergeImports(data: string): string {
  // Create a map to store imports by their source
  const importsBySource = new Map<string, Set<string>>()

  // Match all import statements
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"]/g
  let match

  // Collect all imports
  while ((match = importRegex.exec(data)) !== null) {
    const [fullMatch, imports, source] = match
    // Split imports and trim whitespace
    const importItems = imports.split(',').map((item) => item.trim())

    // Get or create Set for this source
    const existing = importsBySource.get(source) || new Set()
    importItems.forEach((item) => existing.add(item))
    importsBySource.set(source, existing)

    // Remove the original import
    data = data.replace(fullMatch, '')
  }

  // Reconstruct merged imports at the start of the file
  const mergedImports = Array.from(importsBySource.entries())
    .map(([source, imports]) => {
      const uniqueImports = Array.from(imports).sort().join(', ')
      return `import { ${uniqueImports} } from '${source}';`
    })
    .join('\n')

  // Add merged imports at the start of the file
  return mergedImports + '\n\n' + data.trim()
}

function RemoveTSSyntax(data: string): string {
  return (
    data
      // Remove interface declarations
      .replace(/interface\s+\w+\s*{[^}]*}/g, '')
      // Remove type declarations
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
      // Remove type imports
      .replace(/import\s+type\s*[^;]+;/g, '')
      // Remove type assertions
      .replace(/as\s+[A-Z]\w+/g, '')
      // Remove type parameters from generic components
      .replace(/<[A-Z]\w+\s*[,\s]*[A-Z]\w+>(?=\s*\()/g, '')
      // Remove type annotations from parameters
      .replace(/:\s*[A-Z]\w+(?=[,)])/g, '')
      // Remove return type annotations
      .replace(/:\s*[A-Z]\w+(?=\s*{)/g, '')
      // Remove generics from React.FC etc
      .replace(/React\.FC<[^>]+>/g, 'React.FC')
      // Remove remaining type parameters
      .replace(/<[^>]+>/g, '')
      // Clean up any double spaces or empty lines
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
  )
}
