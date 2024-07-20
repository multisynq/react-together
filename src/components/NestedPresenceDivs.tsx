import { PresenceDiv } from '../../react-together'

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

function GreenDice({ rtid }) {
  return (
    <PresenceDiv rtid={rtid}>
      <Box color="#00AF54" size="60px" id="b2">
        <PresenceDiv rtid={`${rtid}-1`}>
          <Box color="yellow" size="20px" id="b2" />
        </PresenceDiv>
      </Box>
    </PresenceDiv>
  )
}

export default function NestedPresenceDivs() {
  return (
    <PresenceDiv rtid="div-1">
      <Box color="#fcd7ad" size="230px" id="b1">
        <PresenceDiv rtid="div-2">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>
        <GreenDice rtid="g1" />
        <PresenceDiv rtid="div-5">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtid="g2" />
        <PresenceDiv rtid="div-8">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtid="g3" />
        <PresenceDiv rtid="div-b">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>

        <GreenDice rtid="g4" />
        <PresenceDiv rtid="div-e">
          <Box color="#007CBE" size="60px" id="b2" />
        </PresenceDiv>
      </Box>
    </PresenceDiv>
  )
}
