/**
 * Client-Side File Encryption using AES-256-GCM
 *
 * SECURITY NOTES:
 * - Files are encrypted in the browser BEFORE upload
 * - Uses Web Crypto API (AES-256-GCM)
 * - Passphrase is NEVER sent to server
 * - Only encrypted data is uploaded to Firebase Storage
 * - Admin must know passphrase to decrypt files
 */

/**
 * Derive encryption key from passphrase using PBKDF2
 * @param {string} passphrase - User-provided passphrase
 * @param {Uint8Array} salt - Random salt for key derivation
 * @returns {Promise<CryptoKey>} - Derived encryption key
 */
async function deriveKey(passphrase, salt) {
  const encoder = new TextEncoder();
  const passphraseKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000, // High iteration count for security
      hash: 'SHA-256'
    },
    passphraseKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt a file using AES-256-GCM
 * @param {File} file - File to encrypt
 * @param {string} passphrase - Encryption passphrase
 * @returns {Promise<{encryptedBlob: Blob, salt: Uint8Array, iv: Uint8Array}>}
 */
export async function encryptFile(file, passphrase) {
  // Generate random salt and IV
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Derive encryption key from passphrase
  const key = await deriveKey(passphrase, salt);

  // Read file as ArrayBuffer
  const fileBuffer = await file.arrayBuffer();

  // Encrypt the file
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    fileBuffer
  );

  // Convert to Blob for upload
  const encryptedBlob = new Blob([encryptedBuffer], { type: 'application/octet-stream' });

  return {
    encryptedBlob,
    salt: Array.from(salt), // Convert to array for JSON storage
    iv: Array.from(iv),
    originalName: file.name,
    originalSize: file.size,
    originalType: file.type
  };
}

/**
 * Decrypt a file using AES-256-GCM
 * @param {Blob} encryptedBlob - Encrypted file blob
 * @param {string} passphrase - Decryption passphrase
 * @param {Array} saltArray - Salt used during encryption
 * @param {Array} ivArray - IV used during encryption
 * @param {string} originalName - Original filename
 * @param {string} originalType - Original MIME type
 * @returns {Promise<File>} - Decrypted file
 */
export async function decryptFile(
  encryptedBlob,
  passphrase,
  saltArray,
  ivArray,
  originalName,
  originalType
) {
  // Convert arrays back to Uint8Array
  const salt = new Uint8Array(saltArray);
  const iv = new Uint8Array(ivArray);

  // Derive decryption key
  const key = await deriveKey(passphrase, salt);

  // Read encrypted blob as ArrayBuffer
  const encryptedBuffer = await encryptedBlob.arrayBuffer();

  try {
    // Decrypt the file
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encryptedBuffer
    );

    // Convert back to File
    const decryptedBlob = new Blob([decryptedBuffer], { type: originalType });
    return new File([decryptedBlob], originalName, { type: originalType });
  } catch (err) {
    throw new Error('Decryption failed. Wrong passphrase or corrupted file.');
  }
}

/**
 * Generate a secure random passphrase
 * @param {number} length - Length of passphrase (default 32)
 * @returns {string} - Random passphrase
 */
export function generatePassphrase(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const randomValues = window.crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomValues)
    .map(x => chars[x % chars.length])
    .join('');
}

/**
 * Hash a passphrase for verification (without revealing it)
 * @param {string} passphrase - Passphrase to hash
 * @returns {Promise<string>} - SHA-256 hash (hex)
 */
export async function hashPassphrase(passphrase) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passphrase);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
