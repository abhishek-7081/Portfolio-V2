import React, { createContext, useState, useEffect, useContext } from 'react';
// For Supabase
// import { supabase } from '../lib/supabase';
import { API_BASE_URL } from '../api/portfolioApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For Supabase
    /*
    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
    */

    // For MongoDB
    const checkSession = () => {
      const storedSession = localStorage.getItem('portfolio_session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    // For Supabase
    /*
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
    */

    // For MongoDB
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      const newSession = result.data.session;
      setSession(newSession);
      localStorage.setItem('portfolio_session', JSON.stringify(newSession));
      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const logout = async () => {
    // For Supabase
    /*
    await supabase.auth.signOut();
    */

    // For MongoDB
    setSession(null);
    localStorage.removeItem('portfolio_session');
  };

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
