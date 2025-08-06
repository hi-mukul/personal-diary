import Header from './Header'
import { motion } from 'framer-motion'
import { GridBackgroundPage } from '../ui/grid-background'

export default function Layout({ children, onNewEntry }) {
  return (
    <GridBackgroundPage>
      <Header onNewEntry={onNewEntry} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>
    </GridBackgroundPage>
  )
}