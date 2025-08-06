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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-md w-full"
    >
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search entries..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
      />
      {searchValue && (
        <button
          onClick={() => setSearchValue('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FiX />
        </button>
      )}
    </motion.div>
  )
}