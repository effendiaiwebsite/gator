import { useState, useEffect, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendEmailVerification,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  twitterProvider,
  yahooProvider
} from '../config/firebase';

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

  // Email/Password Sign Up
  const signUpWithEmail = async (email, password, clientData = null) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Creating user with email/password:', email);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      console.log('✅ User created with UID:', firebaseUser.uid);

      // Send email verification (optional - don't block on failure)
      try {
        await sendEmailVerification(firebaseUser);
        console.log('📧 Verification email sent');
      } catch (emailErr) {
        console.warn('⚠️ Failed to send verification email:', emailErr);
        // Don't block account creation if email fails
      }

      // Create user document in Firestore
      const userDocRef = doc(db, 'clients', firebaseUser.uid);
      await setDoc(userDocRef, {
        email: firebaseUser.email,
        firstName: clientData?.firstName || '',
        lastName: clientData?.lastName || '',
        province: clientData?.province || 'ON',
        annualRevenue: clientData?.annualRevenue || '0-50k',
        employeeCount: clientData?.employeeCount || '0',
        estimatedSavings: clientData?.estimatedSavings || 0,
        status: 'bronze',
        adSource: clientData?.adSource || 'Organic',
        utmCampaign: clientData?.utmCampaign || null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      console.log('✅ User document created');

      setLoading(false);
      return {
        success: true,
        message: 'Account created! Please check your email to verify your account.'
      };
    } catch (err) {
      console.error('❌ Error creating user:', err);
      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to create account. ';
      if (err.code === 'auth/email-already-in-use') {
        userMessage = 'Email already in use. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        userMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        userMessage = 'Invalid email address.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
    }
  };

  // Email/Password Sign In
  const signInWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Signing in with email/password:', email);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      console.log('✅ Sign-in successful with UID:', firebaseUser.uid);

      // Update last login
      const userDocRef = doc(db, 'clients', firebaseUser.uid);
      await setDoc(userDocRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });

      setLoading(false);
      return { success: true, user: firebaseUser };
    } catch (err) {
      console.error('❌ Error signing in:', err);
      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to sign in. ';
      if (err.code === 'auth/user-not-found') {
        userMessage = 'No account found with this email. Please sign up first.';
      } else if (err.code === 'auth/wrong-password') {
        userMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        userMessage = 'Invalid email address.';
      } else if (err.code === 'auth/user-disabled') {
        userMessage = 'This account has been disabled.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
    }
  };

  // OAuth Sign In (Google, Facebook, Twitter, Yahoo)
  const signInWithOAuth = async (providerName, clientData = null) => {
    try {
      setLoading(true);
      setError(null);

      let provider;
      switch (providerName) {
        case 'google':
          provider = googleProvider;
          break;
        case 'facebook':
          provider = facebookProvider;
          break;
        case 'twitter':
          provider = twitterProvider;
          break;
        case 'yahoo':
          provider = yahooProvider;
          break;
        default:
          throw new Error('Invalid provider');
      }

      console.log('🔥 Firebase: Signing in with', providerName);

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      console.log('✅ OAuth sign-in successful with UID:', firebaseUser.uid);

      // Check if user document exists
      const userDocRef = doc(db, 'clients', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create new user document
        console.log('📝 Creating new user document');

        // Extract name from OAuth profile
        const displayName = firebaseUser.displayName || '';
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await setDoc(userDocRef, {
          email: firebaseUser.email,
          firstName: clientData?.firstName || firstName,
          lastName: clientData?.lastName || lastName,
          province: clientData?.province || 'ON',
          annualRevenue: clientData?.annualRevenue || '0-50k',
          employeeCount: clientData?.employeeCount || '0',
          estimatedSavings: clientData?.estimatedSavings || 0,
          status: 'bronze',
          adSource: clientData?.adSource || 'Organic',
          utmCampaign: clientData?.utmCampaign || null,
          authProvider: providerName,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } else {
        // Update last login
        console.log('📝 Updating last login');
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }

      setLoading(false);
      return { success: true, user: firebaseUser };
    } catch (err) {
      console.error('❌ Error with OAuth sign-in:', err);
      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to sign in with ' + providerName + '. ';
      if (err.code === 'auth/popup-closed-by-user') {
        userMessage = 'Sign-in cancelled.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        userMessage = 'An account already exists with this email using a different sign-in method.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
    }
  };

  // Send OTP for phone verification (for registration flow)
  const sendOTP = async (phoneNumber, recaptchaContainerId) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Sending OTP to:', phoneNumber);

      // Initialize reCAPTCHA
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          recaptchaContainerId,
          {
            size: 'normal',
            callback: () => {
              console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
              window.recaptchaVerifier = null;
            }
          }
        );
      }

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        window.recaptchaVerifier
      );

      console.log('✅ OTP sent successfully');

      setLoading(false);
      return {
        success: true,
        verificationId,
        message: 'OTP sent to your phone!'
      };
    } catch (err) {
      console.error('❌ Error sending OTP:', err);
      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to send OTP. ';
      if (err.code === 'auth/invalid-phone-number') {
        userMessage = 'Invalid phone number format.';
      } else if (err.code === 'auth/too-many-requests') {
        userMessage = 'Too many requests. Please try again later.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
    }
  };

  // Verify OTP
  const verifyOTP = async (verificationId, otpCode) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔥 Firebase: Verifying OTP');

      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      const result = await signInWithCredential(auth, credential);

      console.log('✅ OTP verified successfully');

      setLoading(false);
      return { success: true, user: result.user };
    } catch (err) {
      console.error('❌ Error verifying OTP:', err);
      setLoading(false);
      setError(err.message);

      let userMessage = 'Failed to verify OTP. ';
      if (err.code === 'auth/invalid-verification-code') {
        userMessage = 'Invalid OTP code. Please try again.';
      } else if (err.code === 'auth/code-expired') {
        userMessage = 'OTP code has expired. Please request a new one.';
      } else {
        userMessage += err.message;
      }

      return { success: false, error: userMessage };
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
    signUpWithEmail,
    signInWithEmail,
    signInWithOAuth,
    sendOTP,
    verifyOTP,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
