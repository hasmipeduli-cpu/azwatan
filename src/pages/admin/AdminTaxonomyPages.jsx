import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, ArrowLeft } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { DatabaseService } from '../../services/database';

export function AdminLanguagesPage({ onNavigate, showToast }) {
  const [languages, setLanguages] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setLanguages(DatabaseService.getLanguages());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const updated = [...languages, { id: slug, name: newName.trim(), active: true }];
    setLanguages(updated);
    DatabaseService.saveLanguages(updated);
    setNewName('');
    showToast('Bahasa baru berhasil ditambahkan.');
  };

  const handleDelete = (id) => {
    if (id === 'all') return;
    const updated = languages.filter((l) => l.id !== id);
    setLanguages(updated);
    DatabaseService.saveLanguages(updated);
    showToast('Bahasa berhasil dihapus.');
  };

  return (
    <AdminLayout currentRoute="admin-languages" onNavigate={onNavigate} pageTitle="Kelola Bahasa (PRD #38)">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="az-form-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-900)', marginBottom: '14px' }}>
            Tambah Bahasa Baru
          </h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="az-form-input"
              placeholder="Contoh: Turki, Urdu, dsb..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <button type="submit" className="az-btn-primary" style={{ whiteSpace: 'nowrap' }}>
              <Plus size={16} />
              <span>Tambah</span>
            </button>
          </form>
        </div>

        <div className="az-table-card">
          <table className="az-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Bahasa</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((l) => (
                <tr key={l.id}>
                  <td><code>{l.id}</code></td>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td style={{ textAlign: 'right' }}>
                    {l.id !== 'all' && (
                      <button
                        type="button"
                        className="az-action-icon-btn delete"
                        onClick={() => handleDelete(l.id)}
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export function AdminTypesPage({ onNavigate, showToast }) {
  const [types, setTypes] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setTypes(DatabaseService.getTypes());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const updated = [...types, { id: slug, name: newName.trim(), active: true }];
    setTypes(updated);
    DatabaseService.saveTypes(updated);
    setNewName('');
    showToast('Jenis nasyid baru berhasil ditambahkan.');
  };

  const handleDelete = (id) => {
    if (id === 'all') return;
    const updated = types.filter((t) => t.id !== id);
    setTypes(updated);
    DatabaseService.saveTypes(updated);
    showToast('Jenis berhasil dihapus.');
  };

  return (
    <AdminLayout currentRoute="admin-types" onNavigate={onNavigate} pageTitle="Kelola Jenis Nasyid (PRD #39)">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="az-form-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-900)', marginBottom: '14px' }}>
            Tambah Jenis Nasyid
          </h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="az-form-input"
              placeholder="Contoh: Qasidah, Gambus, dsb..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <button type="submit" className="az-btn-primary" style={{ whiteSpace: 'nowrap' }}>
              <Plus size={16} />
              <span>Tambah</span>
            </button>
          </form>
        </div>

        <div className="az-table-card">
          <table className="az-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Jenis</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t) => (
                <tr key={t.id}>
                  <td><code>{t.id}</code></td>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td style={{ textAlign: 'right' }}>
                    {t.id !== 'all' && (
                      <button
                        type="button"
                        className="az-action-icon-btn delete"
                        onClick={() => handleDelete(t.id)}
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export function AdminTagsPage({ onNavigate, showToast }) {
  const [tags, setTags] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setTags(DatabaseService.getTags());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const updated = [...tags, trimmed];
    setTags(updated);
    DatabaseService.saveTags(updated);
    setNewName('');
    showToast('Tag berhasil ditambahkan.');
  };

  const handleDelete = (tagToRemove) => {
    const updated = tags.filter((t) => t !== tagToRemove);
    setTags(updated);
    DatabaseService.saveTags(updated);
    showToast('Tag berhasil dihapus.');
  };

  return (
    <AdminLayout currentRoute="admin-tags" onNavigate={onNavigate} pageTitle="Kelola Tema / Tags (PRD #40)">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="az-form-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-900)', marginBottom: '14px' }}>
            Tambah Tag Baru
          </h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="az-form-input"
              placeholder="Contoh: Maulid, Doa, Tazkiyatun Nafs..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <button type="submit" className="az-btn-primary" style={{ whiteSpace: 'nowrap' }}>
              <Plus size={16} />
              <span>Tambah</span>
            </button>
          </form>
        </div>

        <div className="az-table-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--emerald-900)', marginBottom: '16px' }}>
            Daftar Tag Aktif ({tags.length})
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-body)',
                  border: '1px solid var(--border-light)',
                }}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleDelete(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                  }}
                  title="Hapus tag"
                >
                  <Trash2 size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
