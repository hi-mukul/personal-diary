"use client";

import { Calendar, Trash2 } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "@/app/lib/utils";

interface DiaryEntryCardProps {
  title: string;
  content: string;
  date: string;
  onDelete?: () => void;
  className?: string;
}

export function DiaryEntryCard({
  title,
  content,
  date,
  onDelete,
  className,
}: DiaryEntryCardProps) {
  return (
    <li className={cn("list-none", className)}>
      <div className="group relative h-full min-h-[180px] rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-3 transition-all duration-300 hover:border-gray-300/70 dark:hover:border-gray-600/70">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          variant="default"
          movementDuration={1.5}
        />
        
        {/* Glassmorphism background */}
        <div className="relative h-full overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg dark:shadow-[0px_0px_27px_0px_#2D2D2D] border border-white/20 dark:border-gray-700/30">
          
          {/* Delete button */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Delete entry"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          {/* Card content */}
          <div className="flex h-full flex-col justify-between p-6">
            <div className="space-y-4">
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {title}
              </h3>
              
              {/* Content preview */}
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                {content}
              </p>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

// Demo component showing multiple diary cards
export function DiaryEntryCardsDemo() {
  const sampleEntries = [
    {
      title: "Ram",
      content: "Ram...",
      date: "Aug 07, 2025",
    },
    {
      title: "Mukul",
      content: "sab log chutiya hai...",
      date: "Aug 06, 2025",
    },
    {
      title: "Morning Reflections",
      content: "Today I woke up feeling grateful for the small things in life. The way sunlight streams through my window, the smell of fresh coffee, and the quiet moments before the world wakes up.",
      date: "Aug 05, 2025",
    },
  ];

  const handleDelete = (index: number) => {
    console.log(`Delete entry ${index}`);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Diary Entries
        </h1>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEntries.map((entry, index) => (
            <DiaryEntryCard
              key={index}
              title={entry.title}
              content={entry.content}
              date={entry.date}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
