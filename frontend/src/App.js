import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { checkBrowserSupport } from './utils/helpers';
import './App.css';

// Import critical pages directly for faster loading
import Home from './pages/Home';
import RecordCough from './pages/RecordCough';

// Lazy load less critical pages
const ViewRecordings = React.lazy(() => import('./pages/ViewRecordings'));
const Statistics = React.lazy(() => import('./pages/Statistics'));
const About = React.lazy(() => import('./pages/About'));

// Fast loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
    <div className="text-center">
      <div className="spinner-border text-primary" style={{width: '2rem', height: '2rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading page...</p>
    </div>
  </div>
);

// Browser compatibility warning
const BrowserWarning = () => {
  const support = checkBrowserSupport();
  
  if (support.isSupported) return null;
  
  return (
    <div className="alert alert-warning m-3" role="alert">
      <h6>⚠️ Browser Compatibility Notice</h6>
      <p className="mb-0">
        Some features may not work properly in your browser. 
        For the best experience, please use a modern browser like Chrome, Firefox, or Safari.
      </p>
      <small className="text-muted">
        Missing features: {Object.entries(support)
          .filter(([key, value]) => key !== 'isSupported' && !value)
          .map(([key]) => key)
          .join(', ')}
      </small>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="App">
          <BrowserWarning />
          <Navbar />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/record" element={<RecordCough />} />
                <Route path="/recordings" element={<ViewRecordings />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={
                  <div className="container py-5 text-center">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;