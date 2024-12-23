const template = import.meta.glob('./template/**/*', { as: 'raw', eager: true })

function getTemplateFiles() {
  const files: Record<string, string> = {}

  for (const path in template) {
    // Convert './template/src/file.ts' to 'src/file.ts'
    const relativePath = path.replace('./template/', '')
    files[relativePath] = template[path]
  }

  // Manually add .env.example
  files['.env.example'] = `
# RENAME THIS FILE TO .env
# AND FILL IN THE VALUES WITH YOUR OWN API KEY THAT YOU CAN GET HERE FOR FREE:
# https://multisynq.io/coder

VITE_API_KEY=""
VITE_APP_ID=""
`

  return files
}

export const project = {
  title: 'React Together Example',
  description: `Simple example from ReactTogether's documentation using TypeScript and Vite.`,
  template: 'node',
  files: getTemplateFiles(),
  dependencies: {
    'react-together': '^0.2.0',
  },
}
