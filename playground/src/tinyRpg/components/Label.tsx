interface LabelProps {
  label: string
  value: string | number
}
export default function Label({ label, value }: LabelProps) {
  return (
    <div className="bg-white px-2 py-1 rounded shadow z-10 text-black">
      {label}: {value}
    </div>
  )
}
