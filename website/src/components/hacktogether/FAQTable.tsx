function FAQPanel() {
  return <div className='h-48 min-w-[20rem] max-w-[60rem] flex-grow flex-shrink-0  bg-slate-200 basis-0'>panel</div>
}

export default function FAQTable() {
  return (
    <div className='flex flex-wrap gap-3'>
      <FAQPanel />
      <FAQPanel />
      <FAQPanel />
      <FAQPanel />
      <FAQPanel />
      <FAQPanel />
    </div>
  )
}
