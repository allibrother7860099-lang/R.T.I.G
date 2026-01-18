
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';
import { Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-700">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-500">Enter password to manage portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-4 rounded-xl font-bold hover:bg-indigo-800 shadow-xl transition-all active:scale-95"
          >
            Access Dashboard
          </button>
        </form>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>This area is restricted for institute administrators only.</p>
        <p className="mt-2">Password: Sahil</p>
      </div>
    </div>
  );
};

export default AdminLogin;
