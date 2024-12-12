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

export const project = {
  title: 'React Together Example',
  description: `Simple example from ReactTogether's documentation.`,
  template: 'typescript',
  files: getTemplateFiles(),
  dependencies: {
    'date-fns': '^2',
  },
}
