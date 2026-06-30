import React from 'react';

export default function HQPortalLoading() {
  return (
    <div 
      data-admin-page="true" 
      className="min-h-screen bg-obsidian-950 text-white blueprint-grid-dark p-8 flex flex-col gap-8"
    >
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="h-8 w-64 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-96 bg-white/5 rounded animate-pulse mt-2" />
        </div>
        <div className="h-10 w-24 bg-white/5 rounded animate-pulse" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel-dark p-6 rounded-sm border border-white/5">
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            <div className="h-8 w-16 bg-white/5 rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="glass-panel-dark rounded-sm border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center gap-4 py-3 border-b border-white/5 last:border-0">
              <div className="h-5 w-1/4 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-1/4 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-1/6 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
