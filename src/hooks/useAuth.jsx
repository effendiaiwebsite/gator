import { useState, useEffect, createContext, useContext } from 'react';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Auth Context
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'clients', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              status: userData.status,
              province: userData.province,
              estimatedSavings: userData.estimatedSavings,
              createdAt: userData.createdAt,
              lastLogin: userData.lastLogin
            });
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email
            });
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError(err.message);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMagicLink = async (email, clientData = null) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Sending magic link to:', email);
      console.log('🔥 Firebase: Client data:', clientData);
      console.log('🔥 Firebase: Action URL:', `${import.meta.env.VITE_APP_URL}/portal`);

      const actionCodeSettings = {
        url: `${import.meta.env.VITE_APP_URL}/portal`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      console.log('✅ Firebase: Magic link sent successfully');

      // Save email to localStorage for sign-in completion
      window.localStorage.setItem('emailForSignIn', email);

      // Save client data for later (when they click the link)
      if (clientData) {
        window.localStorage.setItem('clientData', JSON.stringify(clientData));
        console.log('💾 Saved client data to localStorage');
      }

      setLoading(false);
      return {
        success: true,
        message: 'Magic link sent! Check your email inbox (and spam folder).'
      };
    } catch (err) {
      console.error('❌ Firebase Error sending magic link:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);

      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to send magic link. ';
      if (err.code === 'auth/invalid-email') {
        userMessage += 'Please enter a valid email address.';
      } else if (err.code === 'auth/missing-android-pkg-name') {
        userMessage += 'Configuration error. Please contact support.';
      } else if (err.code === 'auth/missing-continue-uri') {
        userMessage += 'Configuration error. Please contact support.';
      } else if (err.code === 'auth/unauthorized-continue-uri') {
        userMessage += 'Configuration error. Please contact support.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
    }
  };

  const completeMagicLinkSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Checking if URL is sign-in link...');
      console.log('Current URL:', window.location.href);

      if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw new Error('Invalid sign-in link. Please use the link from your email.');
      }

      console.log('✅ Valid sign-in link detected');

      // Get email from localStorage
      let email = window.localStorage.getItem('emailForSignIn');

      if (!email) {
        // Prompt user to provide email if not in localStorage
        email = window.prompt('Please provide your email for confirmation');
      }

      if (!email) {
        throw new Error('Email is required to complete sign-in');
      }

      console.log('🔥 Firebase: Signing in with email link...');
      const result = await signInWithEmailLink(auth, email, window.location.href);

      console.log('✅ Sign-in successful with UID:', result.user.uid);

      // Store email for return (before clearing localStorage)
      const userEmail = email;

      // Clear the email from storage
      window.localStorage.removeItem('emailForSignIn');

      // Get client data from localStorage (if exists from lead form)
      const clientDataStr = window.localStorage.getItem('clientData');
      let clientData = null;
      if (clientDataStr) {
        clientData = JSON.parse(clientDataStr);
        window.localStorage.removeItem('clientData');
        console.log('💾 Retrieved client data from localStorage');
      }

      // Use Firebase Auth UID as the document ID (per deployment.md design)
      // Firebase Email Link creates ONE permanent UID per email address
      const userDocRef = doc(db, 'clients', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() && clientData) {
        // Create new user document with client data
        console.log('📝 Creating new client document with UID:', result.user.uid);
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
          lastLogin: serverTimestamp()
        });
        console.log('✅ Client document created at clients/' + result.user.uid);
      } else if (userDoc.exists()) {
        // Update last login for existing user
        console.log('📝 Updating last login for existing user');
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
        console.log('✅ Last login updated');
      } else {
        console.log('⚠️  No client data found - user may need to re-enter info');
      }

      setLoading(false);
      return { success: true, user: result.user, email: userEmail };
    } catch (err) {
      console.error('❌ Firebase Error completing sign-in:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);

      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setError(null);
      console.log('✅ Signed out successfully');
    } catch (err) {
      console.error('❌ Error signing out:', err);
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    sendMagicLink,
    completeMagicLinkSignIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
