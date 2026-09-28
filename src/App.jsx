import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import PersistentBottomPlayer from './components/player/PersistentBottomPlayer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminSongsPage from './pages/admin/AdminSongsPage';
import AdminSongEditPage from './pages/admin/AdminSongEditPage';
import { 
  AdminLanguagesPage, 
  AdminTypesPage, 
  AdminTagsPage 
} from './pages/admin/AdminTaxonomyPages';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';

function MainApp() {
  const { isAuthenticated } = useAuth();
  
  // URL to Route mapper
  const getRouteFromPath = () => {
    const path = window.location.pathname;
    if (path === '/about') return 'about';
    if (path === '/admin/login') return 'admin-login';
    if (path === '/admin' || path === '/admin/') return 'admin-dashboard';
    if (path === '/admin/songs') return 'admin-songs';
    if (path === '/admin/songs/new') return 'admin-song-new';
    if (path.startsWith('/admin/songs/') && path.endsWith('/edit')) {
      const parts = path.split('/');
      const id = parts[3];
      return `admin-song-edit:${id}`;
    }
    if (path === '/admin/languages') return 'admin-languages';
    if (path === '/admin/types') return 'admin-types';
    if (path === '/admin/tags') return 'admin-tags';
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper (PRD #66)
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync route with browser URL history
  const navigateTo = (route, replace = false) => {
    setCurrentRoute(route);
    let path = '/';
    if (route === 'about') path = '/about';
    else if (route === 'admin-login') path = '/admin/login';
    else if (route === 'admin-dashboard') path = '/admin';
    else if (route === 'admin-songs') path = '/admin/songs';
    else if (route === 'admin-song-new') path = '/admin/songs/new';
    else if (route.startsWith('admin-song-edit:')) {
      const id = route.split(':')[1];
      path = `/admin/songs/${id}/edit`;
    } else if (route === 'admin-languages') path = '/admin/languages';
    else if (route === 'admin-types') path = '/admin/types';
    else if (route === 'admin-tags') path = '/admin/tags';

    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Protected route guard (PRD #25)
  useEffect(() => {
    if (currentRoute.startsWith('admin') && currentRoute !== 'admin-login' && !isAuthenticated) {
      navigateTo('admin-login', true);
    }
  }, [currentRoute, isAuthenticated]);

  // Determine which page component to render
  const renderCurrentPage = () => {
    if (currentRoute === 'home') {
      return <HomePage onNavigate={navigateTo} />;
    }
    if (currentRoute === 'about') {
      return <AboutPage onNavigate={navigateTo} />;
    }
    if (currentRoute === 'admin-login') {
      return <AdminLoginPage onNavigate={navigateTo} />;
    }

    // Protected Admin Routes
    if (currentRoute === 'admin-dashboard') {
      return <AdminDashboardPage onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute === 'admin-songs') {
      return <AdminSongsPage onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute === 'admin-song-new') {
      return <AdminSongEditPage onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute.startsWith('admin-song-edit:')) {
      const songId = currentRoute.split(':')[1];
      return <AdminSongEditPage songId={songId} onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute === 'admin-languages') {
      return <AdminLanguagesPage onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute === 'admin-types') {
      return <AdminTypesPage onNavigate={navigateTo} showToast={showToast} />;
    }
    if (currentRoute === 'admin-tags') {
      return <AdminTagsPage onNavigate={navigateTo} showToast={showToast} />;
    }

    return <HomePage onNavigate={navigateTo} />;
  };

  const isAdminView = currentRoute.startsWith('admin') && currentRoute !== 'admin-login';

  return (
    <div className="az-app">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Header (hidden in admin layout since admin has its own dedicated sidebar & topbar) */}
      {!isAdminView && currentRoute !== 'admin-login' && (
        <Header currentRoute={currentRoute} onNavigate={navigateTo} />
      )}

      {/* Main Page Content */}
      {renderCurrentPage()}

      {/* Persistent Bottom Audio Player (Always mounted per PRD #15 & #16) */}
      <PersistentBottomPlayer />

      {/* Footer (hidden in admin views) */}
      {!isAdminView && currentRoute !== 'admin-login' && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <MainApp />
      </AudioProvider>
    </AuthProvider>
  );
}
