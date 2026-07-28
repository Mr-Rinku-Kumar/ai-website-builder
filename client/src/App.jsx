import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { ToastProvider } from './hooks/useToast';

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen">
        <Home />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ToastProvider>
  );
}

export default App;