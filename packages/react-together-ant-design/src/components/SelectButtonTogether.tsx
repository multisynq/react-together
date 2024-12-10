// import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
// import { useStateTogether } from 'react-together'

// export interface SelectButtonTogetherProps
//   extends Omit<SelectButtonProps, 'value' | 'onChange'> {
//   rtKey: string
//   className?: string
// }
// export default function SelectButtonTogether({
//   rtKey,
//   options,
//   ...props
// }: SelectButtonTogetherProps) {
//   const [value, set_value] = useStateTogether<unknown>(rtKey, null)

//   return (
//     <SelectButton
//       {...props}
//       onChange={(e) => set_value(e.value || false)}
//       options={options}
//       value={value || options?.[0]}
//       pt={{
//         button: (ctx) => ({
//           className: `border h-[15px] ${(ctx || { props: {} }).props.className}`
//         })
//       }}
//     />
//   )
// }
// import React from 'react';
// import { Flex, Radio } from 'antd';

// const App: React.FC = () => (
//     <Radio.Group defaultValue="a" size="large">
//       <Radio.Button value="a">Hangzhou</Radio.Button>
//       <Radio.Button value="b">Shanghai</Radio.Button>
//       <Radio.Button value="c">Beijing</Radio.Button>
//       <Radio.Button value="d">Chengdu</Radio.Button>
//     </Radio.Group>

// Ant Design SelectButton
import { Radio, RadioProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface SelectButtonTogetherProps 
  extends Omit<RadioProps, 'value' | 'onChange'> {
  rtKey: string
  items: { label: string, value: string }[]
}

export default function SelectButtonTogether({
  rtKey,
  items,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return <Radio.Group {...props} value={value} onChange={(e) => set_value(e.target.value)}>
    {items.map((item) => (
      <Radio.Button key={item.value} value={item.value}>
        {item.label}
      </Radio.Button>
    ))}
  </Radio.Group>
}
