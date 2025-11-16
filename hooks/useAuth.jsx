import { useState, useEffect, createContext, useContext } from 'react';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch their data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'clients', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data(),
            });
          } else {
            // User authenticated but no Firestore document (shouldn't happen)
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            });
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError(err.message);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Send magic link to email
  const sendMagicLink = async (email, clientData) => {
    try {
      setError(null);

      const actionCodeSettings = {
        url: `${import.meta.env.VITE_APP_URL}/portal`,
        handleCodeInApp: true,
      };

      // Send the magic link
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Save email to localStorage (needed for sign-in completion)
      window.localStorage.setItem('emailForSignIn', email);

      // Save client data to localStorage (to create Firestore doc after sign-in)
      if (clientData) {
        window.localStorage.setItem('clientData', JSON.stringify(clientData));
      }

      return { success: true, message: 'Magic link sent! Check your email.' };
    } catch (err) {
      console.error('Error sending magic link:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Complete sign-in with magic link
  const completeMagicLinkSignIn = async () => {
    try {
      setError(null);

      // Check if the URL is a sign-in link
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw new Error('Invalid sign-in link');
      }

      // Get email from localStorage
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // If missing, prompt user (they may have opened link on different device)
        email = window.prompt('Please provide your email for confirmation');
      }

      // Sign in with the email link
      const result = await signInWithEmailLink(auth, email, window.location.href);

      // Clear email from storage
      window.localStorage.removeItem('emailForSignIn');

      // Get client data from localStorage (if exists)
      const clientDataStr = window.localStorage.getItem('clientData');
      let clientData = null;
      if (clientDataStr) {
        clientData = JSON.parse(clientDataStr);
        window.localStorage.removeItem('clientData');
      }

      // Check if user document exists in Firestore
      const userDocRef = doc(db, 'clients', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() && clientData) {
        // Create new client document
        await setDoc(userDocRef, {
          email: result.user.email,
          firstName: clientData.firstName || '',
          lastName: clientData.lastName || '',
          province: clientData.province || 'ON',
          annualRevenue: clientData.annualRevenue || '0-50k',
          employeeCount: clientData.employeeCount || '0',
          estimatedSavings: clientData.estimatedSavings || 0,
          status: 'bronze',
          adSource: clientData.adSource || 'Organic',
          utmCampaign: clientData.utmCampaign || null,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else if (userDoc.exists()) {
        // Update last login
        await setDoc(
          userDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      }

      return { success: true, user: result.user };
    } catch (err) {
      console.error('Error completing sign-in:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      setUser(null);
      return { success: true };
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    sendMagicLink,
    completeMagicLinkSignIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
