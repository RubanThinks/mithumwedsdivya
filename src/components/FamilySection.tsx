import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FamilySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Section heading reveals smoothly
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Groom's Family Card: enters from the LEFT with a slight upward reveal
        if (groomCardRef.current) {
          gsap.fromTo(
            groomCardRef.current,
            { opacity: 0, x: -60, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: groomCardRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Bride's Family Card: enters from the RIGHT with a slight upward reveal
        if (brideCardRef.current) {
          gsap.fromTo(
            brideCardRef.current,
            { opacity: 0, x: 60, y: 30 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: brideCardRef.current,
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
      className="relative py-28 md:py-36 overflow-hidden bg-[#F5E6CC] text-[#2E1810]"
    >
      {/* ========================================================
          1. 100% VIBRANT BACKGROUND - EXACT NEW PARENTS-INFO IMAGES (PNG HD)
          ======================================================== */}
      {/* Desktop (Landscape - Exact Uploaded New HD Asset) */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/family-bg-desktop.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* Mobile (Portrait - Exact Uploaded New HD Asset) */}
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/family-bg-mobile.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ========================================================
            2. SECTION HEADING (Deep Burgundy, Dark Antique Gold Accents)
            ======================================================== */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-[#8A6517] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            ✦ With Reverence &amp; Joy ✦
          </p>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#4A0E1F] font-black tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            OUR FAMILIES
          </h2>

          <div className="my-3 flex items-center justify-center gap-3">
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#8A6517] to-transparent" />
            <span className="text-[#8A6517] text-lg font-bold">❦</span>
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#8A6517] to-transparent" />
          </div>

          <p className="font-cormorant italic text-[#3E0E1B] text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            With the blessings of our parents and families
          </p>

          <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] text-[#6E5014] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Two Families, One Beautiful Beginning.
          </p>
        </div>

        {/* ========================================================
            3 & 4. FAMILY INFORMATION CARDS (65–75% Desktop Width, Soft Ivory/Champagne, Modern Luxury)
            ======================================================== */}
        <div className="max-w-4xl mx-auto">
          {/* Desktop: Side-by-Side */}
          {/* Mobile: Vertical Stack with Groom's Family first, Bride's Family second */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {/* ---------------- CARD 1: GROOM'S FAMILY ---------------- */}
            <div
              ref={groomCardRef}
              className="flex flex-col justify-between rounded-[24px] bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5EAD8] border-2 border-[#C6A15B]/75 p-8 sm:p-10 shadow-[0_20px_50px_rgba(70,30,10,0.16),0_0_25px_rgba(198,161,91,0.15),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_26px_60px_rgba(138,101,23,0.26)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group"
              style={{ opacity: 1 }}
            >
              {/* Inner Decorative Inset Gold Border */}
              <div className="absolute inset-2.5 sm:inset-3 border border-[#C6A15B]/40 rounded-[18px] pointer-events-none" />

              {/* Four Ornate Corner Flourishes */}
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

              <div className="relative z-10">
                {/* Auspicious Top Crest */}
                <div className="flex items-center justify-center gap-1.5 text-[#C6A15B] text-[11px] mb-2 font-serif">
                  <span>✦</span>
                  <span className="text-xs">❧</span>
                  <span>✤</span>
                  <span className="text-xs">❧</span>
                  <span>✦</span>
                </div>

                {/* Card Heading */}
                <div className="text-center pb-5 border-b border-[#C6A15B]/35">
                  <span className="inline-block px-3.5 py-1 bg-[#4A0E1F]/10 text-[#4A0E1F] font-cinzel text-[11px] uppercase tracking-[0.25em] font-extrabold rounded-full mb-2 border border-[#C6A15B]/30">
                    Blessings of
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl text-[#4A0E1F] font-black tracking-wide drop-shadow-sm">
                    Groom's Family
                  </h3>
                </div>

                {/* Family Members List */}
                <div className="py-6 space-y-5 text-center">
                  {/* Groom */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-1">
                      Groom
                    </span>
                    <h4 className="font-great-vibes text-3xl sm:text-4xl text-[#3E0E1B] font-normal drop-shadow-sm">
                      K. Midhun Sri
                    </h4>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                    <span className="text-[#8A6517] text-xs">◈</span>
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                  </div>

                  {/* Father */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-0.5">
                      Father
                    </span>
                    <p className="font-cormorant text-2xl text-[#2E1810] font-bold">
                      Srinivas
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                    <span className="text-[#8A6517] text-xs">◈</span>
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                  </div>

                  {/* Mother */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-0.5">
                      Mother
                    </span>
                    <p className="font-cormorant text-2xl text-[#2E1810] font-bold">
                      Ammaji
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="relative z-10 pt-4 border-t border-[#C6A15B]/30 text-center">
                <span className="font-cormorant italic text-[#6E5014] text-sm font-semibold">
                  Cherishing eternal love &amp; guided by wisdom
                </span>
              </div>
            </div>

            {/* ---------------- CARD 2: BRIDE'S FAMILY ---------------- */}
            <div
              ref={brideCardRef}
              className="flex flex-col justify-between rounded-[24px] bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5EAD8] border-2 border-[#C6A15B]/75 p-8 sm:p-10 shadow-[0_20px_50px_rgba(70,30,10,0.16),0_0_25px_rgba(198,161,91,0.15),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_26px_60px_rgba(138,101,23,0.26)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group"
              style={{ opacity: 1 }}
            >
              {/* Inner Decorative Inset Gold Border */}
              <div className="absolute inset-2.5 sm:inset-3 border border-[#C6A15B]/40 rounded-[18px] pointer-events-none" />

              {/* Four Ornate Corner Flourishes */}
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

              <div className="relative z-10">
                {/* Auspicious Top Crest */}
                <div className="flex items-center justify-center gap-1.5 text-[#C6A15B] text-[11px] mb-2 font-serif">
                  <span>✦</span>
                  <span className="text-xs">❧</span>
                  <span>✤</span>
                  <span className="text-xs">❧</span>
                  <span>✦</span>
                </div>

                {/* Card Heading */}
                <div className="text-center pb-5 border-b border-[#C6A15B]/35">
                  <span className="inline-block px-3.5 py-1 bg-[#4A0E1F]/10 text-[#4A0E1F] font-cinzel text-[11px] uppercase tracking-[0.25em] font-extrabold rounded-full mb-2 border border-[#C6A15B]/30">
                    Blessings of
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl text-[#4A0E1F] font-black tracking-wide drop-shadow-sm">
                    Bride's Family
                  </h3>
                </div>

                {/* Family Members List */}
                <div className="py-6 space-y-5 text-center">
                  {/* Bride */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-1">
                      Bride
                    </span>
                    <h4 className="font-great-vibes text-3xl sm:text-4xl text-[#3E0E1B] font-normal drop-shadow-sm">
                      K. Divya
                    </h4>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                    <span className="text-[#8A6517] text-xs">◈</span>
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                  </div>

                  {/* Father */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-0.5">
                      Father
                    </span>
                    <p className="font-cormorant text-2xl text-[#2E1810] font-bold">
                      Suribabu
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                    <span className="text-[#8A6517] text-xs">◈</span>
                    <span className="w-8 h-px bg-[#C6A15B]/40" />
                  </div>

                  {/* Mother */}
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8A6517] font-extrabold block mb-0.5">
                      Mother
                    </span>
                    <p className="font-cormorant text-2xl text-[#2E1810] font-bold">
                      Venkateswari
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="relative z-10 pt-4 border-t border-[#C6A15B]/30 text-center">
                <span className="font-cormorant italic text-[#6E5014] text-sm font-semibold">
                  With warmest affection on this sacred journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilySection;
