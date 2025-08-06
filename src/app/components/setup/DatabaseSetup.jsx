'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function DatabaseSetup() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const openSupabaseDashboard = () => {
    window.open('https://supabase.com/dashboard', '_blank');
  };

  const testConnection = async () => {
    setLoading(true);
    setStatus('working');
    setMessage('Testing database connection...');

    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('count', { count: 'exact', head: true });

      if (error) {
        if (error.message?.includes('does not exist') || error.message?.includes('schema cache')) {
          setStatus('needs_setup');
          setMessage('❌ Table does not exist. Click "Create Database Table" to set it up.');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('✅ Database table exists and is accessible!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Connection test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
        🛠️ Database Setup Tool
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
            onClick={openSupabaseDashboard}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Open Supabase Dashboard
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
          <p><strong>Manual Setup Instructions:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Test Database" to check if the table exists</li>
            <li>Click "Open Supabase Dashboard" to go to your project</li>
            <li>Go to SQL Editor → New Query</li>
            <li>Copy and paste the SQL from <code>database-setup.sql</code></li>
            <li>Click "Run" to execute the SQL</li>
            <li>Refresh this page after successful setup</li>
          </ol>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
          <p className="font-semibold mb-2">SQL to run in Supabase:</p>
          <code className="text-xs">
            CREATE TABLE diary_entries (...)<br/>
            -- See database-setup.sql for complete SQL
          </code>
        </div>
      </div>
    </div>
  );
}
