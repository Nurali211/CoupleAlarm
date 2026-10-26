export default function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="grid auto-cols-fr grid-flow-col rounded-xl bg-slate-100 p-1 dark:bg-white/10">
      {options.map(o => <button key={o.id} onClick={() => onChange(o.id)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${value === o.id ? 'bg-white text-brand shadow dark:bg-brand dark:text-white' : 'text-slate-500'}`}>{o.label}</button>)}
    </div>
  )
}
