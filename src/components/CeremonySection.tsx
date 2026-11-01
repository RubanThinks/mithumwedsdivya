import { useRef, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScratchCardReveal from './ScratchCardReveal';

gsap.registerPlugin(ScrollTrigger);

const CeremonySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.ceremony-compact-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden bg-forest-dark text-ivory"
    >
      {/* Background Wedding Photography - 100% VISIBLE, UNBLURRED */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/ceremony-bg.jpg')`,
          opacity: 1,
          filter: 'none',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-gold-light font-black mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            ✦ Sacred Union Under The Auspices ✦
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-gold font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            The Wedding Celebration
          </h2>
          <div className="ornamental-divider mx-auto my-4 max-w-xs">
            <span className="text-gold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✦</span>
          </div>
          <p className="font-cormorant italic text-champagne text-2xl md:text-3xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            We warmly request the honor of your gracious presence
          </p>
        </div>

        {/* DIAMOND HEART SCRATCH CARD WITH MONOGRAM M ❤️ D */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <ScratchCardReveal />
        </div>

        {/* 2 COMPACT CEREMONY & TIMING CARDS (No Venue Location duplication here) */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Card 1: Sacred Date */}
          <div className="ceremony-compact-card rounded-2xl border-2 border-gold/50 bg-[#102019]/95 p-7 text-center shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between hover:border-gold transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#641E32] border border-gold/50 flex items-center justify-center mb-3 text-gold shadow-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="font-cinzel text-gold text-xs tracking-widest uppercase font-black mb-1">
                Auspicious Date
              </p>
              <h3 className="font-playfair text-3xl text-ivory font-black mb-1">
                12 November 2022
              </h3>
              <p className="font-poppins text-champagne text-sm font-semibold">
                Saturday
              </p>
            </div>
          </div>

          {/* Card 2: Muhurtham & Sacred Timings */}
          <div className="ceremony-compact-card rounded-2xl border-2 border-gold bg-[#3F101E]/95 p-7 text-center shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gold text-[#3F101E] flex items-center justify-center mb-3 shadow-lg font-black">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-cinzel text-gold text-xs tracking-widest uppercase font-black mb-1">
                Sacred Muhurtham
              </p>
              <h3 className="font-playfair text-3xl text-ivory font-extrabold mb-1">
                6:38 PM
              </h3>
              <p className="font-poppins text-gold-light text-sm font-semibold">
                Evening Ceremony
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeremonySection;
