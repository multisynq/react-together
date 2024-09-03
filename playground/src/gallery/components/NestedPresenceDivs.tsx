import { PresenceDiv } from 'react-together'

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
    <PresenceDiv rtKey={rtKey} highlightMyself>
      <Box color="#00AF54" size="60px" id="b2">
        <PresenceDiv rtKey={`${rtKey}-1`}>
          <Box color="yellow" size="20px" id="b2" />
        </PresenceDiv>
      </Box>
    </PresenceDiv>
  )
}

export default function NestedPresenceDivs() {
  return (
    <PresenceDiv rtKey="div-1">
      <Box color="#fcd7ad" size="230px" id="b1">
        <PresenceDiv rtKey="div-2">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>
        <GreenDice rtKey="g1" />
        <PresenceDiv rtKey="div-5">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtKey="g2" />
        <PresenceDiv rtKey="div-8">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtKey="g3" />
        <PresenceDiv rtKey="div-b">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtKey="g4" />
        <PresenceDiv rtKey="div-e">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>
      </Box>
    </PresenceDiv>
  )
}
