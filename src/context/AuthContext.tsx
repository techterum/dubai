import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  username: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionTimeout = 2 * 60 * 60 * 1000; // 2 hours
  let sessionTimer: NodeJS.Timeout;

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log('Initial Session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        startSessionTimer();
      }
      setLoading(false);
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth State Changed:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        startSessionTimer();
      } else {
        setProfile(null);
        clearTimeout(sessionTimer);
      }
    });

    return () => {
      subscription?.unsubscribe();
      clearTimeout(sessionTimer);
    };
  }, []);

  const resetTimer = useCallback(() => {
    clearTimeout(sessionTimer);
    startSessionTimer();
  }, []);

  const startSessionTimer = () => {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
      handleSignOut();
    }, sessionTimeout);

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keypress', resetTimer);
    window.removeEventListener('click', resetTimer);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut: handleSignOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
