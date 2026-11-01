import { useRef } from 'react';
import { motion } from 'framer-motion';

const MessageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden bg-forest-dark text-ivory text-center"
    >
      {/* Background Wedding Photography */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20"
        style={{
          backgroundImage: `url('/images/message-bg.jpg')`,
        }}
      />

      {/* Royal gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(38,16,24,0.92) 0%, rgba(16,32,25,0.97) 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Large Decorative Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-great-vibes text-gold/40 text-7xl md:text-9xl leading-none select-none">
            &ldquo;
          </span>
        </motion.div>

        {/* Emotionally beautiful message */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant italic text-3xl sm:text-4xl md:text-5xl text-ivory leading-relaxed font-semibold -mt-4 mb-8 drop-shadow"
        >
          We would be delighted to have you and your family join us on this special occasion and bless the newlywed couple.
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="ornamental-divider mx-auto my-8"
        >
          <span className="text-gold text-2xl drop-shadow">✦</span>
        </motion.div>

        {/* Couple names */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-great-vibes text-gold text-4xl sm:text-5xl md:text-6xl mb-4 drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]"
        >
          K. Midhun Sri ❤️ K. Divya
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-cinzel text-champagne text-sm md:text-base tracking-[0.25em] uppercase font-bold"
        >
          Two hearts, two families, one beautiful beginning.
        </motion.p>

        {/* Closing Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4"
        >
          <span className="font-great-vibes text-gold/40 text-7xl md:text-9xl leading-none select-none">
            &rdquo;
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;
