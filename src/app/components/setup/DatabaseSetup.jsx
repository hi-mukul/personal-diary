'use client';

import { useState } from 'react';
import { db } from '../../lib/firebaseClient';
import { collection, getDocs, query, limit } from 'firebase/firestore';

export default function DatabaseSetup() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const openFirebaseConsole = () => {
    window.open('https://console.firebase.google.com', '_blank');
  };

  const testConnection = async () => {
    setLoading(true);
    setStatus('working');
    setMessage('Testing database connection...');

    try {
      // Try to query the diary_entries collection
      const q = query(collection(db, 'diary_entries'), limit(1));
      await getDocs(q);
      
      setStatus('success');
      setMessage('✅ Firebase Firestore is connected and accessible!');
    } catch (error) {
      if (error.code === 'permission-denied') {
        setStatus('needs_setup');
        setMessage('⚠️ Firestore security rules need to be configured. Please update your Firebase security rules.');
      } else if (error.message?.includes('offline')) {
        setStatus('error');
        setMessage('❌ Unable to connect to Firebase. Please check your internet connection.');
      } else {
        setStatus('error');
        setMessage(`❌ Connection test failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
        🛠️ Firebase Setup Tool
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading && status === 'working' ? 'Testing...' : 'Test Database'}
          </button>

          <button
            onClick={openFirebaseConsole}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Open Firebase Console
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded ${
            status === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
            status === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
            status === 'needs_setup' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' :
            'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
          }`}>
            {message}
          </div>
        )}

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Firebase Setup Instructions:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Open Firebase Console" to access your project</li>
            <li>Go to Firestore Database → Create database</li>
            <li>Choose "Start in production mode"</li>
            <li>Go to Rules tab and update security rules</li>
            <li>Enable Google Sign-In in Authentication → Sign-in method</li>
            <li>Deploy rules from <code>firestore.rules</code> file</li>
          </ol>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
          <p className="font-semibold mb-2">Deploy security rules:</p>
          <code className="text-xs">
            firebase deploy --only firestore:rules
          </code>
        </div>
      </div>
    </div>
  );
}
