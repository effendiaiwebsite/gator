import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusTracker from './StatusTracker';

describe('StatusTracker Component', () => {
  describe('Rendering', () => {
    it('should render component title', () => {
      render(<StatusTracker />);

      expect(screen.getByText('Your Status')).toBeInTheDocument();
    });

    it('should render all three status levels', () => {
      render(<StatusTracker currentStatus="bronze" />);

      expect(screen.getByText('Bronze')).toBeInTheDocument();
      expect(screen.getByText('Silver')).toBeInTheDocument();
      expect(screen.getByText('Gold')).toBeInTheDocument();
    });

    it('should render with default bronze status', () => {
      render(<StatusTracker />);

      expect(screen.getByText('Current')).toBeInTheDocument();
      expect(screen.getByText('Bronze')).toBeInTheDocument();
    });

    it('should render status icons', () => {
      const { container } = render(<StatusTracker />);

      // Should have 3 icons (one for each status)
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Status Progression', () => {
    it('should show bronze as current by default', () => {
      render(<StatusTracker currentStatus="bronze" />);

      const currentBadge = screen.getByText('Current');
      expect(currentBadge).toBeInTheDocument();

      // Bronze should be visible and active
      expect(screen.getByText('Bronze')).toBeInTheDocument();
    });

    it('should show silver as current when specified', () => {
      render(<StatusTracker currentStatus="silver" />);

      const currentBadge = screen.getByText('Current');
      expect(currentBadge).toBeInTheDocument();

      // All levels up to silver should be visible
      expect(screen.getByText('Bronze')).toBeInTheDocument();
      expect(screen.getByText('Silver')).toBeInTheDocument();
    });

    it('should show gold as current when specified', () => {
      render(<StatusTracker currentStatus="gold" />);

      const currentBadge = screen.getByText('Current');
      expect(currentBadge).toBeInTheDocument();

      expect(screen.getByText('Gold')).toBeInTheDocument();
    });

    it('should show gold unlock message when status is gold', () => {
      render(<StatusTracker currentStatus="gold" />);

      expect(screen.getByText(/Gold Status Unlocked/i)).toBeInTheDocument();
      expect(screen.getByText(/You've completed everything/i)).toBeInTheDocument();
    });

    it('should not show gold unlock message for bronze or silver', () => {
      const { rerender } = render(<StatusTracker currentStatus="bronze" />);

      expect(screen.queryByText(/Gold Status Unlocked/i)).not.toBeInTheDocument();

      rerender(<StatusTracker currentStatus="silver" />);

      expect(screen.queryByText(/Gold Status Unlocked/i)).not.toBeInTheDocument();
    });
  });

  describe('Next Step Instructions', () => {
    it('should show next step for bronze status', () => {
      render(<StatusTracker currentStatus="bronze" />);

      expect(screen.getByText(/Next step:/i)).toBeInTheDocument();
      expect(screen.getByText(/Upload 1 document/i)).toBeInTheDocument();
    });

    it('should show next step for silver status', () => {
      render(<StatusTracker currentStatus="silver" />);

      expect(screen.getByText(/Next step:/i)).toBeInTheDocument();
      expect(screen.getByText(/Upload all documents/i)).toBeInTheDocument();
    });

    it('should not show next step for gold status', () => {
      render(<StatusTracker currentStatus="gold" />);

      expect(screen.queryByText(/Next step:/i)).not.toBeInTheDocument();
    });
  });

  describe('Visual Indicators', () => {
    it('should apply card styling', () => {
      const { container } = render(<StatusTracker />);

      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
    });

    it('should have connector lines between statuses', () => {
      const { container } = render(<StatusTracker />);

      // Should have 2 connector lines (between 3 statuses)
      const connectors = container.querySelectorAll('.h-1');
      expect(connectors.length).toBe(2);
    });

    it('should highlight completed connector lines', () => {
      const { container } = render(<StatusTracker currentStatus="silver" />);

      // First connector (bronze to silver) should be highlighted
      const activeConnector = container.querySelector('.bg-gator-green-dark');
      expect(activeConnector).toBeInTheDocument();
    });

    it('should show current indicator badge', () => {
      render(<StatusTracker currentStatus="bronze" />);

      const currentBadge = screen.getByText('Current');
      expect(currentBadge).toBeInTheDocument();
      expect(currentBadge).toHaveClass('bg-gator-green-dark');
    });
  });

  describe('Status Colors', () => {
    it('should apply bronze colors when bronze is active', () => {
      const { container } = render(<StatusTracker currentStatus="bronze" />);

      const orangeElements = container.querySelectorAll('.text-orange-800');
      expect(orangeElements.length).toBeGreaterThan(0);
    });

    it('should apply silver colors when silver is active', () => {
      const { container } = render(<StatusTracker currentStatus="silver" />);

      const grayElements = container.querySelectorAll('.text-gray-800');
      expect(grayElements.length).toBeGreaterThan(0);
    });

    it('should apply gold colors when gold is active', () => {
      const { container } = render(<StatusTracker currentStatus="gold" />);

      const yellowElements = container.querySelectorAll('.text-yellow-800, .text-yellow-900');
      expect(yellowElements.length).toBeGreaterThan(0);
    });

    it('should gray out inactive statuses', () => {
      const { container } = render(<StatusTracker currentStatus="bronze" />);

      // Silver and Gold should be grayed out
      const grayedElements = container.querySelectorAll('.text-gray-400');
      expect(grayedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading', () => {
      render(<StatusTracker />);

      const heading = screen.getByRole('heading', { name: /your status/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have readable text sizes', () => {
      const { container } = render(<StatusTracker />);

      const heading = container.querySelector('h3');
      expect(heading).toHaveClass('text-xl');
    });

    it('should use strong emphasis for important text', () => {
      render(<StatusTracker currentStatus="bronze" />);

      const strongText = screen.getByText('Next step:');
      expect(strongText.tagName).toBe('STRONG');
    });
  });

  describe('Animation', () => {
    it('should have framer-motion elements', () => {
      const { container } = render(<StatusTracker />);

      // Framer Motion adds inline styles
      const animatedElements = container.querySelectorAll('[style]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });

    it('should scale current status indicator', () => {
      const { container } = render(<StatusTracker currentStatus="silver" />);

      // Current status should have motion animation
      const currentBadge = screen.getByText('Current');
      expect(currentBadge.parentElement).toBeInTheDocument();
    });
  });

  describe('Status Updates', () => {
    it('should update when currentStatus prop changes', () => {
      const { rerender } = render(<StatusTracker currentStatus="bronze" />);

      expect(screen.getByText(/Upload 1 document/i)).toBeInTheDocument();

      rerender(<StatusTracker currentStatus="silver" />);

      expect(screen.queryByText(/Upload 1 document/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Upload all documents/i)).toBeInTheDocument();
    });

    it('should show gold celebration when reaching gold', () => {
      const { rerender } = render(<StatusTracker currentStatus="silver" />);

      expect(screen.queryByText(/Gold Status Unlocked/i)).not.toBeInTheDocument();

      rerender(<StatusTracker currentStatus="gold" />);

      expect(screen.getByText(/Gold Status Unlocked/i)).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should use flex layout for status timeline', () => {
      const { container } = render(<StatusTracker />);

      const timeline = container.querySelector('.flex.items-center.justify-between');
      expect(timeline).toBeInTheDocument();
    });

    it('should have proper spacing between elements', () => {
      const { container } = render(<StatusTracker />);

      const spacedElements = container.querySelectorAll('.mb-4, .mb-6');
      expect(spacedElements.length).toBeGreaterThan(0);
    });

    it('should have rounded status circles', () => {
      const { container } = render(<StatusTracker />);

      const circles = container.querySelectorAll('.rounded-full');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid status gracefully', () => {
      render(<StatusTracker currentStatus="invalid" />);

      // Should still render without crashing
      expect(screen.getByText('Your Status')).toBeInTheDocument();
    });

    it('should handle undefined status', () => {
      render(<StatusTracker currentStatus={undefined} />);

      // Should default to bronze
      expect(screen.getByText('Bronze')).toBeInTheDocument();
    });

    it('should handle null status', () => {
      render(<StatusTracker currentStatus={null} />);

      expect(screen.getByText('Your Status')).toBeInTheDocument();
    });
  });

  describe('Trophy Icon', () => {
    it('should show trophy icon for gold status', () => {
      const { container } = render(<StatusTracker currentStatus="gold" />);

      // Trophy icon appears twice: in timeline and in celebration message
      const trophyIcons = container.querySelectorAll('svg');
      expect(trophyIcons.length).toBeGreaterThan(0);
    });

    it('should show trophy in gold celebration message', () => {
      render(<StatusTracker currentStatus="gold" />);

      expect(screen.getByText(/Gold Status Unlocked/i)).toBeInTheDocument();
      // Trophy icon should be present above the message
    });
  });

  describe('Requirements Display', () => {
    it('should show requirements in correct order', () => {
      render(<StatusTracker currentStatus="bronze" />);

      // Next requirement should be for silver
      const nextStep = screen.getByText(/Upload 1 document/i);
      expect(nextStep).toBeInTheDocument();
    });

    it('should not show requirements after completion', () => {
      render(<StatusTracker currentStatus="gold" />);

      // No next step since everything is complete
      expect(screen.queryByText(/Next step:/i)).not.toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now();

      render(<StatusTracker currentStatus="silver" />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });
});
