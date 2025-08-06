'use client';

import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from './moving-border'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      borderRadius="0.5rem"
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
      containerClassName="w-10 h-10"
    >
      {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
    </Button>
  )
}