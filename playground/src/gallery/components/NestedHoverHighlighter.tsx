import { HoverHighlighter } from 'react-together'

function Box({
  color,
  size,
  children,
  id
}: {
  color: string
  size?: string
  children?: ReactChildren
  id: string
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '10px',
        padding: '5px',
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        gap: '5px',
        flexWrap: 'wrap'
      }}
      id={`b-${id}`}
    >
      {children}
    </div>
  )
}

function GreenDice({ rtKey }: { rtKey: string }) {
  return (
    <HoverHighlighter rtKey={rtKey} highlightMyself>
      <Box color="#00AF54" size="60px" id="b2">
        <HoverHighlighter rtKey={`${rtKey}-1`}>
          <Box color="yellow" size="20px" id="b2" />
        </HoverHighlighter>
      </Box>
    </HoverHighlighter>
  )
}

export default function NestedHoverHighlighter() {
  return (
    <HoverHighlighter rtKey="div-1">
      <Box color="#fcd7ad" size="230px" id="b1">
        <HoverHighlighter rtKey="div-2">
          <Box color="#007CBE" size="60px" id="b2" />
        </HoverHighlighter>
        <GreenDice rtKey="g1" />
        <HoverHighlighter rtKey="div-5">
          <Box color="#007CBE" size="60px" id="b2" />
        </HoverHighlighter>

        <GreenDice rtKey="g2" />
        <HoverHighlighter rtKey="div-8">
          <Box color="#007CBE" size="60px" id="b2" />
        </HoverHighlighter>

        <GreenDice rtKey="g3" />
        <HoverHighlighter rtKey="div-b">
          <Box color="#007CBE" size="60px" id="b2" />
        </HoverHighlighter>

        <GreenDice rtKey="g4" />
        <HoverHighlighter rtKey="div-e">
          <Box color="#007CBE" size="60px" id="b2" />
        </HoverHighlighter>
      </Box>
    </HoverHighlighter>
  )
}
