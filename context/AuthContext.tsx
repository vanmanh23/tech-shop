'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  requireAuth: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAdmin: false,
  requireAuth: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isAdmin = user?.role === 0;

  const requireAuth = () => {
    if (!user) {
      toast.error(
        <div>
          Please sign in to continue. 
          <button 
            className="ml-2 underline text-blue-500"
            onClick={() => router.push('/signin')}
          >
            Sign In
          </button>
          <div className="mt-1 text-sm">
            Don't have an account?{' '}
            <button 
              className="underline text-blue-500"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>,
        {
          duration: 5000,
        }
      );
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 