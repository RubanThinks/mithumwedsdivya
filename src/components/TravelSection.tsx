import { useRef, useEffect } from 'react';
import { TrainFront, Plane, Navigation, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TravelSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
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

        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.transit-guide-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
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
      className="relative py-24 md:py-32 overflow-hidden bg-[#1A3026] text-ivory"
    >
      {/* Background Wedding Photography - 100% VISIBLE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/location-bg.jpg')`,
          opacity: 1,
          filter: 'none',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.35em] text-gold-light font-black mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            ✦ Travel &amp; Connectivity ✦
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-gold font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            HOW TO REACH
          </h2>
          <div className="ornamental-divider mx-auto my-4 max-w-xs">
            <span className="text-gold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✦</span>
          </div>
          <p className="font-cormorant italic text-champagne text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Nearest airport and railway connectivity to the wedding destination
          </p>
        </div>

        {/* 2 Transit Connectivity Cards: Railway & Airport */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Card 1: Nearest Railway Station */}
          <div className="transit-guide-card rounded-[24px] border-2 border-gold/70 bg-[#102019]/95 p-8 sm:p-10 text-center shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between hover:border-gold hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#641E32] border border-gold/50 flex items-center justify-center mx-auto mb-4 text-gold shadow-lg">
                <TrainFront className="w-7 h-7" />
              </div>
              <span className="font-cinzel text-gold text-xs tracking-widest uppercase font-black mb-2 block">
                Nearest Railway Station
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl text-ivory font-bold mb-2">
                Palakollu Railway Station (PKO)
              </h3>
              <p className="font-poppins text-champagne text-sm font-semibold leading-relaxed mb-2">
                Located right within town (~2 km from wedding venue).
              </p>
              <div className="inline-block bg-[#F5E6CC]/15 border border-gold/30 px-3.5 py-1 rounded-full text-xs font-poppins text-gold-light font-bold mt-1">
                Bhimavaram Junction: ~22 km (Express trains)
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/Palakollu+Railway+Station"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#641E32] hover:bg-gold hover:text-burgundy-dark text-gold-light border border-gold/70 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-gold" />
              <span>STATION LOCATION ON MAP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Nearest Airport */}
          <div className="transit-guide-card rounded-[24px] border-2 border-gold/70 bg-[#102019]/95 p-8 sm:p-10 text-center shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between hover:border-gold hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#641E32] border border-gold/50 flex items-center justify-center mx-auto mb-4 text-gold shadow-lg">
                <Plane className="w-7 h-7" />
              </div>
              <span className="font-cinzel text-gold text-xs tracking-widest uppercase font-black mb-2 block">
                Nearest Airport
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl text-ivory font-bold mb-2">
                Rajahmundry Airport (RJA)
              </h3>
              <p className="font-poppins text-champagne text-sm font-semibold leading-relaxed mb-2">
                Madhurapudi, Rajahmundry (~60–65 km from venue).
              </p>
              <div className="inline-block bg-[#F5E6CC]/15 border border-gold/30 px-3.5 py-1 rounded-full text-xs font-poppins text-gold-light font-bold mt-1">
                Vijayawada International (VGA): ~115 km
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/Rajahmundry+Airport"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#641E32] hover:bg-gold hover:text-burgundy-dark text-gold-light border border-gold/70 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-gold" />
              <span>AIRPORT LOCATION ON MAP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;

