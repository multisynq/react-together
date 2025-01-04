import { CodeBlock } from './CodeBlock'

export function CodeBlockExample() {
  const sampleCodeShort = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
`

  const sampleCodeLong = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
`

  return (
    <>
      <CodeBlock language='javascript' codeShort={sampleCodeShort} codeLong={sampleCodeLong} />
    </>
  )
}
