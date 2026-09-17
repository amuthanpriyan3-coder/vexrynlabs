import React, { useState } from 'react';
import { Send, Instagram, ArrowUpRight, CheckCircle, AlertCircle, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactFormData } from '../types';

interface ContactProps {
  initialProjectType?: string;
}

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const Contact: React.FC<ContactProps> = ({ initialProjectType = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: initialProjectType || 'Website Development',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<{ email: string; projectType: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isNotConfigured, setIsNotConfigured] = useState(false);

  const projectTypes = [
    'Website Development',
    'Mobile App Development',
    'AI / IoT / Embedded Projects',
    'Automation & Robotics',
    'Final Year Project',
    'Custom Technology Project',
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name or company.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else {
      const cleanPhone = formData.phone.trim();
      const validCharRegex = /^[+]?[\d\s().-]{7,25}$/;
      const digits = cleanPhone.replace(/\D/g, '');
      if (!validCharRegex.test(cleanPhone) || digits.length < 8 || digits.length > 15) {
        newErrors.phone = 'Please enter a valid phone number (e.g. +91 98765 43210).';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief description of your project.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message should be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setIsNotConfigured(false);
    if (!validate()) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    // 15 seconds request timeout
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          phoneNumber: formData.phone.trim(),
          projectType: formData.projectType,
          message: formData.message.trim(),
        }),
        signal: controller.signal,
      });

      let data: { success?: boolean; configured?: boolean; error?: string; message?: string } | null = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.warn('Could not parse server response as JSON:', parseError);
        }
      }

      if (response.ok && data?.success) {
        setSubmittedDetails({
          email: formData.email.trim(),
          projectType: formData.projectType,
        });
        setIsSubmitted(true);
        setServerError(null);
        setIsNotConfigured(false);
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Website Development',
          message: '',
        });
        setErrors({});
      } else {
        if (data?.configured === false || response.status === 503) {
          setIsNotConfigured(true);
        }
        const errorMsg =
          data?.message ||
          data?.error ||
          (response.status === 404
            ? 'The contact service endpoint was not found (404). Please contact vexrynlabs@gmail.com directly.'
            : `Unable to send enquiry (Error ${response.status} ${response.statusText || 'Server Error'}). Please try again or reach out directly to vexrynlabs@gmail.com.`);
        setServerError(errorMsg);
      }
    } catch (networkErr: any) {
      console.error('Contact submission error:', networkErr);
      if (networkErr?.name === 'AbortError') {
        setServerError(
          'Request timed out. The server took too long to respond. Please check your connection or reach out directly to vexrynlabs@gmail.com.'
        );
      } else {
        const errMsg = networkErr instanceof Error ? networkErr.message : 'Network connection error';
        setServerError(
          `Unable to reach server endpoint (${errMsg}). Please check your connectivity or reach out directly to vexrynlabs@gmail.com.`
        );
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Website Development',
      message: '',
    });
    setErrors({});
    setServerError(null);
    setIsNotConfigured(false);
    setIsSubmitted(false);
    setSubmittedDetails(null);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct CTA & Copy with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: transitionEase }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-[1px] bg-[#CCFF00]" />
                <span className="text-[#CCFF00] text-[10px] uppercase font-bold tracking-[0.3em]">
                  Initiate Engagement
                </span>
              </div>

              {/* Contact Main Heading */}
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08] mb-6">
                Have a project in mind?
              </h2>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed mb-8">
                Let’s turn your idea into something real.
              </p>

              {/* Prompt Action Buttons: "DM ON INSTAGRAM" & "Start a Project" */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mb-10">
                <motion.a
                  whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: transitionEase } }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.instagram.com/vexrynlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-dm-instagram-btn"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#111111] hover:bg-[#161616] text-white hover:text-[#CCFF00] border border-[#1A1A1A] hover:border-[#CCFF00] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-[#CCFF00]" />
                  <span>DM ON INSTAGRAM</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: transitionEase } }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  id="contact-start-project-btn"
                  onClick={() => {
                    const formInput = document.getElementById('contact-name-input');
                    if (formInput) formInput.focus();
                  }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Start a Project</span>
                </motion.button>
              </div>

              {/* Studio Direct Reach info */}
              <div className="p-6 bg-[#0A0A0A] border border-[#1A1A1A] space-y-4">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  PROJECT INQUIRIES
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <a
                    href="mailto:vexrynlabs@gmail.com"
                    className="font-mono text-xs hover:text-[#CCFF00] transition-colors"
                  >
                    vexrynlabs@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MessageSquare className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span className="font-mono text-xs">Typical response time: &lt; 24 hours</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-8 text-[10px] font-mono text-gray-600">
              VEXRYN LABS // DIGITAL TECHNOLOGY STUDIO
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: transitionEase }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 bg-[#0A0A0A] border border-[#1A1A1A] shadow-2xl">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted-state"
                    id="contact-success-container"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: transitionEase }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: transitionEase }}
                      className="w-16 h-16 mx-auto mb-6 bg-[#111111] border border-[#CCFF00] flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-3">
                      Request sent successfully. We'll get back to you soon.
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                      Your enquiry for <span className="text-[#CCFF00]">{submittedDetails?.projectType || 'your project'}</span> has been dispatched to <span className="text-white font-mono">vexrynlabs@gmail.com</span>. We will review your requirements and follow up directly at <span className="text-white font-mono">{submittedDetails?.email || 'your email'}</span> within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      id="contact-send-another-btn"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] hover:bg-[#CCFF00] text-white hover:text-black border border-[#222222] hover:border-[#CCFF00] text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      <span>Send Another Enquiry</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form-state"
                    id="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >

                    {/* Server Error / Setup Required Notice */}
                    <AnimatePresence>
                      {serverError && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isNotConfigured ? (
                            <div className="p-4 bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs space-y-2.5">
                              <div className="flex items-center gap-2 font-bold font-mono uppercase text-amber-400">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>Email Dispatch Service Not Yet Configured</span>
                              </div>
                              <p className="text-gray-300 leading-relaxed text-[13px]">
                                Automated server dispatch to <strong className="text-white">vexrynlabs@gmail.com</strong> requires environment credentials. Please define <code className="text-[#CCFF00] bg-black/60 px-1 py-0.5 border border-[#333]">SMTP_USER</code> and <code className="text-[#CCFF00] bg-black/60 px-1 py-0.5 border border-[#333]">SMTP_PASS</code> (or a 16-character Gmail App Password) in your server environment.
                              </p>
                              <div className="pt-2 flex flex-wrap gap-2">
                                <a
                                  href="https://www.instagram.com/vexrynlabs"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111111] border border-[#333] text-gray-200 font-mono text-[11px] uppercase tracking-wider hover:border-[#CCFF00] transition-colors"
                                >
                                  <Instagram className="w-3.5 h-3.5 text-[#CCFF00]" />
                                  <span>DM on Instagram</span>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-red-950/20 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                              <div>
                                <p className="font-bold font-mono uppercase text-red-400 mb-1">Transmission Error</p>
                                <p>{serverError}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="contact-name-input"
                        className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2"
                      >
                        Name <span className="text-[#CCFF00]">*</span>
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name or company"
                        className={`w-full px-4 py-3 bg-[#111111] text-white placeholder-gray-600 border text-sm transition-colors outline-none focus:border-[#CCFF00] ${
                          errors.name ? 'border-red-500/80 bg-red-950/10' : 'border-[#1A1A1A]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="contact-email-input"
                        className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2"
                      >
                        Email <span className="text-[#CCFF00]">*</span>
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3 bg-[#111111] text-white placeholder-gray-600 border text-sm transition-colors outline-none focus:border-[#CCFF00] ${
                          errors.email ? 'border-red-500/80 bg-red-950/10' : 'border-[#1A1A1A]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div>
                      <label
                        htmlFor="contact-phone-input"
                        className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2"
                      >
                        PHONE NUMBER <span className="text-[#CCFF00]">*</span>
                      </label>
                      <input
                        id="contact-phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        className={`w-full px-4 py-3 bg-[#111111] text-white placeholder-gray-600 border text-sm transition-colors outline-none focus:border-[#CCFF00] ${
                          errors.phone ? 'border-red-500/80 bg-red-950/10' : 'border-[#1A1A1A]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Project Type Select / Selector */}
                    <div>
                      <label
                        htmlFor="contact-project-type-select"
                        className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2"
                      >
                        Project Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {projectTypes.map((type) => (
                          <motion.button
                            key={type}
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            id={`contact-type-${type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`px-3 py-2.5 text-xs font-mono text-left border transition-colors cursor-pointer ${
                              formData.projectType === type
                                ? 'bg-[#111111] border-[#CCFF00] text-white font-bold'
                                : 'bg-[#0D0D0D] border-[#1A1A1A] text-gray-400 hover:text-white'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label
                          htmlFor="contact-message-input"
                          className="block text-[10px] font-mono uppercase tracking-widest text-gray-400"
                        >
                          Message <span className="text-[#CCFF00]">*</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        id="contact-message-input"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the scope, goals, or requirements of your project..."
                        className={`w-full px-4 py-3 bg-[#111111] text-white placeholder-gray-600 border text-sm transition-colors outline-none focus:border-[#CCFF00] resize-none ${
                          errors.message ? 'border-red-500/80 bg-red-950/10' : 'border-[#1A1A1A]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button: "Send Request" */}
                    <motion.button
                      whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: transitionEase } }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      id="contact-send-request-btn"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] hover:bg-[#b8e600] disabled:bg-[#333333] text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Request</span>
                          <Send className="w-4 h-4 text-black" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] font-mono text-gray-600">
                      Your information is protected under strict confidentiality.
                    </p>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
