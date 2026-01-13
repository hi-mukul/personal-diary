'use client';

import { useState } from 'react';
import { testDatabaseConnection } from '../../utils/testDatabase';
import { diaryService } from '../../lib/diaryService';
import { useAuth } from '../../contexts/AuthContext';

export default function DatabaseDebug() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const runDatabaseTest = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log('=== Starting Database Debug Test ===');
      
      // Test 1: Basic connection
      const connectionResult = await testDatabaseConnection();
      console.log('Connection test result:', connectionResult);
      
      // Test 2: Try to fetch entries if user is authenticated
      if (user) {
        console.log('Testing with authenticated user:', user.uid);
        try {
          const entries = await diaryService.getEntries(user.uid);
          console.log('Entries fetched successfully:', entries);
          setTestResult({
            success: true,
            message: 'Database connection and table access successful!',
            entries: entries.length
          });
        } catch (error) {
          console.error('Failed to fetch entries:', error);
          setTestResult({
            success: false,
            message: `Failed to fetch entries: ${error.message}`,
            error: error
          });
        }
      } else {
        setTestResult({
          success: false,
          message: 'User not authenticated - cannot test database access'
        });
      }
    } catch (error) {
      console.error('Database test failed:', error);
      setTestResult({
        success: false,
        message: `Database test failed: ${error.message}`,
        error: error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        🔧 Database Debug Tool
      </h3>
      
      <button
        onClick={runDatabaseTest}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Run Database Test'}
      </button>
      
      {testResult && (
        <div className={`p-4 rounded ${testResult.success ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
          <p className="font-semibold">
            {testResult.success ? '✅ Success' : '❌ Error'}
          </p>
          <p>{testResult.message}</p>
          {testResult.entries !== undefined && (
            <p>Entries found: {testResult.entries}</p>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Instructions:</strong></p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Click "Run Database Test" to diagnose the issue</li>
          <li>Check the browser console for detailed error logs</li>
          <li>If table doesn't exist, run the SQL from database-setup.sql</li>
          <li>Remove this component after fixing the issue</li>
        </ol>
      </div>
    </div>
  );
}
