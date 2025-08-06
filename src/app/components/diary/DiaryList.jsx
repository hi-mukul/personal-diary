import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import useDiaryStore from '../../hooks/useDiary'
import DiaryEntry from './DiaryEntry'

export default function DiaryList({ onEditEntry }) {
  const { user } = useAuth()
  const { entries, loading, error, fetchEntries, subscribeToChanges } = useDiaryStore()

  useEffect(() => {
    if (user) {
      fetchEntries(user.id)
      const unsubscribe = subscribeToChanges(user.id)
      return () => unsubscribe()
    }
  }, [user, fetchEntries, subscribeToChanges])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Show database setup error
  if (error === 'DATABASE_NOT_SETUP') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Database Setup Required
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            The diary_entries table doesn't exist in your Supabase database.
          </p>
          <div className="text-sm text-red-600 dark:text-red-400 space-y-2">
            <p><strong>To fix this:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
              <li>Go to your Supabase Dashboard</li>
              <li>Open the SQL Editor</li>
              <li>Run the commands from <code>database-setup.sql</code></li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </div>
      </motion.div>
    )
  }

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No entries yet. Start writing your first diary entry!
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <DiaryEntry key={entry.id} entry={entry} onEdit={() => onEditEntry(entry)} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}