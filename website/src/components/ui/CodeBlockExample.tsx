import { CodeBlock } from './CodeBlock'

export function CodeBlockExample() {
  const sampleCode1 = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
`

  const sampleCode2 = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
`

  return (
    <>
      <CodeBlock language='javascript' code1={sampleCode1} code2={sampleCode2} />
    </>
  )
}
