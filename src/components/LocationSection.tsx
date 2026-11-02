import { useRef, useEffect } from 'react';
import { MapPin, Navigation, Calendar, Clock, Utensils, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const venueCardRef = useRef<HTMLDivElement>(null);
  const eventDetailsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Section heading reveal
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

        // Venue information card reveal
        if (venueCardRef.current) {
          gsap.fromTo(
            venueCardRef.current,
            { opacity: 0, y: 30, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: venueCardRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Event details components reveal
        if (eventDetailsRef.current) {
          const cards = eventDetailsRef.current.querySelectorAll('.event-detail-item');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: eventDetailsRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Map Button reveal
        if (buttonRef.current) {
          gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: buttonRef.current,
                start: 'top 88%',
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
      className="relative py-28 md:py-36 overflow-hidden bg-[#2D0A1E] text-[#FFFDF9]"
    >
      {/* ========================================================
          1. 100% VIBRANT BACKGROUND - ZERO FILTERS, ZERO OVERLAYS, ZERO TRANSPARENCY
          ======================================================== */}
      {/* Desktop (16:9 Landscape - Exact Uploaded Asset) */}
      <div
        ref={desktopBgRef}
        className="hidden md:block absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/images/venue-bg-desktop.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
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
          backgroundImage: `url('/images/venue-bg-mobile.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'none',
        }}
      />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ========================================================
            2. SECTION HEADING (Deep Burgundy, Dark Antique Gold Accents)
            ======================================================== */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-[#801336] font-black mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
            ✦ Destination &amp; Celebrations ✦
          </p>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#4A0E2E] font-black tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
            OUR WEDDING VENUE
          </h2>

          <div className="my-3 flex items-center justify-center gap-3">
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-[#D4AF37] text-lg font-bold">❦</span>
            <span className="h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <p className="font-cormorant italic text-[#4A0E2E] text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            A beautiful destination to celebrate our special day.
          </p>
        </div>

        {/* ========================================================
            3. VENUE INFORMATION CARD (Royal Wedding Card Frame)
            ======================================================== */}
        <div
          ref={venueCardRef}
          className="max-w-2xl mx-auto mb-10 rounded-[24px] bg-gradient-to-br from-[#FFFDF9]/96 via-[#FAF6F8]/93 to-[#F8EFF5]/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-7 sm:p-9 shadow-[0_20px_50px_rgba(60,15,35,0.18),0_0_25px_rgba(212,175,55,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] text-center relative overflow-hidden group"
          style={{ opacity: 1 }}
        >
          {/* Inner Decorative Inset Gold Border */}
          <div className="absolute inset-2.5 sm:inset-3 border border-[#D4AF37]/40 rounded-[18px] pointer-events-none" />

          {/* Four Ornate Corner Flourishes */}
          <div className="absolute top-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#D4AF37]/80">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#D4AF37]/80 rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2.5 left-2.5 w-5 h-5 pointer-events-none text-[#D4AF37]/80 -rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2.5 right-2.5 w-5 h-5 pointer-events-none text-[#D4AF37]/80 rotate-180">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Auspicious Top Motif */}
            <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] text-[10px] mb-2 font-serif">
              <span>✦</span>
              <span className="text-xs">❧</span>
              <span>✤</span>
              <span className="text-xs">❧</span>
              <span>✦</span>
            </div>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#4A0E2E]/10 to-[#D4AF37]/25 border border-[#D4AF37]/70 text-[#4A0E2E] mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-[#801336]" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-[#4A0E2E] font-black tracking-wide mb-2 drop-shadow-sm">
              Sri Kshatriya Kalyana Mandapam
            </h3>

            <p className="font-poppins text-[#2D1520] text-sm sm:text-base font-bold leading-relaxed">
              Palakollu, West Godavari<br />
              Andhra Pradesh, India
            </p>

            <div className="flex items-center justify-center gap-2 my-4">
              <span className="w-12 h-px bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-xs">◈</span>
              <span className="w-12 h-px bg-[#D4AF37]/40" />
            </div>

            <p className="font-cormorant italic text-[#7A152E] text-base sm:text-lg font-bold max-w-lg mx-auto">
              We warmly welcome you to join us and celebrate this beautiful occasion with our families.
            </p>
          </div>
        </div>

        {/* ========================================================
            4. EVENT DETAILS (Royal Wedding Celebration Cards)
            ======================================================== */}
        <div
          ref={eventDetailsRef}
          className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
        >
          {/* Ceremony Card */}
          <div className="event-detail-item relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#FFFDF9]/96 via-[#FAF6F8]/93 to-[#F8EFF5]/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 shadow-[0_20px_50px_rgba(60,15,35,0.16),0_0_20px_rgba(212,175,55,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col items-center text-center group">
            {/* Inner Gold Frame */}
            <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-[14px] pointer-events-none" />

            {/* Corner Flourishes */}
            <div className="absolute top-2 left-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 -rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 rotate-180">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A0E2E]/10 to-[#D4AF37]/25 border border-[#D4AF37]/60 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-[#801336]" />
              </div>
              <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#801336] font-black mb-1">
                Wedding Ceremony
              </h4>
              <p className="font-playfair text-xl sm:text-2xl text-[#4A0E2E] font-black mb-1 drop-shadow-sm">
                12 November 2026
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#4A0E2E] font-poppins font-bold bg-[#4A0E2E]/10 border border-[#D4AF37]/35 px-3 py-1 rounded-full mt-1">
                <Clock className="w-3.5 h-3.5 text-[#801336]" />
                <span>Muhurtham: 6:38 PM</span>
              </div>
            </div>
          </div>

          {/* Dinner Card */}
          <div className="event-detail-item relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#FFFDF9]/96 via-[#FAF6F8]/93 to-[#F8EFF5]/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 shadow-[0_20px_50px_rgba(60,15,35,0.16),0_0_20px_rgba(212,175,55,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col items-center text-center group">
            {/* Inner Gold Frame */}
            <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-[14px] pointer-events-none" />

            {/* Corner Flourishes */}
            <div className="absolute top-2 left-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 -rotate-90">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 pointer-events-none text-[#D4AF37]/80 rotate-180">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A0E2E]/10 to-[#D4AF37]/25 border border-[#D4AF37]/60 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Utensils className="w-5 h-5 text-[#801336]" />
              </div>
              <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#801336] font-black mb-1">
                Dinner Celebration
              </h4>
              <p className="font-playfair text-xl sm:text-2xl text-[#4A0E2E] font-black mb-1 drop-shadow-sm">
                12 November 2026
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#4A0E2E] font-poppins font-bold bg-[#4A0E2E]/10 border border-[#D4AF37]/35 px-3 py-1 rounded-full mt-1">
                <Clock className="w-3.5 h-3.5 text-[#801336]" />
                <span>Time: 7:00 PM onwards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Note: Both events held at same venue */}
        <p className="text-center font-cormorant italic text-[#7A152E] text-base font-semibold mb-8">
          Both the wedding ceremony and dinner will be held at the same venue.
        </p>

        {/* ========================================================
            5. GOOGLE MAPS INTEGRATION BUTTON (Prominent & Comfortable Touch)
            ======================================================== */}
        <div ref={buttonRef} className="flex flex-col items-center justify-center gap-4">
          <a
            href="https://maps.app.goo.gl/SqfAMhCzdXxP221WA?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-4 bg-gradient-to-r from-[#641E32] to-[#801336] hover:from-[#8A1834] hover:to-[#A32045] text-[#FFFDF9] font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] uppercase rounded-full shadow-[0_8px_25px_rgba(74,14,31,0.35)] hover:shadow-[0_12px_32px_rgba(138,101,23,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer border border-[#D4AF37]"
          >
            <Navigation className="w-4 h-4 text-[#F3E5AB]" />
            <span>VIEW VENUE ON MAP</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F3E5AB]/80" />
          </a>

          {/* Responsive Verified Embedded Map for Guest Convenience */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(70,30,10,0.12)] mt-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.364137541109!2d81.7145544!3d16.5219962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37daf29521633f%3A0x788f107133b23a0d!2sKshatriya%20Sankshema%20Parishath%20Kalyanamandapam!5e1!3m2!1sen!2sin!4v1793470100669!5m2!1sen!2sin"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Sri Kshatriya Kalyana Mandapam, Palakollu"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
