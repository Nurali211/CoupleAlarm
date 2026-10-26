# Layihə faylları

Hər başlıq fayl yoludur. Kodu həmin adla yaradın.

## `package.json`

```json
{"name":"couple-alarm","private":true,"version":"1.0.0","type":"module","scripts":{"dev":"vite","build":"tsc && vite build","preview":"vite preview"},
"dependencies":{"lucide-react":"^0.453.0","react":"^18.3.1","react-dom":"^18.3.1"},
"devDependencies":{"@types/react":"^18.3.3","@types/react-dom":"^18.3.0","@vitejs/plugin-react":"^4.3.1","autoprefixer":"^10.4.20","postcss":"^8.4.47","tailwindcss":"^3.4.13","typescript":"^5.5.4","vite":"^5.4.8"}}
```

## `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
```

## `tsconfig.json`

```json
{"compilerOptions":{"target":"ES2020","lib":["ES2020","DOM","DOM.Iterable"],"module":"ESNext","moduleResolution":"bundler","jsx":"react-jsx","strict":true,"skipLibCheck":true,"noEmit":true,"isolatedModules":true},"include":["src"]}
```

## `postcss.config.js`

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

## `tailwind.config.js`

```js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
    colors: { dawn: '#EEF1F8', night: '#0F1325', nightcard: '#181E38', brand: '#5B5BF0' },
  } },
  plugins: [],
}
```

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Together Alarm</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
```

## `src/App.tsx`

```tsx
import { useState } from 'react'
import AuthModal from './components/AuthModal'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import UpgradeModal from './components/UpgradeModal'
import AlarmsPage from './pages/AlarmsPage'
import PeoplePage from './pages/PeoplePage'
import PlansPage from './pages/PlansPage'
import ProfilePage from './pages/ProfilePage'
import { Tab } from './types'
const pages = { alarms: AlarmsPage, people: PeoplePage, plans: PlansPage, profile: ProfilePage }
export default function App() {
  const [tab, setTab] = useState<Tab>('alarms')
  const Page = pages[tab]
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-24 pt-2"><Page /></main>
      <BottomNav tab={tab} onChange={setTab} />
      <AuthModal /><UpgradeModal />
    </div>
  )
}
```

## `src/components/AlarmCard.tsx`

```tsx
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
```

## `src/components/AlarmForm.tsx`

```tsx
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
```

## `src/components/AuthModal.tsx`

```tsx
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
```

## `src/components/BottomNav.tsx`

```tsx
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
```

## `src/components/ColorPicker.tsx`

```tsx
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
```

## `src/components/ConfirmModal.tsx`

```tsx
import { AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Modal, { btn, btnGhost } from './Modal'
export default function ConfirmModal({ title, onConfirm, onClose }: { title: string; onConfirm: () => void; onClose: () => void }) {
  const { t } = useApp()
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <p className="text-sm text-slate-500">{t('irreversible')}</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className={btnGhost} onClick={onClose}>{t('cancel')}</button>
        <button className={`${btn} bg-red-500 text-white`} onClick={() => { onConfirm(); onClose() }}>{t('delete')}</button>
      </div>
    </Modal>
  )
}
```

## `src/components/GuestPrompt.tsx`

```tsx
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
```

## `src/components/Header.tsx`

```tsx
import { Monitor, Moon, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Lang, ThemeMode } from '../types'
const NEXT: Record<ThemeMode, ThemeMode> = { system: 'light', light: 'dark', dark: 'system' }
export default function Header() {
  const { lang, setLang, theme, setTheme } = useApp()
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon
  return (
    <header className="flex shrink-0 items-center justify-between px-5 pb-2 pt-4">
      <h1 className="font-display text-2xl font-bold tracking-tight">Together<span className="text-brand">.</span></h1>
      <div className="flex items-center gap-2">
        <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value as Lang)} className="rounded-lg bg-slate-200/70 px-2 py-1.5 text-sm font-semibold dark:bg-white/10">
          <option value="az">AZ</option><option value="en">EN</option><option value="ru">RU</option>
        </select>
        <button aria-label="Theme" onClick={() => setTheme(NEXT[theme])} className="rounded-lg bg-slate-200/70 p-2 dark:bg-white/10"><Icon className="h-4 w-4" /></button>
      </div>
    </header>
  )
}
```

## `src/components/Modal.tsx`

```tsx
import { ReactNode } from 'react'
export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl dark:bg-nightcard sm:rounded-3xl" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  )
}
export const btn = 'rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-95'
export const btnPrimary = `${btn} bg-brand text-white`
export const btnGhost = `${btn} bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200`
export const input = 'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brand dark:border-white/15'
```

## `src/components/Segmented.tsx`

```tsx
export default function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="grid auto-cols-fr grid-flow-col rounded-xl bg-slate-100 p-1 dark:bg-white/10">
      {options.map(o => <button key={o.id} onClick={() => onChange(o.id)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${value === o.id ? 'bg-white text-brand shadow dark:bg-brand dark:text-white' : 'text-slate-500'}`}>{o.label}</button>)}
    </div>
  )
}
```

## `src/components/UpgradeModal.tsx`

```tsx
import { Check, Crown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PLAN_FEATURES } from '../i18n/translations'
import Modal, { btnGhost, btnPrimary } from './Modal'
export default function UpgradeModal() {
  const { upgrade, closeUpgrade, t, lang, setPlan } = useApp()
  if (!upgrade) return null
  const price = upgrade.min === 'pro' ? '2.99' : '7.99'
  return (
    <Modal onClose={closeUpgrade}>
      <div className="flex flex-col items-center gap-1 text-center">
        <Crown className="h-8 w-8 text-amber-500" />
        <h2 className="font-display text-xl font-bold">{t('upgradeTitle')}</h2>
        <p className="text-sm text-slate-500">{t(upgrade.reason)} {t(upgrade.min === 'pro' ? 'needPro' : 'needUltimate')}</p>
      </div>
      <div className="mt-4 rounded-2xl bg-brand/10 p-4">
        <p className="font-display text-lg font-bold">{t(upgrade.min)} · {price} {t('manat')} <span className="text-sm font-normal">{t('perMonth')}</span></p>
        <ul className="mt-2 space-y-1.5 text-sm">{PLAN_FEATURES[lang][upgrade.min].map(f => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{f}</li>)}</ul>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className={btnGhost} onClick={closeUpgrade}>{t('maybeLater')}</button>
        <button className={btnPrimary} onClick={() => { setPlan(upgrade.min); closeUpgrade() }}>{t('upgrade')}</button>
      </div>
    </Modal>
  )
}
```

## `src/context/AppContext.tsx`

```tsx
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { AccentKey, Alarm, Connection, Lang, Plan, ThemeMode, User } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useApplyTheme } from '../hooks/useTheme'
import { translations } from '../i18n/translations'
import { MOCK_CONNECTIONS, MOCK_SHARED_ALARMS } from '../data/mock'

const RANK: Record<Plan, number> = { basic: 0, pro: 1, ultimate: 2 }
const detect = (): Lang => { const l = navigator.language.slice(0, 2); return l === 'az' || l === 'ru' ? l : 'en' }

interface Ctx {
  lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string
  theme: ThemeMode; setTheme: (m: ThemeMode) => void
  user: User | null; login: (contact: string) => void; logout: () => void
  plan: Plan; setPlan: (p: Plan) => void
  alarms: Alarm[]; saveAlarm: (a: Alarm) => boolean; toggleAlarm: (id: string) => void; removeAlarm: (id: string) => void
  connections: Connection[]; addConnection: (name: string, color: AccentKey) => boolean
  updateConnection: (id: string, patch: Partial<Connection>) => void; removeConnection: (id: string) => void
  requirePlan: (min: Plan, reasonKey: string) => boolean
  upgrade: { reason: string; min: Plan } | null; closeUpgrade: () => void
  authOpen: boolean; setAuthOpen: (o: boolean) => void
}
const AppCtx = createContext<Ctx | null>(null)
export const useApp = () => { const c = useContext(AppCtx); if (!c) throw new Error('useApp outside provider'); return c }

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>('lang', detect())
  const [theme, setTheme] = useLocalStorage<ThemeMode>('theme', 'system')
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const [plan, setPlan] = useLocalStorage<Plan>('plan', 'basic')
  const [alarms, setAlarms] = useLocalStorage<Alarm[]>('alarms', [])
  const [connections, setConnections] = useLocalStorage<Connection[]>('connections', [])
  const [upgrade, setUpgrade] = useState<Ctx['upgrade']>(null)
  const [authOpen, setAuthOpen] = useState(false)
  useApplyTheme(theme)
  const t = useCallback((k: string) => translations[lang][k] ?? translations.en[k] ?? k, [lang])

  const requirePlan = (min: Plan, reason: string) => {
    if (RANK[plan] >= RANK[min]) return true
    setUpgrade({ reason, min }); return false
  }
  const login = (contact: string) => {
    setUser({ contact, inviteCode: 'TG-' + Math.random().toString(36).slice(2, 7).toUpperCase() })
    if (!connections.length) { setConnections(MOCK_CONNECTIONS); setAlarms(a => [...a, ...MOCK_SHARED_ALARMS]) }
  }
  const logout = () => { setUser(null); setConnections([]); setAlarms(a => a.filter(x => x.ownerId === 'me')) }

  const saveAlarm = (a: Alarm) => {
    const exists = alarms.some(x => x.id === a.id)
    const mineCount = alarms.filter(x => x.ownerId === 'me').length
    if (!exists && mineCount >= 3 && !requirePlan('pro', 'limitAlarms')) return false
    setAlarms(list => (exists ? list.map(x => (x.id === a.id ? a : x)) : [...list, a]))
    return true
  }
  const toggleAlarm = (id: string) => {
    const a = alarms.find(x => x.id === id); if (!a) return
    if (a.ownerId !== 'me') {
      const c = connections.find(x => x.id === a.ownerId)
      if (!c?.canControlTheirs || !requirePlan('pro', 'remote')) return
    }
    setAlarms(list => list.map(x => (x.id === id ? { ...x, enabled: !x.enabled } : x)))
  }
  const removeAlarm = (id: string) => setAlarms(l => l.filter(x => x.id !== id))

  const addConnection = (name: string, color: AccentKey) => {
    const limit = plan === 'basic' ? 1 : plan === 'pro' ? 5 : Infinity
    if (connections.length >= limit && !requirePlan(plan === 'basic' ? 'pro' : 'ultimate', 'limitPeople')) return false
    setConnections(c => [...c, { id: 'c' + Date.now(), name, color, canControlMine: false, canControlTheirs: false }]); return true
  }
  const updateConnection = (id: string, patch: Partial<Connection>) => {
    if ('canControlMine' in patch && !requirePlan('pro', 'remote')) return
    setConnections(c => c.map(x => (x.id === id ? { ...x, ...patch } : x)))
  }
  const removeConnection = (id: string) => { setConnections(c => c.filter(x => x.id !== id)); setAlarms(a => a.filter(x => x.ownerId !== id)) }

  return (
    <AppCtx.Provider value={{ lang, setLang, t, theme, setTheme, user, login, logout, plan, setPlan, alarms, saveAlarm, toggleAlarm, removeAlarm, connections, addConnection, updateConnection, removeConnection, requirePlan, upgrade, closeUpgrade: () => setUpgrade(null), authOpen, setAuthOpen }}>
      {children}
    </AppCtx.Provider>
  )
}
```

## `src/data/mock.ts`

```ts
import { AccentKey, Alarm, Connection } from '../types'
export const ACCENTS: Record<AccentKey | 'me', { card: string; dot: string; badge: string }> = {
  me: { card: 'border-brand/30 bg-white dark:bg-nightcard', dot: 'bg-brand', badge: 'bg-brand/10 text-brand' },
  pink: { card: 'border-pink-400/50 bg-pink-50 dark:bg-pink-500/10', dot: 'bg-pink-500', badge: 'bg-pink-500/15 text-pink-700 dark:text-pink-300' },
  blue: { card: 'border-sky-400/50 bg-sky-50 dark:bg-sky-500/10', dot: 'bg-sky-500', badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300' },
  emerald: { card: 'border-emerald-400/50 bg-emerald-50 dark:bg-emerald-500/10', dot: 'bg-emerald-500', badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  purple: { card: 'border-purple-400/50 bg-purple-50 dark:bg-purple-500/10', dot: 'bg-purple-500', badge: 'bg-purple-500/15 text-purple-700 dark:text-purple-300' },
  amber: { card: 'border-amber-400/50 bg-amber-50 dark:bg-amber-500/10', dot: 'bg-amber-500', badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
}
export const ACCENT_KEYS: AccentKey[] = ['pink', 'blue', 'emerald', 'purple', 'amber']
export const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]
export const MOCK_CONNECTIONS: Connection[] = [{ id: 'c1', name: 'Aysel', color: 'pink', canControlMine: false, canControlTheirs: true }]
export const MOCK_SHARED_ALARMS: Alarm[] = [
  { id: 'a-c1-1', time: '06:45', label: 'Gym', days: [1, 2, 3, 4, 5], enabled: true, ownerId: 'c1' },
  { id: 'a-c1-2', time: '09:00', label: 'Brunch', days: [0, 6], enabled: false, ownerId: 'c1' },
]
```

## `src/hooks/useLocalStorage.ts`

```ts
import { useEffect, useState } from 'react'
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : initial } catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ } }, [key, value])
  return [value, setValue] as const
}
```

## `src/hooks/useTheme.ts`

```ts
import { useEffect } from 'react'
import { ThemeMode } from '../types'
export function useApplyTheme(mode: ThemeMode) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.documentElement.classList.toggle('dark', mode === 'dark' || (mode === 'system' && mq.matches))
    apply(); mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [mode])
}
```

## `src/i18n/translations.ts`

```ts
import { Lang, Plan } from '../types'
type Dict = Record<string, string>
const en: Dict = {
  alarms: 'Alarms', people: 'People', plans: 'Plans', profile: 'Profile', newAlarm: 'New alarm', editAlarm: 'Edit alarm',
  label: 'Label', time: 'Time', repeat: 'Repeat', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
  confirmAlarm: 'Delete this alarm?', confirmConn: 'Remove this connection?', irreversible: 'This cannot be undone.',
  guestTitle: 'Sign in to share alarms', guestText: 'Alarms work without an account. Sign in to connect with a partner or family.',
  signIn: 'Sign in', signOut: 'Sign out', contactPh: 'Phone or email', sendCode: 'Send code', codePh: '6-digit code', verify: 'Verify', demoCode: 'Demo code: 123456', wrongCode: 'Wrong code. Try again.',
  mine: 'My alarms', shared: 'Shared with me', noAlarms: 'No alarms yet. Tap + to add one.', noPeople: 'Nobody connected yet.',
  connect: 'Connect', yourCode: 'Your invite code', copy: 'Copy', copied: 'Copied', enterCode: "Partner's invite code", partnerName: 'Name', color: 'Color', add: 'Add',
  allowControl: 'Can edit and dismiss my alarms', youCanControl: 'You can control their alarms', noControl: 'View only',
  theme: 'Theme', system: 'System', light: 'Light', dark: 'Dark', language: 'Language',
  upgrade: 'Upgrade', upgradeTitle: 'Unlock this feature', currentPlan: 'Current plan', perMonth: '/ month', maybeLater: 'Not now', choose: 'Choose',
  needPro: 'This needs Pro.', needUltimate: 'This needs Ultimate.',
  limitAlarms: 'Basic includes 3 alarms.', limitPeople: 'Your plan limit for connections is reached.', remote: 'Remote control of alarms', repeatDays: 'Custom repeat days',
  critical: 'Critical alert (bypasses Do Not Disturb)', awake: 'Ask "Are you awake?" after ringing', ad: 'Ad space · Upgrade to Pro to remove',
  everyDay: 'Every day', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Free', manat: '₼',
}
const az: Dict = {
  alarms: 'Zənglər', people: 'Yaxınlar', plans: 'Planlar', profile: 'Profil', newAlarm: 'Yeni zəng', editAlarm: 'Zəngi dəyiş',
  label: 'Ad', time: 'Vaxt', repeat: 'Təkrar', save: 'Yadda saxla', cancel: 'Ləğv et', delete: 'Sil', edit: 'Dəyiş',
  confirmAlarm: 'Bu zəng silinsin?', confirmConn: 'Bu əlaqə silinsin?', irreversible: 'Bu əməliyyatı geri qaytarmaq olmur.',
  guestTitle: 'Zəngləri paylaşmaq üçün daxil olun', guestText: 'Zənglər hesabsız da işləyir. Partnyor və ya ailə ilə əlaqə üçün daxil olun.',
  signIn: 'Daxil ol', signOut: 'Çıxış', contactPh: 'Telefon və ya e-poçt', sendCode: 'Kod göndər', codePh: '6 rəqəmli kod', verify: 'Təsdiqlə', demoCode: 'Demo kod: 123456', wrongCode: 'Kod yanlışdır. Yenidən yoxlayın.',
  mine: 'Mənim zənglərim', shared: 'Mənimlə paylaşılan', noAlarms: 'Hələ zəng yoxdur. Əlavə etmək üçün + basın.', noPeople: 'Hələ heç kim qoşulmayıb.',
  connect: 'Qoşul', yourCode: 'Dəvət kodunuz', copy: 'Kopyala', copied: 'Kopyalandı', enterCode: 'Partnyorun dəvət kodu', partnerName: 'Ad', color: 'Rəng', add: 'Əlavə et',
  allowControl: 'Zənglərimi dəyişə və söndürə bilər', youCanControl: 'Onun zənglərini idarə edə bilərsiniz', noControl: 'Yalnız baxış',
  theme: 'Tema', system: 'Sistem', light: 'Açıq', dark: 'Tünd', language: 'Dil',
  upgrade: 'Yüksəlt', upgradeTitle: 'Bu funksiyanı aç', currentPlan: 'Cari plan', perMonth: '/ ay', maybeLater: 'İndi yox', choose: 'Seç',
  needPro: 'Bunun üçün Pro lazımdır.', needUltimate: 'Bunun üçün Ultimate lazımdır.',
  limitAlarms: 'Basic planda 3 zəng var.', limitPeople: 'Planınızdakı əlaqə limiti dolub.', remote: 'Zənglərə uzaqdan nəzarət', repeatDays: 'Fərdi təkrar günləri',
  critical: 'Kritik xəbərdarlıq (Narahat etməyin rejimini keçir)', awake: 'Zəngdən sonra "Oyaqsan?" soruş', ad: 'Reklam yeri · Silmək üçün Pro-ya keçin',
  everyDay: 'Hər gün', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Pulsuz', manat: '₼',
}
const ru: Dict = {
  alarms: 'Будильники', people: 'Близкие', plans: 'Тарифы', profile: 'Профиль', newAlarm: 'Новый будильник', editAlarm: 'Изменить будильник',
  label: 'Название', time: 'Время', repeat: 'Повтор', save: 'Сохранить', cancel: 'Отмена', delete: 'Удалить', edit: 'Изменить',
  confirmAlarm: 'Удалить этот будильник?', confirmConn: 'Удалить это подключение?', irreversible: 'Это действие нельзя отменить.',
  guestTitle: 'Войдите, чтобы делиться будильниками', guestText: 'Будильники работают без аккаунта. Войдите, чтобы подключить партнёра или семью.',
  signIn: 'Войти', signOut: 'Выйти', contactPh: 'Телефон или e-mail', sendCode: 'Отправить код', codePh: '6-значный код', verify: 'Подтвердить', demoCode: 'Демо-код: 123456', wrongCode: 'Неверный код. Попробуйте ещё раз.',
  mine: 'Мои будильники', shared: 'Доступные мне', noAlarms: 'Будильников пока нет. Нажмите +, чтобы добавить.', noPeople: 'Пока никто не подключён.',
  connect: 'Подключить', yourCode: 'Ваш код приглашения', copy: 'Копировать', copied: 'Скопировано', enterCode: 'Код приглашения партнёра', partnerName: 'Имя', color: 'Цвет', add: 'Добавить',
  allowControl: 'Может менять и отключать мои будильники', youCanControl: 'Вы можете управлять его будильниками', noControl: 'Только просмотр',
  theme: 'Тема', system: 'Системная', light: 'Светлая', dark: 'Тёмная', language: 'Язык',
  upgrade: 'Улучшить', upgradeTitle: 'Откройте эту функцию', currentPlan: 'Текущий тариф', perMonth: '/ мес', maybeLater: 'Не сейчас', choose: 'Выбрать',
  needPro: 'Нужен тариф Pro.', needUltimate: 'Нужен тариф Ultimate.',
  limitAlarms: 'В Basic доступно 3 будильника.', limitPeople: 'Достигнут лимит подключений вашего тарифа.', remote: 'Удалённое управление будильниками', repeatDays: 'Свои дни повтора',
  critical: 'Критическое уведомление (обходит «Не беспокоить»)', awake: 'Спрашивать «Вы проснулись?» после звонка', ad: 'Место для рекламы · Уберите её с Pro',
  everyDay: 'Каждый день', basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate', free: 'Бесплатно', manat: '₼',
}
export const translations: Record<Lang, Dict> = { en, az, ru }
export const PLAN_FEATURES: Record<Lang, Record<Plan, string[]>> = {
  en: { basic: ['Up to 3 local alarms', '1 connected partner', 'Banner ads'], pro: ['Up to 5 family members', 'Remote toggle and edit permissions', 'No ads', 'Flexible repeat schedules'], ultimate: ['Everything in Pro', 'Critical alerts', '"Are you awake?" check', 'Unlimited group connections'] },
  az: { basic: ['3-ə qədər lokal zəng', '1 qoşulmuş partnyor', 'Banner reklamlar'], pro: ['5-ə qədər ailə üzvü', 'Uzaqdan söndürmə və dəyişmə icazələri', 'Reklamsız', 'Çevik təkrar cədvəlləri'], ultimate: ['Pro-dakı hər şey', 'Kritik xəbərdarlıqlar', '"Oyaqsan?" yoxlaması', 'Limitsiz qrup əlaqələri'] },
  ru: { basic: ['До 3 локальных будильников', '1 подключённый партнёр', 'Баннерная реклама'], pro: ['До 5 членов семьи', 'Удалённое включение и изменение', 'Без рекламы', 'Гибкие графики повтора'], ultimate: ['Всё из Pro', 'Критические уведомления', 'Проверка «Вы проснулись?»', 'Безлимитные группы'] },
}
```

## `src/index.css`

```css
@tailwind base; @tailwind components; @tailwind utilities;
body { @apply bg-dawn text-slate-800 dark:bg-night dark:text-slate-100 font-sans antialiased; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
```

## `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context/AppContext'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AppProvider><App /></AppProvider></React.StrictMode>)
```

## `src/pages/AlarmsPage.tsx`

```tsx
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
```

## `src/pages/PeoplePage.tsx`

```tsx
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
```

## `src/pages/PlansPage.tsx`

```tsx
import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PLAN_FEATURES } from '../i18n/translations'
import { Plan } from '../types'
const PRICE: Record<Plan, string> = { basic: '', pro: '2.99', ultimate: '7.99' }
export default function PlansPage() {
  const { plan, setPlan, t, lang } = useApp()
  return (
    <div className="space-y-4 px-5">
      {(['basic', 'pro', 'ultimate'] as Plan[]).map(p => (
        <div key={p} className={`rounded-3xl border-2 p-5 ${plan === p ? 'border-brand bg-brand/5' : 'border-transparent bg-white dark:bg-nightcard'}`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold">{t(p)}</h2>
            <p className="font-display text-lg font-bold">{PRICE[p] ? <>{PRICE[p]} {t('manat')} <span className="text-xs font-normal text-slate-500">{t('perMonth')}</span></> : t('free')}</p>
          </div>
          <ul className="my-3 space-y-1.5 text-sm">{PLAN_FEATURES[lang][p].map(f => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{f}</li>)}</ul>
          <button disabled={plan === p} onClick={() => setPlan(p)} className={`w-full rounded-xl py-2.5 text-sm font-semibold ${plan === p ? 'bg-slate-200 text-slate-500 dark:bg-white/10' : 'bg-brand text-white'}`}>{plan === p ? t('currentPlan') : t('choose')}</button>
        </div>
      ))}
    </div>
  )
}
```

## `src/pages/ProfilePage.tsx`

```tsx
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
```

## `src/services/auth.ts`

```ts
// Simulated OTP service. Replace bodies with real calls, e.g. POST /auth/otp/request and /auth/otp/verify.
export async function requestOtp(_contact: string): Promise<void> { await new Promise(r => setTimeout(r, 400)) }
export async function verifyOtp(_contact: string, code: string): Promise<boolean> { await new Promise(r => setTimeout(r, 400)); return code === '123456' }
```

## `src/types.ts`

```ts
export type Lang = 'az' | 'en' | 'ru'
export type ThemeMode = 'system' | 'light' | 'dark'
export type Plan = 'basic' | 'pro' | 'ultimate'
export type AccentKey = 'pink' | 'blue' | 'emerald' | 'purple' | 'amber'
export interface Alarm { id: string; time: string; label: string; days: number[]; enabled: boolean; ownerId: string; critical?: boolean; awakeCheck?: boolean }
export interface Connection { id: string; name: string; color: AccentKey; canControlMine: boolean; canControlTheirs: boolean }
export interface User { contact: string; inviteCode: string }
export type Tab = 'alarms' | 'people' | 'plans' | 'profile'
```

