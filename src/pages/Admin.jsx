import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, FileText, Download, Filter, Search, LogOut,
  ChevronDown, Lock, Unlock, TrendingUp, DollarSign, Mail
} from 'lucide-react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { decryptFile } from '../utils/encrypt';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const ADMIN_EMAIL = 'satindersandhu138@gmail.com';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDocuments, setClientDocuments] = useState([]);
  const [passphrasePrompt, setPassphrasePrompt] = useState(null);

  const isAdmin = isAuthenticated && user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) {
      loadAllClients();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, statusFilter, provinceFilter]);

  const loadAllClients = async () => {
    try {
      setLoading(true);
      const clientsRef = collection(db, 'clients');
      const clientsQuery = query(clientsRef, orderBy('createdAt', 'desc'));
      const clientsSnap = await getDocs(clientsQuery);

      const clientsData = clientsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setClients(clientsData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading clients:', err);
      setLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = [...clients];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    // Province filter
    if (provinceFilter !== 'all') {
      filtered = filtered.filter(client => client.province === provinceFilter);
    }

    setFilteredClients(filtered);
  };

  const loadClientDocuments = async (clientId) => {
    try {
      const docsRef = collection(db, `clients/${clientId}/documents`);
      const docsQuery = query(docsRef, orderBy('uploadedAt', 'desc'));
      const docsSnap = await getDocs(docsQuery);

      const docs = docsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setClientDocuments(docs);
      setSelectedClient(clients.find(c => c.id === clientId));
    } catch (err) {
      console.error('Error loading documents:', err);
    }
  };

  const handleDownloadEncrypted = async (doc) => {
    setPassphrasePrompt(doc);
  };

  const handleDecryptAndDownload = async (passphrase) => {
    const doc = passphrasePrompt;
    try {
      // Fetch encrypted file from URL
      const response = await fetch(doc.fileUrl);
      const encryptedBlob = await response.blob();

      // Decrypt file
      const decryptedFile = await decryptFile(
        encryptedBlob,
        passphrase,
        doc.encryptionMeta.salt,
        doc.encryptionMeta.iv,
        doc.encryptionMeta.originalName,
        doc.encryptionMeta.originalType
      );

      // Download decrypted file
      const url = URL.createObjectURL(decryptedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = decryptedFile.name;
      a.click();
      URL.revokeObjectURL(url);

      setPassphrasePrompt(null);
      alert('File decrypted and downloaded successfully!');
    } catch (err) {
      alert('Decryption failed. Wrong passphrase or corrupted file.');
      console.error(err);
    }
  };

  const stats = {
    total: clients.length,
    bronze: clients.filter(c => c.status === 'bronze').length,
    silver: clients.filter(c => c.status === 'silver').length,
    gold: clients.filter(c => c.status === 'gold').length,
    totalSavings: clients.reduce((sum, c) => sum + (c.estimatedSavings || 0), 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Show admin login if not authenticated as admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 max-w-md w-full text-center"
          >
            <Lock className="w-16 h-16 text-gator-green-dark mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-navy mb-2">Admin Access</h1>
            <p className="text-gray-600 mb-6">
              This area is restricted to administrators only.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Please sign in with the admin account to access the dashboard.
            </p>
            <a href="/sign-in" className="btn-primary w-full inline-block">
              Go to Sign In
            </a>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">
            🐊 Gator Admin CRM
          </h1>
          <p className="text-gray-600">
            Manage clients, view documents, and track conversions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-navy">{stats.total}</p>
              </div>
              <Users className="text-gator-green-dark" size={32} />
            </div>
          </div>

          <div className="card p-4">
            <p className="text-sm text-gray-600">Bronze</p>
            <p className="text-2xl font-bold text-gray-500">{stats.bronze}</p>
          </div>

          <div className="card p-4">
            <p className="text-sm text-gray-600">Silver</p>
            <p className="text-2xl font-bold text-gray-400">{stats.silver}</p>
          </div>

          <div className="card p-4">
            <p className="text-sm text-gray-600">Gold</p>
            <p className="text-2xl font-bold text-gold">{stats.gold}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-gator-green-dark">
                  ${stats.totalSavings.toLocaleString()}
                </p>
              </div>
              <DollarSign className="text-gator-green-dark" size={32} />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
              >
                <option value="all">All Status</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            {/* Province Filter */}
            <div>
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="form-input"
              >
                <option value="all">All Provinces</option>
                <option value="ON">Ontario</option>
                <option value="QC">Quebec</option>
                <option value="BC">British Columbia</option>
                <option value="AB">Alberta</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Province
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Savings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.province || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                        client.status === 'silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {client.status?.toUpperCase() || 'BRONZE'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${client.estimatedSavings?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.createdAt ? new Date(client.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => loadClientDocuments(client.id)}
                        className="text-gator-green-dark hover:text-gator-green"
                      >
                        View Files
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Documents Modal */}
        {selectedClient && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedClient(null);
              setClientDocuments([]);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-navy">
                  {selectedClient.firstName} {selectedClient.lastName}'s Files
                </h3>
                <button
                  onClick={() => {
                    setSelectedClient(null);
                    setClientDocuments([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {clientDocuments.length === 0 ? (
                <p className="text-gray-600">No documents uploaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {clientDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {doc.encrypted ? <Lock size={20} className="text-red-600" /> : <Unlock size={20} className="text-green-600" />}
                        <div>
                          <p className="font-semibold">
                            {doc.encryptionMeta?.originalName || doc.fileName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {doc.fileType} • {doc.encrypted ? 'Encrypted' : 'Not Encrypted'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadEncrypted(doc)}
                        className="btn-primary text-sm"
                      >
                        <Download size={16} className="inline mr-1" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Passphrase Prompt Modal */}
        {passphrasePrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-navy mb-4">Enter Passphrase to Decrypt</h3>
              <p className="text-gray-700 mb-4">
                This file is encrypted. Enter the passphrase the client used to encrypt it.
              </p>
              <input
                type="password"
                placeholder="Enter passphrase..."
                className="form-input mb-4"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleDecryptAndDownload(e.target.value);
                  }
                }}
                id="passphraseInput"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setPassphrasePrompt(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const passphrase = document.getElementById('passphraseInput').value;
                    handleDecryptAndDownload(passphrase);
                  }}
                  className="flex-1 btn-primary"
                >
                  Decrypt & Download
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
