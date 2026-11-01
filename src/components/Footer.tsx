import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-28 md:py-36 overflow-hidden bg-[#2D0A13] text-ivory text-center">
      {/* Background Wedding Photography - 100% UNBLURRED */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/footer-bg.jpg')`,
          opacity: 1,
          filter: 'none',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Top Traditional Auspicious Symbols */}
          <div className="flex items-center justify-center gap-3 text-gold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <span>✦</span>
            <span>ॐ</span>
            <span>✦</span>
          </div>

          {/* Traditional Indian Wedding Thank You & Blessings Heading */}
          <p className="font-cinzel text-xs md:text-sm tracking-[0.35em] text-gold-light uppercase font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            ✦ With Reverence &amp; Gratitude ✦
          </p>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-gold font-bold drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            DHANYAVADAMULU
          </h2>

          {/* Ornamental divider */}
          <div className="ornamental-divider mx-auto my-5 max-w-xs">
            <span className="text-gold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✦</span>
          </div>

          {/* Traditional Heartfelt Blessing Message */}
          <p className="font-cormorant italic text-ivory text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            &ldquo;We wholeheartedly thank you for being a cherished part of our journey and showering your divine blessings upon our new beginning.&rdquo;
          </p>

          <div className="pt-2">
            <p className="font-great-vibes text-gold text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              K. Midhun Sri &amp; K. Divya
            </p>
          </div>

          <p className="font-cormorant italic text-champagne text-xl sm:text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Two Hearts, Two Families, One Beautiful Beginning.
          </p>

          <div className="pt-8 border-t border-gold/40 mt-8 max-w-md mx-auto">
            <p className="font-cinzel text-champagne text-xs md:text-sm tracking-[0.25em] uppercase font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              With Love, Respect &amp; Blessings of Families
            </p>
            <p className="font-poppins text-ivory/80 text-xs tracking-widest uppercase font-semibold mt-2">
              12 • November • 2022 • Palakollu
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
