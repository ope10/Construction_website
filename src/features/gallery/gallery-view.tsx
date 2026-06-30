'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../types';
import { ProjectModal } from './project-modal';
import { Button } from '../../components/ui/button';
import { Info, Maximize2 } from 'lucide-react';

interface GalleryViewProps {
  projects: Project[];
}

type FilterCategory = 'all' | 'residential' | 'commercial' | 'in-progress' | 'blueprint';

export const GalleryView: React.FC<GalleryViewProps> = ({ projects }) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'in-progress', label: 'In-Progress' },
    { value: 'blueprint', label: 'Blueprints' },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Category Filter Toggles */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-black/5 pb-8" role="tablist" aria-label="Project Category Filters">
        {categories.map((cat) => {
          const isActive = filter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              role="tab"
              aria-selected={isActive}
              className={`px-5 py-2 text-xs font-display font-semibold uppercase tracking-wider rounded-sm border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-gold-600 bg-gold-50/60 text-gold-700 shadow-md shadow-gold-500/5'
                  : 'border-black/10 bg-white/40 text-obsidian-600 hover:border-black/20 hover:text-obsidian-950'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 2. Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel border border-black/5 rounded-sm overflow-hidden flex flex-col group relative"
            >
              {/* Aspect-ratio locked image wrapper */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-obsidian-950">
                <Image
                  src={project.mainImage}
                  alt={`${project.title} project image`}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                
                {/* Visual dark overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/10 to-transparent" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 text-[9px] font-display font-semibold uppercase tracking-widest px-2.5 py-0.5 bg-obsidian-950/85 text-gold-500 border border-black/5 rounded-sm">
                  {project.category}
                </span>

                {/* Overlay hover controls */}
                <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-xl"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Maximize2 className="h-4 w-4 mr-2" /> Inspect Specs
                  </Button>
                </div>
              </div>

              {/* Text Info footer */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-obsidian-950 uppercase tracking-wider">
                    {project.title}
                  </h3>
                  <div className="text-[11px] text-obsidian-600 mt-1">
                    📍 {project.location}
                  </div>
                  <p className="text-xs text-obsidian-600 leading-relaxed mt-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-black/5 pt-4 flex items-center justify-between gap-4">
                  {/* Small specs */}
                  <div className="flex gap-4 text-[10px] text-obsidian-500 uppercase font-display">
                    <div>
                      <span>Area:</span> <span className="text-obsidian-950 font-medium">{project.sqft}</span>
                    </div>
                    <div>
                      <span>Budget:</span> <span className="text-gold-600 font-medium">{project.budget}</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2">
                    <Link href={`/gallery/${project.id}`} aria-label={`View detailed project page for ${project.title}`}>
                      <span className="p-2 border border-black/10 text-obsidian-600 hover:text-obsidian-950 rounded-sm hover:bg-black/5 cursor-pointer block">
                        <Info className="h-4 w-4" />
                      </span>
                    </Link>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-[10px] py-1 px-3 border-black/10 hover:border-gold-500/30"
                      onClick={() => setSelectedProject(project)}
                    >
                      Quick View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-obsidian-400">
          No projects available in this category.
        </div>
      )}

      {/* 3. Project Detail Modal Overlay */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
