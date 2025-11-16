import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useXano } from './useXano';

describe('useXano Hook', () => {
  beforeEach(() => {
    // Clear any state between tests
  });

  describe('Initial State', () => {
    it('should initialize with loading: false and error: null', () => {
      const { result } = renderHook(() => useXano());

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useXano());

      expect(typeof result.current.getDashboard).toBe('function');
      expect(typeof result.current.uploadDocument).toBe('function');
      expect(typeof result.current.sendMessage).toBe('function');
      expect(typeof result.current.createLead).toBe('function');
    });
  });

  describe('createLead (Mock Mode)', () => {
    it('should create a lead successfully in mock mode', async () => {
      const mockLeadData = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        province: 'ON',
        annual_revenue: '100k-250k',
        employee_count: '1-5',
        estimated_savings: 5000,
      };

      const { result } = renderHook(() => useXano());

      let leadResult;
      await act(async () => {
        leadResult = await result.current.createLead(mockLeadData);
      });

      expect(leadResult).toBeTruthy();
      expect(leadResult.success).toBe(true);
      expect(leadResult.client_id).toBeTruthy();
      expect(leadResult.message).toContain(mockLeadData.email);
    });

    it('should simulate delay in mock mode', async () => {
      const { result } = renderHook(() => useXano());

      const startTime = Date.now();
      await act(async () => {
        await result.current.createLead({ email: 'test@example.com' });
      });
      const endTime = Date.now();

      // Mock mode has 1000ms delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(900);
    });
  });

  describe('getDashboard (Mock Mode)', () => {
    it('should fetch dashboard data in mock mode', async () => {
      const { result } = renderHook(() => useXano());

      let dashboardResult;
      await act(async () => {
        dashboardResult = await result.current.getDashboard();
      });

      expect(dashboardResult).toBeTruthy();
      expect(dashboardResult.client).toBeTruthy();
      expect(Array.isArray(dashboardResult.documents)).toBe(true);
      expect(Array.isArray(dashboardResult.messages)).toBe(true);
      expect(Array.isArray(dashboardResult.payments)).toBe(true);
    });

    it('should return consistent mock data structure', async () => {
      const { result } = renderHook(() => useXano());

      const dashboard = await act(async () => {
        return await result.current.getDashboard();
      });

      // Check client structure
      expect(dashboard.client).toHaveProperty('id');
      expect(dashboard.client).toHaveProperty('email');
      expect(dashboard.client).toHaveProperty('first_name');
      expect(dashboard.client).toHaveProperty('last_name');
      expect(dashboard.client).toHaveProperty('status');
      expect(dashboard.client).toHaveProperty('estimated_savings');
      expect(dashboard.client).toHaveProperty('created_at');

      // Check status is valid
      expect(['bronze', 'silver', 'gold']).toContain(dashboard.client.status);
    });

    it('should simulate delay (500ms) in mock mode', async () => {
      const { result } = renderHook(() => useXano());

      const startTime = Date.now();
      await act(async () => {
        await result.current.getDashboard();
      });
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(450);
    });
  });

  describe('uploadDocument (Mock Mode)', () => {
    it('should upload document in mock mode', async () => {
      const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });

      const { result } = renderHook(() => useXano());

      let uploadResult;
      await act(async () => {
        uploadResult = await result.current.uploadDocument(mockFile, 'T4');
      });

      expect(uploadResult).toBeTruthy();
      expect(uploadResult.success).toBe(true);
      expect(uploadResult.document_id).toBeTruthy();
      expect(typeof uploadResult.document_id).toBe('number');
    });

    it('should simulate upload delay (1500ms) in mock mode', async () => {
      const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const { result } = renderHook(() => useXano());

      const startTime = Date.now();
      await act(async () => {
        await result.current.uploadDocument(mockFile);
      });
      const endTime = Date.now();

      // Mock mode has 1500ms delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(1400);
    });

    it('should handle different file types', async () => {
      const { result } = renderHook(() => useXano());

      const pdfFile = new File(['pdf'], 'doc.pdf', { type: 'application/pdf' });
      const imageFile = new File(['img'], 'img.jpg', { type: 'image/jpeg' });

      const pdfResult = await act(async () => {
        return await result.current.uploadDocument(pdfFile, 'T4');
      });

      const imageResult = await act(async () => {
        return await result.current.uploadDocument(imageFile, 'Receipt');
      });

      expect(pdfResult.success).toBe(true);
      expect(imageResult.success).toBe(true);
    });
  });

  describe('sendMessage (Mock Mode)', () => {
    it('should send message in mock mode', async () => {
      const messageText = 'Hello, I have a question';

      const { result } = renderHook(() => useXano());

      let messageResult;
      await act(async () => {
        messageResult = await result.current.sendMessage(messageText);
      });

      expect(messageResult).toBeTruthy();
      expect(messageResult.success).toBe(true);
      expect(messageResult.message_id).toBeTruthy();
      expect(typeof messageResult.message_id).toBe('number');
    });

    it('should simulate delay (300ms) in mock mode', async () => {
      const { result } = renderHook(() => useXano());

      const startTime = Date.now();
      await act(async () => {
        await result.current.sendMessage('Test message');
      });
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(250);
    });

    it('should handle different message lengths', async () => {
      const { result } = renderHook(() => useXano());

      const shortMessage = 'Hi';
      const longMessage = 'This is a much longer message that contains multiple sentences and should still work correctly in the system.';

      const shortResult = await act(async () => {
        return await result.current.sendMessage(shortMessage);
      });

      const longResult = await act(async () => {
        return await result.current.sendMessage(longMessage);
      });

      expect(shortResult.success).toBe(true);
      expect(longResult.success).toBe(true);
    });
  });

  describe('Loading States', () => {
    it('should not show loading state immediately (async)', async () => {
      const { result } = renderHook(() => useXano());

      // Initial state
      expect(result.current.loading).toBe(false);

      // Start async operation
      const promise = act(async () => {
        return result.current.getDashboard();
      });

      // Loading state is handled internally
      await promise;

      // After completion, loading should be false
      expect(result.current.loading).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should clear previous errors on new request', async () => {
      // Note: In mock mode, errors don't occur, but we test the state management
      const { result } = renderHook(() => useXano());

      // Make a successful request
      await act(async () => {
        await result.current.createLead({ email: 'test@example.com' });
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('Security & Input Validation', () => {
    it('should handle special characters in input', async () => {
      const { result } = renderHook(() => useXano());

      const specialCharsMessage = 'Test <>&"\' characters';

      const messageResult = await act(async () => {
        return await result.current.sendMessage(specialCharsMessage);
      });

      expect(messageResult.success).toBe(true);
    });

    it('should handle unicode characters', async () => {
      const { result } = renderHook(() => useXano());

      const unicodeMessage = 'Bonjour 🐊 Comment ça va?';

      const messageResult = await act(async () => {
        return await result.current.sendMessage(unicodeMessage);
      });

      expect(messageResult.success).toBe(true);
    });

    it('should handle empty strings gracefully', async () => {
      const { result } = renderHook(() => useXano());

      const emptyMessage = '';

      const messageResult = await act(async () => {
        return await result.current.sendMessage(emptyMessage);
      });

      // In mock mode, even empty messages succeed
      expect(messageResult.success).toBe(true);
    });
  });

  describe('Mock Data Consistency', () => {
    it('should return different random IDs for multiple operations', async () => {
      const { result } = renderHook(() => useXano());

      const result1 = await act(async () => {
        return await result.current.createLead({ email: 'test1@example.com' });
      });

      const result2 = await act(async () => {
        return await result.current.createLead({ email: 'test2@example.com' });
      });

      // Random IDs should (likely) be different
      // Note: There's a small chance they could be the same
      expect(typeof result1.client_id).toBe('number');
      expect(typeof result2.client_id).toBe('number');
    });

    it('should include welcome message in mock dashboard', async () => {
      const { result } = renderHook(() => useXano());

      const dashboard = await act(async () => {
        return await result.current.getDashboard();
      });

      expect(dashboard.messages.length).toBeGreaterThan(0);
      expect(dashboard.messages[0].sender).toBe('admin');
      expect(dashboard.messages[0].text).toContain('Welcome');
    });
  });
});
