import ScoreLabel from './ScoreLabel'
import TeamScoreLabel from './TeamScoreLabel'

export default function Scores() {
  return (
    <div className="flex flex-col gap-2">
      <ScoreLabel />
      <TeamScoreLabel />
    </div>
  )
}
