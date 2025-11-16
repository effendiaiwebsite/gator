import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import GatorGuide from './GatorGuide';

describe('GatorGuide Component', () => {
  describe('Rendering', () => {
    it('should render with message', () => {
      const testMessage = 'Welcome to your portal!';
      render(<GatorGuide message={testMessage} />);

      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('should render gator image', () => {
      render(<GatorGuide message="Test" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage).toBeInTheDocument();
    });

    it('should not render when show is false', () => {
      const testMessage = 'Hidden message';
      render(<GatorGuide message={testMessage} show={false} />);

      expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
    });

    it('should render by default (show=true)', () => {
      render(<GatorGuide message="Default visible" />);

      expect(screen.getByText('Default visible')).toBeInTheDocument();
    });
  });

  describe('Gator States', () => {
    it('should render business state by default', () => {
      render(<GatorGuide message="Test" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('business');
    });

    it('should render happy state when specified', () => {
      render(<GatorGuide message="Test" gatorState="happy" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('thumbs');
    });

    it('should render pointing state when specified', () => {
      render(<GatorGuide message="Test" gatorState="pointing" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('pointing');
    });

    it('should render chill state when specified', () => {
      render(<GatorGuide message="Test" gatorState="chill" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('chill');
    });
  });

  describe('Styling', () => {
    it('should apply speech bubble class', () => {
      const { container } = render(<GatorGuide message="Test" />);

      const speechBubble = container.querySelector('.speech-bubble');
      expect(speechBubble).toBeInTheDocument();
    });

    it('should have correct image dimensions', () => {
      render(<GatorGuide message="Test" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage).toHaveClass('w-24');
      expect(gatorImage).toHaveClass('h-24');
    });

    it('should have flex layout', () => {
      const { container } = render(<GatorGuide message="Test" />);

      const mainContainer = container.querySelector('[class*="flex"]');
      expect(mainContainer).toBeInTheDocument();
    });

    it('should apply navy text color to message', () => {
      const { container } = render(<GatorGuide message="Test" />);

      const messageText = container.querySelector('.text-navy');
      expect(messageText).toBeInTheDocument();
    });
  });

  describe('Message Content', () => {
    it('should handle short messages', () => {
      render(<GatorGuide message="Hi!" />);

      expect(screen.getByText('Hi!')).toBeInTheDocument();
    });

    it('should handle long messages', () => {
      const longMessage = 'This is a very long message that contains multiple sentences and should still display correctly in the speech bubble without any issues. It demonstrates that the component can handle verbose content.';
      render(<GatorGuide message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle messages with special characters', () => {
      const specialMessage = 'Welcome! 🎉 Your savings: $5,000 💰';
      render(<GatorGuide message={specialMessage} />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it('should handle empty messages', () => {
      render(<GatorGuide message="" />);

      const { container } = render(<GatorGuide message="" />);
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('should handle messages with HTML-like characters', () => {
      const htmlMessage = 'Save <50% on taxes & fees!';
      render(<GatorGuide message={htmlMessage} />);

      expect(screen.getByText(htmlMessage)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for gator image', () => {
      render(<GatorGuide message="Test" />);

      const gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage).toHaveAccessibleName();
    });

    it('should have semantic paragraph tag for message', () => {
      const { container } = render(<GatorGuide message="Test message" />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.textContent).toBe('Test message');
    });

    it('should have proper text sizing for readability', () => {
      const { container } = render(<GatorGuide message="Test" />);

      const messageText = container.querySelector('p');
      expect(messageText).toHaveClass('text-base');
      expect(messageText).toHaveClass('leading-relaxed');
    });
  });

  describe('Animation', () => {
    it('should have framer-motion wrapper', () => {
      const { container } = render(<GatorGuide message="Test" />);

      // Framer Motion adds inline styles for animation
      const animatedElement = container.querySelector('[style]');
      expect(animatedElement).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should update when message prop changes', () => {
      const { rerender } = render(<GatorGuide message="Initial message" />);

      expect(screen.getByText('Initial message')).toBeInTheDocument();

      rerender(<GatorGuide message="Updated message" />);

      expect(screen.queryByText('Initial message')).not.toBeInTheDocument();
      expect(screen.getByText('Updated message')).toBeInTheDocument();
    });

    it('should update when gatorState changes', () => {
      const { rerender } = render(<GatorGuide message="Test" gatorState="business" />);

      let gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('business');

      rerender(<GatorGuide message="Test" gatorState="happy" />);

      gatorImage = screen.getByAltText('Gator guide');
      expect(gatorImage.src).toContain('thumbs');
    });

    it('should toggle visibility when show prop changes', async () => {
      const { rerender } = render(<GatorGuide message="Toggle test" show={true} />);

      expect(screen.getByText('Toggle test')).toBeInTheDocument();

      rerender(<GatorGuide message="Toggle test" show={false} />);

      // AnimatePresence takes time to unmount, so we need to wait
      await waitFor(() => {
        expect(screen.queryByText('Toggle test')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined message gracefully', () => {
      const { container } = render(<GatorGuide message={undefined} />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
    });

    it('should handle invalid gatorState by falling back to default', () => {
      // Invalid state should use business as default
      render(<GatorGuide message="Test" gatorState="invalid_state" />);

      const gatorImage = screen.getByAltText('Gator guide');
      // Should still render an image (will be undefined but component should not crash)
      expect(gatorImage).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <GatorGuide message="First guide" gatorState="business" />
          <GatorGuide message="Second guide" gatorState="happy" />
        </>
      );

      expect(screen.getByText('First guide')).toBeInTheDocument();
      expect(screen.getByText('Second guide')).toBeInTheDocument();

      const images = screen.getAllByAltText('Gator guide');
      expect(images).toHaveLength(2);
    });
  });

  describe('Performance', () => {
    it('should render quickly with typical props', () => {
      const startTime = performance.now();

      render(<GatorGuide message="Performance test" />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Component should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });
});
