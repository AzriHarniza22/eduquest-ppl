'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage or sessionStorage based on remember me
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }

        // Store user data
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on role
        if (data.user?.isAdmin) {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setErrors({ general: data.message || 'Login gagal' });
      }
    } catch (error) {
      setErrors({ general: 'Terjadi kesalahan jaringan. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth integration
    window.location.href = '/api/auth/google';
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth integration
    window.location.href = '/api/auth/facebook';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Circles */}
      <div 
        className="absolute left-[-10%] top-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(33,150,243,0.2) 0%, rgba(33,150,243,0.1) 50%, rgba(33,150,243,0.05) 100%)',
          filter: 'blur(40px)'
        }}
      ></div>
      <div 
        className="absolute right-[-10%] bottom-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(33,150,243,0.2) 0%, rgba(33,150,243,0.1) 50%, rgba(33,150,243,0.05) 100%)',
          filter: 'blur(40px)'
        }}
      ></div>
      
      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Masuk ke Akun</h1>
          <p className="text-gray-600">
            Selamat datang kembali di EduQuest
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan email"
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-[#2196F3] hover:text-[#1976D2] transition-colors"
              >
                Lupa Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 pr-10 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#2196F3] focus:ring-[#2196F3] border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2196F3] text-white py-2 px-4 rounded-lg hover:bg-[#1976D2] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Masuk...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Masuk dengan Google
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Masuk dengan Facebook
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="text-[#2196F3] hover:text-[#1976D2] font-medium transition-colors">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}