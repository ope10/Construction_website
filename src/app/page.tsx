import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Shield, Timer, Landmark, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../lib/db';
import { Button } from '../components/ui/button';
import { EstimateForm } from '../features/home/estimate-form';

export default function Home() {
  // Get top 3 projects for the Featured Masterpieces section
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* 1. Hero Canvas */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Full-bleed Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.jpg"
            alt="High-end skyscraper construction site framing under golden sunset sky"
            fill
            priority
            className="object-cover object-center brightness-35 select-none"
          />
          {/* Gradients to darken background */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/70 via-transparent to-transparent" />
          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-white/10 text-gold-400 text-xs font-display font-semibold uppercase tracking-widest">
            <Award className="h-4 w-4" /> Leading Structural Bid Authority
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white leading-none">
            Building Tomorrow’s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 gold-glow">
              Landmarks, Today
            </span>
          </h1>
          <p className="text-sm sm:text-base text-obsidian-300 max-w-2xl mx-auto leading-relaxed">
            From complex heavy civil suspension bridges to luxury coastal estates and parametric skyscraper framing. We engineer high-durability steel and concrete landmarks for high-end clients globally.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#estimate-section">
              <Button size="lg" variant="primary">
                Request a Project Estimate
              </Button>
            </a>
            <Link href="/gallery">
              <Button size="lg" variant="secondary">
                Explore Design Gallery
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-display uppercase tracking-widest text-obsidian-400">Scroll Down</span>
          <div className="w-1 h-8 rounded-full bg-obsidian-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gold-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Value Matrix Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              value: '150+',
              label: 'Completed Structures',
              desc: 'High-rise towers, highway spans, municipal complexes, and luxury custom estates.',
              icon: Landmark,
            },
            {
              value: '0',
              label: 'Safety Incidents',
              desc: 'Rigorous OSHA inspection frameworks and site compliance standards strictly enforced.',
              icon: Shield,
            },
            {
              value: '25+',
              label: 'Years Experience',
              desc: 'Erecting blueprints, coordinating zoning permits, and structural engineering projects.',
              icon: Timer,
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="glass-panel glass-panel-hover p-8 rounded-sm relative group overflow-hidden border border-black/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 text-gold-600">
                  <Icon className="h-24 w-24" />
                </div>
                <Icon className="h-8 w-8 text-gold-600 mb-6" />
                <span className="font-display font-black text-5xl text-obsidian-950 block mb-2 tracking-tight">
                  {card.value}
                </span>
                <h3 className="font-display font-bold text-sm text-gold-600 uppercase tracking-widest block mb-3">
                  {card.label}
                </h3>
                <p className="text-xs text-obsidian-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Service Teaser Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="absolute right-0 top-0 blueprint-grid w-96 h-96 opacity-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block mb-2">
              Capabilities Core
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-wider text-obsidian-950 leading-tight">
              Preeminent Building Capabilities
            </h2>
          </div>
          <Link href="/services">
            <span className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-gold-500 hover:text-gold-400 cursor-pointer group">
              View Detailed Capabilities <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Pre-Construction & Permitting',
              desc: 'Coordination of zoning permits, heavy site excavations, 3D architectural rendering, and structural material logistics audits.',
              link: '/services#pre-construction',
            },
            {
              title: 'Heavy Structural Production',
              desc: 'High-strength steel fabrication, concrete foundation pouring, seismic shear walls, and complete MEP system integration.',
              link: '/services#structural-production',
            },
            {
              title: 'Inspections & Handover',
              desc: 'Comprehensive post-construction inspections, building warranty management, as-built CAD delivery, and occupancy handovers.',
              link: '/services#post-construction',
            },
          ].map((service, i) => (
            <div key={i} className="glass-panel p-8 border border-black/5 rounded-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs font-display font-semibold text-gold-600/60 block mb-4">0{i + 1} / CAPABILITY</span>
                <h3 className="font-display font-bold text-lg text-obsidian-950 uppercase tracking-wider mb-3">
                  {service.title}
                </h3>
                <p className="text-xs text-obsidian-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>
              <Link href={service.link} className="text-xs font-display font-medium uppercase tracking-wider text-gold-600 hover:text-gold-700 inline-flex items-center gap-1">
                Explore Pipeline <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Masterpieces Section */}
      <section className="bg-obsidian-100/20 border-y border-black/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
              Global Portfolios
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-wider text-obsidian-950">
              Featured Masterpieces
            </h2>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Explore three of our award-winning completed architectural projects, engineered for durability and visual prestige.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel border border-black/5 rounded-sm overflow-hidden flex flex-col group"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-display font-semibold uppercase tracking-wider px-3 py-1 bg-obsidian-950/80 text-gold-500 border border-white/10 rounded-sm">
                    {project.category}
                  </span>
                </div>

                {/* Info Wrap */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-xl text-obsidian-950 uppercase tracking-wider mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-obsidian-600 mb-4">
                      <span className="text-gold-600">📍</span> {project.location}
                    </div>
                    <p className="text-xs text-obsidian-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="border-t border-black/5 pt-4">
                    {/* Project quick specs */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-obsidian-500 mb-4 uppercase">
                      <div>
                        <span className="text-obsidian-500 block">Square Footage</span>
                        <span className="font-semibold text-obsidian-950">{project.sqft}</span>
                      </div>
                      <div>
                        <span className="text-obsidian-500 block">Total Budget</span>
                        <span className="font-semibold text-gold-600">{project.budget}</span>
                      </div>
                    </div>

                    <Link href={`/gallery/${project.id}`} className="w-full">
                      <Button variant="secondary" size="sm" className="w-full text-xs py-2 bg-transparent border-black/10 hover:border-gold-500/30">
                        View Project specs
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Lead Capture Intake Section */}
      <section id="estimate-section" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
            Cost Matrix Calculation
          </span>
          <h2 className="font-display font-bold text-3xl uppercase tracking-wider text-obsidian-950">
            Request structural estimate
          </h2>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Submit your structural specifications using our multi-step pipeline form to receive a detailed civil bid assessment.
          </p>
        </div>

        <EstimateForm />
      </section>

    </div>
  );
}
