import { CodeBlock } from './CodeBlock'

export function CodeBlockExample() {
  const sampleCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
`

  return (
    <>
      <CodeBlock language='javascript' code={sampleCode} />
    </>
  )
}
