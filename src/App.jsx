import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Portal from './pages/Portal';
import Admin from './pages/Admin';
import Services from './pages/Services';
import IndividualTax from './pages/services/Individual';
import CorporateTax from './pages/services/Corporate';
import Bookkeeping from './pages/services/Bookkeeping';
import Payroll from './pages/services/Payroll';
import Audit from './pages/services/Audit';
import LMIA from './pages/services/LMIA';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Learn from './pages/Learn';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/individual" element={<IndividualTax />} />
          <Route path="/services/corporate" element={<CorporateTax />} />
          <Route path="/services/bookkeeping" element={<Bookkeeping />} />
          <Route path="/services/payroll" element={<Payroll />} />
          <Route path="/services/audit" element={<Audit />} />
          <Route path="/services/lmia" element={<LMIA />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
