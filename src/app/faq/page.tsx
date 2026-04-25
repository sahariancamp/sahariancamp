import Accordion from '@/components/saharian/Accordion'

export const metadata = {
  title: 'FAQ | Saharian Camp',
  description: 'Frequently asked questions about staying at Saharian Camp in the Merzouga desert.',
}

const faqs = [
  {
    question: "How do we get to the camp?",
    answer: "Our main meeting point is in the village of Merzouga. From there, depending on your booked package, we will transfer you to the camp via 4x4 vehicles or on a traditional camel trek across the dunes. The journey takes approximately 30 minutes by 4x4 or 1.5 hours by camel."
  },
  {
    question: "Are the tents air-conditioned or heated?",
    answer: "Yes, our luxury and deluxe tents are fully equipped to handle the desert climate. They feature modern air conditioning for the warm summer days and heating systems for the cool desert nights, ensuring your absolute comfort year-round."
  },
  {
    question: "What should I pack for my desert trip?",
    answer: "We recommend packing light, breathable clothing for the day and warm layers for the evening, as temperatures can drop significantly after sunset. Don't forget comfortable walking shoes, sunglasses, sunscreen, a hat, and your camera. All bathroom amenities and towels are provided in your tent."
  },
  {
    question: "Is there WiFi available at the camp?",
    answer: "Yes, despite our remote location, we provide high-speed WiFi access in the main restaurant and lounge areas so you can share your magical desert moments with friends and family."
  },
  {
    question: "Do you cater to specific dietary requirements?",
    answer: "Absolutely. Our expert chefs can accommodate vegetarian, vegan, gluten-free, and other dietary requirements. Please inform us of any specific needs when making your reservation so we can prepare accordingly."
  },
  {
    question: "Is the camp safe for children?",
    answer: "Yes, Saharian Camp is family-friendly and completely safe for children. The desert offers a magical playground, and we have family tents specifically designed to accommodate parents and children comfortably."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Information</h2>
          <h1 
            className="text-4xl md:text-6xl font-light text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h1>
          <p 
            className="text-muted-foreground/70 text-lg"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Everything you need to know for a seamless journey into the Sahara.
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-primary/10 shadow-2xl">
          <Accordion items={faqs} />
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center border-t border-primary/10 pt-16">
          <h3 className="text-2xl text-foreground font-light mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Still have questions?
          </h3>
          <p className="text-muted-foreground/70 mb-8" style={{ fontFamily: "'Amiri', serif" }}>
            Our dedicated concierge team is at your disposal to help plan your perfect stay.
          </p>
          <a 
            href="/contact" 
            className="inline-block border border-primary/30 text-foreground px-8 py-3 rounded-full hover:bg-primary hover:text-background transition-all duration-300 tracking-[0.1em] uppercase text-xs"
          >
            Contact Us
          </a>
        </div>

      </div>
    </div>
  )
}
