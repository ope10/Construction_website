import React from 'react';
import { Award, Shield, TreePine, Hammer, Building2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Our narrative, executive leadership, LEED sustainable material commitment, and OSHA safety compliance badges.',
};

export default function About() {
  const leadership = [
    {
      name: 'Sarah Lin',
      role: 'Principal Architect & Founder',
      bio: 'Over 20 years of experience designing complex commercial spaces. Graduate of MIT Architecture with multiple international accolades in sustainable design.',
      initials: 'SL',
    },
    {
      name: 'Marcus Vance, PE',
      role: 'Director of Civil Engineering',
      bio: 'Leading structural engineering specialist with a focus on seismic dampening and high-durability deep foundation anchoring on complex topographies.',
      initials: 'MV',
    },
    {
      name: 'David Kojo',
      role: 'Chief Construction Director',
      bio: 'Coordinates field logistics and heavy steel erections. Ensures all projects remain within strict structural tolerances and maintains our safety milestones.',
      initials: 'DK',
    },
  ];

  const complianceBadges = [
    {
      title: 'OSHA 30-Hour Safety',
      desc: '100% of field personnel are safety trained and certified. We maintain a zero-incident safety record across all projects.',
      icon: Shield,
    },
    {
      title: 'ISO 9001:2015 QA',
      desc: 'Quality Management Systems certified for drafting, structural foundation laying, and building occupancy delivery.',
      icon: Award,
    },
    {
      title: 'USGBC LEED Gold/Platinum',
      desc: 'Commitment to sustainable masonry, low-emission steel fabrication, carbon-offset timber, and green roofing systems.',
      icon: TreePine,
    },
    {
      title: 'Building Trades Union',
      desc: 'Proud partner with local building and trades unions, guaranteeing certified craftsmen and fair labor standards.',
      icon: Hammer,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
          Corporate Background
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
          Architects of Trust & Longevity
        </h1>
        <p className="text-sm text-obsidian-600 leading-relaxed">
          From a boutique design lab in Manhattan to a global civil contractor, StructuraNext merges artistic architectural vision with bulletproof structural engineering.
        </p>
      </section>

      {/* The Narrative Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-obsidian-950 border-l-2 border-gold-600 pl-4">
            Sustainable Frameworks & Green Building
          </h2>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            In modern construction, structural integrity and environmental stewardship are inseparable. At StructuraNext, we specify low-impact geopolymeric concrete, recycled steel bracing, and sustainable mass timber framing to lower the embodied carbon footprint of our buildings by up to 40%.
          </p>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Our close alignment with the U.S. Green Building Council allows us to guide projects from initial CAD planning up to final LEED Gold and Platinum certifications. We don&apos;t just build skyscrapers; we erect self-sustaining ecosystems.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-display">
            <div className="flex items-center gap-2 text-obsidian-950 font-medium">
              <TreePine className="h-5 w-5 text-gold-600" />
              <span>LEED Platinum Projects</span>
            </div>
            <div className="flex items-center gap-2 text-obsidian-950 font-medium">
              <Building2 className="h-5 w-5 text-gold-600" />
              <span>Carbon-Neutral Materials</span>
            </div>
          </div>
        </div>

        {/* Narrative Side Visual Card */}
        <div className="glass-panel p-8 border border-black/5 rounded-sm relative overflow-hidden min-h-[300px] flex flex-col justify-end">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-gold-600 block">
              Core Mission Statement
            </span>
            <blockquote className="text-sm italic text-obsidian-950 leading-relaxed">
              &quot;We believe that a structure&apos;s design is only as good as its structural foundation. We bridge the gap between architectural elegance and safety engineering, constructing projects that endure for generations.&quot;
            </blockquote>
            <div className="text-[10px] uppercase text-obsidian-500 font-display">
              — StructuraNext Executive Board
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-display font-semibold tracking-widest uppercase text-gold-600 block">
            Executive Council
          </span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-wider text-obsidian-950">
            Leadership & Authority
          </h2>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Meet the primary designers and engineering principals driving our structural bids and active worksites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, i) => (
            <div
              key={i}
              className="glass-panel border border-black/5 rounded-sm p-8 flex flex-col items-center text-center space-y-6"
            >
              {/* Profile Avatar Frame */}
              <div className="h-24 w-24 rounded-full border border-gold-600/30 flex items-center justify-center bg-obsidian-50 font-display font-bold text-2xl text-gold-600 shadow-lg shadow-gold-600/5">
                {member.initials}
              </div>
              
              <div>
                <h3 className="font-display font-bold text-lg text-obsidian-950 uppercase tracking-wider">
                  {member.name}
                </h3>
                <span className="text-xs text-gold-600 uppercase tracking-widest block mt-1">
                  {member.role}
                </span>
              </div>
              
              <p className="text-xs text-obsidian-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance & Certifications Badges */}
      <section className="space-y-12 bg-obsidian-100/20 border-y border-black/5 py-16 -mx-6 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-display font-semibold tracking-widest uppercase text-gold-600 block">
              Standards & Codes
            </span>
            <h2 className="font-display font-bold text-3xl uppercase tracking-wider text-obsidian-950">
              Compliance & Safety Badges
            </h2>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              We align with global safety frameworks, municipal design union charters, and green material directives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {complianceBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="glass-panel p-6 border border-black/5 rounded-sm space-y-4 flex flex-col justify-start"
                >
                  <div className="h-10 w-10 rounded-sm border border-gold-600/20 bg-obsidian-50 flex items-center justify-center text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-obsidian-950 uppercase tracking-wider">
                    {badge.title}
                  </h3>
                  <p className="text-[11px] text-obsidian-600 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
