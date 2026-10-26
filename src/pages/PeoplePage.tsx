import { Copy, Trash2 } from 'lucide-react'
import { useState } from 'react'
import ColorPicker from '../components/ColorPicker'
import ConfirmModal from '../components/ConfirmModal'
import GuestPrompt from '../components/GuestPrompt'
import { btnPrimary, input } from '../components/Modal'
import { ACCENTS } from '../data/mock'
import { useApp } from '../context/AppContext'
import { AccentKey, Connection } from '../types'
export default function PeoplePage() {
  const { user, connections, addConnection, updateConnection, removeConnection, t } = useApp()
  const [name, setName] = useState(''); const [code, setCode] = useState(''); const [color, setColor] = useState<AccentKey>('blue')
  const [deleting, setDeleting] = useState<Connection | null>(null); const [copied, setCopied] = useState(false)
  if (!user) return <div className="px-5"><GuestPrompt /></div>
  const copy = () => { navigator.clipboard?.writeText(user.inviteCode); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  return (
    <div className="space-y-5 px-5">
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 dark:bg-nightcard">
        <div><p className="text-xs text-slate-500">{t('yourCode')}</p><p className="font-display text-xl font-bold tracking-wider">{user.inviteCode}</p></div>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-2 text-sm font-semibold text-brand"><Copy className="h-4 w-4" />{copied ? t('copied') : t('copy')}</button>
      </div>
      {connections.length === 0 && <p className="text-center text-sm text-slate-500">{t('noPeople')}</p>}
      {connections.map(c => (
        <div key={c.id} className={`space-y-3 rounded-3xl border p-4 ${ACCENTS[c.color].card}`}>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-lg font-bold"><span className={`h-3 w-3 rounded-full ${ACCENTS[c.color].dot}`} />{c.name}</p>
            <button aria-label={t('delete')} onClick={() => setDeleting(c)} className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
          </div>
          <ColorPicker value={c.color} onChange={col => updateConnection(c.id, { color: col })} />
          <label className="flex items-center justify-between gap-3 text-sm">
            {t('allowControl')}
            <input type="checkbox" className="h-5 w-5 accent-[#5B5BF0]" checked={c.canControlMine} onChange={() => updateConnection(c.id, { canControlMine: !c.canControlMine })} />
          </label>
        </div>
      ))}
      <div className="space-y-3 rounded-3xl bg-white p-4 dark:bg-nightcard">
        <h2 className="font-display text-lg font-bold">{t('connect')}</h2>
        <input className={input} placeholder={t('enterCode')} value={code} onChange={e => setCode(e.target.value)} />
        <input className={input} placeholder={t('partnerName')} value={name} onChange={e => setName(e.target.value)} />
        <p className="text-sm font-medium">{t('color')}</p><ColorPicker value={color} onChange={setColor} />
        <button className={`${btnPrimary} w-full`} disabled={!code.trim() || !name.trim()} onClick={() => { if (addConnection(name.trim(), color)) { setName(''); setCode('') } }}>{t('add')}</button>
      </div>
      {deleting && <ConfirmModal title={t('confirmConn')} onConfirm={() => removeConnection(deleting.id)} onClose={() => setDeleting(null)} />}
    </div>
  )
}
