import { AlarmClock, Crown, User, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Tab } from '../types'
const items = [{ id: 'alarms', icon: AlarmClock }, { id: 'people', icon: Users }, { id: 'plans', icon: Crown }, { id: 'profile', icon: User }] as const
export default function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const { t, plan } = useApp()
  return (
    <>
      {plan === 'basic' && <div className="shrink-0 bg-amber-100 py-2 text-center text-xs text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">{t('ad')}</div>}
      <nav className="grid shrink-0 grid-cols-4 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] dark:border-white/10 dark:bg-nightcard">
        {items.map(({ id, icon: I }) => (
          <button key={id} onClick={() => onChange(id)} className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition ${tab === id ? 'text-brand' : 'text-slate-400'}`}>
            <I className="h-5 w-5" />{t(id)}
          </button>
        ))}
      </nav>
    </>
  )
}
