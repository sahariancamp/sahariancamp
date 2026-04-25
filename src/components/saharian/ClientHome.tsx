"use client";

import { useState } from "react";
import Preloader from "@/components/saharian/Preloader";
import Hero from "@/components/saharian/Hero";
import Camp from "@/components/saharian/Camp";
import Accommodations from "@/components/saharian/Accommodations";
import Experiences from "@/components/saharian/Experiences";
import Testimonials from "@/components/saharian/Testimonials";
import SectionDivider from "@/components/saharian/SectionDivider";
import Footer from "@/components/saharian/Footer";

interface ClientHomeProps {
  initialTents: any[];
  initialActivities: any[];
  initialReviews: any[];
}

export default function ClientHome({
  initialTents,
  initialActivities,
  initialReviews,
}: ClientHomeProps) {
  return (
    <>
      <main className="relative">
        <Hero />
        <SectionDivider variant="compass" />
        <Camp />
        <SectionDivider variant="gold-line" />

        {/* Pass data to components */}
        <Accommodations initialData={initialTents} />
        
        <SectionDivider variant="gold-line" />
        <Experiences initialData={initialActivities} />

        <Testimonials initialReviews={initialReviews} />
      </main>
    </>
  );
}
