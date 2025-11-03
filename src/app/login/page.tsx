'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
      credentials: "include", // ✅ Important for sending/receiving cookies
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Invalid credentials'); // also check 'message' field from API
      setIsLoading(false);
      return;
    }

    // Redirect to protected admin dashboard
    router.push('/admin');
  } catch (err) {
    console.error('Login error:', err);
    setError('Something went wrong.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-gray-900">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#EA0028] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>

      {/* Login Card */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300 text-sm">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30">
              <span className="text-red-200 text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-white/10 border border-gray-400/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-white/10 border border-gray-400/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#EA0028] text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
