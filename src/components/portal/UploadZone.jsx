import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, File as FileIcon, CheckCircle, AlertCircle, X, Lock } from 'lucide-react';
import { useFirebase } from '../../hooks/useFirebase.jsx';
import { uploadSuccessConfetti } from '../../utils/confetti';
import { encryptFile, generatePassphrase } from '../../utils/encrypt';

const UploadZone = ({ onUploadSuccess }) => {
  const { uploadDocument, loading } = useFirebase();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('T4');
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [error, setError] = useState(null);
  const [showPassphrasePrompt, setShowPassphrasePrompt] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const fileInputRef = useRef(null);

  const fileTypes = [
    { value: 'T4', label: 'T4 - Employment Income' },
    { value: 'T4A', label: 'T4A - Pension/Other Income' },
    { value: 'T5', label: 'T5 - Investment Income' },
    { value: 'Receipt', label: 'Receipt' },
    { value: 'Invoice', label: 'Invoice' },
    { value: 'Other', label: 'Other Document' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    // Max file size: 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    // Allowed file types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF, JPG, and PNG files are allowed');
    }

    // Block executable files (security)
    const dangerousExtensions = ['.exe', '.sh', '.bat', '.cmd', '.app'];
    const fileExt = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (dangerousExtensions.includes(fileExt)) {
      throw new Error('This file type is not allowed for security reasons');
    }

    return true;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = async (file) => {
    try {
      setError(null);
      validateFile(file);
      setSelectedFile(file);
    } catch (err) {
      setError(err.message);
      setUploadStatus('error');
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!selectedFile) return;
    // Show passphrase prompt
    setShowPassphrasePrompt(true);
    // Generate a secure random passphrase
    const randomPassphrase = generatePassphrase(24);
    setPassphrase(randomPassphrase);
  };

  const handleUpload = async () => {
    if (!selectedFile || !passphrase) return;

    try {
      setUploadStatus('uploading');
      setError(null);
      setShowPassphrasePrompt(false);

      console.log('🔐 Encrypting file client-side...');

      // STEP 1: Encrypt file client-side using AES-256-GCM
      const encryptedData = await encryptFile(selectedFile, passphrase);

      console.log('✅ File encrypted successfully');
      console.log('🔑 Passphrase (SAVE THIS!):', passphrase);
      console.log('📤 Uploading encrypted file to Firebase...');

      // STEP 2: Create a new File object from encrypted blob
      const encryptedFile = new File(
        [encryptedData.encryptedBlob],
        `encrypted_${selectedFile.name}`,
        { type: 'application/octet-stream' }
      );

      // STEP 3: Upload encrypted file to Firebase Storage WITH encryption metadata
      const encryptionMetadata = {
        salt: encryptedData.salt,
        iv: encryptedData.iv,
        originalName: encryptedData.originalName,
        originalSize: encryptedData.originalSize,
        originalType: encryptedData.originalType
      };

      const result = await uploadDocument(encryptedFile, fileType, encryptionMetadata);

      if (!result.success) {
        throw new Error(result.error);
      }

      console.log('✅ File uploaded successfully!');
      console.log('⚠️  IMPORTANT: Save this passphrase to decrypt:', passphrase);

      setUploadStatus('success');
      uploadSuccessConfetti();

      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess({
          ...result,
          encryptionMetadata: {
            salt: encryptedData.salt,
            iv: encryptedData.iv,
            originalName: encryptedData.originalName,
            originalSize: encryptedData.originalSize,
            originalType: encryptedData.originalType
          }
        });
      }

      // Reset after 5 seconds (give time to copy passphrase)
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus('idle');
        setPassphrase('');
      }, 5000);
    } catch (err) {
      console.error('❌ Upload error:', err);
      setError(err.message);
      setUploadStatus('error');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setError(null);
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-navy mb-4">Upload Documents</h3>

      {/* Upload Zone */}
      <div
        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          disabled={loading || uploadStatus === 'uploading'}
        />

        {!selectedFile ? (
          <>
            <Upload className="w-16 h-16 text-gator-green-dark mx-auto mb-4" />
            <p className="text-lg font-semibold text-navy mb-2">
              Drop your T4 here or click to browse
            </p>
            <p className="text-sm text-gray-600">
              Supported: PDF, JPG, PNG (Max 10MB)
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileIcon className="w-10 h-10 text-gator-green-dark" />
              <div>
                <p className="font-semibold text-navy">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-gray-500 hover:text-red-600 transition-colors"
              disabled={uploadStatus === 'uploading'}
            >
              <X size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {uploadStatus === 'error' && error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center text-red-600 bg-red-50 p-3 rounded-lg"
        >
          <AlertCircle className="mr-2" size={20} />
          <span>{error}</span>
        </motion.div>
      )}

      {uploadStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 flex items-center text-success bg-green-50 p-3 rounded-lg"
        >
          <CheckCircle className="mr-2" size={20} />
          <span>File uploaded successfully! 🎉</span>
        </motion.div>
      )}

      {/* File Type Selection */}
      {selectedFile && !showPassphrasePrompt && uploadStatus === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="form-input"
          >
            {fileTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Passphrase Prompt Modal */}
      {showPassphrasePrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPassphrasePrompt(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <Lock className="text-gator-green-dark mr-2" size={24} />
              <h3 className="text-xl font-bold text-navy">Encryption Passphrase</h3>
            </div>

            <p className="text-gray-700 mb-4">
              Your file will be encrypted with this passphrase before upload.
              <strong className="text-red-600"> Save this passphrase!</strong> Your accountant
              will need it to decrypt your file.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm break-all">
              {passphrase}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Important:</strong> Copy this passphrase now! It cannot be recovered later.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(passphrase);
                  alert('Passphrase copied to clipboard!');
                }}
                className="flex-1 btn-secondary"
              >
                Copy Passphrase
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 btn-primary"
              >
                I've Saved It - Upload
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Upload Button */}
      {selectedFile && uploadStatus !== 'success' && !showPassphrasePrompt && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleUploadClick}
          disabled={uploadStatus === 'uploading'}
          className="mt-4 w-full btn-primary"
        >
          {uploadStatus === 'uploading' ? (
            <>
              <div className="spinner mr-2"></div>
              Encrypting & Uploading...
            </>
          ) : (
            <>
              <Lock className="inline mr-2" size={20} />
              Encrypt & Upload Securely
            </>
          )}
        </motion.button>
      )}

      {/* Helper Text */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        🔒 Files are encrypted with AES-256-GCM before upload for maximum security
      </p>
    </div>
  );
};

export default UploadZone;
