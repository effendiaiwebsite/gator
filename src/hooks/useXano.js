import { useState } from 'react';
import axios from 'axios';
import { buildUrl, getAuthHeaders, MOCK_MODE } from '../config/xano';

export const useXano = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = buildUrl(endpoint);
      const headers = getAuthHeaders();

      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: { ...headers, ...options.headers },
        data: options.data,
        params: options.params
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  // Client Dashboard
  const getDashboard = async () => {
    if (MOCK_MODE) {
      // Return mock data for development
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        client: {
          id: 1,
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@example.com',
          status: 'bronze',
          estimated_savings: 4800,
          created_at: new Date().toISOString()
        },
        documents: [],
        messages: [
          {
            id: 1,
            sender: 'admin',
            text: 'Welcome to Gator Bookkeeping! Upload your T4 to get started.',
            sent_at: new Date().toISOString()
          }
        ],
        payments: []
      };
    }

    return makeRequest('/client/dashboard');
  };

  // Upload Document
  const uploadDocument = async (file, fileType) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        document_id: Math.floor(Math.random() * 1000),
        message: 'File uploaded successfully'
      };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_type', fileType);

    return makeRequest('/client/upload', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  // Send Message
  const sendMessage = async (text) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        message_id: Math.floor(Math.random() * 1000)
      };
    }

    return makeRequest('/client/message', {
      method: 'POST',
      data: { text }
    });
  };

  // Create Lead (from calculator)
  const createLead = async (leadData) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        client_id: Math.floor(Math.random() * 1000),
        message: 'Magic link sent to ' + leadData.email
      };
    }

    return makeRequest('/lead', {
      method: 'POST',
      data: leadData
    });
  };

  return {
    loading,
    error,
    getDashboard,
    uploadDocument,
    sendMessage,
    createLead
  };
};
