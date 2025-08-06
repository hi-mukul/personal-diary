'use client';

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import useDebounce from '../../hooks/useDebounce'
import useDiaryStore from '../../hooks/useDiary'

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const { setSearchTerm } = useDiaryStore()
  const debouncedSearch = useDebounce(searchValue, 500)

  useEffect(() => {
    setSearchTerm(debouncedSearch)
  }, [debouncedSearch, setSearchTerm])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full"
    >
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <FiSearch size={18} />
      </motion.div>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search your thoughts..."
        className="w-full pl-12 pr-12 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 dark:text-white transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium shadow-sm"
      />

      {searchValue && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSearchValue('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          <FiX size={16} />
        </motion.button>
      )}
    </motion.div>
  )
}