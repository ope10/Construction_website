import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../../../lib/db';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, Square, Calendar, CircleDollarSign, Award } from 'lucide-react';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: project.title,
    description: `Technical blueprints, engineering metrics, structural challenges, and building specs for ${project.title}.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Back button link */}
      <div>
        <Link href="/gallery">
          <span className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-gold-600 hover:text-obsidian-950 cursor-pointer group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Design Gallery
          </span>
        </Link>
      </div>

      {/* Main title grid */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-black/5">
        <div>
          <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block mb-2">
            Case Study: {project.category}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
            {project.title}
          </h1>
          <div className="text-xs text-obsidian-600 mt-2 flex items-center gap-1">
            <span>📍</span> {project.location}
          </div>
        </div>

        <div className="flex gap-4 text-xs font-display">
          <Link href="/contact" tabIndex={-1}>
            <Button variant="primary" size="sm">
              Inquire About Similar Build
            </Button>
          </Link>
        </div>
      </div>

      {/* Visual Showcase (Big Hero grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Image (8 columns) */}
        <div className="md:col-span-8 relative aspect-[16/9] bg-obsidian-950 rounded-sm overflow-hidden border border-black/5 shadow-xl">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/40 to-transparent" />
        </div>

        {/* Structural Specs Card (4 columns) */}
        <div className="md:col-span-4 glass-panel p-8 border border-black/5 rounded-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="font-display font-bold text-sm text-gold-600 uppercase tracking-widest border-b border-black/5 pb-2">
              Blueprint Dimensions
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <Square className="h-5 w-5 text-gold-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-obsidian-500 block uppercase font-display">Square Footage</span>
                  <span className="text-xs font-semibold text-obsidian-950">{project.sqft}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gold-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-obsidian-500 block uppercase font-display">Build Duration</span>
                  <span className="text-xs font-semibold text-obsidian-950">{project.timeline}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-5 w-5 text-gold-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-obsidian-500 block uppercase font-display">Allocated Budget</span>
                  <span className="text-xs font-semibold text-gold-600">{project.budget}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gold-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-obsidian-500 block uppercase font-display">Standards compliance</span>
                  <span className="text-xs font-semibold text-obsidian-950">OSHA Gold Standard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-black/5 relative z-10 text-[10px] uppercase text-obsidian-500 font-display flex items-center justify-between">
            <span>QA certified</span>
            <span>BIM model logged</span>
          </div>
        </div>

      </div>

      {/* Challenge and Solution section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
        
        {/* Narrative & Challenge */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-obsidian-950 border-l-2 border-gold-600 pl-4">
            Project Overview & Challenges
          </h2>
          <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
            {project.description}
          </p>

          <div className="glass-panel p-6 border border-black/5 rounded-sm bg-obsidian-100/30">
            <h3 className="font-display font-semibold uppercase tracking-wider text-obsidian-950 text-xs block mb-2">
              Engineering Hurdles
            </h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>

        {/* Breakthrough Solution & Stats */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-gold-600 border-l-2 border-gold-600 pl-4">
            Technical Solutions
          </h2>
          
          <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
            {project.solution}
          </p>

          {/* Quantities Log */}
          {project.stats && project.stats.length > 0 && (
            <div className="glass-panel p-6 border border-black/5 rounded-sm bg-obsidian-50">
              <h3 className="font-display font-bold text-xs text-gold-600 uppercase tracking-widest mb-4">
                BIM / Bill of Quantities
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {project.stats.map((stat, i) => (
                  <div key={i} className="text-xs">
                    <span className="block text-[10px] text-obsidian-500 uppercase font-display">{stat.label}</span>
                    <span className="font-bold text-obsidian-950 text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </section>

      {/* Build progression stages (Carousel thumbnails block) */}
      <section className="bg-obsidian-100/20 border border-black/5 rounded-sm p-8 space-y-6">
        <h3 className="font-display font-bold text-sm text-obsidian-950 uppercase tracking-wider">
          Construction Stage Renderings
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.images.map((img, i) => (
            <div key={i} className="relative aspect-[16/10] bg-obsidian-950 rounded-sm overflow-hidden border border-black/5">
              <Image
                src={img}
                alt={`${project.title} build phase screenshot ${i + 1}`}
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-obsidian-950/80 text-gold-400 border border-black/5 rounded-sm">
                Stage {i + 1} Visual
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
