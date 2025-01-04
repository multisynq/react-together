import StackBlitzSDK from '@stackblitz/sdk'
import React from 'react'

interface StackBlitzGeneratorProps {
  code: string
  filePaths: string[]
}

const StackBlitzGenerator: React.FC<StackBlitzGeneratorProps> = ({ code, filePaths }) => {
  const handleGenerate = () => {
    const files: { [key: string]: string } = {}

    // Add the main file with the provided code
    files['index.tsx'] = code

    // Add additional files based on filePaths
    filePaths.forEach((filePath) => {
      // For simplicity, we'll assume all files are TypeScript and have empty content
      files[filePath] = ''
    })

    StackBlitzSDK.openProject(
      {
        title: 'Generated Project',
        description: 'A project generated from StackBlitzGenerator',
        template: 'javascript',
        files,
      },
      { newWindow: true }
    )
  }

  return <button onClick={handleGenerate}>Generate StackBlitz Project</button>
}

export default StackBlitzGenerator
