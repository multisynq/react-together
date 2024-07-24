interface DefaultValuePropSpanProps {
  text?: string
}

export default function DefaultValuePropSpan({ text = 'null' }: DefaultValuePropSpanProps) {
  return (
    <>
      <span className='text-sm border-1 rounded-sm px-2 font-mono'>{text}</span>
    </>
  )
}
