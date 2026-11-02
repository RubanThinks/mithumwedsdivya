import React from 'react';
import { motion } from 'framer-motion';

const DiamondGoldHeart: React.FC = () => {
  return (
    <div className="relative inline-flex items-center justify-center my-3 md:my-5">
      {/* Diamond Sparkle Stars positioned around the heart */}
      <motion.span
        className="absolute -top-2 -right-3 text-gold text-sm select-none pointer-events-none"
        animate={{
          scale: [0, 1.3, 0],
          opacity: [0, 1, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4,
        }}
      >
        ✦
      </motion.span>

      <motion.span
        className="absolute -bottom-2 -left-3 text-champagne text-xs select-none pointer-events-none"
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 0.9, 0],
          rotate: [180, 90, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.1,
        }}
      >
        ✧
      </motion.span>

      <motion.span
        className="absolute top-1 -left-4 text-gold-light text-base select-none pointer-events-none"
        animate={{
          scale: [0, 1.4, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.8,
        }}
      >
        ✦
      </motion.span>

      {/* SVG Royal Heart Drawn Dynamically */}
      <svg
        width="64"
        height="60"
        viewBox="0 0 48 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-11 md:w-16 md:h-14 overflow-visible drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
      >
        <defs>
          {/* Royal Antique Gold Foil Gradient */}
          <linearGradient id="goldHeartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="35%" stopColor="#FFF8DC" />
            <stop offset="65%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          {/* Velvet Vermilion & Gold Core Fill */}
          <radialGradient id="heartInnerGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#D9536F" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#8A1834" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A0C1C" stopOpacity="0.95" />
          </radialGradient>

          {/* Faceted Diamond Shimmer overlay */}
          <linearGradient id="diamondFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFDF9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Inner Heart Fill that fades & blooms after outline is drawn */}
        <motion.path
          d="M24 38.5C24 38.5 4.5 26.5 4.5 14C4.5 7.5 9.8 2.5 16 2.5C20 2.5 22.8 4.8 24 6.8C25.2 4.8 28 2.5 32 2.5C38.2 2.5 43.5 7.5 43.5 14C43.5 26.5 24 38.5 24 38.5Z"
          fill="url(#heartInnerGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
        />

        {/* 2. Precious Gold Filigree Outline - Drawn dynamically from scratch */}
        <motion.path
          d="M24 38.5C24 38.5 4.5 26.5 4.5 14C4.5 7.5 9.8 2.5 16 2.5C20 2.5 22.8 4.8 24 6.8C25.2 4.8 28 2.5 32 2.5C38.2 2.5 43.5 7.5 43.5 14C43.5 26.5 24 38.5 24 38.5Z"
          stroke="url(#goldHeartStroke)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* 3. Diamond Facet Highlight line reflecting light */}
        <motion.path
          d="M14 8C10 11 9 16 10 20"
          stroke="url(#diamondFacet)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 1.6,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
};

export default DiamondGoldHeart;

