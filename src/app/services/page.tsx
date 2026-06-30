import React from 'react';
import { SERVICES } from '../../lib/db';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { DraftingCompass, Hammer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Corporate building capabilities, pre-construction planning, heavy structural steel erection, and post-construction handovers.',
};

export default function Services() {
  // Mapping of icons based on icon string in db
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DraftingCompass':
        return DraftingCompass;
      case 'Hammer':
        return Hammer;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Hammer;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
          Structural Engineering Division
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
          Enterprise Capabilities
        </h1>
        <p className="text-sm text-obsidian-600 leading-relaxed">
          StructuraNext delivers end-to-end management for complex building projects. We offer bulletproof engineering bids, precise steel framing, and strict compliance handovers.
        </p>
      </section>

      {/* Capabilities Flow Grid */}
      <section className="space-y-20">
        {SERVICES.map((service, i) => {
          const IconComponent = getIcon(service.icon);
          const isEven = i % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-12 items-center scroll-mt-28 ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Info Column */}
              <div
                className={`space-y-6 md:col-span-7 ${
                  isEven ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-sm border border-gold-600/20 bg-obsidian-50 flex items-center justify-center text-gold-600">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-display font-semibold text-gold-600 uppercase tracking-widest">
                    Phase 0{i + 1} / Building Lifecycle
                  </span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wider text-obsidian-950">
                  {service.title}
                </h2>
                
                <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Details List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-obsidian-700">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Graphic/Blueprint Card Column */}
              <div
                className={`md:col-span-5 ${
                  isEven ? 'md:order-2' : 'md:order-1'
                }`}
              >
                <div className="glass-panel p-8 border border-black/5 rounded-sm relative overflow-hidden min-h-[260px] flex flex-col justify-between group">
                  <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none transition-all duration-300 group-hover:opacity-20" />
                  
                  <div className="font-display font-black text-6xl text-obsidian-200 leading-none select-none">
                    0{i + 1}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-sm text-obsidian-950 uppercase tracking-wider">
                      {service.title.split(' Planning')[0].split(' Engineering')[0]} Specs
                    </h3>
                    <p className="text-[11px] text-obsidian-500">
                      Standard operating specifications comply with local zoning bylaws, union work requirements, and AWS welding frameworks.
                    </p>
                    <div className="h-1 bg-obsidian-100 w-full rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-600/80 transition-all duration-500 group-hover:w-full"
                        style={{ width: `${(i + 1) * 33}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bid Call to Action Panel */}
      <section className="glass-panel p-8 md:p-12 border border-black/5 rounded-sm text-center relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-wider text-obsidian-950">
            Ready to Submit a Structural Tender?
          </h2>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            We review and quote commercial bids and subcontractor submissions. Upload your DWG/CAD blueprints through our secure bidding portal today.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Enter Bidding Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
