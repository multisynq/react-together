// import { ReactTogetherManager } from 'react-together/src/components/ReactTogetherManager'
import { useModelRoot, usePublish } from '@croquet/react'
import MyModel from './CustomModel'

export default function App() {
  const model = useModelRoot<MyModel>()!

  const publishTest = usePublish(() => [model?.id, 'test', null])
  // console.log(model)

  return (
    <>
      <button onClick={() => publishTest()}>Publish event to model!</button>
    </>
  )
}
