'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Input, Textarea } from '../../components/ui/input';
import { CheckCircle2, Upload, FileText, Trash2 } from 'lucide-react';

export const IntakeForm = () => {
  const [formMode, setFormMode] = useState<'client' | 'subcontractor'>('client');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // General Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  // Subcontractor Specific Fields
  const [projectName, setProjectName] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Max file size: 50MB in bytes
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File) => {
    setFileError('');
    
    // Validate File Size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError('File exceeds the maximum 50MB blueprint size limit.');
      setFile(null);
      return;
    }

    // Validate File Extension/Type
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['pdf', 'dwg', 'dxf', 'zip', 'dwf'];
    if (!ext || !validExtensions.includes(ext)) {
      setFileError('Unsupported file type. Please upload a PDF, DWG, DXF, or ZIP file.');
      return;
    }

    setFile(selectedFile);
    simulateProgress();
  };

  const simulateProgress = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Full Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!message.trim()) newErrors.message = 'Message details are required.';

    if (formMode === 'subcontractor') {
      if (!projectName.trim()) newErrors.projectName = 'Project / Tender Name is required.';
      if (!bidAmount.trim()) {
        newErrors.bidAmount = 'Bid Amount is required.';
      } else if (isNaN(Number(bidAmount.replace(/[^0-9.]/g, '')))) {
        newErrors.bidAmount = 'Please provide a valid numeric amount.';
      }
      if (!file) {
        newErrors.file = 'Please attach your technical design blueprints (PDF/DWG).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Format submission payload
    const payload = {
      type: formMode,
      name,
      email,
      phone,
      company,
      message,
      projectName: formMode === 'subcontractor' ? projectName : undefined,
      bidAmount: formMode === 'subcontractor' ? bidAmount : undefined,
      blueprintFileName: file ? file.name : undefined,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Tender submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during network transmission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 border border-black/5 rounded-sm shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Lane Toggle Buttons */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => {
            setFormMode('client');
            setErrors({});
            setSubmitted(false);
          }}
          className={`py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-sm border transition-all duration-300 cursor-pointer text-center ${
            formMode === 'client'
              ? 'border-gold-600 bg-gold-50/60 text-gold-700 font-bold'
              : 'border-black/10 bg-white/40 text-obsidian-600 hover:text-obsidian-950'
          }`}
        >
          Client Inquiries
        </button>
        <button
          type="button"
          onClick={() => {
            setFormMode('subcontractor');
            setErrors({});
            setSubmitted(false);
          }}
          className={`py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-sm border transition-all duration-300 cursor-pointer text-center ${
            formMode === 'subcontractor'
              ? 'border-gold-600 bg-gold-50/60 text-gold-700 font-bold'
              : 'border-black/10 bg-white/40 text-obsidian-600 hover:text-obsidian-950'
          }`}
        >
          Subcontractor Bids
        </button>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          {/* Section subtitle */}
          <div className="mb-4">
            <h4 className="font-display font-bold text-lg text-obsidian-950 uppercase tracking-wider">
              {formMode === 'client' ? 'Intake Client Request' : 'Submit Construction Tender'}
            </h4>
            <p className="text-xs text-obsidian-600">
              {formMode === 'client'
                ? 'Request site surveys, 3D renderings, and project schedules.'
                : 'Upload designs and input financial parameters for open bidding channels.'}
            </p>
          </div>

          {/* Dual Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Representative Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. John Doe"
              error={errors.name}
              required
            />
            <Input
              label="Contact Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="e.g. jdoe@firm.com"
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telephone Network"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder="e.g. +1 (555) 012-3456"
              error={errors.phone}
              required
            />
            <Input
              label="Corporate Entity (Company)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Apex Builders Inc."
            />
          </div>

          {/* Subcontractor Specifics */}
          {formMode === 'subcontractor' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-obsidian-100/30 border border-black/5 rounded-sm animate-fade-in-up">
              <Input
                label="Target Project / Tender ID"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  if (errors.projectName) setErrors((prev) => ({ ...prev, projectName: '' }));
                }}
                placeholder="e.g. Aethelgard Bridge Span"
                error={errors.projectName}
                required
              />
              <Input
                label="Total Financial Bid ($)"
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  if (errors.bidAmount) setErrors((prev) => ({ ...prev, bidAmount: '' }));
                }}
                placeholder="e.g. 12,500,000"
                error={errors.bidAmount}
                required
              />
            </div>
          )}

          {/* Subcontractor File Upload Node */}
          {formMode === 'subcontractor' && (
            <div className="space-y-2">
              <label className="text-xs font-display font-medium uppercase tracking-wider text-obsidian-600">
                Blueprint / CAD File Attachment (Max 50MB)
              </label>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                  file
                    ? 'border-gold-600 bg-gold-50/30'
                    : 'border-black/10 hover:border-gold-600/40 bg-white/40'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".dwg,.dxf,.pdf,.zip"
                  className="hidden"
                />
                
                <Upload className="h-8 w-8 text-gold-600 mb-3" />
                
                <span className="text-xs text-obsidian-950 font-medium block">
                  Drag and drop technical files here
                </span>
                <span className="text-[10px] text-obsidian-500 mt-1 uppercase">
                  Supports CAD (DWG / DXF), PDF, ZIP up to 50MB
                </span>
              </div>

              {/* Progress and status indicators */}
              {fileError && <p className="text-xs text-red-400 mt-1">{fileError}</p>}
              {errors.file && <p className="text-xs text-red-400 mt-1">{errors.file}</p>}

              {file && (
                <div className="p-3 bg-obsidian-50 border border-black/5 rounded-sm flex items-center justify-between text-xs animate-fade-in-up">
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <FileText className="h-5 w-5 text-gold-600 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-semibold text-obsidian-950 truncate block">{file.name}</span>
                      <span className="text-[10px] text-obsidian-500 uppercase block">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {uploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-obsidian-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gold-600 h-full transition-all duration-150"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gold-600 font-semibold">{uploadProgress}%</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-obsidian-500 hover:text-red-500 p-1.5 rounded-sm hover:bg-black/5 cursor-pointer"
                        aria-label="Remove uploaded file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description Textarea */}
          <Textarea
            label={formMode === 'client' ? 'Project Requirements' : 'Bid Narrative Details'}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
            }}
            placeholder={
              formMode === 'client'
                ? 'Outline your spatial requirements, zoning constraints, or architectural objectives...'
                : 'Describe subcontractor work histories, qualifications, and design methodologies...'
            }
            error={errors.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center mt-4"
            disabled={loading || uploading}
          >
            {loading ? 'Transmitting Tender Details...' : 'Transmit Form Statement'}
          </Button>

        </form>
      ) : (
        /* Success screen */
        <div className="relative z-10 text-center py-16 space-y-6 animate-fade-in-up">
          <CheckCircle2 className="h-16 w-16 text-gold-600 mx-auto gold-glow" />
          <h3 className="font-display font-bold text-2xl text-obsidian-950 uppercase tracking-wider">
            {formMode === 'client' ? 'Inquiry Transmitted' : 'Tender Logged'}
          </h3>
          <p className="text-xs text-obsidian-600 leading-relaxed max-w-sm mx-auto">
            {formMode === 'client'
              ? 'Thank you. Your request statement was transmitted to our design studio. A principal architect will follow up shortly.'
              : `Tender document has been successfully processed under file: ${file?.name || 'blueprints.dwg'}. Your bid is locked for appraisal.`}
          </p>
          <div className="pt-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setPhone('');
                setCompany('');
                setMessage('');
                setProjectName('');
                setBidAmount('');
                setFile(null);
              }}
            >
              Reset Portal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
