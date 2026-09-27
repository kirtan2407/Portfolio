"use client";

import React, { useState } from "react";
import { contactData } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Mail, ArrowUpRight, Loader2, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Reveal } from "../ui/Reveal";
import { MagneticLink, MagneticButton } from "../ui/MagneticButton";
import { sendEmail } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full mb-24">
      <Reveal className="glass p-8 md:p-16 w-full flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Info */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            {contactData.headline}
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-md leading-relaxed">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
            <MagneticLink
              href={`mailto:${contactData.email}`}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full glass text-text-primary font-medium hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5 text-accent-cyan" />
              Email
            </MagneticLink>
            
            <MagneticLink
              href={`https://${contactData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full glass text-text-primary font-medium hover:bg-white/10 transition-colors"
            >
              <SiGithub className="w-5 h-5" />
              GitHub
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </MagneticLink>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            <div className="relative group">
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Name" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all"
              />
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
              />
            </div>
            
            <div className="relative group">
              <textarea 
                name="message" 
                required 
                placeholder="Message" 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all resize-none"
              />
            </div>
            
            <MagneticButton 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full mt-2 h-14 rounded-full bg-accent-gradient text-white font-medium flex items-center justify-center overflow-hidden disabled:opacity-80"
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.span 
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    Send Message
                  </motion.span>
                )}
                {status === "loading" && (
                  <motion.div 
                    key="loading"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-6 h-6" /> Sent Successfully
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.span 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errorMsg}
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
