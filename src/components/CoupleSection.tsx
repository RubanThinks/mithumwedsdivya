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

        // Desktop photographs staggered entrance
        if (desktopGalleryRef.current) {
          const cards = desktopGalleryRef.current.querySelectorAll('.editorial-photo-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 45, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: desktopGalleryRef.current,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Mobile photographs staggered entrance
        if (mobileGalleryRef.current) {
          const mCards = mobileGalleryRef.current.querySelectorAll('.editorial-photo-mobile');
          gsap.fromTo(
            mCards,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              stagger: 0.2,
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
      className="relative py-24 md:py-36 overflow-hidden bg-[#EEDCBF]"
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
        {/* EDITORIAL TEXT: High-Contrast Deep Burgundy (#3E0E1B), Dark Antique Gold (#8A6517), Crisp Drop Shadows */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-[#69182C] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Meet the Couple
          </p>

          <h2 className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-[#4A0E1F] font-normal leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]">
            K. Midhun Sri
          </h2>

          <div className="my-1 md:my-2 flex items-center justify-center gap-4">
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#8A6517] to-transparent" />
            <span className="font-cormorant italic text-[#8A6517] text-2xl md:text-4xl font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              &amp;
            </span>
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#8A6517] to-transparent" />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-[#4A0E1F] font-normal leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]">
            K. Divya
          </h2>

          <div className="ornamental-divider mx-auto my-4 max-w-xs">
            <span className="text-[#8A6517] text-xl font-bold">✦</span>
          </div>

          <p className="font-cormorant italic text-[#2E1810] text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Two Hearts, Two Families, One Beautiful Beginning.
          </p>
        </div>

        {/* ========================================================
            3. DESKTOP PHOTOGRAPHS: 100% Crisp Original HD Photographs
            Pure organic curves, natural soft shadows, zero colour filters, zero tint
            ======================================================== */}
        <div
          ref={desktopGalleryRef}
          className="hidden md:grid grid-cols-12 gap-8 lg:gap-10 items-center max-w-6xl mx-auto"
        >
          {/* Photograph 1: Groom's Individual Portrait */}
          <div className="editorial-photo-card col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 group">
              <img
                src="/images/groom.jpg"
                alt="K. Midhun Sri - The Groom"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                The Groom
              </span>
              <h3 className="font-cormorant text-2xl text-[#3E0E1B] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                K. Midhun Sri
              </h3>
            </div>
          </div>

          {/* Photograph 3: Couple's Combined Photograph (Center, Prominent, 4/5 Aspect) */}
          <div className="editorial-photo-card col-span-4 -translate-y-4 flex flex-col items-center z-10">
            <div className="relative w-full aspect-[4/5] rounded-[34px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.30)] transition-all duration-500 hover:-translate-y-2 group ring-2 ring-[#C6A15B]/40 hover:ring-[#C6A15B]">
              <img
                src="/images/couple.jpg"
                alt="Midhun Sri & Divya Together"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block px-3.5 py-1 bg-[#4A0E1F] text-[#F3E5AB] font-cinzel text-[10px] uppercase tracking-[0.25em] font-black rounded-full mb-1 shadow-md">
                Together Forever
              </span>
              <h3 className="font-great-vibes text-4xl text-[#3E0E1B] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Midhun &amp; Divya
              </h3>
            </div>
          </div>

          {/* Photograph 2: Bride's Individual Portrait */}
          <div className="editorial-photo-card col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 group">
              <img
                src="/images/bride.jpg"
                alt="K. Divya - The Bride"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8A6517] font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                The Bride
              </span>
              <h3 className="font-cormorant text-2xl text-[#3E0E1B] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                K. Divya
              </h3>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. MOBILE PHOTOGRAPHS: Clean, High-Definition, Beautiful Spacing
            ======================================================== */}
        <div ref={mobileGalleryRef} className="block md:hidden max-w-md mx-auto space-y-8">
          {/* Couple Combined (Center Top) */}
          <div className="editorial-photo-mobile flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.28)] ring-2 ring-[#C6A15B]/40">
              <img
                src="/images/couple.jpg"
                alt="Midhun Sri & Divya Together"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ opacity: 1, filter: 'none' }}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-0.5 bg-[#4A0E1F] text-[#F3E5AB] font-cinzel text-[10px] uppercase tracking-[0.2em] font-black rounded-full mb-1 shadow">
                Together Forever
              </span>
              <h3 className="font-great-vibes text-3xl text-[#3E0E1B] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                Midhun &amp; Divya
              </h3>
            </div>
          </div>

          {/* Individual Portraits Below (Side by Side in 2 Columns) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Groom */}
            <div className="editorial-photo-mobile flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                <img
                  src="/images/groom.jpg"
                  alt="K. Midhun Sri - The Groom"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ opacity: 1, filter: 'none' }}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#8A6517] font-black">
                  The Groom
                </span>
                <h4 className="font-cormorant text-base text-[#3E0E1B] font-extrabold leading-tight">
                  K. Midhun Sri
                </h4>
              </div>
            </div>

            {/* Bride */}
            <div className="editorial-photo-mobile flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                <img
                  src="/images/bride.jpg"
                  alt="K. Divya - The Bride"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ opacity: 1, filter: 'none' }}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#8A6517] font-black">
                  The Bride
                </span>
                <h4 className="font-cormorant text-base text-[#3E0E1B] font-extrabold leading-tight">
                  K. Divya
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
