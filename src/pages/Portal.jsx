import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FileText, MessageSquare, DollarSign, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useFirebase } from '../hooks/useFirebase.jsx';
import { useLanguage } from '../hooks/useLanguage';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import GatorGuide from '../components/portal/GatorGuide';
import StatusTracker from '../components/portal/StatusTracker';
import UploadZone from '../components/portal/UploadZone';
import { statusUpgradeConfetti } from '../utils/confetti';

const Portal = () => {
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const { getDashboardData, loading: dataLoading } = useFirebase();
  const { t } = useLanguage();

  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [gatorMessage, setGatorMessage] = useState('');
  const [gatorState, setGatorState] = useState('business');

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboard();
      setInitialGatorMessage();
    }
  }, [isAuthenticated, user]);

  const loadDashboard = async () => {
    try {
      const result = await getDashboardData();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        console.error('Failed to load dashboard:', result.error);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  const setInitialGatorMessage = () => {
    if (user) {
      setGatorMessage(
        t('portal.welcome', { name: user.firstName || 'there' })
      );
      setGatorState('business');
    }
  };

  const handleUploadSuccess = (result) => {
    // Trigger confetti
    statusUpgradeConfetti();

    // Update Gator message
    setGatorMessage(t('portal.uploadSuccess', { status: 'Silver' }));
    setGatorState('happy');

    // Reload dashboard to get updated status
    setTimeout(() => {
      loadDashboard();
    }, 1000);
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Redirect if not authenticated
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Loading state
  if (authLoading || (isAuthenticated && !dashboardData)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gator-green-light to-white">
        <div className="text-center">
          <Loader className="animate-spin w-12 h-12 text-gator-green-dark mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t('portal.tabs.overview'), icon: FileText },
    { id: 'documents', label: t('portal.tabs.documents'), icon: FileText },
    { id: 'messages', label: t('portal.tabs.messages'), icon: MessageSquare },
    { id: 'payments', label: t('portal.tabs.payments'), icon: DollarSign }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">
              Welcome back, {dashboardData.client.firstName}!
            </h1>
            <p className="text-gray-600">
              Estimated savings: <span className="font-bold text-gator-green-dark">${dashboardData.client.estimatedSavings?.toLocaleString() || 0}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>

        {/* Gator Guide */}
        <GatorGuide
          message={gatorMessage}
          gatorState={gatorState}
          show={true}
        />

        {/* Status Tracker */}
        <StatusTracker currentStatus={dashboardData.client.status} />

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-gator-green-dark text-gator-green-dark'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mr-2" size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UploadZone onUploadSuccess={handleUploadSuccess} />

                {/* Quick Stats */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-navy mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Documents Uploaded</span>
                      <span className="font-bold text-gator-green-dark">{dashboardData.documents.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Messages</span>
                      <span className="font-bold text-gator-green-dark">{dashboardData.messages.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Member Since</span>
                      <span className="font-bold text-gator-green-dark">
                        {dashboardData.client.createdAt ? new Date(dashboardData.client.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Your Documents</h3>
                {dashboardData.documents.length === 0 ? (
                  <p className="text-gray-600">No documents uploaded yet. Upload your first document to get started!</p>
                ) : (
                  <div className="space-y-3">
                    {dashboardData.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="text-gator-green-dark" />
                          <div>
                            <p className="font-semibold">{doc.fileName}</p>
                            <p className="text-sm text-gray-600">
                              Uploaded {doc.uploadedAt ? new Date(doc.uploadedAt.toDate()).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Messages</h3>
                {dashboardData.messages.length === 0 ? (
                  <p className="text-gray-600">No messages yet. Your accountant will reach out soon!</p>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-lg ${
                          msg.sender === 'admin'
                            ? 'bg-gator-green-light text-left'
                            : 'bg-gray-100 text-right ml-12'
                        }`}
                      >
                        <p className="text-sm text-gray-700">{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.sentAt ? new Date(msg.sentAt.toDate()).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Payment History</h3>
                <p className="text-gray-600">No payments yet. Your accountant will send you an invoice once your tax return is ready.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portal;
