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
