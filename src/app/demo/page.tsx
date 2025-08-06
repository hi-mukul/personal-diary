'use client';

import { DiaryCard } from '../components/diary/DiaryCard';
import { GridBackgroundPage } from '../components/ui/grid-background';
import { Button } from '../components/ui/moving-border';

export default function DemoPage() {
  return (
    <GridBackgroundPage>
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            DivineLog Features
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the powerful features that make journaling a delightful experience
          </p>
        </div>

        <DiaryCard />

        <div className="mt-12 text-center">
          <Button
            borderRadius="0.75rem"
            className="bg-blue-600 dark:bg-blue-700 text-white border-blue-400 dark:border-blue-600"
            containerClassName="w-48 h-12"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </GridBackgroundPage>
  );
}
