import React from 'react';
import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '../../features/docs/markdown-renderer';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Intellectual property ownership of displayed designs, non-binding disclaimer for estimates, and bidding protocols.',
};

export default function TermsConditionsPage() {
  // Read the markdown file at build time (SSG)
  const filePath = path.join(process.cwd(), 'src/content', 'terms-conditions.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link href="/">
          <span className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-gold-500 hover:text-white cursor-pointer group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Homepage
          </span>
        </Link>
      </div>

      {/* Decorative top icon */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-6">
        <div className="h-12 w-12 rounded-sm border border-gold-500/20 bg-obsidian-900 flex items-center justify-center text-gold-500">
          <Scale className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-500 block">
            Legal division
          </span>
          <h2 className="font-display font-black text-xl uppercase tracking-wider text-white">
            Terms of Use & Bidding Protocols
          </h2>
        </div>
      </div>

      {/* Render Markdown Content */}
      <section className="glass-panel p-8 md:p-12 border border-white/5 rounded-sm relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <MarkdownRenderer content={fileContent} />
      </section>
    </div>
  );
}
