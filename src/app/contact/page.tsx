"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check, ArrowRight } from "lucide-react";
import { campInfo } from "@/lib/info";
import { submitContactForm } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitContactForm(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Don't Hesitate
          </h2>
          <h1
            className="text-4xl md:text-6xl font-light text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in touch <span className="text-primary italic">with us</span>
          </h1>
          <p
            className="text-muted-foreground/70 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            We are at your disposal and more than happy to help you plan your
            perfect desert getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Information */}
          <div className="order-2 lg:order-1 space-y-12">
            <div>
              <h3
                className="text-2xl text-foreground font-light mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Information
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-card group-hover:bg-primary transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      Location
                    </h4>
                    <div className="text-muted-foreground/70 text-sm leading-relaxed">
                      {campInfo.address.split(",").map((line, i) => (
                        <p key={i}>{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-card group-hover:bg-primary transition-colors duration-300">
                    <Phone className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      Phone & WhatsApp
                    </h4>
                    <p className="text-muted-foreground/70 text-sm">
                      <a
                        href={`tel:${campInfo.phone.replace(/\s+/g, "")}`}
                        className="hover:text-primary transition-colors"
                      >
                        {campInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-card group-hover:bg-primary transition-colors duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground/70 text-sm">
                      <a
                        href={`mailto:${campInfo.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {campInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-card group-hover:bg-primary transition-colors duration-300">
                    <Clock className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-muted-foreground/70 text-sm leading-relaxed">
                      10:00 AM – 6:00 PM (UTC / GMT +1 h)
                      <br />
                      Monday – Friday
                      <br />
                      Info & Bookings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-card rounded-3xl border border-primary/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.6402068310754!2d-3.9482113752749277!3d31.21121947435714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd973c46aaaaaacb%3A0xd8d34ccbf9fa3673!2sSaharian%20Luxury%20Camp!5e1!3m2!1sar!2sma!4v1777043417502!5m2!1sar!2sma"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-primary/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center relative z-10"
                  >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Check className="w-10 h-10 text-primary" />
                    </div>
                    <h3
                      className="text-3xl text-foreground font-light mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground/70 mb-10">
                      Thank you for reaching out. Our team has received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-primary hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10"
                  >
                    <h3
                      className="text-2xl text-foreground font-light mb-8"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Send us a message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-muted-foreground text-xs tracking-wider uppercase"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background border border-primary/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-muted-foreground text-xs tracking-wider uppercase"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-background border border-primary/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-muted-foreground text-xs tracking-wider uppercase"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-background border border-primary/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                          placeholder="Inquiry about luxury tents"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-muted-foreground text-xs tracking-wider uppercase"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-background border border-primary/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-background font-medium px-8 py-4 rounded-lg hover:opacity-90 transition-colors duration-300 flex items-center justify-center gap-3 group disabled:opacity-50"
                      >
                        <span className="tracking-widest uppercase text-xs">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
