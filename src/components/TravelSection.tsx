import React, { useRef, useEffect } from 'react';
import { TrainFront, Plane, Navigation, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TravelSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const railwayCardRef = useRef<HTMLDivElement>(null);
  const airportCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && sectionRef.current) {
        // 1. Heading Reveal
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // 2. Railway Card: Enters smoothly from the left
        if (railwayCardRef.current) {
          gsap.fromTo(
            railwayCardRef.current,
            { opacity: 0, x: -50, y: 25 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: railwayCardRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // 3. Airport Card: Enters smoothly from the right
        if (airportCardRef.current) {
          gsap.fromTo(
            airportCardRef.current,
            { opacity: 0, x: 50, y: 25 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: airportCardRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
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
          backgroundImage: `url('/images/travel-bg-desktop.jpg')`,
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
          backgroundImage: `url('/images/travel-bg-mobile.jpg')`,
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
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8A6517] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            ✦ Travel &amp; Connectivity ✦
          </p>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#4A0E1F] font-black tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            HOW TO REACH
          </h2>

          <div className="flex items-center justify-center gap-3 w-40 mx-auto my-3">
            <span className="h-0.5 w-14 bg-gradient-to-r from-transparent via-[#8A6517] to-transparent" />
            <span className="text-[#8A6517] text-sm">✦</span>
            <span className="h-0.5 w-14 bg-gradient-to-l from-transparent via-[#8A6517] to-transparent" />
          </div>

          <p className="font-cormorant italic text-[#3E0E1B] text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
            Nearest airport and railway connectivity to the wedding destination.
          </p>
        </div>

        {/* Two Travel Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 – Railway Connectivity Card */}
          <div
            ref={railwayCardRef}
            className="travel-info-card relative overflow-hidden rounded-[24px] border-2 border-[#C6A15B]/75 bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5EAD8] p-7 sm:p-9 text-center shadow-[0_20px_50px_rgba(70,30,10,0.16),0_0_25px_rgba(198,161,91,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col items-center justify-between hover:border-[#8A6517] hover:shadow-[0_26px_60px_rgba(138,101,23,0.26)] transition-all duration-300 group"
          >
            {/* Inner Gold Inset Frame */}
            <div className="absolute inset-2.5 sm:inset-3 border border-[#C6A15B]/40 rounded-[18px] pointer-events-none" />

            {/* Four Corner Flourishes */}
            <div className="absolute top-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 -rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 rotate-180">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 w-full">
              {/* Auspicious Top Motif */}
              <div className="flex items-center justify-center gap-1.5 text-[#C6A15B] text-[10px] mb-2 font-serif">
                <span>✦</span>
                <span className="text-xs">❧</span>
                <span>✤</span>
                <span className="text-xs">❧</span>
                <span>✦</span>
              </div>

              {/* Icon */}
              <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#4A0E1F]/15 to-[#8A6517]/20 border border-[#C6A15B]/70 flex items-center justify-center mx-auto mb-3 text-[#4A0E1F] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <TrainFront className="w-6 h-6 text-[#8A6517]" />
              </div>

              {/* Subtitle */}
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black block mb-1.5">
                NEAREST RAILWAY STATION
              </span>

              {/* Station Name */}
              <h3 className="font-cormorant text-2xl sm:text-3xl text-[#4A0E1F] font-black leading-tight mb-2 drop-shadow-sm">
                Palakollu Railway Station (PKO)
              </h3>

              {/* Distance description */}
              <p className="font-poppins text-sm text-[#2E1810] font-semibold leading-relaxed mb-4">
                Located right within town (~2 km from wedding venue).
              </p>

              {/* Alternative Railway Connectivity */}
              <div className="pt-3.5 border-t border-[#C6A15B]/35 text-center">
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-[#6E5014] font-black block mb-1">
                  Alternative Railway Connectivity
                </span>
                <p className="font-poppins text-xs text-[#5C4015] font-bold">
                  Bhimavaram Junction – Approximately 22 km (Express trains).
                </p>
              </div>
            </div>

            {/* Google Maps Button */}
            <a
              href="https://www.google.com/maps/search/Palakollu+Railway+Station"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-6 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#641E32] to-[#7A152E] hover:from-[#8A6517] hover:to-[#A3781D] text-[#FFFDF9] border border-[#C6A15B]/70 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 text-[#FFDF78]" />
              <span>STATION LOCATION ON MAP</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFDF78]" />
            </a>
          </div>

          {/* Card 2 – Airport Connectivity Card */}
          <div
            ref={airportCardRef}
            className="travel-info-card relative overflow-hidden rounded-[24px] border-2 border-[#C6A15B]/75 bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5EAD8] p-7 sm:p-9 text-center shadow-[0_20px_50px_rgba(70,30,10,0.16),0_0_25px_rgba(198,161,91,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col items-center justify-between hover:border-[#8A6517] hover:shadow-[0_26px_60px_rgba(138,101,23,0.26)] transition-all duration-300 group"
          >
            {/* Inner Gold Inset Frame */}
            <div className="absolute inset-2.5 sm:inset-3 border border-[#C6A15B]/40 rounded-[18px] pointer-events-none" />

            {/* Four Corner Flourishes */}
            <div className="absolute top-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 -rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#C6A15B]/80 rotate-180">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 w-full">
              {/* Auspicious Top Motif */}
              <div className="flex items-center justify-center gap-1.5 text-[#C6A15B] text-[10px] mb-2 font-serif">
                <span>✦</span>
                <span className="text-xs">❧</span>
                <span>✤</span>
                <span className="text-xs">❧</span>
                <span>✦</span>
              </div>

              {/* Icon */}
              <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#4A0E1F]/15 to-[#8A6517]/20 border border-[#C6A15B]/70 flex items-center justify-center mx-auto mb-3 text-[#4A0E1F] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Plane className="w-6 h-6 text-[#8A6517]" />
              </div>

              {/* Subtitle */}
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black block mb-1.5">
                NEAREST AIRPORT
              </span>

              {/* Airport Name */}
              <h3 className="font-cormorant text-2xl sm:text-3xl text-[#4A0E1F] font-black leading-tight mb-2 drop-shadow-sm">
                Rajahmundry Airport (RJA)
              </h3>

              {/* Distance description */}
              <p className="font-poppins text-sm text-[#2E1810] font-semibold leading-relaxed mb-4">
                Madhurapudi, Rajahmundry (~60–65 km from venue).
              </p>

              {/* Alternative Airport */}
              <div className="pt-3.5 border-t border-[#C6A15B]/35 text-center">
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-[#6E5014] font-black block mb-1">
                  Alternative Airport
                </span>
                <p className="font-poppins text-xs text-[#5C4015] font-bold">
                  Vijayawada International Airport (VGA) – Approximately 115 km.
                </p>
              </div>
            </div>

            {/* Google Maps Button */}
            <a
              href="https://www.google.com/maps/search/Rajahmundry+Airport"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-6 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#641E32] to-[#7A152E] hover:from-[#8A6517] hover:to-[#A3781D] text-[#FFFDF9] border border-[#C6A15B]/70 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 text-[#FFDF78]" />
              <span>AIRPORT LOCATION ON MAP</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFDF78]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
