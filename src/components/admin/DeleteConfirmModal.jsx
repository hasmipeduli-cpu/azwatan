import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ song, isOpen, onCancel, onConfirm }) {
  if (!isOpen || !song) return null;

  return (
    <div className="az-modal-overlay" role="dialog" aria-modal="true">
      <div className="az-modal-box">
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-danger-bg)',
          color: 'var(--color-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <AlertTriangle size={24} />
        </div>

        <h3 className="az-modal-title">Hapus nasyid ini?</h3>

        <p className="az-modal-desc">
          Apakah Anda yakin ingin menghapus lagu <strong>"{song.title}"</strong> oleh <strong>{song.artist}</strong>? Tindakan ini akan menghapus metadata dan file audio/cover terkait dari penyimpanan.
        </p>

        <div className="az-modal-actions">
          <button
            type="button"
            className="az-btn-secondary"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="az-btn-primary"
            style={{ backgroundColor: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
            onClick={onConfirm}
          >
            Hapus Nasyid
          </button>
        </div>
      </div>
    </div>
  );
}
