import { useMemo } from "react";

interface GoldenParticlesProps {
  count?: number;
  className?: string;
}

interface ParticleConfig {
  id: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
  delay: number;
  duration: number;
}

const GoldenParticles = ({ count = 20, className = "" }: GoldenParticlesProps) => {
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
      delay: Math.random() * 10, // 0s to 10s
      duration: Math.random() * 10 + 5, // 5s to 15s
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default GoldenParticles;
