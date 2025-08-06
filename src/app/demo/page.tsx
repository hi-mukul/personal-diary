'use client';

import { DiaryCard } from '../components/diary/DiaryCard';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Diary App Features
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the powerful features that make journaling a delightful experience
          </p>
        </div>
        
        <DiaryCard />
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}
