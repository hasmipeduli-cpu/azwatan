import React from 'react';
import { 
  LayoutDashboard, 
  Music, 
  PlusCircle, 
  Languages, 
  Layers, 
  Tag, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ 
  currentRoute, 
  onNavigate, 
  pageTitle, 
  children 
}) {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const navItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-songs', label: 'Daftar Nasyid', icon: Music },
    { id: 'admin-song-new', label: 'Tambah Nasyid', icon: PlusCircle },
    { id: 'admin-languages', label: 'Kelola Bahasa', icon: Languages },
    { id: 'admin-types', label: 'Kelola Jenis', icon: Layers },
    { id: 'admin-tags', label: 'Kelola Tag', icon: Tag },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="az-admin-layout">
      {/* Sidebar */}
      <aside className={`az-admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="az-admin-sidebar-brand">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'var(--gold-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--emerald-950)',
          }}>
            <Music size={18} />
          </div>
          <div>
            <span className="az-admin-sidebar-title">AZWATAN</span>
            <span className="az-admin-badge" style={{ marginLeft: '6px' }}>Admin</span>
          </div>
        </div>

        <nav className="az-admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === 'admin-songs' && currentRoute.startsWith('admin-song-edit'));
            return (
              <button
                key={item.id}
                type="button"
                className={`az-admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="az-admin-sidebar-footer">
          <button
            type="button"
            className="az-admin-nav-item"
            onClick={() => onNavigate('home')}
          >
            <ExternalLink size={17} />
            <span>Lihat Website Publik</span>
          </button>

          <button
            type="button"
            className="az-admin-nav-item"
            onClick={handleLogout}
            style={{ color: '#FCA5A5' }}
          >
            <LogOut size={17} />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="az-admin-content">
        <header className="az-admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="az-action-icon-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none' }} // can be toggled on mobile via CSS
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="az-admin-page-title">{pageTitle || 'Dashboard'}</h1>
          </div>

          <div className="az-admin-user-info">
            <ShieldCheck size={18} color="var(--emerald-700)" />
            <span>{currentUser?.name || 'Administrator'}</span>
          </div>
        </header>

        <main className="az-admin-main-body">
          {children}
        </main>
      </div>
    </div>
  );
}
