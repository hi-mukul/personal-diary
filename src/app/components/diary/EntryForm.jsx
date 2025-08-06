import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import useDiaryStore from '../../hooks/useDiary'
import { FiPlus, FiX, FiEdit3, FiTag } from 'react-icons/fi'
import { SmoothButton } from '../ui/smooth-button'

export default function EntryForm({ entry, onSuccess }) {
  const { user } = useAuth()
  const { createEntry, updateEntry } = useDiaryStore()
  
  const [title, setTitle] = useState(entry?.title || '')
  const [content, setContent] = useState(entry?.content || '')
  const [tags, setTags] = useState(entry?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        title,
        content,
        tags,
        user_id: user.id
      }

      if (entry) {
        await updateEntry(entry.id, data)
      } else {
        await createEntry(data)
      }
      
      onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, staggerChildren: 0.1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <FiEdit3 className="text-blue-500" />
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-6 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 dark:text-white transition-all duration-200 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 text-lg"
          placeholder="Enter a title for your entry..."
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <FiEdit3 className="text-green-500" />
          Content (Markdown supported)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-6 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 dark:text-white transition-all duration-200 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 resize-none text-base leading-relaxed"
          placeholder="Write your thoughts..."
          rows={12}
          required
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 px-4 py-2 rounded-xl backdrop-blur-sm"
        >
          💡 You can use **bold**, *italic*, # headers, and more markdown formatting
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <FiTag className="text-purple-500" />
          Tags
        </label>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-6 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 dark:text-white transition-all duration-200 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Add a tag..."
          />
          <SmoothButton
            type="button"
            onClick={addTag}
            variant="primary"
            size="md"
            className="bg-purple-600 hover:bg-purple-700 shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <FiPlus size={16} />
          </SmoothButton>
        </div>
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ delay: index * 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50"
            >
              {tag}
              <motion.button
                type="button"
                onClick={() => removeTag(tag)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors p-1 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
              >
                <FiX size={12} />
              </motion.button>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="flex gap-4 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <SmoothButton
          type="submit"
          disabled={loading}
          variant="success"
          size="lg"
          className="flex-1"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            entry ? 'Update Entry' : 'Create Entry'
          )}
        </SmoothButton>
        <SmoothButton
          type="button"
          onClick={onSuccess}
          variant="secondary"
          size="lg"
          className="px-8"
        >
          Cancel
        </SmoothButton>
      </motion.div>
    </motion.form>
  )
}