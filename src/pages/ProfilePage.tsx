import { LogOut } from 'lucide-react'
import Segmented from '../components/Segmented'
import { btnPrimary } from '../components/Modal'
import { useApp } from '../context/AppContext'
import { Lang, ThemeMode } from '../types'
export default function ProfilePage() {
  const { user, setAuthOpen, logout, theme, setTheme, lang, setLang, plan, t } = useApp()
  return (
    <div className="space-y-5 px-5">
      <div className="rounded-3xl bg-white p-5 dark:bg-nightcard">
        <p className="font-display text-xl font-bold">{user ? user.contact : t('guestTitle')}</p>
        <p className="mt-1 text-sm text-slate-500">{t('currentPlan')}: {t(plan)}</p>
      </div>
      <div className="space-y-2"><p className="text-sm font-medium">{t('language')}</p>
        <Segmented<Lang> value={lang} onChange={setLang} options={[{ id: 'az', label: 'AZ' }, { id: 'en', label: 'EN' }, { id: 'ru', label: 'RU' }]} /></div>
      <div className="space-y-2"><p className="text-sm font-medium">{t('theme')}</p>
        <Segmented<ThemeMode> value={theme} onChange={setTheme} options={[{ id: 'system', label: t('system') }, { id: 'light', label: t('light') }, { id: 'dark', label: t('dark') }]} /></div>
      {user
        ? <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-sm font-semibold text-red-600"><LogOut className="h-4 w-4" />{t('signOut')}</button>
        : <button onClick={() => setAuthOpen(true)} className={`${btnPrimary} w-full`}>{t('signIn')}</button>}
    </div>
  )
}
