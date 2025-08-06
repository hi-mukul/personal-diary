'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import DiaryList from './components/diary/DiaryList';
import EntryModal from './components/diary/EntryModal';
import AuthForm from './components/auth/AuthForm';
import { DiaryCard } from './components/diary/DiaryCard';


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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Your Personal Diary
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Capture your thoughts, memories, and daily experiences in a beautiful, secure digital journal
            </p>
          </div>

          <DiaryCard />

          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-md">
              <AuthForm />
            </div>
          </div>
        </div>
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
