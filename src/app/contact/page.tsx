import React from 'react';
import { IntakeForm } from '../../features/contact/intake-form';
import { OfficeMap } from '../../features/contact/office-map';
import { Mail, Phone, Calendar, Clock, Landmark } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Submit client design inquiries or subcontractor bidding files. Interactive map of active field office sites and corporate hotlines.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-gold-600 block">
          Bidding & Intake Channels
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wider text-obsidian-950">
          Secure Portal & Offices
        </h1>
        <p className="text-sm text-obsidian-600 leading-relaxed">
          Submit construction bids, request architectural estimates, or view geographic coordinates for corporate and field operations.
        </p>
      </section>

      {/* Main Form and Map Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Intake (7 Columns) */}
        <div className="lg:col-span-7">
          <IntakeForm />
        </div>

        {/* Right Column: Live Map and Contacts (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          <OfficeMap />

          {/* Quick contact card */}
          <div className="glass-panel p-6 border border-black/5 rounded-sm relative overflow-hidden space-y-4">
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
            <h4 className="font-display font-bold text-sm text-obsidian-950 uppercase tracking-wider border-b border-black/5 pb-2 relative z-10">
              Corporate Desk Operations
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-obsidian-600">
                  <Clock className="h-4 w-4 text-gold-600" />
                  <span>08:00 – 18:00 EST</span>
                </div>
                <div className="flex items-center gap-2 text-obsidian-600">
                  <Calendar className="h-4 w-4 text-gold-600" />
                  <span>Monday – Friday</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-obsidian-600">
                  <Phone className="h-4 w-4 text-gold-600" />
                  <span>+1 (212) 555-0190</span>
                </div>
                <div className="flex items-center gap-2 text-obsidian-600">
                  <Mail className="h-4 w-4 text-gold-600" />
                  <span>bids@structuranext.com</span>
                </div>
              </div>
            </div>

            <div className="bg-obsidian-100/50 p-4 border border-black/5 text-[10px] uppercase text-obsidian-500 font-display flex items-center gap-2 relative z-10">
              <Landmark className="h-4.5 w-4.5 text-gold-600" />
              <span>Registered Federal Bid Contractor Code: Cage 98V3F</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
