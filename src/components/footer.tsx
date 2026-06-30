import React from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Award } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-950 border-t border-white/5 py-16 text-obsidian-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Mission Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-gold-500" />
            <span className="font-display font-bold tracking-widest text-base text-white">
              STRUCTURA<span className="text-gold-500">NEXT</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-obsidian-300">
            Engineered for longevity, designed for authority. StructuraNext delivers high-performance civil engineering, sustainable architectural designs, and complex commercial steel erections.
          </p>
          <div className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-wider text-gold-500/80 font-display">
            <Award className="h-4.5 w-4.5 text-gold-500" />
            <span>Lic. #CA-9048-28B / NY-5092-A</span>
          </div>
        </div>

        {/* Directory Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-display font-semibold uppercase tracking-wider text-white">
            Resource Directory
          </h4>
          <nav className="flex flex-col gap-2.5 text-sm" aria-label="Footer Directory Navigation">
            <Link href="/" className="hover:text-gold-400 transition-colors duration-150">Homepage</Link>
            <Link href="/services" className="hover:text-gold-400 transition-colors duration-150">Our Services</Link>
            <Link href="/gallery" className="hover:text-gold-400 transition-colors duration-150">Design Gallery</Link>
            <Link href="/about" className="hover:text-gold-400 transition-colors duration-150">About Corporate</Link>
            <Link href="/contact" className="hover:text-gold-400 transition-colors duration-150">Bidding Portal</Link>
          </nav>
        </div>

        {/* Legal Policies Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-display font-semibold uppercase tracking-wider text-white">
            Compliance & Legal
          </h4>
          <nav className="flex flex-col gap-2.5 text-sm" aria-label="Footer Legal Navigation">
            <Link href="/privacy-policy" className="hover:text-gold-400 transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gold-400 transition-colors duration-150">Terms & Conditions</Link>
            <div className="flex flex-col gap-1 text-[11px] mt-2 border-t border-white/5 pt-3">
              <span className="text-obsidian-500">OSHA Safety compliant</span>
              <span className="text-obsidian-500">ISO-9001:2015 QA Certified</span>
              <span className="text-obsidian-500">U.S. Green Building Council Member</span>
            </div>
          </nav>
        </div>

        {/* Corporate Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-display font-semibold uppercase tracking-wider text-white">
            Corporate Offices
          </h4>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
              <span>500 Fifth Ave, Suite 4800, New York, NY 10110</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold-500 shrink-0" />
              <span>+1 (212) 555-0190</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gold-500 shrink-0" />
              <span>bids@structuranext.com</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
        <span>
          &copy; {currentYear} Falana StructuraNext . All rights reserved.
        </span>
        <span className="text-obsidian-500">
          All architectural drawings, renderings, and site blueprints displayed on this site are proprietary trademarks of StructuraNext.
        </span>
      </div>
    </footer>
  );
};
