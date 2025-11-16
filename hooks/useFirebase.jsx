import { useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage, auth } from '../config/firebase';

export function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========================================
  // CLIENT OPERATIONS
  // ========================================

  // Get current client data
  const getClientData = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const clientDoc = await getDoc(doc(db, 'clients', user.uid));
      if (!clientDoc.exists()) {
        throw new Error('Client data not found');
      }

      return { success: true, data: { id: clientDoc.id, ...clientDoc.data() } };
    } catch (err) {
      console.error('Error getting client data:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update client data
  const updateClientData = async (updates) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Remove fields that clients can't update
      const { status, email, createdAt, ...allowedUpdates } = updates;

      await updateDoc(doc(db, 'clients', user.uid), allowedUpdates);

      return { success: true };
    } catch (err) {
      console.error('Error updating client data:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DOCUMENT OPERATIONS
  // ========================================

  // Get all documents for current user
  const getDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const docsRef = collection(db, `clients/${user.uid}/documents`);
      const docsSnapshot = await getDocs(docsRef);

      const documents = docsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, data: documents };
    } catch (err) {
      console.error('Error getting documents:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Upload document (encrypted file)
  const uploadDocument = async (file, fileType) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only PDF, JPG, and PNG files are allowed');
      }

      // Upload to Firebase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `documents/${user.uid}/${fileName}`);
      await uploadBytes(storageRef, file);

      // Get download URL
      const fileUrl = await getDownloadURL(storageRef);

      // Create Firestore document metadata
      const docData = {
        fileName: file.name,
        fileUrl,
        fileType: fileType || 'Other',
        encrypted: true,
        uploadedAt: serverTimestamp(),
        fileSize: file.size,
      };

      const docRef = await addDoc(
        collection(db, `clients/${user.uid}/documents`),
        docData
      );

      return {
        success: true,
        data: { id: docRef.id, ...docData },
      };
    } catch (err) {
      console.error('Error uploading document:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete document
  const deleteDocument = async (documentId, fileUrl) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Delete from Storage
      if (fileUrl) {
        const storageRef = ref(storage, fileUrl);
        await deleteObject(storageRef);
      }

      // Delete from Firestore
      await deleteDoc(doc(db, `clients/${user.uid}/documents`, documentId));

      return { success: true };
    } catch (err) {
      console.error('Error deleting document:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // MESSAGE OPERATIONS
  // ========================================

  // Get all messages for current user
  const getMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const messagesRef = collection(db, `clients/${user.uid}/messages`);
      const messagesSnapshot = await getDocs(messagesRef);

      const messages = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, data: messages };
    } catch (err) {
      console.error('Error getting messages:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async (text) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Validate message length
      if (!text || text.length === 0) {
        throw new Error('Message cannot be empty');
      }
      if (text.length > 5000) {
        throw new Error('Message exceeds 5000 character limit');
      }

      const messageData = {
        sender: 'client',
        text,
        sentAt: serverTimestamp(),
        readAt: null,
      };

      const messageRef = await addDoc(
        collection(db, `clients/${user.uid}/messages`),
        messageData
      );

      return {
        success: true,
        data: { id: messageRef.id, ...messageData },
      };
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PAYMENT OPERATIONS
  // ========================================

  // Get all payments for current user
  const getPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const paymentsRef = collection(db, `clients/${user.uid}/payments`);
      const paymentsSnapshot = await getDocs(paymentsRef);

      const payments = paymentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, data: payments };
    } catch (err) {
      console.error('Error getting payments:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DASHBOARD (ALL DATA)
  // ========================================

  // Get complete dashboard data (client + documents + messages + payments)
  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Fetch all data in parallel
      const [clientResult, docsResult, messagesResult, paymentsResult] =
        await Promise.all([
          getClientData(),
          getDocuments(),
          getMessages(),
          getPayments(),
        ]);

      if (!clientResult.success) {
        throw new Error(clientResult.error);
      }

      return {
        success: true,
        data: {
          client: clientResult.data,
          documents: docsResult.success ? docsResult.data : [],
          messages: messagesResult.success ? messagesResult.data : [],
          payments: paymentsResult.success ? paymentsResult.data : [],
        },
      };
    } catch (err) {
      console.error('Error getting dashboard data:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // ADMIN OPERATIONS (Require admin custom claim)
  // ========================================

  // Get all clients (admin only)
  const getAllClients = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Check if user is admin
      const token = await user.getIdTokenResult();
      if (!token.claims.admin) {
        throw new Error('Unauthorized: Admin access required');
      }

      let clientsQuery = collection(db, 'clients');

      // Apply filters
      if (filters.status) {
        clientsQuery = query(clientsQuery, where('status', '==', filters.status));
      }
      if (filters.province) {
        clientsQuery = query(clientsQuery, where('province', '==', filters.province));
      }

      const clientsSnapshot = await getDocs(clientsQuery);

      const clients = clientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { success: true, data: clients };
    } catch (err) {
      console.error('Error getting all clients:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update client status (admin only)
  const updateClientStatus = async (clientId, status) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      // Check if user is admin
      const token = await user.getIdTokenResult();
      if (!token.claims.admin) {
        throw new Error('Unauthorized: Admin access required');
      }

      // Validate status
      if (!['bronze', 'silver', 'gold'].includes(status)) {
        throw new Error('Invalid status');
      }

      await updateDoc(doc(db, 'clients', clientId), { status });

      return { success: true };
    } catch (err) {
      console.error('Error updating client status:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Client operations
    getClientData,
    updateClientData,
    // Document operations
    getDocuments,
    uploadDocument,
    deleteDocument,
    // Message operations
    getMessages,
    sendMessage,
    // Payment operations
    getPayments,
    // Dashboard
    getDashboardData,
    // Admin operations
    getAllClients,
    updateClientStatus,
  };
}

export default useFirebase;
