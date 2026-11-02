import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLHeadingElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const blessingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && sectionRef.current) {
        // Timeline for coordinated sequential closing reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Main Heading reveals
        if (headingRef.current) {
          tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
          );
        }

        // 2. Groom's name appears smoothly
        if (groomRef.current) {
          tl.fromTo(
            groomRef.current,
            { opacity: 0, y: 25, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // 3. Heart symbol reveals with gentle pulse
        if (heartRef.current) {
          tl.fromTo(
            heartRef.current,
            { opacity: 0, scale: 0.4, rotate: -15 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' },
            '-=0.3'
          );
        }

        // 4. Bride's name follows
        if (brideRef.current) {
          tl.fromTo(
            brideRef.current,
            { opacity: 0, y: 25, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // 5. Thank you message fades in
        if (messageRef.current) {
          tl.fromTo(
            messageRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.2'
          );
        }

        // 6. Final blessing & gratitude
        if (blessingsRef.current) {
          tl.fromTo(
            blessingsRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 md:py-40 flex items-center justify-center overflow-hidden bg-[#2D0A1E] text-[#FFFDF9] select-none"
    >
      {/* ========================================================
          1. 100% VIBRANT BACKGROUND - ZERO FILTERS, ZERO OVERLAYS, ZERO TRANSPARENCY
          ======================================================== */}
      {/* Desktop (16:9 Landscape - Exact Uploaded Asset) */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/thanks-bg-desktop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* Mobile (9:16 Portrait - Exact Uploaded Asset) */}
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/thanks-bg-mobile.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* ========================================================
          2. FOREGROUND CONTENT: Naturally Integrated within Open Central Space
          ======================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center">
        {/* Upper Heading: Sophisticated Serif */}
        <div ref={headingRef} className="space-y-3 mb-6 sm:mb-8">
          <p className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-[#F5D061] font-black drop-shadow-[0_2px_8px_rgba(40,10,25,0.95)]">
            ✦ A Beautiful Beginning, A Lifetime of Love ✦
          </p>

          <p className="font-cormorant italic text-[#FFFDF9] text-xl sm:text-2xl md:text-3xl font-extrabold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(40,10,25,0.9)]">
            Thank you for being part of our celebration.
          </p>
        </div>

        {/* Small Ornamental Golden Divider */}
        <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3 sm:my-4">
          <span className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#F5D061] text-base drop-shadow-[0_2px_4px_rgba(40,10,25,0.8)]">✦</span>
          <span className="h-0.5 w-16 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Couple's Names: Large, Elegant & Prominent */}
        <div className="my-3 sm:my-5 flex flex-col items-center justify-center">
          {/* Groom's Name */}
          <h2
            ref={groomRef}
            className="font-great-vibes text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFDF9] font-normal leading-none drop-shadow-[0_4px_16px_rgba(40,10,25,0.95)] tracking-wide"
          >
            Midhun Sri
          </h2>

          {/* Heart Symbol: Subtle Burgundy with Golden Glow */}
          <div
            ref={heartRef}
            className="my-2 sm:my-3 flex items-center justify-center"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFFDF9]/95 to-[#F8EFF5]/90 border border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.35)] flex items-center justify-center">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#801336] fill-[#801336] drop-shadow-[0_2px_4px_rgba(128,19,54,0.4)]" />
            </div>
          </div>

          {/* Bride's Name */}
          <h2
            ref={brideRef}
            className="font-great-vibes text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFDF9] font-normal leading-none drop-shadow-[0_4px_16px_rgba(40,10,25,0.95)] tracking-wide"
          >
            Divya
          </h2>
        </div>

        {/* Small Ornamental Golden Divider */}
        <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3 sm:my-4">
          <span className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#F5D061] text-base drop-shadow-[0_2px_4px_rgba(40,10,25,0.8)]">✦</span>
          <span className="h-0.5 w-16 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Supporting Message & Tagline */}
        <div ref={messageRef} className="space-y-3 mt-3 max-w-xl mx-auto">
          <p className="font-cinzel text-xs sm:text-sm md:text-base text-[#F5D061] font-black uppercase tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(40,10,25,0.9)]">
            Two hearts, two families, one beautiful beginning.
          </p>

          <p className="font-cormorant italic text-lg sm:text-xl md:text-2xl text-[#FFF8EA] font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(40,10,25,0.85)]">
            We are grateful for your love, blessings and presence in our lives.
          </p>
        </div>

        {/* Bottom Closing Note: With Warmest Regards */}
        <div
          ref={blessingsRef}
          className="mt-8 pt-6 border-t border-[#D4AF37]/40 max-w-md mx-auto"
        >
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#F5D061] font-black drop-shadow-[0_2px_8px_rgba(40,10,25,0.9)]">
            With Love &amp; Gratitude • Midhun &amp; Divya
          </p>
          <p className="font-poppins text-[10px] sm:text-xs text-[#FFF8EA]/85 tracking-widest uppercase font-semibold mt-1 drop-shadow-[0_1px_4px_rgba(40,10,25,0.8)]">
            Palakollu • West Godavari • Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
