import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage({ onNavigate }) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      onNavigate('admin-dashboard');
    } else {
      setErrorMessage(res.error || 'Autentikasi gagal.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@azwatan.com');
    setPassword('azwatan123');
    setErrorMessage('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#F5F4EE',
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '36px 32px',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--emerald-800)',
            color: 'var(--gold-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 4px 12px rgba(15, 76, 58, 0.25)',
          }}>
            <Shield size={26} />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-900)' }}>
            Admin Portal Azwatan
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Masuk untuk mengelola nasyid, audio, dan metadata.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: '18px',
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="az-form-group">
            <label className="az-form-label" htmlFor="admin-email">
              Email Administrator
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-email"
                type="email"
                className="az-form-input"
                placeholder="admin@azwatan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="az-form-group">
            <label className="az-form-label" htmlFor="admin-password">
              Kata Sandi
            </label>
            <input
              id="admin-password"
              type="password"
              className="az-form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="az-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </button>
        </form>

        {/* Demo Credentials Quick Fill */}
        <div style={{
          marginTop: '24px',
          padding: '14px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-medium)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginBottom: '8px' }}>
            <strong>Demo Akun Admin:</strong><br />
            <code>admin@azwatan.com</code> / <code>azwatan123</code>
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="az-btn-secondary"
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            <KeyRound size={13} />
            <span>Isi Otomatis Kredensial Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
