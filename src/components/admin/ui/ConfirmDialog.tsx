import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning'
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dash-overlay"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="dash-glass w-full max-w-sm p-6"
              style={{ boxShadow: 'var(--dash-shadow)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: variant === 'danger' ? 'var(--dash-danger-soft)' : 'var(--dash-warning-soft)',
                    color: variant === 'danger' ? 'var(--dash-danger)' : 'var(--dash-warning)'
                  }}
                >
                  <AlertTriangle size={20} />
                </div>
                <button
                  onClick={onCancel}
                  className="dash-btn dash-btn-ghost dash-btn-icon"
                >
                  <X size={16} />
                </button>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--dash-text)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm mb-6 leading-relaxed"
                style={{ color: 'var(--dash-text-muted)' }}
              >
                {message}
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="dash-btn dash-btn-secondary dash-btn-sm"
                  disabled={loading}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className="dash-btn dash-btn-danger dash-btn-sm"
                  disabled={loading}
                >
                  {loading ? 'A processar...' : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
