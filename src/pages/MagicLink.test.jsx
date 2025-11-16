import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import MagicLink from './MagicLink';
import { AuthProvider } from '../hooks/useAuth.jsx';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Wrapper component with router and auth context
const TestWrapper = ({ children, initialEntries = ['/magic-link?token=test123'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
);

describe('MagicLink Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render verification state initially', () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      expect(screen.getByText(/verifying your magic link/i)).toBeInTheDocument();
      expect(screen.getByText(/please wait while we log you in/i)).toBeInTheDocument();
    });

    it('should show loading spinner during verification', () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      const spinner = document.querySelector('.spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Token Verification', () => {
    it('should extract token from URL query parameter', async () => {
      const testToken = 'magic_token_xyz';
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={[`/magic-link?token=${testToken}`]}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      // In mock mode, any token should succeed
      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should show success state after successful verification', async () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
        expect(screen.getByText(/🎉/)).toBeInTheDocument();
        expect(screen.getByText(/redirecting you to your portal/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should redirect to portal after successful verification', async () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      }, { timeout: 3000 });

      // Wait for redirect (2 second delay in component)
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/portal');
      }, { timeout: 3000 });
    });

    it('should show error state when no token provided', async () => {
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/magic-link']}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      await waitFor(() => {
        expect(screen.getByText(/invalid magic link/i)).toBeInTheDocument();
        expect(screen.getByText(/no token provided in the url/i)).toBeInTheDocument();
      });
    });

    it('should show return to home button on error', async () => {
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/magic-link']}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      await waitFor(() => {
        const returnButton = screen.getByRole('button', { name: /return to home/i });
        expect(returnButton).toBeInTheDocument();
      });
    });
  });

  describe('UI Elements', () => {
    it('should display checkmark icon on success', async () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      }, { timeout: 3000 });

      // CheckCircle icon should be present
      const successIcon = document.querySelector('svg');
      expect(successIcon).toBeInTheDocument();
    });

    it('should display alert icon on error', async () => {
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/magic-link']}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      await waitFor(() => {
        expect(screen.getByText(/invalid magic link/i)).toBeInTheDocument();
      });

      // AlertCircle icon should be present
      const errorIcon = document.querySelector('svg');
      expect(errorIcon).toBeInTheDocument();
    });

    it('should apply gradient background', () => {
      const { container } = render(<MagicLink />, { wrapper: TestWrapper });

      const mainDiv = container.querySelector('div');
      expect(mainDiv).toHaveClass('bg-gradient-to-br');
    });

    it('should use card styling for content', () => {
      const { container } = render(<MagicLink />, { wrapper: TestWrapper });

      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive headings', async () => {
      render(<MagicLink />, { wrapper: TestWrapper });

      expect(screen.getByText(/verifying your magic link/i)).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText(/success/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should provide clear error messages', async () => {
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/magic-link']}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      await waitFor(() => {
        const errorMessage = screen.getByText(/no token provided in the url/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<MagicLink />, { wrapper: TestWrapper });

      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should have framer-motion animation classes', () => {
      const { container } = render(<MagicLink />, { wrapper: TestWrapper });

      // Check for motion.div (framer-motion adds data attributes)
      const animatedDiv = container.querySelector('[style]');
      expect(animatedDiv).toBeInTheDocument();
    });
  });

  describe('Security', () => {
    it('should not display token in UI', () => {
      const sensitiveToken = 'secret_token_12345';
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={[`/magic-link?token=${sensitiveToken}`]}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      const { container } = render(<MagicLink />, { wrapper });

      expect(container.textContent).not.toContain(sensitiveToken);
    });

    it('should handle malformed URLs gracefully', async () => {
      const wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/magic-link?token=']}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      );

      render(<MagicLink />, { wrapper });

      // Empty token should show error
      await waitFor(() => {
        expect(screen.getByText(/invalid magic link/i)).toBeInTheDocument();
      });
    });
  });
});
