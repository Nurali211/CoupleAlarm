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
