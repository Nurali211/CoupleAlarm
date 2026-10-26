export type Lang = 'az' | 'en' | 'ru'
export type ThemeMode = 'system' | 'light' | 'dark'
export type Plan = 'basic' | 'pro' | 'ultimate'
export type AccentKey = 'pink' | 'blue' | 'emerald' | 'purple' | 'amber'
export interface Alarm { id: string; time: string; label: string; days: number[]; enabled: boolean; ownerId: string; critical?: boolean; awakeCheck?: boolean }
export interface Connection { id: string; name: string; color: AccentKey; canControlMine: boolean; canControlTheirs: boolean }
export interface User { contact: string; inviteCode: string }
export type Tab = 'alarms' | 'people' | 'plans' | 'profile'
