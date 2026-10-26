import { Plus } from 'lucide-react'
import { useState } from 'react'
import AlarmCard from '../components/AlarmCard'
import AlarmForm from '../components/AlarmForm'
import ConfirmModal from '../components/ConfirmModal'
import GuestPrompt from '../components/GuestPrompt'
import { useApp } from '../context/AppContext'
import { Alarm } from '../types'
export default function AlarmsPage() {
  const { alarms, user, removeAlarm, t } = useApp()
  const [editing, setEditing] = useState<Alarm | 'new' | null>(null)
  const [deleting, setDeleting] = useState<Alarm | null>(null)
  const mine = alarms.filter(a => a.ownerId === 'me').sort((a, b) => a.time.localeCompare(b.time))
  const shared = alarms.filter(a => a.ownerId !== 'me').sort((a, b) => a.time.localeCompare(b.time))
  const card = (a: Alarm) => <AlarmCard key={a.id} alarm={a} onEdit={() => setEditing(a)} onDelete={() => setDeleting(a)} />
  return (
    <div className="space-y-4 px-5">
      <h2 className="font-display text-lg font-bold">{t('mine')}</h2>
      {mine.length ? mine.map(card) : <p className="py-6 text-center text-sm text-slate-500">{t('noAlarms')}</p>}
      {user ? shared.length > 0 && <><h2 className="pt-2 font-display text-lg font-bold">{t('shared')}</h2>{shared.map(card)}</> : <GuestPrompt />}
      <button aria-label={t('newAlarm')} onClick={() => setEditing('new')} className="fixed bottom-28 right-5 z-10 rounded-full bg-brand p-4 text-white shadow-lg transition active:scale-90"><Plus className="h-6 w-6" /></button>
      {editing && <AlarmForm initial={editing === 'new' ? undefined : editing} onClose={() => setEditing(null)} />}
      {deleting && <ConfirmModal title={t('confirmAlarm')} onConfirm={() => removeAlarm(deleting.id)} onClose={() => setDeleting(null)} />}
    </div>
  )
}
