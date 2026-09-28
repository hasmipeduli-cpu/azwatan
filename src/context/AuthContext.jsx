import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  email: 'admin@azwatan.com',
  password: 'admin', // also supports 'azwatan123'
  name: 'Azwatan Administrator',
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('azwatan_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate network validation
    await new Promise((r) => setTimeout(r, 400));
    setIsLoading(false);

    const isValid =
      email.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      (password === 'azwatan123' || password === 'admin' || password === 'admin123');

    if (isValid) {
      const user = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: 'admin',
        token: `tok_${Date.now()}`,
      };
      setCurrentUser(user);
      localStorage.setItem('azwatan_auth_user', JSON.stringify(user));
      return { success: true };
    }

    return {
      success: false,
      error: 'Email atau kata sandi tidak sesuai. Silakan periksa kembali.',
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('azwatan_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
