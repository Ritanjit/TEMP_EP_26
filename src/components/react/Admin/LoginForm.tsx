/**
 * LoginForm.tsx - Admin Login/Register Form
 * 
 * React Island for handling admin authentication using FrontQL.
 * Includes temporary registration tab for creating admin users.
 * 
 * USAGE:
 * import LoginForm from '@components/react/Admin/LoginForm';
 * <LoginForm client:load />
 */

import { useState } from 'react';
import { login, register } from '../../../apis/auth';

type TabType = 'login' | 'register';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  
  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(username, password);

      if (result.success) {
        window.location.href = '/admin';
      } else {
        setError(result.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await register(regUsername, regPassword, regName);

      if (result.success) {
        setSuccess('Admin user created successfully! You can now login.');
        setRegUsername('');
        setRegPassword('');
        setRegName('');
        // Switch to login tab after successful registration
        setTimeout(() => setActiveTab('login'), 2000);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a] p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Euphuism 2026
          </h1>
          <p className="text-gray-400 mt-2">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'login'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'register'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register (Temp)
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-300 p-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Username / Email</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-white placeholder-gray-500 transition-all"
                  placeholder="admin@gcu.edu"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-white placeholder-gray-500 transition-all"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full p-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-3 rounded-lg text-xs mb-4">
                ⚠️ Temporary registration for creating admin users. Remove after setup.
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Username / Email</label>
                <input 
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-white placeholder-gray-500 transition-all"
                  placeholder="admin@gcu.edu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Display Name</label>
                <input 
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-white placeholder-gray-500 transition-all"
                  placeholder="Admin User"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
                <input 
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-white placeholder-gray-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full p-3.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  'Create Admin User'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 Euphuism - GCU Coding Club
        </p>
      </div>
    </div>
  );
}
