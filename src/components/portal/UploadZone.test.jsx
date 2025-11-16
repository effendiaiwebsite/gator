import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadZone from './UploadZone';

// Mock confetti utility
vi.mock('../../utils/confetti', () => ({
  uploadSuccessConfetti: vi.fn(),
}));

// Mock useXano hook
const mockUploadDocument = vi.fn();
vi.mock('../../hooks/useXano', () => ({
  useXano: () => ({
    uploadDocument: mockUploadDocument,
    loading: false,
  }),
}));

describe('UploadZone Component', () => {
  beforeEach(() => {
    mockUploadDocument.mockClear();
    mockUploadDocument.mockResolvedValue({
      success: true,
      document_id: 123,
    });
  });

  describe('Rendering', () => {
    it('should render component title', () => {
      render(<UploadZone />);

      expect(screen.getByText('Upload Documents')).toBeInTheDocument();
    });

    it('should render upload instructions', () => {
      render(<UploadZone />);

      expect(screen.getByText(/Drop your T4 here or click to browse/i)).toBeInTheDocument();
    });

    it('should show supported file types', () => {
      render(<UploadZone />);

      expect(screen.getByText(/Supported: PDF, JPG, PNG \(Max 10MB\)/i)).toBeInTheDocument();
    });

    it('should render upload icon', () => {
      const { container } = render(<UploadZone />);

      const uploadIcon = container.querySelector('svg');
      expect(uploadIcon).toBeInTheDocument();
    });

    it('should show security message', () => {
      render(<UploadZone />);

      expect(screen.getByText(/Your files are encrypted before upload/i)).toBeInTheDocument();
    });
  });

  describe('File Selection', () => {
    it('should accept file through click and browse', async () => {
      render(<UploadZone />);

      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });

    it('should show file name after selection', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'document.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('document.pdf')).toBeInTheDocument();
      });
    });

    it('should show file size after selection', async () => {
      render(<UploadZone />);

      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText(/KB/i)).toBeInTheDocument();
      });
    });

    it('should show upload button after file selection', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Upload Document/i })).toBeInTheDocument();
      });
    });
  });

  describe('File Validation', () => {
    it('should accept PDF files', async () => {
      render(<UploadZone />);

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
        expect(screen.queryByText(/not allowed/i)).not.toBeInTheDocument();
      });
    });

    it('should accept JPG files', async () => {
      render(<UploadZone />);

      const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('image.jpg')).toBeInTheDocument();
      });
    });

    it('should accept PNG files', async () => {
      render(<UploadZone />);

      const file = new File(['content'], 'image.png', { type: 'image/png' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('image.png')).toBeInTheDocument();
      });
    });

    it('should reject files larger than 10MB', async () => {
      render(<UploadZone />);

      // Create 11MB file
      const largeContent = new Array(11 * 1024 * 1024).fill('a').join('');
      const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText(/File size must be less than 10MB/i)).toBeInTheDocument();
      });
    });

    it('should reject unsupported file types', async () => {
      render(<UploadZone />);

      const file = new File(['content'], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const input = document.querySelector('input[type="file"]');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText(/Only PDF, JPG, and PNG files are allowed/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should validate and reject dangerous file extensions', async () => {
      render(<UploadZone />);

      const dangerousFiles = [
        new File(['malware'], 'virus.exe', { type: 'application/x-msdownload' }),
        new File(['#!/bin/bash'], 'script.sh', { type: 'application/x-sh' }),
        new File(['@echo off'], 'script.bat', { type: 'application/x-bat' }),
      ];

      for (const file of dangerousFiles) {
        const input = document.querySelector('input[type="file"]');
        fireEvent.change(input, { target: { files: [file] } });

        // Check that error div appears (validation is working)
        await waitFor(() => {
          const errorDiv = document.querySelector('.text-red-600');
          expect(errorDiv).toBeInTheDocument();
        }, { timeout: 2000 });

        // Clear for next iteration
        const { container } = render(<UploadZone />);
      }
    });
  });

  describe('File Upload', () => {
    it('should upload file when button clicked', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Upload Document/i })).toBeInTheDocument();
      });

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(mockUploadDocument).toHaveBeenCalledWith(file, 'T4');
      });
    });

    it('should show uploading state', async () => {
      mockUploadDocument.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
      });
    });

    it('should show success message after upload', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(screen.getByText(/File uploaded successfully/i)).toBeInTheDocument();
      });
    });

    it('should call onUploadSuccess callback', async () => {
      const mockCallback = vi.fn();
      render(<UploadZone onUploadSuccess={mockCallback} />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalled();
      });
    });

    it('should handle upload errors', async () => {
      mockUploadDocument.mockRejectedValue(new Error('Network error'));

      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(screen.getByText(/Network error/i)).toBeInTheDocument();
      });
    });
  });

  describe('Drag and Drop', () => {
    it('should activate on drag enter', () => {
      const { container } = render(<UploadZone />);

      const dropZone = container.querySelector('.upload-zone');

      fireEvent.dragEnter(dropZone);

      expect(dropZone).toHaveClass('drag-active');
    });

    it('should deactivate on drag leave', () => {
      const { container } = render(<UploadZone />);

      const dropZone = container.querySelector('.upload-zone');

      fireEvent.dragEnter(dropZone);
      fireEvent.dragLeave(dropZone);

      expect(dropZone).not.toHaveClass('drag-active');
    });

    it('should handle file drop', async () => {
      const { container } = render(<UploadZone />);

      const file = new File(['test'], 'dropped.pdf', { type: 'application/pdf' });
      const dropZone = container.querySelector('.upload-zone');

      fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [file],
        },
      });

      await waitFor(() => {
        expect(screen.getByText('dropped.pdf')).toBeInTheDocument();
      });
    });

    it('should prevent default on drag over', () => {
      const { container } = render(<UploadZone />);

      const dropZone = container.querySelector('.upload-zone');
      const event = new Event('dragover', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      dropZone.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('File Removal', () => {
    it('should show remove button after file selection', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        const removeButton = document.querySelector('button[class*="text-gray-500"]');
        expect(removeButton).toBeInTheDocument();
      });
    });

    it('should remove file when X button clicked', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });

      const removeButton = document.querySelector('button[class*="text-gray-500"]');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
      });
    });

    it('should clear error when file removed', async () => {
      render(<UploadZone />);

      const file = new File(['x'.repeat(11 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText(/File size must be less than 10MB/i)).toBeInTheDocument();
      });

      // Now upload a valid file
      const validFile = new File(['test'], 'valid.pdf', { type: 'application/pdf' });
      await userEvent.upload(input, validFile);

      await waitFor(() => {
        expect(screen.queryByText(/File size must be less than 10MB/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('UI States', () => {
    it('should apply card styling', () => {
      const { container } = render(<UploadZone />);

      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
    });

    it('should have hidden file input', () => {
      render(<UploadZone />);

      const input = document.querySelector('input[type="file"]');
      expect(input).toHaveClass('hidden');
    });

    it('should show error with red styling', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const input = document.querySelector('input[type="file"]');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        const errorDiv = document.querySelector('.text-red-600');
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('bg-red-50');
      }, { timeout: 3000 });
    });

    it('should show success with green styling', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        const successDiv = screen.getByText(/File uploaded successfully/i).closest('div');
        expect(successDiv).toHaveClass('text-success');
      });
    });

    it('should disable input during upload', async () => {
      mockUploadDocument.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(input).toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading', () => {
      render(<UploadZone />);

      const heading = screen.getByRole('heading', { name: /Upload Documents/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have file input with accept attribute', () => {
      render(<UploadZone />);

      const input = document.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('accept', '.pdf,.jpg,.jpeg,.png');
    });

    it('should have descriptive button text', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Upload Document/i })).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle no callback provided', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });

      // Should not throw
      expect(() => {
        fireEvent.click(uploadButton);
      }).not.toThrow();
    });

    it('should handle empty file drop', () => {
      const { container } = render(<UploadZone />);

      const dropZone = container.querySelector('.upload-zone');

      fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [],
        },
      });

      // Should not crash
      expect(screen.getByText(/Drop your T4 here/i)).toBeInTheDocument();
    });

    it('should show success message after upload', async () => {
      render(<UploadZone />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const input = document.querySelector('input[type="file"]');

      await userEvent.upload(input, file);

      const uploadButton = screen.getByRole('button', { name: /Upload Document/i });
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(screen.getByText(/File uploaded successfully/i)).toBeInTheDocument();
      });

      // Verify the success callback was triggered
      expect(mockUploadDocument).toHaveBeenCalledWith(file, 'T4');
    });
  });
});
