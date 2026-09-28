import React, { useState, useEffect } from 'react';
import { 
  Music, 
  CheckCircle2, 
  FileEdit, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import { DatabaseService } from '../../services/database';

export default function AdminDashboardPage({ onNavigate, showToast }) {
  const [songs, setSongs] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadData = () => {
    setSongs(DatabaseService.getSongs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalSongs = songs.length;
  const publishedSongs = songs.filter((s) => s.status === 'published').length;
  const draftSongs = songs.filter((s) => s.status === 'draft').length;
  const featuredSongs = songs.filter((s) => s.featured).length;

  const handleTogglePublish = (id) => {
    const updated = DatabaseService.togglePublish(id);
    if (updated) {
      loadData();
      showToast(
        updated.status === 'published' 
          ? 'Nasyid berhasil dipublikasikan.' 
          : 'Nasyid dialihkan ke draf.'
      );
    }
  };

  const handleToggleFeatured = (id) => {
    const updated = DatabaseService.toggleFeatured(id);
    if (updated) {
      loadData();
      showToast(
        updated.featured 
          ? 'Lagu dijadikan Pilihan Azwatan.' 
          : 'Lagu dihapus dari Pilihan.'
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      DatabaseService.deleteSong(deleteTarget.id);
      showToast('Nasyid berhasil dihapus.');
      setDeleteTarget(null);
      loadData();
    }
  };

  return (
    <AdminLayout 
      currentRoute="admin-dashboard" 
      onNavigate={onNavigate}
      pageTitle="Ikhtisar Dashboard"
    >
      {/* 4 Stats Cards (PRD #26) */}
      <div className="az-stats-grid">
        <div className="az-stat-card">
          <div className="az-stat-info">
            <span className="az-stat-label">Total Lagu</span>
            <span className="az-stat-value">{totalSongs}</span>
          </div>
          <div className="az-stat-icon-wrap">
            <Music size={24} />
          </div>
        </div>

        <div className="az-stat-card">
          <div className="az-stat-info">
            <span className="az-stat-label">Published</span>
            <span className="az-stat-value" style={{ color: 'var(--color-success)' }}>
              {publishedSongs}
            </span>
          </div>
          <div className="az-stat-icon-wrap" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="az-stat-card">
          <div className="az-stat-info">
            <span className="az-stat-label">Draft</span>
            <span className="az-stat-value" style={{ color: 'var(--color-warning)' }}>
              {draftSongs}
            </span>
          </div>
          <div className="az-stat-icon-wrap" style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
            <FileEdit size={24} />
          </div>
        </div>

        <div className="az-stat-card">
          <div className="az-stat-info">
            <span className="az-stat-label">Featured</span>
            <span className="az-stat-value" style={{ color: 'var(--gold-600)' }}>
              {featuredSongs}
            </span>
          </div>
          <div className="az-stat-icon-wrap" style={{ backgroundColor: 'var(--gold-50)', color: 'var(--gold-600)' }}>
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="az-admin-action-bar">
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--emerald-900)' }}>
            Koleksi Nasyid Terbaru
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ringkasan lagu yang baru ditambahkan atau diperbarui.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="az-btn-secondary"
            onClick={() => onNavigate('admin-songs')}
          >
            <span>Semua Lagu</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="az-btn-primary"
            onClick={() => onNavigate('admin-song-new')}
          >
            <PlusCircle size={18} />
            <span>+ Tambah Nasyid</span>
          </button>
        </div>
      </div>

      {/* Recent Songs Table */}
      <div className="az-table-card">
        <table className="az-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Cover</th>
              <th>Judul & Penyanyi</th>
              <th>Bahasa</th>
              <th>Jenis</th>
              <th>Status</th>
              <th>Pilihan</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {songs.slice(0, 6).map((song) => (
              <tr key={song.id}>
                <td>
                  <img
                    src={song.coverUrl || '/covers/cover-arab.jpg'}
                    alt={song.title}
                    className="az-table-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/covers/cover-arab.jpg';
                    }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{song.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{song.artist}</div>
                </td>
                <td>
                  <span className="az-tag-pill lang">{song.language}</span>
                </td>
                <td>
                  <span className="az-tag-pill">{song.type}</span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(song.id)}
                    className={`az-status-pill ${song.status}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                    title="Klik untuk beralih status"
                  >
                    {song.status === 'published' ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(song.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: song.featured ? 'var(--gold-500)' : 'var(--text-light)',
                    }}
                    title={song.featured ? 'Hapus dari Pilihan' : 'Jadikan Pilihan'}
                  >
                    <Sparkles size={18} fill={song.featured ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className="az-table-actions" style={{ justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="az-action-icon-btn"
                      onClick={() => onNavigate(`admin-song-edit:${song.id}`)}
                      title="Edit Nasyid"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      className="az-action-icon-btn delete"
                      onClick={() => setDeleteTarget(song)}
                      title="Hapus Nasyid"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal (PRD #34) */}
      <DeleteConfirmModal
        song={deleteTarget}
        isOpen={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
}
