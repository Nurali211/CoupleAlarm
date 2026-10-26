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
