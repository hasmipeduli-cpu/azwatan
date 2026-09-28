import React from 'react';
import { Compass, Music, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ currentRoute, onNavigate }) {
  const { isAuthenticated } = useAuth();

  return (
    <header className="az-header">
      <div className="az-container az-header-inner">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="az-brand" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          aria-label="Azwatan Beranda"
        >
          <div className="az-brand-icon">
            <Music size={20} strokeWidth={2.5} />
          </div>
          <div className="az-brand-text">
            <span>AZWATAN</span>
            <span className="az-brand-tagline">Nasyid Library</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="az-nav" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`az-nav-link ${currentRoute === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`az-nav-link ${currentRoute === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            Tentang
          </button>

          <button
            type="button"
            className={`az-admin-btn ${currentRoute.startsWith('admin') ? 'active' : ''}`}
            onClick={() => onNavigate(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
            title="Akses Admin Dashboard"
          >
            <Shield size={14} />
            <span>{isAuthenticated ? 'Admin Panel' : 'Kelola'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
