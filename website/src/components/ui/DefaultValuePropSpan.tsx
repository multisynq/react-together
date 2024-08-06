import React from 'react'

interface DefaultValuePropSpanProps {
  text: React.ReactNode
}

export default function DefaultValuePropSpan({ text }: DefaultValuePropSpanProps) {
  return (
    <>
      <span className='text-sm border-1 rounded-sm px-2 font-mono'>{text}</span>
    </>
  )
}
