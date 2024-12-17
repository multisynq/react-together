import { demos } from '../demos'
import { DemoCard } from './DemoCard'

export function DemoList() {
  return (
    <div className="m-4 flex flex-wrap justify-start gap-4">
      {demos.map((demo) => (
        <div key={demo.path}>
          <DemoCard key={demo.path} {...demo} />
        </div>
      ))}
    </div>
  )
}
