'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')
    if (!token&& !user) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
