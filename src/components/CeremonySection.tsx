import React, { useRef, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScratchCardReveal from './ScratchCardReveal';

gsap.registerPlugin(ScrollTrigger);

const CeremonySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scratchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && sectionRef.current) {
        // Coordinated sequential reveal timeline on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Heading entrance
        if (headingRef.current) {
          tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
          );
        }

        // 2. Scratch card appearance
        if (scratchRef.current) {
          tl.fromTo(
            scratchRef.current,
            { opacity: 0, y: 30, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // 3. Information cards entrance
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.wedding-info-card');
          tl.fromTo(
            cards,
            { opacity: 0, y: 30, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out',
            },
            '-=0.3'
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden bg-[#EEDCBF] text-[#2E1810]"
    >
      {/* ========================================================
          1. 100% VIBRANT BACKGROUND - ZERO OVERLAYS, ZERO BLUR, ZERO FILTERS
          ======================================================== */}
      {/* Desktop (16:9 Landscape - Exact Uploaded HD Asset) */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/ceremony-bg-desktop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* Mobile (9:16 Portrait - Exact Uploaded HD Asset) */}
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/ceremony-bg-mobile.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* ========================================================
          2. FOREGROUND CONTENT
          ======================================================== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-12">
          <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8A6517] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            ✦ Save Our Auspicious Date ✦
          </p>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#4A0E1F] font-black tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            THE BIG DAY
          </h2>

          <div className="flex items-center justify-center gap-3 w-40 mx-auto my-3">
            <span className="h-0.5 w-14 bg-gradient-to-r from-transparent via-[#8A6517] to-transparent" />
            <span className="text-[#8A6517] text-sm">✦</span>
            <span className="h-0.5 w-14 bg-gradient-to-l from-transparent via-[#8A6517] to-transparent" />
          </div>

          <p className="font-cormorant italic text-[#3E0E1B] text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
            A special date, a beautiful beginning.
          </p>
        </div>

        {/* Interactive Scratch Card Container */}
        <div ref={scratchRef} className="mb-12 sm:mb-16">
          <ScratchCardReveal />
        </div>

        {/* Wedding Information Cards (Below Scratch Card) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {/* Card 1 – Wedding Date */}
          <div className="wedding-info-card rounded-2xl border border-[#C6A15B]/50 bg-[#FFFDF9]/95 p-7 sm:p-8 text-center shadow-[0_12px_32px_rgba(70,30,10,0.12)] flex flex-col items-center justify-between hover:border-[#8A6517] hover:shadow-[0_16px_40px_rgba(138,101,23,0.2)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#4A0E1F]/10 border border-[#C6A15B]/60 flex items-center justify-center mx-auto mb-3.5 text-[#4A0E1F] shadow-sm">
                <Calendar className="w-5 h-5 text-[#8A6517]" />
              </div>

              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black block mb-1">
                WEDDING DATE
              </span>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#4A0E1F] font-bold tracking-wide my-1">
                12 November 2022
              </h3>
            </div>

            <div className="pt-3 border-t border-[#C6A15B]/25 w-full mt-3">
              <p className="font-poppins text-sm text-[#5C4015] font-semibold tracking-wider uppercase">
                Saturday
              </p>
            </div>
          </div>

          {/* Card 2 – Wedding Time */}
          <div className="wedding-info-card rounded-2xl border border-[#C6A15B]/50 bg-[#FFFDF9]/95 p-7 sm:p-8 text-center shadow-[0_12px_32px_rgba(70,30,10,0.12)] flex flex-col items-center justify-between hover:border-[#8A6517] hover:shadow-[0_16px_40px_rgba(138,101,23,0.2)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#4A0E1F]/10 border border-[#C6A15B]/60 flex items-center justify-center mx-auto mb-3.5 text-[#4A0E1F] shadow-sm">
                <Clock className="w-5 h-5 text-[#8A6517]" />
              </div>

              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black block mb-1">
                MUHURTHAM
              </span>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#4A0E1F] font-bold tracking-wide my-1">
                6:38 PM
              </h3>
            </div>

            <div className="pt-3 border-t border-[#C6A15B]/25 w-full mt-3">
              <p className="font-cormorant italic text-base text-[#5C4015] font-bold">
                The auspicious wedding moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeremonySection;
