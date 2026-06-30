'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input, Textarea } from '../../components/ui/input';
import { Building, Home, Construction, CheckCircle, ChevronRight, ChevronLeft, Calendar, CircleDollarSign } from 'lucide-react';

export const EstimateForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !projectType) {
      newErrors.projectType = 'Please select a project category.';
    }
    if (step === 2 && !budget) {
      newErrors.budget = 'Please select an estimated budget range.';
    }
    if (step === 3 && !timeline) {
      newErrors.timeline = 'Please select your desired construction timeline.';
    }
    if (step === 4) {
      if (!contactInfo.name.trim()) newErrors.name = 'Full Name is required.';
      if (!contactInfo.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
        newErrors.email = 'Please provide a valid email address.';
      }
      if (!contactInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          budget,
          timeline,
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          details: contactInfo.details,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errData = await response.json().catch(() => ({}));
        alert(errData.error || 'There was a problem submitting your request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-12 max-w-2xl mx-auto rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Blueprint Grid background helper */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {!submitted ? (
        <form onSubmit={handleSubmit} className="relative z-10">
          
          {/* Header Progress indicators */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-[10px] font-display font-medium uppercase tracking-wider text-obsidian-400 mb-3">
              <span>Intake Pipeline Step {step} of 4</span>
              <span className="text-gold-500 font-bold">
                {step === 1 && 'Project Scope'}
                {step === 2 && 'Budget Allocation'}
                {step === 3 && 'Execution Timeline'}
                {step === 4 && 'Corporate Credentials'}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-obsidian-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: PROJECT TYPE */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center md:text-left mb-4">
                <h3 className="font-display font-bold text-2xl text-obsidian-950 uppercase tracking-wider mb-2">
                  Select Project Category
                </h3>
                <p className="text-sm text-obsidian-600">
                  Select the structural division matching your bid requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'commercial', label: 'Commercial', desc: 'Skyscrapers, complexes, offices', icon: Building },
                  { value: 'residential', label: 'Residential', desc: 'Luxury villas, estates, residential builds', icon: Home },
                  { value: 'infrastructure', label: 'Civil/Public', desc: 'Bridges, roads, structural infrastructure', icon: Construction },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectType === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setProjectType(item.value);
                        setErrors({});
                      }}
                      className={`flex flex-col items-center justify-center p-6 text-center rounded-sm transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'border-gold-500 bg-gold-50/50 text-obsidian-950 shadow-md shadow-gold-500/5'
                          : 'border-black/5 bg-white/40 text-obsidian-700 hover:border-black/10 hover:text-obsidian-950'
                      }`}
                    >
                      <Icon className={`h-8 w-8 mb-4 ${isSelected ? 'text-gold-600' : 'text-obsidian-500'}`} />
                      <span className="font-display text-sm font-semibold uppercase tracking-wider mb-1">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-obsidian-500 leading-tight">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.projectType && (
                <p className="text-sm text-red-400 text-center mt-2">{errors.projectType}</p>
              )}
            </div>
          )}

          {/* STEP 2: ESTIMATED BUDGET */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center md:text-left mb-4">
                <h3 className="font-display font-bold text-2xl text-obsidian-950 uppercase tracking-wider mb-2">
                  Budget Matrix Allocation
                </h3>
                <p className="text-sm text-obsidian-600">
                  Select the allocation pool designated for this structural tender.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: '<5M', label: 'Under $5 Million', desc: 'Residential & Light Structural' },
                  { value: '5M-25M', label: '$5M - $25 Million', desc: 'Regional Complexes & Mid-Rise' },
                  { value: '25M-100M', label: '$25M - $100 Million', desc: 'Skyscrapers & Major Infrastructure' },
                  { value: '100M+', label: 'Over $100 Million', desc: 'Heavy Civil & Landmark Structures' },
                ].map((item) => {
                  const isSelected = budget === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setBudget(item.value);
                        setErrors({});
                      }}
                      className={`flex items-start p-5 rounded-sm text-left transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'border-gold-500 bg-gold-50/50 text-obsidian-950 shadow-md shadow-gold-500/5'
                          : 'border-black/5 bg-white/40 text-obsidian-700 hover:border-black/10'
                      }`}
                    >
                      <CircleDollarSign className={`h-6 w-6 mr-4 shrink-0 mt-0.5 ${isSelected ? 'text-gold-600' : 'text-obsidian-500'}`} />
                      <div>
                        <span className="font-display text-sm font-semibold uppercase tracking-wider block mb-1">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-obsidian-500">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.budget && (
                <p className="text-sm text-red-400 text-center mt-2">{errors.budget}</p>
              )}
            </div>
          )}

          {/* STEP 3: TIMELINE REQUIREMENTS */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center md:text-left mb-4">
                <h3 className="font-display font-bold text-2xl text-obsidian-950 uppercase tracking-wider mb-2">
                  Timeline Directives
                </h3>
                <p className="text-sm text-obsidian-600">
                  Select your expected timeframe for site completion and inspections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: 'under-12m', label: 'Under 12 Months', desc: 'Fast-Track / Single Phase' },
                  { value: '12m-24m', label: '12 - 24 Months', desc: 'Standard Architectural Build' },
                  { value: '24m-36m', label: '24 - 36 Months', desc: 'Multi-Phase Complex Build' },
                  { value: '36m+', label: '36+ Months / Ongoing', desc: 'Heavy Civil Infrastructure' },
                ].map((item) => {
                  const isSelected = timeline === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setTimeline(item.value);
                        setErrors({});
                      }}
                      className={`flex items-start p-5 rounded-sm text-left transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'border-gold-500 bg-gold-50/50 text-obsidian-950 shadow-md shadow-gold-500/5'
                          : 'border-black/5 bg-white/40 text-obsidian-700 hover:border-black/10'
                      }`}
                    >
                      <Calendar className={`h-6 w-6 mr-4 shrink-0 mt-0.5 ${isSelected ? 'text-gold-600' : 'text-obsidian-500'}`} />
                      <div>
                        <span className="font-display text-sm font-semibold uppercase tracking-wider block mb-1">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-obsidian-500">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.timeline && (
                <p className="text-sm text-red-400 text-center mt-2">{errors.timeline}</p>
              )}
            </div>
          )}

          {/* STEP 4: CONTACT & DETAILS */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center md:text-left mb-4">
                <h3 className="font-display font-bold text-2xl text-obsidian-950 uppercase tracking-wider mb-2">
                  Corporate Credentials
                </h3>
                <p className="text-sm text-obsidian-600">
                  Please provide your contact coordinates to complete this project intake statement.
                </p>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  error={errors.name}
                  required
                />
                <Input
                  label="Contact Email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="e.g. jdoe@firm.com"
                  error={errors.email}
                  required
                />
              </div>
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={handleInputChange}
                placeholder="e.g. +1 (555) 019-9000"
                error={errors.phone}
                required
              />
              <Textarea
                label="Brief Project Scope Details"
                name="details"
                value={contactInfo.details}
                onChange={handleInputChange}
                placeholder="Describe structural constraints, land size, or specific blueprint needs..."
              />

              {/* Selection Summary */}
              <div className="p-4 bg-obsidian-100/50 border border-black/5 rounded-sm text-xs space-y-2">
                <span className="font-display font-bold uppercase tracking-wider text-gold-600 block mb-1">
                  Intake Data Summary
                </span>
                <div className="grid grid-cols-3 gap-2 text-obsidian-600">
                  <div>
                    <span className="text-[10px] text-obsidian-500 block uppercase">Division</span>
                    <span className="capitalize font-semibold text-obsidian-950">
                      {projectType === 'infrastructure' ? 'Civil/Public' : projectType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-500 block uppercase">Budget Pool</span>
                    <span className="font-semibold text-obsidian-950">
                      {budget === '<5M' && 'Under $5M'}
                      {budget === '5M-25M' && '$5M - $25M'}
                      {budget === '25M-100M' && '$25M - $100M'}
                      {budget === '100M+' && 'Over $100M'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-obsidian-500 block uppercase">Timeline Directive</span>
                    <span className="font-semibold text-obsidian-950">
                      {timeline === 'under-12m' && '< 12 Months'}
                      {timeline === '12m-24m' && '12 - 24 Months'}
                      {timeline === '24m-36m' && '24 - 36 Months'}
                      {timeline === '36m+' && '36+ Months'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            {step > 1 ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleBack}
                disabled={loading}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            ) : (
              <div /> // spacing block
            )}

            {step < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
              >
                Next Step <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={loading}
              >
                {loading ? 'Transmitting Data...' : 'Submit Estimate Inquiry'}
              </Button>
            )}
          </div>

        </form>
      ) : (
        /* SUCCESS CONFIRMATION STATE */
        <div className="relative z-10 text-center py-12 space-y-6 animate-fade-in-up">
          <CheckCircle className="h-16 w-16 text-gold-600 mx-auto gold-glow" />
          <h3 className="font-display font-bold text-3xl text-obsidian-950 uppercase tracking-wider">
            Inquiry Logged
          </h3>
          <p className="text-sm text-obsidian-600 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-obsidian-950 font-semibold">{contactInfo.name}</span>. Your structural estimate inquiry has been uploaded and routed to our estimating department. A representative will contact you within 24 business hours.
          </p>
          <div className="pt-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setProjectType('');
                setBudget('');
                setTimeline('');
                setContactInfo({ name: '', email: '', phone: '', details: '' });
              }}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};