'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import DiaryList from './components/diary/DiaryList';
import EntryModal from './components/diary/EntryModal';
import AuthForm from './components/auth/AuthForm';
import { GridBackgroundPage } from './components/ui/grid-background';


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
      <GridBackgroundPage>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </GridBackgroundPage>
    );
  }

  if (!user) {
    return (
      <GridBackgroundPage>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to DivineLog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Capture your thoughts, memories, and daily experiences in a beautiful, secure digital journal
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <AuthForm />
            </div>
          </div>
        </div>
      </GridBackgroundPage>
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
