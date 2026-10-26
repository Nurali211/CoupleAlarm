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
