import React, { useMemo } from 'react';

const FallingHeartsRain: React.FC = () => {
  // 45 graceful velvet rose & vermilion hearts constantly raining down
  const hearts = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: `${(i * 2.2 + Math.random() * 2) % 98}%`,
      delay: -(Math.random() * 15), // negative delay so screen starts pre-filled with falling hearts
      duration: Math.random() * 6 + 7, // gentle fall speed (7-13s)
      size: Math.random() * 10 + 14, // 14px to 24px
      color: i % 3 === 0 ? '#C64765' : i % 3 === 1 ? '#D9536F' : '#AA2846',
      opacity: Math.random() * 0.35 + 0.45,
      drift: (Math.random() - 0.5) * 40,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none will-change-transform inline-block"
          style={{
            left: h.left,
            top: '-5%',
            fontSize: `${h.size}px`,
            color: h.color,
            opacity: h.opacity,
            animation: `heartRainContinuous ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
};

export default FallingHeartsRain;

