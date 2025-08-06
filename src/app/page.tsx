'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import DiaryList from './components/diary/DiaryList';
import EntryModal from './components/diary/EntryModal';
import AuthForm from './components/auth/AuthForm';


export default function Home() {
  const { user, loading } = useAuth();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (entry = null) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <AuthForm />
      </div>
    );
  }

  return (
    <Layout onNewEntry={() => openModal()}>
      <DiaryList onEditEntry={openModal} />
      <AnimatePresence>
        {isModalOpen && (
          <EntryModal entry={selectedEntry} onClose={closeModal} />
        )}
      </AnimatePresence>
    </Layout>
  );
}
