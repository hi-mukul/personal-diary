import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import useDiaryStore from '../../hooks/useDiary'
import { FiPlus, FiX } from 'react-icons/fi'
import { Button } from '../ui/moving-border'

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          placeholder="Enter a title for your entry..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content (Markdown supported)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none"
          placeholder="Write your thoughts..."
          rows={10}
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          You can use **bold**, *italic*, # headers, and more
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            placeholder="Add a tag..."
          />
          <Button
            type="button"
            onClick={addTag}
            borderRadius="0.5rem"
            className="bg-blue-600 dark:bg-blue-700 text-white border-blue-400 dark:border-blue-600"
            containerClassName="w-10 h-10"
          >
            <FiPlus />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-primary-900 dark:hover:text-primary-100"
              >
                <FiX size={14} />
              </button>
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          borderRadius="0.75rem"
          className="bg-green-600 dark:bg-green-700 text-white border-green-400 dark:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          containerClassName="flex-1 h-12"
        >
          {loading ? 'Saving...' : (entry ? 'Update Entry' : 'Create Entry')}
        </Button>
        <Button
          type="button"
          onClick={onSuccess}
          borderRadius="0.75rem"
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          containerClassName="w-24 h-12"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}