'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowLeft, HelpCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

const faqs = [
  {
    q: 'What types of projects does StructuraNext undertake?',
    a: 'StructuraNext handles the full spectrum of construction and architectural projects — from luxury residential homes and mixed-use developments to large-scale commercial towers, heavy civil infrastructure (bridges, highways, retaining walls), and industrial facilities. We self-perform structural steel, concrete, and MEP coordination and can serve as prime contractor or design-build partner.',
  },
  {
    q: 'How do I submit a construction bid or tender?',
    a: 'Navigate to our Contact / Secure Portal page and select the "Subcontractor Bids" lane. Fill in your project name, total financial bid, and attach your technical blueprints (PDF, DWG, DXF, or ZIP — up to 50 MB). Our estimating department reviews all submissions within two business days and will respond via email with a preliminary assessment.',
  },
  {
    q: 'What certifications and safety standards does StructuraNext maintain?',
    a: 'Every StructuraNext field supervisor holds an OSHA 30-Hour Safety certification, and we maintain a zero-incident safety record across all active sites. Our quality management system is ISO 9001:2015 certified, covering drafting, structural foundation laying, and building occupancy delivery. We are also a proud USGBC LEED Gold/Platinum partner and operate under Building Trades Union agreements.',
  },
  {
    q: 'Do you offer LEED-certified or sustainable building services?',
    a: 'Yes. Sustainable design is core to every project scope. We specify low-impact geopolymeric concrete, recycled steel bracing, sustainable mass timber framing, and green roofing systems. Our alignment with the U.S. Green Building Council allows us to guide projects through LEED Gold and Platinum certification, lowering embodied carbon footprints by up to 40%.',
  },
  {
    q: 'What is your typical project timeline from design to delivery?',
    a: 'Timelines vary significantly by project type and scale. A custom residential home typically runs 12–18 months from approved drawings to occupancy. Mid-rise commercial projects range from 18–36 months. Large-scale infrastructure and high-rise towers require 36+ months due to permitting, phasing, and inspection milestones. We publish a detailed construction schedule (CPM Gantt) for every project.',
  },
  {
    q: 'What file formats do you accept for blueprint submissions?',
    a: 'Our secure bidding portal accepts PDF, DWG (AutoCAD), DXF (Drawing Exchange Format), DWF, and ZIP archives up to 50 MB per upload. For larger BIM datasets (Revit, Navisworks), please contact our technical coordination team directly at bids@structuranext.com to arrange a secure file transfer.',
  },
  {
    q: 'Can StructuraNext act as both architect and general contractor?',
    a: 'Absolutely. We offer integrated Design-Build delivery under a single contract, which streamlines communication, reduces change orders, and compresses the overall project schedule. Our in-house architectural studio collaborates directly with our structural engineering and field operations teams from concept through commissioning.',
  },
  {
    q: 'How are project costs estimated and what does an estimate include?',
    a: 'Our estimates are based on a detailed Bill of Quantities (BOQ) compiled from your architectural drawings, site surveys, and geotechnical data. The estimate covers direct labour, materials, equipment, subcontractor allowances, contingency, and overhead. Preliminary estimates are provided within 5–7 business days of receiving complete design documentation. Use our homepage estimate widget for a rapid budget-range indicator.',
  },
  {
    q: 'What geographic areas does StructuraNext operate in?',
    a: 'StructuraNext is headquartered in New York City and maintains regional offices in Miami, Chicago, and Los Angeles. We have successfully delivered projects across 32 states and 9 international territories. Our field mobilisation team can deploy to any North American site within 14 days of contract execution.',
  },
  {
    q: 'How do I get in touch for a site visit or consultation?',
    a: 'You can reach our corporate desk Monday–Friday, 08:00–18:00 EST at +1 (212) 555-0190 or email bids@structuranext.com. Alternatively, submit a client inquiry through our Contact portal — select "Client Inquiries," complete the form, and a principal architect or project manager will schedule a complimentary 30-minute discovery call within one business day.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Back link */}
      <div>
        <Link href="/services">
          <span className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-gold-600 hover:text-obsidian-950 cursor-pointer group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Services
          </span>
        </Link>
      </div>

      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-sm border border-gold-600/20 bg-gold-50 flex items-center justify-center text-gold-600">
            <HelpCircle className="h-6 w-6" />
          </div>
        </div>
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
          Knowledge Base
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-obsidian-600 leading-relaxed">
          Answers to the most common questions about our construction services, bidding process, certifications, and project timelines.
        </p>
      </section>

      {/* Accordion List */}
      <section className="space-y-3" aria-label="FAQ Accordion">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={cn(
                'glass-panel rounded-sm border transition-all duration-200',
                isOpen ? 'border-gold-600/30 shadow-md shadow-gold-500/5' : 'border-black/5'
              )}
            >
              <button
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
              >
                <span
                  className={cn(
                    'font-display font-semibold text-sm uppercase tracking-wider transition-colors duration-200 pr-4',
                    isOpen ? 'text-gold-700' : 'text-obsidian-950 group-hover:text-gold-700'
                  )}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 transition-all duration-300',
                    isOpen ? 'rotate-180 text-gold-600' : 'rotate-0 text-obsidian-400'
                  )}
                />
              </button>

              {/* Answer panel */}
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 pb-6 border-t border-black/5 pt-4">
                  <p className="text-sm text-obsidian-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="glass-panel p-8 border border-black/5 rounded-sm text-center relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-wider text-obsidian-950">
            Still Have Questions?
          </h2>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Our project coordination team is available Monday–Friday, 08:00–18:00 EST. Submit a direct inquiry through our secure portal.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link href="/contact">
              <button className="px-6 py-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-sm bg-gold-600 text-white hover:bg-gold-700 transition-colors duration-200 cursor-pointer">
                Contact Us
              </button>
            </Link>
            <Link href="/services">
              <button className="px-6 py-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-sm border border-black/10 text-obsidian-700 hover:border-black/20 hover:text-obsidian-950 transition-colors duration-200 cursor-pointer bg-white/40">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
