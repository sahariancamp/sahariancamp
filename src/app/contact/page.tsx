import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { campInfo } from "@/lib/info";

export const metadata = {
  title: "Contact Us | Saharian Camp",
  description:
    "Get in touch with Saharian Camp. We are at your disposal to help plan your luxury desert experience in Merzouga, Morocco.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1E] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[#C4A35A] text-sm tracking-[0.3em] uppercase mb-4">
            Don't Hesitate
          </h2>
          <h1
            className="text-4xl md:text-6xl font-light text-[#E8D5B7] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in touch <span className="text-[#C4A35A] italic">with us</span>
          </h1>
          <p
            className="text-[#D4C4A8]/70 text-lg max-w-2xl mx-auto"
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
                className="text-2xl text-[#E8D5B7] font-light mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Information
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C4A35A]/20 flex items-center justify-center bg-[#1A1A2E] group-hover:bg-[#C4A35A] transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-[#C4A35A] group-hover:text-[#0F0F1E] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[#E8D5B7] font-medium mb-1">
                      Location
                    </h4>
                    <p className="text-[#D4C4A8]/70 text-sm leading-relaxed">
                      {campInfo.address.split(",").map((line, i) => (
                        <span key={i}>
                          {line.trim()}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C4A35A]/20 flex items-center justify-center bg-[#1A1A2E] group-hover:bg-[#C4A35A] transition-colors duration-300">
                    <Phone className="w-5 h-5 text-[#C4A35A] group-hover:text-[#0F0F1E] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[#E8D5B7] font-medium mb-1">
                      Phone & WhatsApp
                    </h4>
                    <p className="text-[#D4C4A8]/70 text-sm">
                      <a
                        href={`tel:${campInfo.phone.replace(/\s+/g, "")}`}
                        className="hover:text-[#C4A35A] transition-colors"
                      >
                        {campInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C4A35A]/20 flex items-center justify-center bg-[#1A1A2E] group-hover:bg-[#C4A35A] transition-colors duration-300">
                    <Mail className="w-5 h-5 text-[#C4A35A] group-hover:text-[#0F0F1E] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[#E8D5B7] font-medium mb-1">Email</h4>
                    <p className="text-[#D4C4A8]/70 text-sm">
                      <a
                        href={`mailto:${campInfo.email}`}
                        className="hover:text-[#C4A35A] transition-colors"
                      >
                        {campInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C4A35A]/20 flex items-center justify-center bg-[#1A1A2E] group-hover:bg-[#C4A35A] transition-colors duration-300">
                    <Clock className="w-5 h-5 text-[#C4A35A] group-hover:text-[#0F0F1E] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[#E8D5B7] font-medium mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-[#D4C4A8]/70 text-sm leading-relaxed">
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
            <div className="w-full h-64 bg-[#1A1A2E] rounded-3xl border border-[#C4A35A]/20 overflow-hidden relative group">
              {/* Embed Google Maps */}
              <div className="absolute inset-0 bg-[#0F0F1E]/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
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

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#1A1A2E] rounded-3xl p-8 md:p-12 border border-[#C4A35A]/10 shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A35A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <h3
                className="text-2xl text-[#E8D5B7] font-light mb-8 relative z-10"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send us a message
              </h3>

              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-[#D4C4A8] text-xs tracking-wider uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#0F0F1E] border border-[#C4A35A]/20 rounded-lg px-4 py-3 text-[#E8D5B7] focus:outline-none focus:border-[#C4A35A] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[#D4C4A8] text-xs tracking-wider uppercase"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#0F0F1E] border border-[#C4A35A]/20 rounded-lg px-4 py-3 text-[#E8D5B7] focus:outline-none focus:border-[#C4A35A] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-[#D4C4A8] text-xs tracking-wider uppercase"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-[#0F0F1E] border border-[#C4A35A]/20 rounded-lg px-4 py-3 text-[#E8D5B7] focus:outline-none focus:border-[#C4A35A] transition-colors"
                    placeholder="Inquiry about luxury tents"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-[#D4C4A8] text-xs tracking-wider uppercase"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-[#0F0F1E] border border-[#C4A35A]/20 rounded-lg px-4 py-3 text-[#E8D5B7] focus:outline-none focus:border-[#C4A35A] transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#C4A35A] text-[#0F0F1E] font-medium px-8 py-4 rounded-lg hover:bg-[#D4C4A8] transition-colors duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="tracking-widest uppercase text-xs">
                    Send Message
                  </span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
