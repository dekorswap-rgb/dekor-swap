"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { validateContactForm, isValidEmail, sanitizeName } from "@/lib/security";
import { checkRateLimit, formatResetTime } from "@/lib/rateLimiter";

// EmailJS Configuration - same as get-started page
const EMAILJS_SERVICE_ID = "service_skohlrk";
const EMAILJS_TEMPLATE_ID_CONTACT = "template_s5u472g"; // Business email template
const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_s5u472g"; // Customer confirmation template
const EMAILJS_PUBLIC_KEY = "IkC3SxbZdfzynJdTs";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Check rate limit
      const rateLimit = checkRateLimit('CONTACT_FORM');
      if (!rateLimit.isAllowed) {
        setError(`Too many submissions. Please try again in ${formatResetTime(rateLimit.resetIn)}.`);
        setIsSubmitting(false);
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      // Validate subject length first
      if (formData.subject.length < 3 || formData.subject.length > 200) {
        setError("Subject must be between 3 and 200 characters");
        setIsSubmitting(false);
        return;
      }

      // Validate and sanitize inputs (message only, not combined with subject)
      const sanitizedData = validateContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (!sanitizedData) {
        setError("Invalid input data. Please check your information.");
        setIsSubmitting(false);
        return;
      }

      // Sanitize subject separately
      const sanitizedSubject = formData.subject.substring(0, 200).trim();

      // Prepare email data for business (to you)
      const businessEmailData = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        subject: sanitizedSubject,
        message: sanitizedData.message,
        timestamp: new Date().toLocaleString(),
        form_type: "Contact Form",
      };

      // Prepare email data for customer confirmation
      const customerEmailData = {
        to_name: sanitizedData.name,
        to_email: sanitizedData.email,
        subject: sanitizedSubject,
        message_preview: sanitizedData.message.substring(0, 100) + (sanitizedData.message.length > 100 ? "..." : ""),
      };

      // Send inquiry email to business (dekorswap@gmail.com)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CONTACT,
        businessEmailData,
        EMAILJS_PUBLIC_KEY
      );

      // Send confirmation email to customer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE_ID,
        customerEmailData,
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Email send error:", err);

      // Handle validation errors
      if (err.message && err.message.includes('Invalid')) {
        setError(err.message);
      } else {
        setError("Failed to send message. Please try again or email us directly at dekorswap@gmail.com");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Message sent successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for reaching out. We've received your message and will get back to you within 24 hours.
            Check your email for confirmation.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight">
              Let's chat about <br />
              <span className="text-accent">your space.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Have questions about our plans? Need styling advice? Or just want to say hi? We'd love to hear from you.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary mb-1 text-lg">Email us</p>
                  <a href="mailto:dekorswap@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                    dekorswap@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary mb-1 text-lg">Call us</p>
                  <p className="text-muted-foreground">+91 9996234649</p>
                  <p className="text-muted-foreground">+91 9131437446</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary mb-1 text-lg">Visit our studio</p>
                  <p className="text-muted-foreground">Raipur, C.G, India</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-primary mb-6 uppercase tracking-widest text-xs">Follow our journey</p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={20} />, label: "Instagram" },
                  { icon: <Facebook size={20} />, label: "Facebook" },
                  { icon: <Twitter size={20} />, label: "Twitter" }
                ].map((social, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white hover:border-accent transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[5rem] -z-10" />

            <h2 className="text-2xl font-bold text-primary mb-8">Send us a message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Full Name <span className="text-accent">*</span></label>
                  <Input
                    placeholder="John Doe"
                    className="rounded-xl border-border focus:ring-accent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Email Address <span className="text-accent">*</span></label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-xl border-border focus:ring-accent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Subject <span className="text-accent">*</span></label>
                <Input
                  placeholder="Inquiry about Standard Plan"
                  className="rounded-xl border-border focus:ring-accent"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Message <span className="text-accent">*</span></label>
                <Textarea
                  placeholder="Tell us about your space and what you're looking for..."
                  className="min-h-[150px] rounded-xl border-border focus:ring-accent"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full h-14 bg-primary text-lg font-bold group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <section className="mt-32">
          <div className="w-full h-[400px] bg-brand-offwhite rounded-[2.5rem] border border-border flex items-center justify-center overflow-hidden grayscale contrast-75 hover:grayscale-0 transition-all duration-700">
            <div className="text-center p-8">
              <MapPin size={48} className="text-accent mx-auto mb-4 animate-bounce" />
              <p className="text-xl font-bold text-primary">Find us in Raipur</p>
              <p className="text-muted-foreground">Studio Address Placeholder, Raipur, Chhattisgarh, India</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
