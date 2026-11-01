import { useMemo } from 'react';

interface FloatingPetalsProps {
  count?: number;
  className?: string;
}

const PETAL_COLORS = [
  'rgba(198,161,91,0.3)',
  'rgba(100,30,50,0.2)',
  'rgba(232,216,188,0.4)',
];

const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 15, className = '' }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const sizeVariant = Math.random();
        // Randomize between w-3 h-4 (12x16) and w-5 h-6 (20x24)
        const width = 12 + sizeVariant * 8;
        const height = 16 + sizeVariant * 8;

        // Randomize border-radius for petal-like shapes
        const radiusVariants = [
          '50% 0 50% 0',
          '0 50% 0 50%',
          '60% 10% 60% 10%',
          '10% 60% 10% 60%',
          '70% 0 70% 0',
        ];

        return {
          id: i,
          left: `${Math.random() * 100}%`,
          width,
          height,
          color: PETAL_COLORS[i % PETAL_COLORS.length],
          delay: Math.random() * 15,
          duration: Math.random() * 12 + 8,
          rotation: Math.random() * 360,
          borderRadius: radiusVariants[Math.floor(Math.random() * radiusVariants.length)],
        };
      }),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.left,
            top: '-5%',
            width: `${petal.width}px`,
            height: `${petal.height}px`,
            backgroundColor: petal.color,
            borderRadius: petal.borderRadius,
            transform: `rotate(${petal.rotation}deg)`,
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
