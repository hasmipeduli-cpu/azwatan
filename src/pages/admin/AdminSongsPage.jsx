import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ExternalLink,
  RotateCcw 
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import { DatabaseService } from '../../services/database';

export default function AdminSongsPage({ onNavigate, showToast }) {
  const [songs, setSongs] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('Semua');
  const [typeFilter, setTypeFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadData = () => {
    setSongs(DatabaseService.getSongs());
    setLanguages(DatabaseService.getLanguages());
    setTypes(DatabaseService.getTypes());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = song.title?.toLowerCase().includes(q);
        const matchArtist = song.artist?.toLowerCase().includes(q);
        const matchTags = song.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchArtist && !matchTags) return false;
      }

      // Language
      if (languageFilter !== 'Semua' && song.language?.toLowerCase() !== languageFilter.toLowerCase()) {
        return false;
      }

      // Type
      if (typeFilter !== 'Semua' && song.type?.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }

      // Status
      if (statusFilter !== 'Semua' && song.status !== statusFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [songs, search, languageFilter, typeFilter, statusFilter]);

  const handleTogglePublish = (id) => {
    const updated = DatabaseService.togglePublish(id);
    if (updated) {
      loadData();
      showToast(
        updated.status === 'published' 
          ? 'Nasyid berhasil dipublikasikan.' 
          : 'Status diubah menjadi draft.'
      );
    }
  };

  const handleToggleFeatured = (id) => {
    const updated = DatabaseService.toggleFeatured(id);
    if (updated) {
      loadData();
      showToast(
        updated.featured 
          ? 'Lagu disematkan ke Pilihan Azwatan.' 
          : 'Lagu dilepas dari Pilihan Azwatan.'
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

  const handleResetFilters = () => {
    setSearch('');
    setLanguageFilter('Semua');
    setTypeFilter('Semua');
    setStatusFilter('Semua');
  };

  return (
    <AdminLayout
      currentRoute="admin-songs"
      onNavigate={onNavigate}
      pageTitle="Kelola Nasyid"
    >
      {/* Top Action Bar */}
      <div className="az-admin-action-bar">
        <div className="az-admin-filters-row">
          {/* Search Box */}
          <input
            type="text"
            className="az-admin-search-input"
            placeholder="Cari judul, artis, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Language Filter */}
          <select
            className="az-admin-select"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="Semua">Semua Bahasa</option>
            {languages
              .filter((l) => l.id !== 'all')
              .map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
          </select>

          {/* Type Filter */}
          <select
            className="az-admin-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="Semua">Semua Jenis</option>
            {types
              .filter((t) => t.id !== 'all')
              .map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
          </select>

          {/* Status Filter */}
          <select
            className="az-admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          {(search || languageFilter !== 'Semua' || typeFilter !== 'Semua' || statusFilter !== 'Semua') && (
            <button
              type="button"
              className="az-action-icon-btn"
              onClick={handleResetFilters}
              title="Reset Filter"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        {/* Add Song Button */}
        <button
          type="button"
          className="az-btn-primary"
          onClick={() => onNavigate('admin-song-new')}
        >
          <PlusCircle size={18} />
          <span>+ Tambah Nasyid</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="az-table-card">
        {filteredSongs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '8px' }}>
              Tidak ada nasyid yang sesuai dengan filter.
            </p>
            <button
              type="button"
              className="az-btn-secondary"
              onClick={handleResetFilters}
              style={{ marginTop: '8px' }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <table className="az-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Cover</th>
                <th>Judul & Penyanyi</th>
                <th>Bahasa</th>
                <th>Jenis</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Pilihan</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.map((song) => (
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
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '180px' }}>
                      {song.tags?.map((t, i) => (
                        <span key={i} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(song.id)}
                      className={`az-status-pill ${song.status}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      title="Klik untuk beralih Draft/Published"
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
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        song={deleteTarget}
        isOpen={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
}
