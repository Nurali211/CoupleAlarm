import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { requestOtp, verifyOtp } from '../services/auth'
import Modal, { btnGhost, btnPrimary, input } from './Modal'
export default function AuthModal() {
  const { authOpen, setAuthOpen, login, t } = useApp()
  const [contact, setContact] = useState(''); const [code, setCode] = useState('')
  const [sent, setSent] = useState(false); const [err, setErr] = useState(false); const [busy, setBusy] = useState(false)
  if (!authOpen) return null
  const close = () => { setAuthOpen(false); setSent(false); setCode(''); setErr(false) }
  const send = async () => { setBusy(true); await requestOtp(contact); setBusy(false); setSent(true) }
  const verify = async () => {
    setBusy(true); const ok = await verifyOtp(contact, code); setBusy(false)
    if (ok) { login(contact); close() } else setErr(true)
  }
  return (
    <Modal onClose={close}>
      <h2 className="font-display text-xl font-bold">{t('signIn')}</h2>
      <div className="mt-4 space-y-3">
        <input className={input} placeholder={t('contactPh')} value={contact} onChange={e => setContact(e.target.value)} disabled={sent} />
        {sent && <><input className={input} inputMode="numeric" maxLength={6} placeholder={t('codePh')} value={code} onChange={e => { setCode(e.target.value); setErr(false) }} />
          <p className="text-xs text-slate-500">{t('demoCode')}</p>{err && <p className="text-xs text-red-500">{t('wrongCode')}</p>}</>}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className={btnGhost} onClick={close}>{t('cancel')}</button>
        <button className={btnPrimary} disabled={busy || !contact.trim() || (sent && code.length < 6)} onClick={sent ? verify : send}>{sent ? t('verify') : t('sendCode')}</button>
      </div>
    </Modal>
  )
}
