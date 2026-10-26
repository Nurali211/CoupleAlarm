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
