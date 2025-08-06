import { useAuth } from '../../contexts/AuthContext'
import { FiLogOut, FiPlus, FiBook } from 'react-icons/fi'
import SearchBar from '../ui/SearchBar'
import { SmoothButton } from '../ui/smooth-button'

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
                DivineLog
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <SearchBar />
              
              <SmoothButton
                onClick={onNewEntry}
                variant="primary"
                size="md"
              >
                <FiPlus size={16} />
                <span className="hidden sm:inline">New Entry</span>
              </SmoothButton>

              <SmoothButton
                onClick={signOut}
                variant="danger"
                size="md"
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </SmoothButton>
            </div>
          </div>
        </div>
      </header>

      {/* Removed the state and the conditional rendering of the EntryModal */}
    </>
  )
}