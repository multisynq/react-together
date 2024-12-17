import { ToggleButtonTogether } from 'react-together-ant-design'

export function AntDesignToggleButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ToggleButtonTogether rtKey='toggle-button-doc-demo' onIcon={'🌞 '} onLabel='Day' offIcon={'🌙 '} offLabel='Night' />
    </div>
  )
}
