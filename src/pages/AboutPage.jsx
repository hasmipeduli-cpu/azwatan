import React from 'react';
import { Music2, Compass, ShieldCheck, Heart, Sparkles, Mail } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <main className="az-about-page" style={{ padding: '48px 0 80px' }}>
      <div className="az-container" style={{ maxWidth: '780px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="az-hero-badge">
            <Sparkles size={14} />
            <span>Tentang Platform</span>
          </div>
          <h1 className="az-hero-title" style={{ fontSize: '2.4rem' }}>
            Mendengar Nasyid Jadi<br />
            <span>Lebih Tenang & Mudah.</span>
          </h1>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-subtle)',
          lineHeight: '1.7',
          color: 'var(--text-body)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <section>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--emerald-900)', marginBottom: '8px', fontWeight: 700 }}>
              Apa itu Azwatan?
            </h2>
            <p>
              <strong>Azwatan</strong> adalah website kurasi audio nasyid digital yang dirancang khusus untuk mengumpulkan, menemukan, dan mendengarkan nasyid secara langsung melalui peramban web (browser).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--emerald-900)', marginBottom: '8px', fontWeight: 700 }}>
              Prinsip Kami: Music First
            </h2>
            <p>
              Kami meyakini bahwa keindahan nasyid dan sholawat harus mudah dinikmati oleh siapa saja tanpa hambatan. Di Azwatan:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Tanpa Login:</strong> Pengunjung dapat langsung memutar seluruh koleksi lagu yang dipublikasikan secara cuma-cuma.</li>
              <li><strong>Buka → Cari → Pilih → Dengarkan:</strong> Tanpa iklan yang mengganggu dan tanpa video yang memakan kuota berlebih.</li>
              <li><strong>Fokus Pada Audio:</strong> Mengutamakan kenyamanan telinga dan ketenangan jiwa dengan audio player persisten yang tetap aktif saat Anda menelusuri halaman.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--emerald-900)', marginBottom: '8px', fontWeight: 700 }}>
              Bahasa & Tema Nasyid
            </h2>
            <p>
              Azwatan menghadirkan lantunan nasyid dan sholawat dalam berbagai bahasa: Bahasa Indonesia, Arab, Melayu, dan Inggris, dengan beragam nuansa seperti renungan, cinta Rasul, nasihat, hingga dzikir.
            </p>
          </section>

          <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--emerald-900)', marginBottom: '8px', fontWeight: 700 }}>
              Kontak & Pengelola
            </h2>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--emerald-700)" />
              <span>Untuk pertanyaan, saran kurasi nasyid, atau kerjasama: <a href="mailto:salam@azwatan.com" style={{ color: 'var(--emerald-800)', fontWeight: 600 }}>salam@azwatan.com</a></span>
            </p>
          </section>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              className="az-btn-primary"
              onClick={() => onNavigate('home')}
            >
              Mulai Dengarkan Nasyid
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
