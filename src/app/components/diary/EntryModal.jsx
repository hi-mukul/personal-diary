import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import EntryForm from './EntryForm'

export default function EntryModal({ entry, onClose, onSuccess }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          duration: 0.3
        }}
        className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-800/10 pointer-events-none rounded-3xl" />

        {/* Header */}
        <div className="relative flex justify-between items-center p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            {entry ? 'Edit Entry' : 'New Entry'}
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-2xl transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <FiX size={20} className="text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="relative p-8 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          <EntryForm entry={entry} onSuccess={onSuccess || onClose} />
        </div>
      </motion.div>
    </motion.div>
  )
}