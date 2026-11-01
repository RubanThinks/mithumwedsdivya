import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeFloralBackgroundProps {
  scrollProgress?: number;
}

const ThreeFloralBackground: React.FC<ThreeFloralBackgroundProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle geometries for golden dust and floral petals
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#D4AF37');
    const roseColor = new THREE.Color('#C64765');
    const amberColor = new THREE.Color('#F3E5AB');

    for (let i = 0; i < particleCount; i++) {
      // spread randomly in a 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Color variation between royal gold and rose petal tones
      const rand = Math.random();
      const c = rand < 0.6 ? goldColor : rand < 0.85 ? roseColor : amberColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = Math.random() * 0.8 + 0.3;
      speeds[i] = Math.random() * 0.02 + 0.008;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Canvas texture for smooth glowing circular petals
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 230, 160, 0.8)');
      gradient.addColorStop(0.7, 'rgba(212, 175, 55, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation based on scroll and time
      const scrollY = window.scrollY || 0;
      const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      particles.rotation.y = elapsedTime * 0.05 + scrollPercent * 1.5;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Animate particles floating downwards slowly
      const pos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] -= speeds[i];
        if (pos[i * 3 + 1] < -30) {
          pos[i * 3 + 1] = 30;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera responds gently to scroll
      camera.position.y = -scrollPercent * 8;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};

export default ThreeFloralBackground;
