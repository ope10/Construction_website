'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Square, Calendar, CircleDollarSign, Award } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Focus modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="glass-panel border border-white/10 w-full max-w-5xl rounded-sm max-h-[90vh] overflow-y-auto outline-none focus:ring-1 focus:ring-gold-500 relative flex flex-col md:grid md:grid-cols-12"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-25 p-2 rounded-md bg-obsidian-950/80 border border-white/5 text-obsidian-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Image Carousel (7 Columns on MD+) */}
        <div className="relative md:col-span-7 h-[300px] sm:h-[400px] md:h-full min-h-[300px] bg-obsidian-950 flex flex-col justify-center select-none">
          {project.images.length > 0 && (
            <div className="relative w-full h-full">
              <Image
                src={project.images[activeImageIndex]}
                alt={`${project.title} - Build Phase ${activeImageIndex + 1}`}
                fill
                sizes="(max-w-768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 to-transparent" />
            </div>
          )}

          {/* Carousel Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 p-2 rounded-sm bg-obsidian-950/60 border border-white/5 text-gold-500 hover:text-white hover:bg-obsidian-900 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-2 rounded-sm bg-obsidian-950/60 border border-white/5 text-gold-500 hover:text-white hover:bg-obsidian-900 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    i === activeImageIndex ? 'w-6 bg-gold-500' : 'w-1.5 bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details (5 Columns on MD+) */}
        <div className="p-8 md:col-span-5 flex flex-col justify-between space-y-6 md:max-h-[85vh] overflow-y-auto">
          <div>
            {/* Category Tag */}
            <span className="inline-block text-[9px] font-display font-semibold uppercase tracking-widest px-2.5 py-0.5 bg-gold-950/40 text-gold-400 border border-gold-500/20 rounded-sm mb-4">
              {project.category}
            </span>
            
            {/* Title */}
            <h2 id="modal-title" className="font-display font-black text-2xl uppercase tracking-wider text-white">
              {project.title}
            </h2>
            <div className="text-xs text-gold-400 font-display mt-1">
              📍 {project.location}
            </div>

            {/* Description */}
            <p className="text-xs text-obsidian-300 leading-relaxed mt-4">
              {project.description}
            </p>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-4">
              <div className="flex items-start gap-2">
                <Square className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="text-obsidian-500 block uppercase font-display">Area</span>
                  <span className="font-semibold text-white">{project.sqft}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="text-obsidian-500 block uppercase font-display">Timeline</span>
                  <span className="font-semibold text-white">{project.timeline}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CircleDollarSign className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="text-obsidian-500 block uppercase font-display">Allocated Bid</span>
                  <span className="font-semibold text-gold-500">{project.budget}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="text-obsidian-500 block uppercase font-display">Standard Code</span>
                  <span className="font-semibold text-white">OSHA Compliant</span>
                </div>
              </div>
            </div>

            {/* Challenge & Solution Breakdowns */}
            <div className="mt-6 space-y-4 border-t border-white/5 pt-4 text-xs">
              <div className="space-y-1">
                <span className="font-display font-semibold uppercase tracking-wider text-white block">
                  Structural Challenge
                </span>
                <p className="text-obsidian-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-display font-semibold uppercase tracking-wider text-gold-500 block">
                  Architectural Solution
                </span>
                <p className="text-obsidian-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specs Detail Grid */}
          {project.stats && project.stats.length > 0 && (
            <div className="bg-obsidian-950/70 border border-white/5 p-4 rounded-sm space-y-2 mt-6">
              <span className="text-[9px] font-display font-bold uppercase tracking-wider text-gold-500 block">
                BIM / Engineering Quantities
              </span>
              <div className="grid grid-cols-2 gap-2">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="text-[10px] text-obsidian-400">
                    <span className="block text-obsidian-500 uppercase">{stat.label}</span>
                    <span className="font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
