import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="az-toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`az-toast ${toast.type || 'success'}`}>
          {toast.type === 'error' ? (
            <AlertCircle size={18} color="var(--color-danger)" />
          ) : (
            <CheckCircle2 size={18} color="var(--color-success)" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => onClose(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
