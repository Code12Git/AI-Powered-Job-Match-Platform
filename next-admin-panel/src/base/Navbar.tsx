'use client';
import useAuth from '@/helpers/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [router, isAuthenticated, isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
      >
        Logout
      </button>
    </nav>
  );
}
