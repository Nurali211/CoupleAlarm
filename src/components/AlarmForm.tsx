import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ALL_DAYS } from '../data/mock'
import { Alarm } from '../types'
import { dayNames } from './AlarmCard'
import Modal, { btnGhost, btnPrimary, input } from './Modal'
export default function AlarmForm({ initial, onClose }: { initial?: Alarm; onClose: () => void }) {
  const { t, lang, saveAlarm, requirePlan } = useApp()
  const [a, setA] = useState<Alarm>(initial ?? { id: 'a' + Date.now(), time: '07:00', label: '', days: ALL_DAYS, enabled: true, ownerId: 'me' })
  const names = dayNames(lang)
  const toggleDay = (d: number) => {
    if (!requirePlan('pro', 'repeatDays')) return
    setA(x => ({ ...x, days: x.days.includes(d) ? x.days.filter(v => v !== d) : [...x.days, d].sort() }))
  }
  const flag = (k: 'critical' | 'awakeCheck') => { if (requirePlan('ultimate', k === 'critical' ? 'critical' : 'awake')) setA(x => ({ ...x, [k]: !x[k] })) }
  return (
    <Modal onClose={onClose}>
      <h2 className="font-display text-xl font-bold">{initial ? t('editAlarm') : t('newAlarm')}</h2>
      <div className="mt-4 space-y-4">
        <input type="time" aria-label={t('time')} className={`${input} text-center font-display text-4xl`} value={a.time} onChange={e => setA({ ...a, time: e.target.value })} />
        <input className={input} placeholder={t('label')} value={a.label} onChange={e => setA({ ...a, label: e.target.value })} />
        <div>
          <p className="mb-2 text-sm font-medium">{t('repeat')}</p>
          <div className="flex justify-between">{ALL_DAYS.map(d => <button key={d} onClick={() => toggleDay(d)} className={`h-10 w-10 rounded-full text-xs font-semibold ${a.days.includes(d) ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-white/10'}`}>{names[d].slice(0, 2)}</button>)}</div>
        </div>
        {(['critical', 'awakeCheck'] as const).map(k => (
          <label key={k} className="flex items-center justify-between gap-3 text-sm">
            <span>{t(k === 'critical' ? 'critical' : 'awake')}</span>
            <input type="checkbox" className="h-5 w-5 accent-[#5B5BF0]" checked={!!a[k]} onChange={() => flag(k)} />
          </label>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className={btnGhost} onClick={onClose}>{t('cancel')}</button>
        <button className={btnPrimary} disabled={a.days.length === 0} onClick={() => { if (saveAlarm(a)) onClose() }}>{t('save')}</button>
      </div>
    </Modal>
  )
}
