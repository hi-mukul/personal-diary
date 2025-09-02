'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import DiaryList from './components/diary/DiaryList';
import EntryModal from './components/diary/EntryModal';
import EntryViewer from './components/diary/EntryViewer';
import AuthForm from './components/auth/AuthForm';
import { GridBackgroundPage } from './components/ui/grid-background';

// TypeScript interface for diary entry
interface DiaryEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}


export default function Home() {
  const { user, loading } = useAuth();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);

  const openModal = (entry: DiaryEntry | null = null) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
    setIsViewMode(false); // Default to edit mode for new entries
  };

  const openViewer = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const switchToEditMode = () => {
    setIsViewMode(false);
  };

  const switchToViewMode = (updatedEntry: DiaryEntry | null = null) => {
    // If we have updated entry data, use it to refresh the selectedEntry
    if (updatedEntry) {
      setSelectedEntry(updatedEntry);
    }
    setIsViewMode(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
    setIsViewMode(false);
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
    return <AuthForm />;
  }

  return (
    <Layout onNewEntry={() => openModal()}>
      <DiaryList onEditEntry={openViewer} />
      <AnimatePresence>
        {isModalOpen && (
          isViewMode ? (
            <EntryViewer
              entry={selectedEntry}
              onEdit={switchToEditMode}
              onClose={closeModal}
            />
          ) : (
            <EntryModal
              entry={selectedEntry}
              onClose={selectedEntry ? switchToViewMode : closeModal}
              onSuccess={selectedEntry ? switchToViewMode : closeModal}
            />
          )
        )}
      </AnimatePresence>
    </Layout>
  );
}
