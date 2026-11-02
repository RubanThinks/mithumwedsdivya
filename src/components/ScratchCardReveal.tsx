import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchCardRevealProps {
  onRevealed?: () => void;
}

const ScratchCardReveal: React.FC<ScratchCardRevealProps> = ({ onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  // Confetti explosion when scratched
  const triggerCelebrationBurst = useCallback(() => {
    confetti({
      particleCount: 110,
      angle: 60,
      spread: 75,
      origin: { x: 0.2, y: 0.65 },
      colors: ['#D4AF37', '#FFFDF9', '#641E32', '#D4AF37', '#FFDF78'],
    });

    confetti({
      particleCount: 110,
      angle: 120,
      spread: 75,
      origin: { x: 0.8, y: 0.65 },
      colors: ['#D4AF37', '#FFFDF9', '#641E32', '#D4AF37', '#FFDF78'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#D4AF37', '#E0C78F', '#DAA520', '#641E32', '#FFFDF9'],
        scalar: 1.25,
      });
    }, 220);
  }, []);

  // Initialize Canvas Foil: Premium Champagne-Gold Appearance with a Mathematically Perfect Heart
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Premium Metallic Champagne-Gold Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6C687');
    grad.addColorStop(0.2, '#FBF0D9');
    grad.addColorStop(0.45, '#D4AF37');
    grad.addColorStop(0.7, '#F7E3B5');
    grad.addColorStop(0.88, '#C69E45');
    grad.addColorStop(1, '#E2C17D');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Diamond / Gold Shimmer Flecks (120 particles)
    let seed = 77;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < 120; i++) {
      const gx = rand() * width;
      const gy = rand() * height;
      const size = rand() * 2.2 + 0.6;
      const alpha = rand() * 0.6 + 0.25;

      ctx.save();
      ctx.translate(gx, gy);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Delicate Double Gold & White Foil Inset Border
    ctx.save();
    ctx.strokeStyle = 'rgba(100, 30, 50, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, width - 30, height - 30);
    ctx.restore();

    // 4. ROYAL DIAMOND GOLD HEART (Exact design from Hero Section between Bride & Groom names)
    ctx.save();
    const hx = width / 2;
    // Position heart cleanly in the upper central zone, with generous spacing from all text
    const hy = height * 0.40;

    // Controlled size so it never overpowers or touches any text
    const heartWidth = Math.min(width * 0.18, height * 0.28, 76);
    const heartHeight = heartWidth * (36 / 39); // exact SVG aspect ratio (36:39)
    const sx = heartWidth / 39;
    const sy = heartHeight / 36;

    ctx.translate(hx, hy);

    // --- Diamond Sparkle Stars around the heart (Matching Hero Section DiamondGoldHeart) ---
    ctx.save();
    ctx.font = `${Math.max(10, heartWidth * 0.22)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#D4AF37';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 6;
    // Top-right sparkle
    ctx.fillText('✦', heartWidth * 0.58, -heartHeight * 0.45);
    // Bottom-left sparkle
    ctx.fillStyle = '#FFF8DC';
    ctx.font = `${Math.max(9, heartWidth * 0.18)}px serif`;
    ctx.fillText('✧', -heartWidth * 0.58, heartHeight * 0.35);
    // Left-middle sparkle
    ctx.fillStyle = '#F3E5AB';
    ctx.fillText('✦', -heartWidth * 0.65, -heartHeight * 0.1);
    ctx.restore();

    // --- Draw Exact SVG Royal Heart from DiamondGoldHeart ---
    ctx.save();
    ctx.scale(sx, sy);
    ctx.translate(-24, -20.5); // Center the 48x44 SVG path

    // 1. Inner Heart Velvet Ruby Glow Fill
    const heartGlow = ctx.createRadialGradient(24, 17.6, 2, 24, 17.6, 24);
    heartGlow.addColorStop(0, 'rgba(217, 83, 111, 0.92)');
    heartGlow.addColorStop(0.7, 'rgba(138, 24, 52, 0.95)');
    heartGlow.addColorStop(1, 'rgba(74, 12, 28, 0.98)');

    ctx.beginPath();
    ctx.moveTo(24, 38.5);
    ctx.bezierCurveTo(24, 38.5, 4.5, 26.5, 4.5, 14);
    ctx.bezierCurveTo(4.5, 7.5, 9.8, 2.5, 16, 2.5);
    ctx.bezierCurveTo(20, 2.5, 22.8, 4.8, 24, 6.8);
    ctx.bezierCurveTo(25.2, 4.8, 28, 2.5, 32, 2.5);
    ctx.bezierCurveTo(38.2, 2.5, 43.5, 7.5, 43.5, 14);
    ctx.bezierCurveTo(43.5, 26.5, 24, 38.5, 24, 38.5);
    ctx.closePath();

    ctx.fillStyle = heartGlow;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.45)';
    ctx.shadowBlur = 8;
    ctx.fill();

    // 2. Precious Gold Filigree Outline
    const goldStroke = ctx.createLinearGradient(4.5, 2.5, 43.5, 38.5);
    goldStroke.addColorStop(0, '#D4AF37');
    goldStroke.addColorStop(0.35, '#FFF8DC');
    goldStroke.addColorStop(0.65, '#D4AF37');
    goldStroke.addColorStop(1, '#996515');

    ctx.strokeStyle = goldStroke;
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 3. Diamond Facet Highlight curve (reflecting light)
    ctx.beginPath();
    ctx.moveTo(14, 8);
    ctx.bezierCurveTo(10, 11, 9, 16, 10, 20);
    ctx.strokeStyle = 'rgba(255, 253, 249, 0.85)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore(); // restore transform from scale & translate
    ctx.restore(); // restore save for heart

    // 5. Foil Typography: Carefully positioned with dedicated vertical spacing so it NEVER overlaps
    ctx.save();
    // Top Surprise Lead-in
    const leadSize = Math.max(10, Math.min(13, width * 0.026));
    ctx.font = `bold ${leadSize}px Cinzel, serif`;
    ctx.fillStyle = '#641E32';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 4;
    ctx.fillText('✦  A  L I T T L E  S U R P R I S E !  ✦', width / 2, height * 0.16);

    // Primary Instruction (Cleanly below the heart with ample clearance)
    const instructSize = Math.max(16, Math.min(23, width * 0.044));
    ctx.font = `italic 600 ${instructSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#3E0E1B';
    ctx.shadowBlur = 6;
    ctx.fillText('Scratch to reveal our wedding date', width / 2, height * 0.70);

    // Subtle helper text at bottom
    const subSize = Math.max(8.5, Math.min(11, width * 0.021));
    ctx.font = `bold ${subSize}px Cinzel, serif`;
    ctx.fillStyle = '#7A4B10';
    ctx.shadowBlur = 2;
    ctx.fillText('✨ SWIPE HERE WITH FINGER OR MOUSE ✨', width / 2, height * 0.86);
    ctx.restore();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        if (!isRevealed) {
          initCanvas();
        }
      }
    };

    document.fonts.ready.then(() => {
      handleResize();
    });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // CONTINUOUS SMOOTH SCRATCHING INTERACTION
  const drawScratchLine = (x1: number, y1: number, x2: number, y2: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 55;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x2, y2, 27.5, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;
    const totalSamples = data.length / 16;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const pct = Math.round((transparentCount / totalSamples) * 100);
    setScratchPercent(pct);

    if (pct >= 55 && !isRevealed) {
      revealFullDate();
    }
  };

  const revealFullDate = () => {
    setIsRevealed(true);
    triggerCelebrationBurst();
    if (onRevealed) onRevealed();
  };

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const pos = getCanvasCoords(e.clientX, e.clientY);
    lastPointRef.current = pos;
    drawScratchLine(pos.x, pos.y, pos.x, pos.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const pos = getCanvasCoords(e.clientX, e.clientY);
    if (lastPointRef.current) {
      drawScratchLine(lastPointRef.current.x, lastPointRef.current.y, pos.x, pos.y);
    }
    lastPointRef.current = pos;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPointRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    isDrawing.current = true;
    const t = e.touches[0];
    const pos = getCanvasCoords(t.clientX, t.clientY);
    lastPointRef.current = pos;
    drawScratchLine(pos.x, pos.y, pos.x, pos.y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || e.touches.length === 0) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const t = e.touches[0];
    const pos = getCanvasCoords(t.clientX, t.clientY);
    if (lastPointRef.current) {
      drawScratchLine(lastPointRef.current.x, lastPointRef.current.y, pos.x, pos.y);
    }
    lastPointRef.current = pos;
  };

  return (
    <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto flex flex-col items-center select-none px-2 sm:px-0">
      {/* Scratch Card Frame - Styled like a Luxury Indian Wedding Card with comfortable breathing room */}
      <div
        ref={containerRef}
        className="relative w-full h-[270px] sm:h-[310px] md:h-[330px] rounded-[24px] overflow-hidden border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(40,10,25,0.22),0_0_25px_rgba(212,175,55,0.20)] transition-all duration-500"
      >
        {/* ========================================================
            1. UNDERNEATH REVEALED CONTENT: WEDDING DATE & TIME ONLY
            ======================================================== */}
        <div className="absolute inset-0 w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#FFFDF9]/96 via-[#FAF6F8]/93 to-[#F8EFF5]/95 backdrop-blur-md text-center flex flex-col items-center justify-center relative overflow-hidden">
          {/* Inner Decorative Gold Inset Frame */}
          <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/40 rounded-[18px] pointer-events-none" />

          {/* Corner Flourishes */}
          <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none text-[#D4AF37]/75">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-5 h-5 pointer-events-none text-[#D4AF37]/75 rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-5 h-5 pointer-events-none text-[#D4AF37]/75 -rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-5 h-5 pointer-events-none text-[#D4AF37]/75 rotate-180">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M 2 14 L 2 4 C 2 2.9 2.9 2 4 2 L 14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* Top Label: Wedding Date */}
          <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#801336] font-black block mb-1">
            ✦ WEDDING DATE ✦
          </span>

          {/* Prominent Revealed Wedding Date */}
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-[#4A0E2E] font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] my-1">
            12 NOVEMBER 2026
          </h3>

          {/* Auspicious Muhurtham Time */}
          <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 bg-[#4A0E2E]/10 border border-[#D4AF37]/50 rounded-full">
            <span className="font-cinzel text-[11px] sm:text-xs text-[#4A0E2E] font-extrabold tracking-wider uppercase">
              MUHURTHAM: 6:38 PM
            </span>
          </div>
        </div>

        {/* ========================================================
            2. TOP SCRATCH SURFACE: Premium Champagne-Gold Canvas
            ======================================================== */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer z-20 transition-opacity duration-500"
            style={{
              opacity: scratchPercent >= 55 ? 0 : 1,
              touchAction: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          />
        )}
      </div>

      {/* Accessible Fallback Button: "Reveal Date" */}
      {!isRevealed ? (
        <button
          type="button"
          onClick={revealFullDate}
          className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#FFFDF9] to-[#F8EFF5] hover:from-[#641E32] hover:to-[#7A152E] hover:text-[#FFFDF9] text-[#641E32] border border-[#D4AF37] rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Reveal Date</span>
        </button>
      ) : (
        <div className="mt-3 inline-flex items-center gap-2 text-xs font-cinzel text-[#641E32] font-black tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Wedding Date Revealed!</span>
        </div>
      )}
    </div>
  );
};

export default ScratchCardReveal;
