import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { FiEdit2, FiTrash2, FiCalendar, FiTag } from 'react-icons/fi'
import useDiaryStore from '../../hooks/useDiary'
import EntryModal from './EntryModal'

export default function DiaryEntry({ entry }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteEntry } = useDiaryStore()

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteEntry(entry.id)
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-all"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {entry.title}
          </h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              <FiEdit2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              disabled={isDeleting}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors disabled:opacity-50"
            >
              <FiTrash2 size={18} />
            </motion.button>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
          <ReactMarkdown>{entry.content.substring(0, 200)}...</ReactMarkdown>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FiCalendar size={16} />
            <span>{format(new Date(entry.created_at), 'MMM dd, yyyy')}</span>
          </div>
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <FiTag size={16} />
              <div className="flex gap-1">
                {entry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isEditing && (
          <EntryModal
            entry={entry}
            onClose={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}