import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Music, 
  Image as ImageIcon, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { DatabaseService } from '../../services/database';
import { uploadFile, extractAudioDuration } from '../../services/storage';

export default function AdminSongEditPage({ songId, onNavigate, showToast }) {
  const isEditing = Boolean(songId);

  // Form Fields per PRD #56
  const [coverUrl, setCoverUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [language, setLanguage] = useState('Indonesia');
  const [type, setType] = useState('Nasyid');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState('published');
  const [duration, setDuration] = useState(0);

  // Upload States
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverProgress, setCoverProgress] = useState(0);
  const [audioUploading, setAudioUploading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioFileName, setAudioFileName] = useState('');

  // Dropdown options
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  // Refs
  const coverInputRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    setLanguages(DatabaseService.getLanguages().filter((l) => l.id !== 'all'));
    setTypes(DatabaseService.getTypes().filter((t) => t.id !== 'all'));
    setAvailableTags(DatabaseService.getTags());

    if (isEditing) {
      const song = DatabaseService.getSongById(songId);
      if (song) {
        setTitle(song.title || '');
        setArtist(song.artist || '');
        setLanguage(song.language || 'Indonesia');
        setType(song.type || 'Nasyid');
        setTags(song.tags || []);
        setDescription(song.description || '');
        setFeatured(Boolean(song.featured));
        setStatus(song.status || 'published');
        setCoverUrl(song.coverUrl || '');
        setAudioUrl(song.audioUrl || '');
        setDuration(song.duration || 0);
      }
    }
  }, [songId, isEditing]);

  // Handle Cover Upload (PRD #31)
  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih file gambar (JPG, PNG, atau WebP).', 'error');
      return;
    }

    setCoverUploading(true);
    setCoverProgress(10);
    try {
      const uploaded = await uploadFile(file, 'covers', songId || 'new', (p) => {
        setCoverProgress(p);
      });
      setCoverUrl(uploaded.url);
      showToast('Cover berhasil diunggah.');
    } catch (err) {
      console.error(err);
      showToast('Gagal mengunggah cover.', 'error');
    } finally {
      setCoverUploading(false);
    }
  };

  // Handle Audio Upload (PRD #29, #30, #32, #57)
  const handleAudioFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension & mime type
    const isValidAudio = file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.wav');
    if (!isValidAudio) {
      showToast('Format audio harus berupa .mp3 atau .wav.', 'error');
      return;
    }

    setAudioUploading(true);
    setAudioProgress(10);
    setAudioFileName(file.name);

    try {
      // 1. Automatically detect duration (PRD #56 & #57)
      const detectedDuration = await extractAudioDuration(file);
      if (detectedDuration > 0) {
        setDuration(detectedDuration);
      }

      // 2. Upload with progress bar (PRD #32)
      const uploaded = await uploadFile(file, 'audio', songId || 'new', (p) => {
        setAudioProgress(p);
      });

      setAudioUrl(uploaded.url);
      showToast('Audio berhasil diunggah.');
    } catch (err) {
      console.error(err);
      showToast('Upload audio gagal. Silakan coba lagi.', 'error');
    } finally {
      setAudioUploading(false);
    }
  };

  // Tag Management
  const handleAddTag = (tagToAdd) => {
    const trimmed = (tagToAdd || tagInput).trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Save / Publish
  const handleSave = (finalStatus) => {
    if (!title.trim() || !artist.trim()) {
      showToast('Judul dan Penyanyi wajib diisi.', 'error');
      return;
    }

    // Default cover / audio fallback if not selected
    const finalCover = coverUrl || '/covers/cover-arab.jpg';
    const finalAudio = audioUrl || '/audio/qamarun.wav';

    const songData = {
      ...(isEditing ? { id: songId } : {}),
      title: title.trim(),
      artist: artist.trim(),
      language,
      type,
      tags,
      description: description.trim(),
      featured,
      status: finalStatus || status,
      coverUrl: finalCover,
      audioUrl: finalAudio,
      duration: duration || 45,
    };

    DatabaseService.saveSong(songData);
    showToast(
      finalStatus === 'published' 
        ? 'Nasyid berhasil dipublikasikan!' 
        : 'Nasyid berhasil disimpan sebagai draf.'
    );
    onNavigate('admin-songs');
  };

  return (
    <AdminLayout
      currentRoute={isEditing ? 'admin-songs' : 'admin-song-new'}
      onNavigate={onNavigate}
      pageTitle={isEditing ? 'Edit Nasyid' : 'Tambah Nasyid Baru'}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate('admin-songs')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Nasyid</span>
        </button>

        <div className="az-form-card">
          {/* 1. Upload Cover (PRD #31 & #56) */}
          <div className="az-form-group">
            <label className="az-form-label">
              1. Cover Album / Nasyid <span className="required">*</span>
            </label>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-subtle)',
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Preview Cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ImageIcon size={36} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ flex: 1, minWidth: '240px' }}>
                <input
                  type="file"
                  ref={coverInputRef}
                  onChange={handleCoverFile}
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="az-btn-secondary"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                >
                  <Upload size={16} />
                  <span>{coverUrl ? 'Ganti Cover' : 'Upload Cover (JPG/PNG/WebP)'}</span>
                </button>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Disarankan rasio 1:1 (persegi).
                </p>

                {coverUploading && (
                  <div className="az-upload-progress-wrap">
                    <div className="az-upload-progress-bar">
                      <div className="az-upload-progress-fill" style={{ width: `${coverProgress}%` }} />
                    </div>
                    <div className="az-upload-progress-text">
                      <span>Mengunggah cover...</span>
                      <span>{coverProgress}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Upload Audio (PRD #29, #30, #32, #56, #57) */}
          <div className="az-form-group">
            <label className="az-form-label">
              2. File Audio (.mp3 / .wav) <span className="required">*</span>
            </label>
            <div className="az-upload-zone" onClick={() => audioInputRef.current?.click()}>
              <input
                type="file"
                ref={audioInputRef}
                onChange={handleAudioFile}
                accept="audio/mp3,audio/wav,audio/mpeg"
                style={{ display: 'none' }}
              />
              <div className="az-upload-icon">
                <Music size={22} />
              </div>
              <p style={{ fontWeight: 600, color: 'var(--emerald-900)', marginBottom: '4px' }}>
                {audioUrl ? 'Audio terpasang: ' + (audioFileName || 'audio file') : 'Klik untuk Pilih atau Unggah File Audio'}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Mendukung format MP3 atau WAV dengan pemindaian durasi otomatis.
              </p>

              {audioUrl && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--color-success)', fontSize: '0.82rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Audio siap diputar ({Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')})</span>
                </div>
              )}

              {audioUploading && (
                <div className="az-upload-progress-wrap" onClick={(e) => e.stopPropagation()}>
                  <div className="az-upload-progress-bar">
                    <div className="az-upload-progress-fill" style={{ width: `${audioProgress}%` }} />
                  </div>
                  <div className="az-upload-progress-text">
                    <span>Mengunggah audio ke penyimpanan...</span>
                    <span>{audioProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Judul & 4. Penyanyi */}
          <div className="az-form-row">
            <div className="az-form-group">
              <label className="az-form-label" htmlFor="song-title">
                3. Judul Nasyid <span className="required">*</span>
              </label>
              <input
                id="song-title"
                type="text"
                className="az-form-input"
                placeholder="Contoh: Ya Nabi Salam Alaika"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="az-form-group">
              <label className="az-form-label" htmlFor="song-artist">
                4. Nama Penyanyi / Grup <span className="required">*</span>
              </label>
              <input
                id="song-artist"
                type="text"
                className="az-form-input"
                placeholder="Contoh: Maher Zain"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 5. Bahasa & 6. Jenis */}
          <div className="az-form-row">
            <div className="az-form-group">
              <label className="az-form-label" htmlFor="song-language">
                5. Bahasa
              </label>
              <select
                id="song-language"
                className="az-form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((l) => (
                  <option key={l.id} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="az-form-group">
              <label className="az-form-label" htmlFor="song-type">
                6. Jenis Nasyid
              </label>
              <select
                id="song-type"
                className="az-form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {types.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 7. Tags (PRD #12 & #56) */}
          <div className="az-form-group">
            <label className="az-form-label">
              7. Tema / Tags
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                className="az-form-input"
                placeholder="Ketik tag lalu tekan Enter atau Tambah..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                className="az-btn-secondary"
                onClick={() => handleAddTag()}
              >
                Tambah
              </button>
            </div>

            {/* Selected Tags Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'var(--emerald-100)',
                    color: 'var(--emerald-900)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            {/* Suggested Tag Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saran tag:</span>
              {availableTags.slice(0, 6).map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAddTag(suggested)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#ffffff',
                    color: 'var(--text-body)',
                    cursor: 'pointer',
                  }}
                >
                  +{suggested}
                </button>
              ))}
            </div>
          </div>

          {/* 8. Deskripsi */}
          <div className="az-form-group">
            <label className="az-form-label" htmlFor="song-desc">
              8. Deskripsi Singkat
            </label>
            <textarea
              id="song-desc"
              rows={3}
              className="az-form-textarea"
              placeholder="Deskripsi makna atau latar belakang nasyid..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 9. Featured Toggle (PRD #13 & #56) */}
          <div className="az-form-group">
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              color: 'var(--emerald-900)',
            }}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--emerald-800)' }}
              />
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="var(--gold-500)" />
                9. Sematkan sebagai Pilihan Azwatan (Featured Song)
              </span>
            </label>
          </div>

          {/* 10. Status Radio (PRD #35 & #56) */}
          <div className="az-form-group">
            <label className="az-form-label">
              10. Status Publikasi
            </label>
            <div style={{ display: 'flex', gap: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                  style={{ accentColor: 'var(--emerald-800)' }}
                />
                <span>Draft (Hanya terlihat oleh Admin)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={() => setStatus('published')}
                  style={{ accentColor: 'var(--emerald-800)' }}
                />
                <span style={{ fontWeight: 600, color: 'var(--emerald-800)' }}>
                  Published (Tersedia untuk Pengunjung)
                </span>
              </label>
            </div>
          </div>

          {/* 11. Buttons (PRD #28 & #56) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
            <button
              type="button"
              className="az-btn-secondary"
              onClick={() => handleSave('draft')}
            >
              Simpan Draft
            </button>
            <button
              type="button"
              className="az-btn-primary"
              onClick={() => handleSave('published')}
            >
              Publish Nasyid
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
