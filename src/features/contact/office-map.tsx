'use client';

import React, { useState } from 'react';
import { OFFICE_LOCATIONS } from '../../lib/db';
import { OfficeLocation } from '../../types';
import { MapPin, Building, Activity, X } from 'lucide-react';

export const OfficeMap = () => {
  const [selectedLoc, setSelectedLoc] = useState<OfficeLocation | null>(null);

  return (
    <div className="glass-panel p-6 border border-white/5 rounded-sm relative overflow-hidden flex flex-col justify-between min-h-[450px]">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div>
          <span className="text-[9px] font-display font-semibold uppercase tracking-widest text-gold-500 block mb-1">
            Global Operations
          </span>
          <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
            Active Worksites & Offices
          </h3>
        </div>
        <span className="text-[10px] bg-gold-950/20 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded-sm flex items-center gap-1">
          <Activity className="h-3 w-3 animate-pulse" /> Live CAD Map
        </span>
      </div>

      {/* Vector Map Canvas */}
      <div className="relative z-10 w-full h-[280px] bg-obsidian-950/80 border border-white/5 rounded-sm relative overflow-hidden flex items-center justify-center">
        {/* Stylized geometric background elements representing geographical axes */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {/* Compass grid lines */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Concentric rings */}
          <circle cx="50%" cy="50%" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          {/* Coordinates text */}
          <text x="52%" y="15" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-display)">LAT 40.7128° N</text>
          <text x="5" y="48%" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-display)">LNG 74.0060° W</text>
        </svg>

        {/* Map pins */}
        {OFFICE_LOCATIONS.map((loc) => {
          const Icon = loc.type === 'hq' ? Building : MapPin;
          const isSelected = selectedLoc?.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
              style={{ left: `${loc.coordinates.x * 2.5 + 15}%`, top: `${loc.coordinates.y * 1.2 + 20}%` }}
              aria-label={`View office details for ${loc.name}`}
            >
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                <div className={`absolute h-8 w-8 rounded-full transition-all duration-300 animate-ping opacity-25 ${
                  isSelected ? 'bg-gold-500 scale-125' : 'bg-gold-500/50 group-hover:scale-110'
                }`} />
                {/* Pin element */}
                <div className={`relative p-2 rounded-sm border shadow-lg transition-all duration-300 ${
                  isSelected
                    ? 'bg-gold-500 border-gold-400 text-obsidian-950 scale-110'
                    : 'bg-obsidian-900 border-white/10 text-gold-500 hover:border-gold-500/50 group-hover:text-white'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </button>
          );
        })}

        {/* Default instruction layer */}
        {!selectedLoc && (
          <div className="absolute bottom-4 left-4 right-4 text-center text-[10px] text-obsidian-400 pointer-events-none uppercase font-display tracking-wider">
            Click on map pins to trace manager profiles & addresses
          </div>
        )}
      </div>

      {/* Selected Location Details Panel */}
      {selectedLoc ? (
        <div className="relative z-10 mt-4 p-4 bg-obsidian-950 border border-white/5 rounded-sm animate-fade-in-up flex justify-between items-start gap-4">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full ${
                selectedLoc.type === 'hq' ? 'bg-blue-400' : 'bg-emerald-400'
              }`} />
              <span className="font-display font-bold uppercase tracking-wider text-white">
                {selectedLoc.name}
              </span>
            </div>
            
            <p className="text-[11px] text-obsidian-300">
              <span className="text-obsidian-500 block uppercase font-display text-[9px]">Location Address</span>
              {selectedLoc.address}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-obsidian-500 block uppercase font-display text-[9px]">Manager</span>
                <span className="text-[11px] text-white font-medium">{selectedLoc.manager}</span>
              </div>
              <div>
                <span className="text-obsidian-500 block uppercase font-display text-[9px]">Operational Code</span>
                <span className="text-[11px] text-gold-500 font-semibold uppercase">{selectedLoc.status}</span>
              </div>
            </div>

            <div className="text-[11px] text-obsidian-300">
              <span className="text-obsidian-500 uppercase font-display text-[9px]">Hotline</span>: {selectedLoc.phone}
            </div>
          </div>

          <button
            onClick={() => setSelectedLoc(null)}
            className="text-obsidian-500 hover:text-white p-1 focus:outline-none"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 border border-white/5 rounded-sm text-center py-6 text-xs text-obsidian-500 font-display uppercase tracking-widest">
          No location selected.
        </div>
      )}
    </div>
  );
};
