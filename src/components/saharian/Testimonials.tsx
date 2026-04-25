"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  stay_date: string;
  source: "google" | "tripadvisor" | "booking";
}

const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case "google":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-full border border-gray-100 shadow-sm">
          <svg className="w-3 h-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-[10px] font-medium text-foreground/10">Google</span>
        </div>
      );
    case "tripadvisor":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-background rounded-full shadow-sm">
          <svg
            className="w-3 h-3"
            viewBox="0 -96 512.2 512.2"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--primary)"
          >
            <path
              d="M128.2 127.9C92.7 127.9 64 156.6 64 192c0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1.1-35.4-28.6-64.1-64-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S174 166.7 174 192s-20.5 45.9-45.8 45.9z"
            />
            <circle cx="128.4" cy="191.9" r="31.9" />
            <path
              d="M384.2 127.9c-35.4 0-64.1 28.7-64.1 64.1 0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1 0-35.4-28.7-64.1-64.1-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S430 166.7 430 192s-20.5 45.9-45.8 45.9z"
            />
            <circle cx="384.4" cy="191.9" r="31.9" />
            <path
              d="M474.4 101.2l37.7-37.4h-76.4C392.9 29 321.8 0 255.9 0c-66 0-136.5 29-179.3 63.8H0l37.7 37.4C14.4 124.4 0 156.5 0 192c0 70.8 57.4 128.2 128.2 128.2 32.5 0 62.2-12.1 84.8-32.1l43.4 31.9 42.9-31.2-.5-1.2c22.7 20.2 52.5 32.5 85.3 32.5 70.8 0 128.2-57.4 128.2-128.2-.1-35.4-14.6-67.5-37.9-90.7zM368 64.8c-60.7 7.6-108.3 57.6-111.9 119.5-3.7-62-51.4-112.1-112.3-119.5 30.6-22 69.6-32.8 112.1-32.8S337.4 42.8 368 64.8zM128.2 288.2C75 288.2 32 245.1 32 192s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2zm256 0c-53.1 0-96.2-43.1-96.2-96.2s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2z"
            />
          </svg>
          <span className="text-[10px] font-medium text-white">
            TripAdvisor
          </span>
        </div>
      );
    case "booking":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#003580] rounded-full shadow-sm">
          <span className="text-[10px] font-bold text-white">B.</span>
          <span className="text-[10px] font-medium text-white">
            Booking.com
          </span>
        </div>
      );
    default:
      return null;
  }
};

function ReviewCard({
  testimonial,
  index,
}: {
  testimonial: Review;
  index: number;
}) {
  const rotation = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3) / 10);

  const getSourceStyles = (source: string) => {
    switch (source) {
      case "google":
        return "border-t-4 border-t-[#4285F4]";
      case "tripadvisor":
        return "border-t-4 border-t-[#00AF87]";
      case "booking":
        return "border-t-4 border-t-[#003580]";
      default:
        return "border-t-4 border-t-[#C4A35A]";
    }
  };

  return (
    <motion.div
      className={`flex-shrink-0 w-72 md:w-85 bg-white rounded-xl p-6 shadow-xl relative ${getSourceStyles(testimonial.source)}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ rotate: 0, scale: 1.05, y: -10, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="absolute -top-3 -right-3">
        <SourceIcon source={testimonial.source} />
      </div>

      <Quote className="w-8 h-8 text-foreground/5 absolute top-4 left-4 -z-10" />

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
          />
        ))}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-6 italic font-light">
        "{testimonial.comment}"
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-lg">
            {testimonial.customer_name.charAt(0)}
          </div>
          <div>
            <p className="text-gray-900 text-sm font-semibold">
              {testimonial.customer_name}
            </p>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider">
              Verified Review
            </p>
          </div>
        </div>
        <p className="text-gray-400 text-[10px] font-medium">
          {testimonial.stay_date
            ? new Date(testimonial.stay_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : ""}
        </p>
      </div>
    </motion.div>
  );
}

export default function Testimonials({
  initialReviews = [],
}: {
  initialReviews?: Review[];
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate reviews for continuous scrolling effect
  const displayReviews =
    initialReviews.length > 0 ? [...initialReviews, ...initialReviews] : [];

  if (displayReviews.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#C4A35A] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A35A] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 px-6">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Voices of the Dune
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What They <span className="text-[#C4A35A]">Whisper</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Genuine stories from travelers who experienced the magic of Saharian
            Luxury Camp.
          </p>
        </div>

        {/* Continuous Marquee */}
        <div
          className="relative overflow-hidden py-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={marqueeRef}
            className="flex gap-10 px-5"
            style={{
              animation: `marquee 80s linear infinite`,
              animationPlayState: isHovered ? "paused" : "running",
              width: "max-content",
            }}
          >
            {displayReviews.map((t, i) => (
              <ReviewCard key={`${t.id}-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
