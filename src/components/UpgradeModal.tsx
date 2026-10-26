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
