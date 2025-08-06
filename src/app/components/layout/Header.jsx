import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { FiLogOut, FiPlus, FiBook, FiHeart } from 'react-icons/fi'
import SearchBar from '../ui/SearchBar'
import { SmoothButton } from '../ui/smooth-button'

export default function Header({ onNewEntry }) {
  const { user, signOut } = useAuth()

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-900/5"
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25"
              >
                <FiBook className="text-white" size={24} />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <div className="flex flex-col">
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  DivineLog
                </motion.h1>
                <motion.p
                  className="text-xs text-gray-500 dark:text-gray-400 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your Personal Journal
                </motion.p>
              </div>
            </motion.div>

            {/* Center Section - Search */}
            <motion.div
              className="hidden md:flex flex-1 max-w-md mx-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <SearchBar />
            </motion.div>

            {/* Right Section - Actions */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              {/* User Info */}
              <motion.div
                className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <FiHeart className="text-white" size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Writer
                  </span>
                </div>
              </motion.div>

              {/* Mobile Search */}
              <div className="md:hidden">
                <SearchBar />
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <SmoothButton
                  onClick={onNewEntry}
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  <FiPlus size={16} />
                  <span className="hidden sm:inline">New Entry</span>
                </SmoothButton>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                <SmoothButton
                  onClick={signOut}
                  variant="danger"
                  size="md"
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
                >
                  <FiLogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </SmoothButton>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </motion.header>
    </>
  )
}