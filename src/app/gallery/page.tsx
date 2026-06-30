import React from 'react';
import { PROJECTS } from '../../lib/db';
import { GalleryView } from '../../features/gallery/gallery-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Gallery',
  description: 'High-resolution blueprints, structural engineering layouts, and completed masterpieces for commercial and residential tenders.',
};

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
          Visual Archives
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
          Interactive Design Gallery
        </h1>
        <p className="text-sm text-obsidian-600 leading-relaxed">
          Filter through our verified blueprint sheets, heavy civil sites, and completed commercial projects. Inspect detailed structural benchmarks and solutions.
        </p>
      </section>

      {/* Main Interactive Grid */}
      <section>
        <GalleryView projects={PROJECTS} />
      </section>
    </div>
  );
}
