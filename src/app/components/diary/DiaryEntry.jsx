import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FiTrash2, FiCalendar, FiTag } from 'react-icons/fi'
import useDiaryStore from '../../hooks/useDiary'
import { GlowingEffect } from '../ui/glowing-effect'

export default function DiaryEntry({ entry, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteEntry } = useDiaryStore()

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true)
    await deleteEntry(entry.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="min-h-[14rem] list-none"
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 cursor-pointer" onClick={onEdit}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            {/* Delete button */}
            <div className="absolute top-0 right-0 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(e)
                }}
                disabled={isDeleting}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
              >
                <FiTrash2 size={16} />
              </motion.button>
            </div>

            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white" title={entry.title || 'Untitled Entry'}>
                {(entry.title || 'Untitled Entry').length > 50 ? `${(entry.title || 'Untitled Entry').substring(0, 50)}...` : (entry.title || 'Untitled Entry')}
              </h3>
              <p className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {(entry.content || 'No content available').substring(0, 150)}...
              </p>
            </div>

            {/* Date and tags section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiCalendar size={14} />
                <span>{format(new Date(entry.updated_at || entry.created_at), 'MMM dd, yyyy')}</span>
              </div>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <FiTag size={14} className="text-gray-500 dark:text-gray-400" />
                  <div className="flex gap-1 flex-wrap">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}