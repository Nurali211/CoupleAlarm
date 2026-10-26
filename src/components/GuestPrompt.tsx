import { Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { btnPrimary } from './Modal'
export default function GuestPrompt() {
  const { t, setAuthOpen } = useApp()
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-brand/10 p-6 text-center">
      <Users className="h-8 w-8 text-brand" />
      <h2 className="font-display text-lg font-bold">{t('guestTitle')}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{t('guestText')}</p>
      <button className={btnPrimary} onClick={() => setAuthOpen(true)}>{t('signIn')}</button>
    </div>
  )
}
