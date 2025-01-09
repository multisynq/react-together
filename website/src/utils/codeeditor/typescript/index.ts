import { type Project } from '@stackblitz/sdk'

const template = import.meta.glob('./template/**/*', { as: 'raw', eager: true })

function getTemplateFiles() {
  const files: Record<string, string> = {}

  for (const path in template) {
    // Convert './template/src/file.ts' to 'src/file.ts'
    const relativePath = path.replace('./template/', '')
    files[relativePath] = template[path]
  }

  return files
}

export const project: Project = {
  title: 'React Together Example',
  description: `Simple example from ReactTogether's documentation.`,
  template: 'create-react-app',
  files: getTemplateFiles(),
  dependencies: {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    'react-router-dom': '^6.26.1',
    'react-together': '^0.3.0',
    '@types/react': '^18.2.71',
    '@types/react-dom': '^18.2.22',
    primereact: '^10.6.6',
    'color-hash': '^2.0.2',
    'unique-names-generator': '^4.7.1',
  },
}
