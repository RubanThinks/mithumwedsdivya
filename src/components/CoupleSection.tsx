import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoupleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const desktopGalleryRef = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Heading reveal
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        {/* Desktop photograph entrance */}
        if (desktopGalleryRef.current) {
          const cards = desktopGalleryRef.current.querySelectorAll('.editorial-photo-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: desktopGalleryRef.current,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        {/* Mobile photograph entrance */}
        if (mobileGalleryRef.current) {
          const mCards = mobileGalleryRef.current.querySelectorAll('.editorial-photo-mobile');
          gsap.fromTo(
            mCards,
            { opacity: 0, y: 35, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: mobileGalleryRef.current,
                start: 'top 80%',
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
      className="relative py-24 md:py-36 overflow-hidden bg-[#2D0A1E]"
    >
      {/* ========================================================
          1. 100% VIBRANT BACKGROUND - ZERO OVERLAYS, ZERO FILTERS, ZERO OPACITY REDUCTION
          ======================================================== */}
      {/* Desktop (16:9 Landscape) */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/gallery-bg-desktop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
        }}
      />

      {/* Mobile (9:16 Portrait) */}
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/gallery-bg-mobile.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
        }}
      />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* EDITORIAL TEXT: High-Contrast Royal Wine Maroon (#4A0E2E), Luminous Gold (#D4AF37), Crisp Drop Shadows */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-[#7A152E] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Meet the Couple
          </p>

          <h2 className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-[#4A0E2E] font-normal leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.85)]">
            Midhun Sri
          </h2>

          <div className="my-1 md:my-2 flex items-center justify-center gap-4">
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="font-cormorant italic text-[#D4AF37] text-2xl md:text-4xl font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              &amp;
            </span>
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-[#4A0E2E] font-normal leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.85)]">
            Divya
          </h2>

          <div className="ornamental-divider mx-auto my-4 max-w-xs">
            <span className="text-[#D4AF37] text-xl font-bold">✦</span>
          </div>

          <p className="font-cormorant italic text-[#3B0E28] text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_1px_3px_rgba(255,255,255,0.85)]">
            Two Hearts, Two Families, One Beautiful Beginning.
          </p>
        </div>

        {/* ========================================================
            3. DESKTOP PHOTOGRAPH: Grand Central Couple Portrait
            ======================================================== */}
        <div
          ref={desktopGalleryRef}
          className="hidden md:flex flex-col items-center justify-center max-w-xl mx-auto"
        >
          <div className="editorial-photo-card flex flex-col items-center w-full max-w-md">
            <div className="relative w-full aspect-[4/5] rounded-[34px] overflow-hidden shadow-[0_25px_60px_rgba(40,10,25,0.32),0_0_30px_rgba(212,175,55,0.22)] transition-all duration-500 hover:-translate-y-2 group ring-2 ring-[#D4AF37]/70 hover:ring-[#D4AF37]">
              <img
                src="/images/couple.jpg"
                alt="Midhun Sri & Divya Together"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-5 text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#641E32] to-[#801336] text-[#F3E5AB] font-cinzel text-[11px] uppercase tracking-[0.25em] font-black rounded-full mb-1.5 shadow-md">
                Together Forever
              </span>
              <h3 className="font-great-vibes text-4xl sm:text-5xl text-[#4A0E2E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Midhun &amp; Divya
              </h3>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. MOBILE PHOTOGRAPH: Clean, High-Definition, Beautiful Spacing
            ======================================================== */}
        <div ref={mobileGalleryRef} className="block md:hidden max-w-xs mx-auto">
          {/* Couple Combined (Only) */}
          <div className="editorial-photo-mobile flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(40,10,25,0.30),0_0_25px_rgba(212,175,55,0.2)] ring-2 ring-[#D4AF37]/70">
              <img
                src="/images/couple.jpg"
                alt="Midhun Sri & Divya Together"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block px-3.5 py-1 bg-gradient-to-r from-[#641E32] to-[#801336] text-[#F3E5AB] font-cinzel text-[10px] uppercase tracking-[0.2em] font-black rounded-full mb-1 shadow">
                Together Forever
              </span>
              <h3 className="font-great-vibes text-3xl sm:text-4xl text-[#4A0E2E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Midhun &amp; Divya
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
