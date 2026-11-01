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
      colors: ['#D4AF37', '#FFFDF9', '#641E32', '#C6A15B', '#FFDF78'],
    });

    confetti({
      particleCount: 110,
      angle: 120,
      spread: 75,
      origin: { x: 0.8, y: 0.65 },
      colors: ['#D4AF37', '#FFFDF9', '#641E32', '#C6A15B', '#FFDF78'],
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

  // Initialize Canvas Foil: Premium Champagne-Gold Appearance with subtle decorative heart
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

    // 3. Delicate Outer Border Inset on Foil
    ctx.save();
    ctx.strokeStyle = 'rgba(100, 30, 50, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.strokeRect(17, 17, width - 34, height - 34);
    ctx.restore();

    // 4. Subtle Decorative Heart in Center (Stroke Outline)
    ctx.save();
    const hx = width / 2;
    const hy = height * 0.44;
    const hs = Math.min(width, height) * 0.22;

    ctx.translate(hx, hy);
    ctx.beginPath();
    ctx.moveTo(0, hs * 0.6);
    ctx.bezierCurveTo(-hs * 0.7, 0, -hs * 0.8, -hs * 0.6, 0, -hs * 0.2);
    ctx.bezierCurveTo(hs * 0.8, -hs * 0.6, hs * 0.7, 0, 0, hs * 0.6);
    ctx.fillStyle = 'rgba(100, 30, 50, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 30, 50, 0.35)';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.restore();

    // 5. Foil Typography: "A LITTLE SURPRISE!" & "Scratch to reveal our wedding date ❤️"
    ctx.save();
    // Top Surprise Lead-in
    ctx.font = 'bold 11px Cinzel, serif';
    ctx.fillStyle = '#641E32';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '3px';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText('✦  A  L I T T L E  S U R P R I S E !  ✦', width / 2, height * 0.26);

    // Primary Instruction
    ctx.font = 'italic 600 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#3E0E1B';
    ctx.shadowBlur = 6;
    ctx.fillText('Scratch to reveal our wedding date  ❤', width / 2, height * 0.62);

    // Subtle helper text at bottom
    ctx.font = 'bold 9px Cinzel, serif';
    ctx.fillStyle = '#7A4B10';
    ctx.letterSpacing = '2px';
    ctx.shadowBlur = 2;
    ctx.fillText('✨ SWIPE HERE WITH FINGER OR MOUSE ✨', width / 2, height * 0.82);
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
    ctx.lineWidth = 55; // Generous, smooth scratch brush

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

    // Requirement: Reveal the complete date when approximately 55% has been cleared
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
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none">
      {/* Scratch Card Frame */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden border-2 border-[#C6A15B] shadow-[0_16px_45px_rgba(70,30,10,0.18)] transition-all duration-500"
      >
        {/* ========================================================
            1. UNDERNEATH REVEALED CONTENT: "12 NOVEMBER 2022"
            ======================================================== */}
        <div className="absolute inset-0 w-full h-full p-6 sm:p-10 bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5EADB] text-center flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle golden ambient shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A15B]/10 to-transparent pointer-events-none" />

          {/* Lead-in Label */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#641E32]/10 border border-[#641E32]/25 text-[#641E32] font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase font-extrabold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] fill-current" />
            <span>Save Our Date</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] fill-current" />
          </div>

          {/* Prominent Revealed Wedding Date */}
          <h3 className="font-cinzel text-3xl sm:text-5xl md:text-6xl text-[#4A0E1F] font-black tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] my-1 sm:my-2">
            12 NOVEMBER 2022
          </h3>

          <p className="font-cormorant italic text-[#8A6517] text-lg sm:text-2xl font-bold tracking-wide">
            Saturday • Palakollu, West Godavari
          </p>
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
          className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFFDF9]/90 hover:bg-[#641E32] hover:text-[#FFFDF9] text-[#641E32] border border-[#C6A15B] rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Reveal Date</span>
        </button>
      ) : (
        <div className="mt-3 inline-flex items-center gap-2 text-xs font-cinzel text-[#641E32] font-black tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-[#C6A15B]" />
          <span>Wedding Date Revealed!</span>
        </div>
      )}
    </div>
  );
};

export default ScratchCardReveal;
