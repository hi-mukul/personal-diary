import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FiEdit3, FiCalendar, FiTag, FiX } from 'react-icons/fi'
import { SmoothButton } from '../ui/smooth-button'

export default function EntryViewer({ entry, onEdit, onClose }) {
  // Safety check for entry prop
  if (!entry) {
    return null
  }
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy \'at\' h:mm a')
    } catch (error) {
      return 'Invalid date'
    }
  }

  const formatContent = (content) => {
    // Check if content is null, undefined, or not a string
    if (!content || typeof content !== 'string') {
      return ''
    }

    // Simple markdown-like formatting for display
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800 dark:text-gray-200">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-purple-600 dark:text-purple-400">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">$1</h3>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.4
        }}
        className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
        {/* Header */}
        <motion.div
          className="relative flex items-center justify-between p-6 border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-gray-800/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <FiEdit3 className="text-white" size={22} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                View Entry
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Read your diary entry
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            {/* Edit Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <SmoothButton
                onClick={onEdit}
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <FiEdit3 size={16} className="mr-2" />
                Edit
              </SmoothButton>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-red-200 dark:hover:border-red-800/50 group"
            >
              <FiX size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
          >
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent leading-tight">
                {entry.title || 'Untitled Entry'}
              </h1>

              {/* Date with enhanced styling */}
              <motion.div
                className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FiCalendar size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">
                  {formatDate(entry.updated_at || entry.created_at || new Date().toISOString())}
                </span>
              </motion.div>
            </motion.div>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <FiTag className="text-purple-600 dark:text-purple-400" size={16} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {entry.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200/50 dark:border-purple-700/50 hover:shadow-md transition-all duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="relative"
            >
              {/* Content background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-blue-50/30 dark:from-gray-800/30 dark:via-transparent dark:to-blue-900/20 rounded-2xl -m-4" />

              <div className="relative p-6 rounded-2xl border border-gray-100/50 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-lg selection:bg-blue-200/50 dark:selection:bg-blue-800/50"
                  dangerouslySetInnerHTML={{
                    __html: `<div class="space-y-4">${formatContent(entry.content)}</div>`
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-center p-6 border-t border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-900/60 dark:to-gray-800/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {entry.content.length} characters
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
