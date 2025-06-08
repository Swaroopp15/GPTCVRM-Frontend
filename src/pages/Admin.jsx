import React, { useEffect, useState } from 'react';
import SideBar from '../components/admin/Sidebar/SideBar';
import { Outlet, useNavigate } from 'react-router';
import { isLoggedIn } from '../functions/auth';
import Spinner from '../components/hero/Spinner';
import Footer from '../pages/Footer';

function Admin() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    error: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (!loggedIn) {
          navigate("/login", { replace: true });
          return;
        }
        setAuthStatus({
          loading: false,
          error: null,
          isAuthenticated: true
        });
      } catch (error) {
        console.error("Error checking login status:", error);
        setAuthStatus({
          loading: false,
          error: error.message || "Failed to verify authentication status",
          isAuthenticated: false
        });
      }
    };

    checkAuth();
  }, [navigate]);

  if (authStatus.loading) {
    return <Spinner message="Verifying session..." />;
  }

  if (authStatus.error && !authStatus.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Authentication Error</h2>
            <p className="text-gray-600 mt-2">{authStatus.error}</p>
            <div className="mt-6 space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50">
      <SideBar />
      <div className="bg-gray-900 opacity-50 hidden fixed inset-1 z-0" id="sidebarBackdrop" />
      <div id="main-content" className="flex-1 min-h-screen lg:ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;