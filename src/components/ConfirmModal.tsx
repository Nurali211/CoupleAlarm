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
