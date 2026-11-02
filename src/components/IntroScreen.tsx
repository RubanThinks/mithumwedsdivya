import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface IntroScreenProps {
  isVisible: boolean;
  onOpenInvitation: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isVisible, onOpenInvitation }) => {
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        if (desktopBgRef.current) {
          gsap.fromTo(
            desktopBgRef.current,
            { scale: 1.0 },
            {
              scale: 1.03,
              duration: 18,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            }
          );
        }

        if (mobileBgRef.current) {
          gsap.fromTo(
            mobileBgRef.current,
            { scale: 1.0 },
            {
              scale: 1.03,
              duration: 18,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="intro-screen"
          className="fixed inset-0 z-50 w-full h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-between overflow-hidden px-4 pt-6 pb-8 sm:pb-10"
          style={{ paddingBottom: 'max(2.2rem, calc(env(safe-area-inset-bottom, 0px) + 1.5rem))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.8 } }}
        >
          {/* 1. DESKTOP BACKGROUND: 100% UNBLURRED, EXACT COVER */}
          <div
            ref={desktopBgRef}
            className="hidden md:block absolute inset-0 pointer-events-none will-change-transform z-0"
            style={{
              backgroundImage: `url('/images/intro-bg-desktop.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              filter: 'none',
            }}
          />

          {/* 2. MOBILE BACKGROUND: 100% UNBLURRED, EXACT COVER */}
          <div
            ref={mobileBgRef}
            className="block md:hidden absolute inset-0 pointer-events-none will-change-transform z-0"
            style={{
              backgroundImage: `url('/images/intro-bg-mobile.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              filter: 'none',
            }}
          />

          {/* Golden Ornamental Frame - Strictly contained inside viewport */}
          <div className="absolute inset-3 sm:inset-5 md:inset-6 pointer-events-none z-10">
            <div className="absolute inset-0 border border-[#D4AF37]/40 md:border-gold/50 rounded-lg">
              <div className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#D4AF37] md:border-gold rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#D4AF37] md:border-gold rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#D4AF37] md:border-gold rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#D4AF37] md:border-gold rounded-br-lg" />
            </div>
          </div>

          {/* Subtle top spacer to maintain balanced flex distribution without crowding top decorations */}
          <div className="w-full h-2 sm:h-4 pointer-events-none" />

          {/* CENTER SECTION: A Celebration of Love, Couple Names and Tagline (Middle-aligned) */}
          <div className="relative z-20 text-center max-w-xl mx-auto flex flex-col items-center justify-center my-auto px-2">
            {/* Lead-in: A Celebration of Love - Distinct Deep Imperial Purple for high visibility while differentiating from Burgundy names */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <span className="h-0.5 w-6 sm:w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <p className="font-cinzel tracking-[0.3em] text-[#2E0854] text-xs sm:text-sm uppercase font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
                A Celebration of Love
              </p>
              <span className="h-0.5 w-6 sm:w-12 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
            </div>

            {/* Groom Name: Royal Velvet Maroon on Mobile, Ivory on Desktop */}
            <h1 className="font-great-vibes text-[#4A0E2E] md:text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none font-normal drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] md:drop-shadow-[0_4px_16px_rgba(50,10,30,0.95)]">
              K. Midhun Sri
            </h1>

            {/* Ampersand */}
            <div className="my-1 sm:my-2 flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent md:via-gold" />
              <span className="font-cormorant italic text-[#8A1834] md:text-gold text-2xl sm:text-3xl md:text-4xl font-black drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] md:drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                &amp;
              </span>
              <span className="h-0.5 w-8 sm:w-12 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent md:via-gold" />
            </div>

            {/* Bride Name: Royal Velvet Maroon on Mobile, Ivory on Desktop */}
            <h1 className="font-great-vibes text-[#4A0E2E] md:text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none font-normal drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] md:drop-shadow-[0_4px_16px_rgba(50,10,30,0.95)]">
              K. Divya
            </h1>

            {/* Ornamental divider */}
            <div className="ornamental-divider my-2 sm:my-3 w-48 mx-auto">
              <span className="text-[#D4AF37] md:text-gold text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">✦</span>
            </div>

            {/* Invitation text: Deep Royal Maroon on Mobile, Champagne on Desktop */}
            <p className="font-cormorant text-[#4A0E2E] md:text-champagne text-base sm:text-lg md:text-xl font-bold leading-snug max-w-md mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] md:drop-shadow-[0_2px_6px_rgba(50,10,30,0.95)] px-2">
              Together with their families, invite you to celebrate their wedding.
            </p>
          </div>

          {/* BOTTOM SECTION: Open Invitation Button (Comfortably elevated in tapping area, zero negative offset) */}
          <div className="relative z-30 shrink-0 w-full flex justify-center pb-2 sm:pb-3">
            <motion.button
              type="button"
              className="font-cinzel tracking-[0.25em] uppercase text-xs sm:text-sm font-black text-ivory border-2 border-gold bg-gradient-to-r from-[#641E32] to-[#801336] hover:from-gold hover:to-[#E6C687] hover:text-[#4A0E2E] px-9 sm:px-12 py-3.5 sm:py-4 cursor-pointer rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(60,10,30,0.65)] hover:scale-105 active:scale-95 touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenInvitation}
            >
              Open Invitation
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
