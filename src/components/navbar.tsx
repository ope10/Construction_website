'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X, ChevronDown, Layers, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isServicesActive =
    pathname === '/services' || pathname.startsWith('/services/');

  const regularLinks = [
    { name: 'Home', href: '/' },
    { name: 'Design Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const serviceSubLinks = [
    {
      name: 'Our Services',
      href: '/services',
      icon: Layers,
      desc: 'Full capability overview',
    },
    {
      name: 'FAQ',
      href: '/services/faq',
      icon: HelpCircle,
      desc: 'Frequently asked questions',
    },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        scrolled || isOpen
          ? 'glass-panel-dark border-b border-white/5 bg-obsidian-950/80 py-4 shadow-xl shadow-black/25'
          : 'bg-obsidian-950/70 backdrop-blur-sm py-6 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm"
          aria-label="StructuraNext Homepage"
        >
          <Building2 className="h-7 w-7 text-gold-500 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display font-bold tracking-widest text-lg text-white">
            STRUCTURA<span className="text-gold-500 transition-all duration-300 group-hover:gold-glow">NEXT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Directory">
          {/* Home */}
          <Link
            href="/"
            className={cn(
              'text-xs font-display font-medium uppercase tracking-wider transition-colors duration-200 focus:outline-none focus:text-gold-400',
              pathname === '/'
                ? 'text-gold-500 border-b border-gold-500/50 pb-1'
                : 'text-obsidian-300 hover:text-white'
            )}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="services-menu-btn"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              className={cn(
                'flex items-center gap-1 text-xs font-display font-medium uppercase tracking-wider transition-colors duration-200 focus:outline-none focus:text-gold-400 cursor-pointer',
                isServicesActive
                  ? 'text-gold-500 border-b border-gold-500/50 pb-1'
                  : 'text-obsidian-300 hover:text-white'
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  servicesOpen ? 'rotate-180' : 'rotate-0'
                )}
              />
            </button>

            {/* Dropdown Panel */}
            {servicesOpen && (
              <div
                id="services-dropdown"
                role="menu"
                aria-labelledby="services-menu-btn"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-obsidian-950 border border-white/10 rounded-sm shadow-2xl shadow-black/40 overflow-hidden animate-fade-in-up z-50"
              >
                <div className="p-1">
                  {serviceSubLinks.map((sub) => {
                    const Icon = sub.icon;
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className={cn(
                          'flex items-start gap-3 px-4 py-3 rounded-sm transition-all duration-200 group',
                          isSubActive
                            ? 'bg-gold-950/30 text-gold-400'
                            : 'text-obsidian-300 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <Icon className={cn('h-4 w-4 mt-0.5 shrink-0', isSubActive ? 'text-gold-500' : 'text-obsidian-500 group-hover:text-gold-500')} />
                        <div>
                          <span className="block text-xs font-display font-semibold uppercase tracking-wider">
                            {sub.name}
                          </span>
                          <span className="block text-[10px] text-obsidian-500 mt-0.5">
                            {sub.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Remaining links */}
          {regularLinks.slice(1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-display font-medium uppercase tracking-wider transition-colors duration-200 focus:outline-none focus:text-gold-400',
                  isActive
                    ? 'text-gold-500 border-b border-gold-500/50 pb-1'
                    : 'text-obsidian-300 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/contact" tabIndex={-1}>
            <Button variant="secondary" size="sm" className="border-gold-500/25">
              Submit Tender Bid
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-obsidian-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-md"
          aria-expanded={isOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-[72px] bg-obsidian-950/97 backdrop-blur-lg z-40 transition-transform duration-300 md:hidden border-t border-white/5',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col p-8 gap-1 h-full overflow-y-auto" aria-label="Mobile Navigation Drawer">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={cn(
              'text-lg font-display font-medium uppercase tracking-widest py-3 border-b border-white/5',
              pathname === '/' ? 'text-gold-500 font-bold' : 'text-obsidian-300 hover:text-white'
            )}
          >
            Home
          </Link>

          {/* Services accordion in mobile */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className={cn(
                'w-full flex items-center justify-between text-lg font-display font-medium uppercase tracking-widest py-3',
                isServicesActive ? 'text-gold-500 font-bold' : 'text-obsidian-300 hover:text-white'
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  mobileServicesOpen ? 'rotate-180' : 'rotate-0'
                )}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pb-3 space-y-1">
                {serviceSubLinks.map((sub) => {
                  const Icon = sub.icon;
                  const isSubActive = pathname === sub.href;
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 py-2 text-sm font-display uppercase tracking-wider',
                        isSubActive ? 'text-gold-500' : 'text-obsidian-400 hover:text-white'
                      )}
                    >
                      <Icon className="h-4 w-4 text-obsidian-500" />
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rest of links */}
          {regularLinks.slice(1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-lg font-display font-medium uppercase tracking-widest py-3 border-b border-white/5',
                  isActive ? 'text-gold-500 font-bold' : 'text-obsidian-300 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="mt-8 flex flex-col gap-4">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Submit Bid
              </Button>
            </Link>
            <Link href="/#estimate-section" onClick={() => setIsOpen(false)}>
              <Button variant="secondary" className="w-full justify-center">
                Get Cost Estimate
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
