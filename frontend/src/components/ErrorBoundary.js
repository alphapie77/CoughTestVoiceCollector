/**
 * Error Boundary component for handling React errors
 */
import React from 'react';
import { logError } from '../utils/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log the error
    logError(error, {
      context: 'react_error_boundary',
      errorInfo: errorInfo,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-5">
                    <div className="error-icon mb-4">
                      <span style={{ fontSize: '4rem' }}>⚠️</span>
                    </div>
                    <h2 className="h4 mb-3">Something went wrong</h2>
                    <p className="text-muted mb-4">
                      We're sorry, but something unexpected happened. 
                      Please try refreshing the page or contact support if the problem persists.
                    </p>
                    
                    {process.env.NODE_ENV === 'development' && (
                      <details className="text-start mb-4">
                        <summary className="btn btn-outline-secondary btn-sm mb-3">
                          Show Error Details
                        </summary>
                        <div className="bg-light p-3 rounded">
                          <h6>Error:</h6>
                          <pre className="text-danger small">
                            {this.state.error && this.state.error.toString()}
                          </pre>
                          <h6>Component Stack:</h6>
                          <pre className="text-muted small">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      </details>
                    )}
                    
                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                      >
                        🔄 Refresh Page
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => window.location.href = '/'}
                      >
                        🏠 Go Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;