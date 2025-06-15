import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md w-full space-y-8 bg-[#1E1E1E] p-8 rounded-xl border border-[#333333]">
        <div>
          <div className="w-16 h-16 rounded-full bg-[#2EEE2E] flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">M</span>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to continue creating amazing animations
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#2EEE2E] focus:ring-1 focus:ring-[#2EEE2E]"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#2EEE2E] focus:ring-1 focus:ring-[#2EEE2E]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#2EEE2E] hover:bg-[#25C825] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2EEE2E]"
            >
              Sign in
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-[#2EEE2E] hover:text-[#25C825]">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 