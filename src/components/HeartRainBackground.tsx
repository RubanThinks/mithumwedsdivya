import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeartRainBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create realistic, elegant wedding heart shape texture with velvet rose/gold matte tone (no neon, no additive glow)
    const heartCanvas = document.createElement('canvas');
    heartCanvas.width = 64;
    heartCanvas.height = 64;
    const ctx = heartCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 64, 64);
      ctx.save();
      ctx.translate(32, 28);
      ctx.scale(0.85, 0.85);

      // Draw traditional curved heart
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.bezierCurveTo(-18, -12, -26, 12, 0, 26);
      ctx.bezierCurveTo(26, 12, 18, -12, 0, 8);
      ctx.closePath();

      // Matte natural rose and soft velvet fill
      const grad = ctx.createLinearGradient(0, -10, 0, 26);
      grad.addColorStop(0, '#D9536F');
      grad.addColorStop(1, '#942343');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
    const heartTexture = new THREE.CanvasTexture(heartCanvas);

    // Heart particles falling like gentle rain
    const count = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const fallSpeeds = new Float32Array(count);
    const swayOffsets = new Float32Array(count);
    const swaySpeeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40; // X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 36; // Y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z depth

      fallSpeeds[i] = Math.random() * 0.035 + 0.02; // constant gentle rain velocity
      swayOffsets[i] = Math.random() * Math.PI * 2;
      swaySpeeds[i] = Math.random() * 0.8 + 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Normal blending (matte velvet hearts, definitely NO neon or additive glow)
    const material = new THREE.PointsMaterial({
      size: 1.4,
      map: heartTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const hearts = new THREE.Points(geometry, material);
    scene.add(hearts);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const pos = hearts.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Continuous gentle rainfall
        pos[i * 3 + 1] -= fallSpeeds[i];

        // Soft horizontal fluttering sway like falling leaves/hearts
        pos[i * 3] += Math.sin(elapsedTime * swaySpeeds[i] + swayOffsets[i]) * 0.012;

        // Loop from top when reaching bottom boundary
        if (pos[i * 3 + 1] < -18) {
          pos[i * 3 + 1] = 18;
          pos[i * 3] = (Math.random() - 0.5) * 40;
        }
      }
      hearts.geometry.attributes.position.needsUpdate = true;

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
      heartTexture.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default HeartRainBackground;

