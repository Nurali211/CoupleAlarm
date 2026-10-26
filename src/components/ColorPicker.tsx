import { Check } from 'lucide-react'
import { ACCENTS, ACCENT_KEYS } from '../data/mock'
import { AccentKey } from '../types'
export default function ColorPicker({ value, onChange }: { value: AccentKey; onChange: (c: AccentKey) => void }) {
  return (
    <div className="flex gap-3">
      {ACCENT_KEYS.map(k => (
        <button key={k} type="button" aria-label={k} onClick={() => onChange(k)} className={`flex h-9 w-9 items-center justify-center rounded-full ${ACCENTS[k].dot} ${value === k ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-nightcard' : ''}`}>
          {value === k && <Check className="h-4 w-4 text-white" />}
        </button>
      ))}
    </div>
  )
}
