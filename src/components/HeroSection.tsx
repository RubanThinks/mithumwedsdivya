import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiamondGoldHeart from './DiamondGoldHeart';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Slow cinematic background zoom on desktop
        if (desktopBgRef.current) {
          gsap.fromTo(
            desktopBgRef.current,
            { scale: 1.0 },
            {
              scale: 1.12,
              duration: 18,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            }
          );

          // Subtle parallax on scroll
          gsap.to(desktopBgRef.current, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Slow cinematic background zoom on mobile
        if (mobileBgRef.current) {
          gsap.fromTo(
            mobileBgRef.current,
            { scale: 1.0 },
            {
              scale: 1.12,
              duration: 18,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            }
          );

          gsap.to(mobileBgRef.current, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Smooth text lift and fade on scroll
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -35,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center center',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 1. DESKTOP & TABLET LANDSCAPE: 100% UNBLURRED, 100% OPACITY */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/hero-bg-desktop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* 2. MOBILE & TABLET PORTRAIT: 100% UNBLURRED, 100% OPACITY */}
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/hero-bg-mobile.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* FOREGROUND CONTENT: Pure Typography directly over background */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 py-20 md:py-28 max-w-4xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Top: Small Ornamental Gold Divider & Family Blessing Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
        >
          <span className="h-0.5 w-8 sm:w-14 md:w-20 bg-gradient-to-r from-transparent to-gold" />
          <p className="font-cinzel tracking-[0.2em] sm:tracking-[0.3em] text-gold-light text-xs sm:text-sm uppercase font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Together with the blessings of our families
          </p>
          <span className="h-0.5 w-8 sm:w-14 md:w-20 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Center: Groom Name with Cinematic Reveal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-great-vibes text-ivory text-6xl sm:text-7xl md:text-9xl leading-tight font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          Midhun Sri
        </motion.h1>

        {/* Center: Dynamic Gold Filigree Outline & Sparkling Diamond Heart */}
        <div className="flex items-center justify-center my-1 sm:my-2">
          <DiamondGoldHeart />
        </div>

        {/* Center: Bride Name with Cinematic Reveal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-great-vibes text-ivory text-6xl sm:text-7xl md:text-9xl leading-tight font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          Divya
        </motion.h1>

        {/* Gold Ornamental Divider Self-Drawing */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          className="ornamental-divider mt-4 sm:mt-6 mb-4 sm:mb-6 w-full max-w-md mx-auto"
        >
          <span className="text-gold text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✦</span>
        </motion.div>

        {/* Below the names: Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-cormorant text-champagne italic text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          Two Hearts, Two Families, One Beautiful Beginning.
        </motion.p>

        {/* Below the names: Invitation Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-poppins text-ivory text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] px-2"
        >
          With the blessings of our parents and families, we warmly invite you to celebrate our
          wedding.
        </motion.p>

        {/* Bottom: Subtle Animated Scroll-Down Indicator */}
        <motion.div
          className="mt-10 sm:mt-14 flex flex-col items-center gap-1 cursor-pointer select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          }}
        >
          <span className="font-cinzel text-gold text-xs tracking-[0.25em] uppercase font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Scroll To Celebrate
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
