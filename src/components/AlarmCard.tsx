import { Lock, Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { ACCENTS } from '../data/mock'
import { useApp } from '../context/AppContext'
import { Alarm } from '../types'
export const dayNames = (lang: string) => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2024, 0, 7 + i)))
export default function AlarmCard({ alarm, onEdit, onDelete }: { alarm: Alarm; onEdit: () => void; onDelete: () => void }) {
  const { connections, toggleAlarm, t, lang, plan } = useApp()
  const owner = connections.find(c => c.id === alarm.ownerId)
  const mine = alarm.ownerId === 'me'
  const a = ACCENTS[owner?.color ?? 'me']
  const canControl = mine || !!owner?.canControlTheirs
  const names = dayNames(lang)
  return (
    <div className={`rounded-3xl border p-4 transition ${a.card} ${alarm.enabled ? '' : 'opacity-60'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-4xl font-bold tabular-nums">{alarm.time}</p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{alarm.label}</p>
        </div>
        <button role="switch" aria-checked={alarm.enabled} disabled={!canControl} onClick={() => toggleAlarm(alarm.id)} className={`relative h-8 w-14 rounded-full transition ${alarm.enabled ? a.dot : 'bg-slate-300 dark:bg-white/20'} disabled:opacity-50`}>
          <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${alarm.enabled ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">{alarm.days.length === 7 ? t('everyDay') : alarm.days.map(d => names[d]).join(', ')}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {owner && <span className={`rounded-full px-2.5 py-1 ${a.badge}`}>{owner.name}</span>}
          {owner && (canControl ? <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="h-3.5 w-3.5" />{t('youCanControl')}</span>
            : <span className="flex items-center gap-1 text-slate-400"><Lock className="h-3.5 w-3.5" />{t('noControl')}</span>)}
          {owner && canControl && plan === 'basic' && <Lock className="h-3.5 w-3.5 text-amber-500" />}
          {alarm.critical && <span className="rounded-full bg-red-500/15 px-2 py-1 text-red-600 dark:text-red-300">!</span>}
        </div>
        {mine && <div className="flex gap-1">
          <button aria-label={t('edit')} onClick={onEdit} className="rounded-lg p-2 text-slate-500 hover:bg-black/5 dark:hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
          <button aria-label={t('delete')} onClick={onDelete} className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
        </div>}
      </div>
    </div>
  )
}
