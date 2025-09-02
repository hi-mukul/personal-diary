'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // Check active sessions
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error && !error.message?.includes('Failed to fetch')) {
          console.error('Session check error:', error)
        }
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error: any) {
        console.error('Session check failed:', error)
        setUser(null)
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          router.push('/')
        } else if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success('Welcome back!')
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        const networkError = 'Unable to connect to authentication service. Please check your internet connection and try again.'
        toast.error(networkError)
        throw new Error(networkError)
      }
      toast.error(error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          toast.error('This email is already registered. Please sign in instead.')
          throw new Error('USER_EXISTS')
        }
        throw error
      }

      // Check if user needs email confirmation
      if (data?.user && !data?.session) {
        toast.success('Check your email for confirmation!')
      } else if (data?.session) {
        toast.success('Welcome to your personal diary!')
      }
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        const networkError = 'Unable to connect to authentication service. Please check your internet connection and try again.'
        toast.error(networkError)
        throw new Error(networkError)
      }
      if (error.message !== 'USER_EXISTS') {
        toast.error(error.message)
      }
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        const networkError = 'Unable to connect to authentication service. Please check your internet connection and try again.'
        toast.error(networkError)
        throw new Error(networkError)
      }
      toast.error(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully')
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        // For sign out, we can still proceed even if network fails
        toast.success('Signed out successfully')
        return
      }
      toast.error(error.message)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        const networkError = 'Unable to connect to authentication service. Please check your internet connection and try again.'
        toast.error(networkError)
        throw new Error(networkError)
      }
      toast.error(error.message)
      throw error
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      toast.success('Password updated successfully!')
    } catch (error: any) {
      // Handle network/connection errors
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        const networkError = 'Unable to connect to authentication service. Please check your internet connection and try again.'
        toast.error(networkError)
        throw new Error(networkError)
      }
      toast.error(error.message)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
