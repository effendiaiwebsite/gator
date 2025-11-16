import { useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';

export const useFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get dashboard data for the current user
   * Returns: { success, data: { client, documents, messages, payments } }
   */
  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      console.log('🔥 Firebase: Loading dashboard for user:', user.uid);

      // Use Firebase Auth UID as the client ID (per deployment.md design)
      // Firebase Email Link creates ONE permanent UID per email address
      const clientId = user.uid;
      const clientDocRef = doc(db, 'clients', clientId);
      const clientDoc = await getDoc(clientDocRef);

      if (!clientDoc.exists()) {
        throw new Error('Client profile not found. Please sign up first.');
      }

      const clientData = {
        uid: clientId,
        ...clientDoc.data()
      };

      console.log('✅ Client data loaded for UID:', clientId);

      // Get documents subcollection
      const documentsRef = collection(db, `clients/${clientId}/documents`);
      const documentsQuery = query(documentsRef, orderBy('uploadedAt', 'desc'));
      const documentsSnap = await getDocs(documentsQuery);
      const documents = documentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`✅ Loaded ${documents.length} documents`);

      // Get messages subcollection
      const messagesRef = collection(db, `clients/${clientId}/messages`);
      const messagesQuery = query(messagesRef, orderBy('sentAt', 'desc'));
      const messagesSnap = await getDocs(messagesQuery);
      const messages = messagesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`✅ Loaded ${messages.length} messages`);

      // Get payments subcollection
      const paymentsRef = collection(db, `clients/${clientId}/payments`);
      const paymentsQuery = query(paymentsRef, orderBy('paidAt', 'desc'));
      const paymentsSnap = await getDocs(paymentsQuery);
      const payments = paymentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`✅ Loaded ${payments.length} payments`);

      setLoading(false);
      return {
        success: true,
        data: {
          client: clientData,
          documents,
          messages,
          payments
        }
      };
    } catch (err) {
      console.error('❌ Firebase Error loading dashboard:', err);
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Upload a document (file)
   * @param {File} file - The file to upload (can be encrypted)
   * @param {string} fileType - Type of document (T4, T4A, Receipt, etc.)
   * @param {Object} encryptionMeta - Encryption metadata (salt, iv, originalName, etc.)
   */
  const uploadDocument = async (file, fileType, encryptionMeta = null) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      console.log('🔥 Firebase: Uploading document:', file.name);

      // Validate file size (10MB max) - SECURITY
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type - SECURITY
      // Allow encrypted files (application/octet-stream) and original types
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/octet-stream'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only PDF, JPG, PNG files are allowed');
      }

      // Use Firebase Auth UID as the client ID (per deployment.md design)
      const clientId = user.uid;
      console.log('📂 Uploading to client:', clientId);

      // Upload to Firebase Storage using the REAL client ID
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `documents/${clientId}/${fileName}`);

      console.log('📤 Uploading to Storage...');
      await uploadBytes(storageRef, file);

      const fileUrl = await getDownloadURL(storageRef);
      console.log('✅ File uploaded to Storage');

      // Create Firestore document metadata
      const docData = {
        fileName: file.name,
        fileUrl,
        fileType: fileType || 'Other',
        encrypted: !!encryptionMeta,
        uploadedAt: serverTimestamp(),
        fileSize: file.size,
      };

      // Add encryption metadata if provided (WITHOUT passphrase!)
      if (encryptionMeta) {
        docData.encryptionMeta = {
          salt: encryptionMeta.salt,
          iv: encryptionMeta.iv,
          originalName: encryptionMeta.originalName,
          originalSize: encryptionMeta.originalSize,
          originalType: encryptionMeta.originalType
        };
        console.log('🔐 Encryption metadata will be stored (passphrase NOT stored)');
      }

      console.log('📝 Creating Firestore document...');
      const docRef = await addDoc(
        collection(db, `clients/${clientId}/documents`),
        docData
      );

      console.log('✅ Document uploaded successfully:', docRef.id);

      setLoading(false);
      return {
        success: true,
        data: { id: docRef.id, ...docData }
      };
    } catch (err) {
      console.error('❌ Firebase Error uploading document:', err);
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Send a message
   * @param {string} text - Message text
   * @param {string} sender - 'client' or 'admin'
   */
  const sendMessage = async (text, sender = 'client') => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      const messageData = {
        text,
        sender,
        sentAt: serverTimestamp()
      };

      const docRef = await addDoc(
        collection(db, `clients/${user.uid}/messages`),
        messageData
      );

      setLoading(false);
      return {
        success: true,
        data: { id: docRef.id, ...messageData }
      };
    } catch (err) {
      console.error('❌ Firebase Error sending message:', err);
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Update client status (bronze, silver, gold)
   * @param {string} status - New status
   */
  const updateStatus = async (status) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Not authenticated');
      }

      await setDoc(
        doc(db, 'clients', user.uid),
        { status, lastUpdated: serverTimestamp() },
        { merge: true }
      );

      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('❌ Firebase Error updating status:', err);
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    getDashboardData,
    uploadDocument,
    sendMessage,
    updateStatus
  };
};
