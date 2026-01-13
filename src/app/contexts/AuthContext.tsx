'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '../lib/firebaseClient';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
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

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please allow popups for this site.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to complete this action.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      router.push('/');
    } catch (error) {
      const message = getFirebaseErrorMessage(error as AuthError);
      toast.error(message);
      throw new Error(message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        toast.success('Welcome to your personal diary!');
        router.push('/');
      }
    } catch (error) {
      const authError = error as AuthError;
      const message = getFirebaseErrorMessage(authError);

      // Special handling for email already in use
      if (authError.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please sign in instead.');
        throw new Error('USER_EXISTS');
      }

      toast.error(message);
      throw new Error(message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      await signInWithPopup(auth, provider);
      toast.success('Welcome!');
      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      // Don't show error if user just closed the popup
      if (authError.code === 'auth/popup-closed-by-user') {
        return;
      }

      const message = getFirebaseErrorMessage(authError);
      toast.error(message);
      throw new Error(message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      const message = getFirebaseErrorMessage(error as AuthError);
      toast.error(message);
      throw new Error(message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      const message = getFirebaseErrorMessage(error as AuthError);
      toast.error(message);
      throw new Error(message);
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      await updatePassword(user, newPassword);
      toast.success('Password updated successfully!');
    } catch (error) {
      const message = getFirebaseErrorMessage(error as AuthError);
      toast.error(message);
      throw new Error(message);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
