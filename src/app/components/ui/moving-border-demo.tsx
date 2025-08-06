"use client";
import React from "react";
import { Button } from "./moving-border";

export default function MovingBorderDemo() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Borders are cool
      </Button>
      
      <Button
        borderRadius="1rem"
        className="bg-blue-600 dark:bg-blue-700 text-white border-blue-400 dark:border-blue-600"
        containerClassName="w-32 h-12"
      >
        New Entry
      </Button>
      
      <Button
        borderRadius="0.75rem"
        className="bg-green-600 dark:bg-green-700 text-white border-green-400 dark:border-green-600"
        containerClassName="w-28 h-10"
      >
        Sign In
      </Button>
      
      <Button
        borderRadius="0.75rem"
        className="bg-purple-600 dark:bg-purple-700 text-white border-purple-400 dark:border-purple-600"
        containerClassName="w-28 h-10"
      >
        Sign Up
      </Button>
    </div>
  );
}
