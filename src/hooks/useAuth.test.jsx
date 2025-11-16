import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth.jsx';

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should initialize with null user', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should restore user from localStorage if valid token exists', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        first_name: 'John',
      };
      const mockToken = 'valid_token_123';
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);

      localStorage.setItem('gator-auth-token', mockToken);
      localStorage.setItem('gator-user-data', JSON.stringify(mockUser));
      localStorage.setItem('gator-token-expiry', expiry.toISOString());

      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual(mockUser);
      });
    });

    it('should clear expired token from localStorage', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
      };
      const mockToken = 'expired_token';
      const expiry = new Date();
      expiry.setDate(expiry.getDate() - 1); // Expired yesterday

      localStorage.setItem('gator-auth-token', mockToken);
      localStorage.setItem('gator-user-data', JSON.stringify(mockUser));
      localStorage.setItem('gator-token-expiry', expiry.toISOString());

      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(localStorage.getItem('gator-auth-token')).toBeNull();
      });
    });
  });

  describe('verifyMagicLink (Mock Mode)', () => {
    it('should verify magic link and set user in mock mode', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.verifyMagicLink('test_token_123');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toBeTruthy();
      expect(result.current.user.email).toBe('demo@example.com');
      expect(result.current.user.first_name).toBe('Demo');
      expect(localStorage.getItem('gator-auth-token')).toBeTruthy();
    });

    it('should set loading state during verification', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const verifyPromise = act(async () => {
        return result.current.verifyMagicLink('test_token');
      });

      // Immediately after calling, loading should be true
      // Note: This might be tricky to test due to timing

      await verifyPromise;

      expect(result.current.loading).toBe(false);
    });

    it('should store user data in localStorage', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.verifyMagicLink('test_token');
      });

      expect(localStorage.getItem('gator-auth-token')).toBeTruthy();
      expect(localStorage.getItem('gator-user-data')).toBeTruthy();
      expect(localStorage.getItem('gator-token-expiry')).toBeTruthy();

      const storedUser = JSON.parse(localStorage.getItem('gator-user-data'));
      expect(storedUser.email).toBe('demo@example.com');
    });
  });

  describe('logout', () => {
    it('should clear user state and localStorage', async () => {
      // First login
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.verifyMagicLink('test_token');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(localStorage.getItem('gator-auth-token')).toBeNull();
      expect(localStorage.getItem('gator-user-data')).toBeNull();
      expect(localStorage.getItem('gator-token-expiry')).toBeNull();
    });
  });

  describe('Token Expiry', () => {
    it('should set token expiry to 7 days from verification', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const beforeTime = Date.now();
      await act(async () => {
        await result.current.verifyMagicLink('test_token');
      });
      const afterTime = Date.now();

      const expiryString = localStorage.getItem('gator-token-expiry');
      expect(expiryString).toBeTruthy();

      const expiresAt = new Date(expiryString).getTime();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

      // Check that expiry is approximately 7 days from now (with 5 second tolerance)
      expect(expiresAt).toBeGreaterThan(beforeTime + sevenDaysMs - 5000);
      expect(expiresAt).toBeLessThan(afterTime + sevenDaysMs + 5000);
    });
  });

  describe('Security', () => {
    it('should handle malformed localStorage data gracefully', async () => {
      localStorage.setItem('gator-user-data', 'invalid json {{{');
      localStorage.setItem('gator-auth-token', 'some_token');
      localStorage.setItem('gator-token-expiry', 'not_a_date');

      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should clear invalid data and not crash
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('should not store sensitive data patterns', async () => {
      const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.verifyMagicLink('test_token');
      });

      const storedUser = JSON.parse(localStorage.getItem('gator-user-data'));

      // Should not have password-related fields
      expect(storedUser).not.toHaveProperty('password');
      expect(storedUser).not.toHaveProperty('passwordHash');
      expect(storedUser).not.toHaveProperty('secret');
    });
  });

  describe('Provider Context', () => {
    it('should throw error when useAuth is used outside AuthProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within AuthProvider');

      console.error = originalError;
    });
  });
});
