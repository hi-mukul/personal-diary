import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import useDiaryStore from '../../hooks/useDiary'
import DiaryEntry from './DiaryEntry'

export default function DiaryList() {
  const { user } = useAuth()
  const { entries, loading, fetchEntries, subscribeToChanges } = useDiaryStore()

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
          <DiaryEntry key={entry.id} entry={entry} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}