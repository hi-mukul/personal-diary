import { cn } from "@/app/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
  fadeIntensity?: number;
}

export function GridBackground({ 
  children, 
  className,
  gridSize = 40,
  fadeIntensity = 20
}: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full bg-white dark:bg-black", className)}>
      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0",
          `[background-size:${gridSize}px_${gridSize}px]`,
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`
        }}
      />
      
      {/* Radial gradient overlay for faded effect */}
      <div 
        className="pointer-events-none absolute inset-0 bg-white dark:bg-black"
        style={{
          maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Simplified version for full-page backgrounds
export function GridBackgroundPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <GridBackground className={cn("min-h-screen", className)}>
      {children}
    </GridBackground>
  );
}
