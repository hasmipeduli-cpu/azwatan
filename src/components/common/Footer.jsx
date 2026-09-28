import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="az-footer">
      <div className="az-container az-footer-inner">
        <p className="az-footer-text">
          <strong>Azwatan</strong> — Platform streaming audio nasyid digital yang tenang, bersih, dan menentramkan jiwa.
        </p>

        <div className="az-footer-links">
          <button 
            type="button" 
            className="az-footer-link" 
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Beranda
          </button>
          <span>•</span>
          <button 
            type="button" 
            className="az-footer-link" 
            onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Tentang Azwatan
          </button>
          <span>•</span>
          <button 
            type="button" 
            className="az-footer-link" 
            onClick={() => onNavigate('admin-login')}
          >
            Admin Dashboard
          </button>
        </div>

        <p className="az-footer-text" style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '8px' }}>
          Music First. Dibuat dengan niat baik & kesederhanaan untuk penikmat nasyid nusantara dan dunia.
        </p>
      </div>
    </footer>
  );
}
