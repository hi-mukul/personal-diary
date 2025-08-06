import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { FiLogOut, FiPlus, FiBook } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import SearchBar from '../ui/SearchBar'
import EntryModal from '../diary/EntryModal'

export default function Header({ onNewEntry }) {
  const { user, signOut } = useAuth()

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FiBook className="text-primary-600 dark:text-primary-400" size={28} />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                My Diary
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <SearchBar />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNewEntry}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FiPlus />
                <span className="hidden sm:inline">New Entry</span>
              </motion.button>

              <ThemeToggle />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signOut}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiLogOut size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Removed the state and the conditional rendering of the EntryModal */}
    </>
  )
}