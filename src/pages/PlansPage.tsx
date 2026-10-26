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
