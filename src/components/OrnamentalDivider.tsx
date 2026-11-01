import { motion } from 'framer-motion';

interface OrnamentalDividerProps {
  className?: string;
  variant?: 'gold' | 'ivory' | 'burgundy';
}

const variantColors = {
  gold: {
    line: 'from-transparent via-gold to-transparent',
    diamond: 'bg-gold',
    dot: 'bg-gold/60',
  },
  ivory: {
    line: 'from-transparent via-ivory to-transparent',
    diamond: 'bg-ivory',
    dot: 'bg-ivory/60',
  },
  burgundy: {
    line: 'from-transparent via-burgundy to-transparent',
    diamond: 'bg-burgundy',
    dot: 'bg-burgundy/60',
  },
};

const OrnamentalDivider = ({
  className = '',
  variant = 'gold',
}: OrnamentalDividerProps) => {
  const colors = variantColors[variant];

  return (
    <motion.div
      className={`flex items-center justify-center gap-3 py-4 ${className}`}
      initial={{ opacity: 0, scaleX: 0.3 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Left dot */}
      <span
        className={`hidden sm:block h-1 w-1 rounded-full ${colors.dot}`}
      />

      {/* Left line */}
      <span
        className={`h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r ${colors.line}`}
      />

      {/* Left small diamond */}
      <span
        className={`h-1.5 w-1.5 rotate-45 ${colors.dot} hidden sm:block`}
      />

      {/* Center diamond */}
      <span className="relative flex items-center justify-center">
        <span
          className={`h-2.5 w-2.5 rotate-45 ${colors.diamond} shadow-sm`}
        />
        {/* Outer ring for mandala effect */}
        <span
          className={`absolute h-5 w-5 rounded-full border ${
            variant === 'gold'
              ? 'border-gold/30'
              : variant === 'ivory'
                ? 'border-ivory/30'
                : 'border-burgundy/30'
          }`}
        />
      </span>

      {/* Right small diamond */}
      <span
        className={`h-1.5 w-1.5 rotate-45 ${colors.dot} hidden sm:block`}
      />

      {/* Right line */}
      <span
        className={`h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r ${colors.line}`}
      />

      {/* Right dot */}
      <span
        className={`hidden sm:block h-1 w-1 rounded-full ${colors.dot}`}
      />
    </motion.div>
  );
};

export default OrnamentalDivider;
