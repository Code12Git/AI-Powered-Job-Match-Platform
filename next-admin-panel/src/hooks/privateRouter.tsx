'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const publicRoutes = ['/login'];

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  useEffect(() => {
     if (publicRoutes.includes(pathname)) {
      setIsCheckingAuth(false);
      return;
    }

     if (!user || !token) {
      router.push('/login?redirect=' + encodeURIComponent(pathname));
      return;
    }

     const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() >= jwtPayload.exp * 1000) {
       router.push('/login?sessionExpired=true');
      return;
    }

    setIsCheckingAuth(false);
  }, [user, token, router, pathname]);

  if (isCheckingAuth) {
    return <p>Loading...</p>
  }

  return <>{children}</>;
}

