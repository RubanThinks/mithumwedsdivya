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
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  // Confetti celebration explosion when scratched
  const triggerCelebrationBurst = useCallback(() => {
    confetti({
      particleCount: 110,
      angle: 60,
      spread: 75,
      origin: { x: 0.2, y: 0.65 },
      colors: ['#D4AF37', '#FFFDF9', '#8B1E3F', '#C64765', '#FFDF78', '#FFFFFF'],
    });

    confetti({
      particleCount: 110,
      angle: 120,
      spread: 75,
      origin: { x: 0.8, y: 0.65 },
      colors: ['#D4AF37', '#FFFDF9', '#8B1E3F', '#C64765', '#FFDF78', '#FFFFFF'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 170,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#D4AF37', '#E0C78F', '#DAA520', '#8B1E3F', '#FFFDF9', '#FFD700'],
        scalar: 1.3,
      });
    }, 220);
  }, []);

  // Initialize Canvas Foil: Ultra-Luxurious Glittering Velvet Burgundy / Maroon (ONLY "M ❤️ D" - NO extra cluttered text)
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Rich Deep Velvet Burgundy / Maroon Base
    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      width * 0.05,
      width * 0.5,
      height * 0.5,
      width * 0.65
    );
    grad.addColorStop(0, '#9E183C');    // Luminous Ruby Crimson
    grad.addColorStop(0.35, '#78122D'); // Deep Velvet Burgundy
    grad.addColorStop(0.7, '#50081B');  // Royal Velvet Maroon
    grad.addColorStop(1, '#28020B');    // Midnight Burgundy Wine

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Diamond Gemstone Cut Facets (Soft Triangular Facet Shading - NOT a wireframe grid!)
    const cx = width * 0.5;
    const cy = height * 0.46;
    const facetPoints = [
      { x: cx, y: height * 0.16 },
      { x: width * 0.84, y: height * 0.22 },
      { x: width * 0.94, y: height * 0.46 },
      { x: width * 0.80, y: height * 0.72 },
      { x: cx, y: height * 0.90 },
      { x: width * 0.20, y: height * 0.72 },
      { x: width * 0.06, y: height * 0.46 },
      { x: width * 0.16, y: height * 0.22 },
    ];

    for (let i = 0; i < facetPoints.length; i++) {
      const p1 = facetPoints[i];
      const p2 = facetPoints[(i + 1) % facetPoints.length];

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();

      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 235, 190, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      }
      ctx.fill();
    }

    // 3. Dense Sprinkled Glitter Dust (220+ Diamond and Gold Glistening Flecks)
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < 220; i++) {
      const gx = rand() * width;
      const gy = rand() * height;
      const size = rand() * 2.8 + 0.6;
      const alpha = rand() * 0.7 + 0.3;
      const isGold = rand() > 0.45;

      ctx.save();
      ctx.translate(gx, gy);
      ctx.fillStyle = isGold ? `rgba(255, 223, 120, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = isGold ? '#FFDF78' : '#FFFFFF';
      ctx.shadowBlur = rand() > 0.7 ? 8 : 2;

      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      // Occasional diamond cross sparkle glint
      if (size > 2.3) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-size * 2.8, 0);
        ctx.lineTo(size * 2.8, 0);
        ctx.moveTo(0, -size * 2.8);
        ctx.lineTo(0, size * 2.8);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Center Royal Wedding Monogram Frame: ONLY "M ❤️ D" (CLEAN & ELEGANT)
    const badgeW = Math.min(width * 0.58, 260);
    const badgeH = 105;
    const badgeX = (width - badgeW) / 2;
    const badgeY = height * 0.46 - badgeH / 2;

    ctx.save();
    // Translucent royal velvet backing
    ctx.fillStyle = 'rgba(30, 4, 11, 0.88)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 28);
    ctx.fill();

    // Solid Gold Border
    ctx.shadowColor = '#D4AF37';
    ctx.shadowBlur = 14;
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Inner fine white-gold filigree border
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(badgeX + 4, badgeY + 4, badgeW - 8, badgeH - 8, 24);
    ctx.stroke();
    ctx.restore();

    // 5. STYLISH WEDDING MONOGRAM "M ❤️ D" ONLY
    ctx.save();
    ctx.font = 'italic 700 52px "Great Vibes", "Playfair Display", Georgia, cursive';
    ctx.fillStyle = '#FFFDF9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#DAA520';
    ctx.shadowBlur = 16;
    ctx.fillText('M  ❤  D', width / 2, height * 0.46 - 2);

    // Subtle golden filigree dots above & below
    ctx.font = '12px serif';
    ctx.fillStyle = '#FFDF78';
    ctx.fillText('✦ ✤ ✦', width / 2, badgeY + 18);
    ctx.fillText('✦ ✤ ✦', width / 2, badgeY + badgeH - 18);
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

  // CONTINUOUS INTERPOLATED SCRATCHING (Zero lag, zero dots, thick buttery smooth strokes)
  const drawScratchLine = (x1: number, y1: number, x2: number, y2: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 60; // Thick, effortless scratch brush

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Also draw a circle at current position for clean rounded ends
    ctx.beginPath();
    ctx.arc(x2, y2, 30, 0, Math.PI * 2);
    ctx.fill();

    // Sample progress
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

    // Because the heart only covers ~55% of the canvas bounding box,
    // 12% of the canvas is ~25-30% of the visible heart area!
    if (pct >= 12 && !isRevealed) {
      setIsRevealed(true);
      setShowCelebrationBadge(true);
      triggerCelebrationBurst();
      if (onRevealed) onRevealed();
    }
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
    // Prevent webpage scroll while scratching on mobile
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

  // Instant Reveal Option for accessibility/fun
  const handleInstantReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setShowCelebrationBadge(true);
    triggerCelebrationBurst();
    if (onRevealed) onRevealed();
  };

  // Normalized Heart Path for CSS clip-path (aspect 100:88)
  const normalizedHeartPath =
    'M 0.5000 0.9773 C 0.4200 0.8864, 0.0400 0.6364, 0.0400 0.3409 C 0.0400 0.1364, 0.2000 0.0455, 0.3400 0.0909 C 0.4200 0.1136, 0.4700 0.1818, 0.5000 0.2500 C 0.5300 0.1818, 0.5800 0.1136, 0.6600 0.0909 C 0.8000 0.0455, 0.9600 0.1364, 0.9600 0.3409 C 0.9600 0.6364, 0.5800 0.8864, 0.5000 0.9773 Z';

  // Scaled for SVG viewBox="0 0 100 88"
  const svgHeartPath =
    'M 50 86 C 42 78, 4 56, 4 30 C 4 12, 20 4, 34 8 C 42 10, 47 16, 50 22 C 53 16, 58 10, 66 8 C 80 4, 96 12, 96 30 C 96 56, 58 78, 50 86 Z';

  return (
    <div className="relative w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] mx-auto my-4 flex flex-col items-center">
      {/* 1. PLAYFUL HANGING NOTE / POINTER OUTSIDE THE SCRATCH CARD */}
      {!isRevealed ? (
        <div className="mb-4 inline-flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-[#4E0E22] via-[#641E32] to-[#4E0E22] border-2 border-gold rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.6)] animate-pulse">
          <Wand2 className="w-4 h-4 text-gold-light animate-bounce" />
          <span className="font-cinzel text-xs sm:text-sm font-bold text-ivory tracking-widest uppercase">
            Scratch the <span className="text-gold font-black">M ❤️ D</span> Heart to Reveal Date!
          </span>
          <span className="text-xs">👇</span>
        </div>
      ) : (
        <div className="mb-4 inline-flex items-center gap-2 px-5 py-2 bg-gold text-[#3F101E] font-cinzel text-xs sm:text-sm font-black tracking-widest uppercase rounded-full shadow-lg">
          <Sparkles className="w-4 h-4 fill-current" /> Auspicious Muhurtham Unveiled!
        </div>
      )}

      {/* 2. HIDDEN SVG DEFS FOR CLIPPING AND GRADIENTS */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="spaciousDiamondHeartClip" clipPathUnits="objectBoundingBox">
            <path d={normalizedHeartPath} />
          </clipPath>

          <linearGradient id="solidGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8EA" />
            <stop offset="25%" stopColor="#FFDF78" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#AA7A1E" />
            <stop offset="100%" stopColor="#FFDF78" />
          </linearGradient>

          <filter id="royalGlitterGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#FFDF78" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#DAA520" floodOpacity="0.45" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 3. HEART SHAPED CARD CONTAINER (With Padded Margin & Solid Diamond Glowing Border) */}
      <div className="relative w-full aspect-[100/88] flex items-center justify-center p-3 sm:p-5">
        {/* SOLID OPULENT DIAMOND & GOLD GLOWING BORDER (NO DASHED LINES) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
          viewBox="0 0 100 88"
        >
          {/* Ambient Glowing Halo Behind Border */}
          <path
            d={svgHeartPath}
            fill="none"
            stroke="#DAA520"
            strokeWidth="4.5"
            opacity="0.85"
            filter="url(#royalGlitterGlow)"
          />

          {/* Solid Royal Gold Main Border */}
          <path
            d={svgHeartPath}
            fill="none"
            stroke="url(#solidGoldGrad)"
            strokeWidth="3.2"
            style={{
              filter: isRevealed
                ? 'drop-shadow(0 0 16px #FFDF78) drop-shadow(0 0 30px #FFFFFF)'
                : 'drop-shadow(0 0 10px #FFDF78)',
            }}
          />

          {/* Inner Diamond Crystalline Highlight Ring */}
          <path
            d={svgHeartPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.0"
            opacity="0.9"
          />

          {/* DYNAMIC DIAMOND PRISMATIC SPARKLE STARS AROUND PERIMETER */}
          <g transform="translate(50, 22)" className="animate-diamond-twinkle">
            <polygon points="0,-4.5 1.5,-1.5 4.5,0 1.5,1.5 0,4.5 -1.5,1.5 -4.5,0 -1.5,-1.5" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="1.4" fill="#FFDF78" />
          </g>

          <g transform="translate(34, 8)" className="animate-diamond-twinkle" style={{ animationDelay: '0.4s' }}>
            <polygon points="0,-5.5 1.8,-1.8 5.5,0 1.8,1.8 0,5.5 -1.8,1.8 -5.5,0 -1.8,-1.8" fill="#FFFDF9" />
            <circle cx="0" cy="0" r="1.8" fill="#FFDF78" />
          </g>

          <g transform="translate(66, 8)" className="animate-diamond-twinkle" style={{ animationDelay: '0.8s' }}>
            <polygon points="0,-5.5 1.8,-1.8 5.5,0 1.8,1.8 0,5.5 -1.8,1.8 -5.5,0 -1.8,-1.8" fill="#FFFDF9" />
            <circle cx="0" cy="0" r="1.8" fill="#FFDF78" />
          </g>

          <g transform="translate(6, 30)" className="animate-diamond-twinkle" style={{ animationDelay: '1.2s' }}>
            <polygon points="0,-4.5 1.5,-1.5 4.5,0 1.5,1.5 0,4.5 -1.5,1.5 -4.5,0 -1.5,-1.5" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="1.4" fill="#FFDF78" />
          </g>

          <g transform="translate(94, 30)" className="animate-diamond-twinkle" style={{ animationDelay: '1.6s' }}>
            <polygon points="0,-4.5 1.5,-1.5 4.5,0 1.5,1.5 0,4.5 -1.5,1.5 -4.5,0 -1.5,-1.5" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="1.4" fill="#FFDF78" />
          </g>

          <g transform="translate(24, 60)" className="animate-diamond-twinkle" style={{ animationDelay: '0.6s' }}>
            <polygon points="0,-4 1.3,-1.3 4,0 1.3,1.3 0,4 -1.3,1.3 -4,0 -1.3,-1.3" fill="#FFFFFF" />
          </g>

          <g transform="translate(76, 60)" className="animate-diamond-twinkle" style={{ animationDelay: '1.4s' }}>
            <polygon points="0,-4 1.3,-1.3 4,0 1.3,1.3 0,4 -1.3,1.3 -4,0 -1.3,-1.3" fill="#FFFFFF" />
          </g>

          <g transform="translate(50, 86)" className="animate-diamond-twinkle" style={{ animationDelay: '1.0s' }}>
            <polygon points="0,-6.5 2.2,-2.2 6.5,0 2.2,2.2 0,6.5 -2.2,2.2 -6.5,0 -2.2,-2.2" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="2.2" fill="#FFDF78" />
          </g>
        </svg>

        {/* 4. CLIPPED SPACIOUS HEART INTERIOR */}
        <div
          ref={containerRef}
          className="relative w-full h-full select-none overflow-hidden"
          style={{
            clipPath: 'url(#spaciousDiamondHeartClip)',
            WebkitClipPath: 'url(#spaciousDiamondHeartClip)',
          }}
        >
          {/* ========================================================
              A. UNDERNEATH LAYER: ONLY Wedding Date & Time (Properly Scaled to Fit Heart)
              ======================================================== */}
          <div className="absolute inset-0 w-full h-full px-8 sm:px-14 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#4E0E22] via-[#102019] to-[#3B0715] relative overflow-hidden select-none pb-2 sm:pb-4">
            {showCelebrationBadge && (
              <div className="absolute inset-0 bg-gold/25 pointer-events-none animate-pulse" />
            )}

            {/* Wedding Text */}
            <p className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-light font-bold mb-1 drop-shadow-md">
              ✦ Wedding Ceremony ✦
            </p>

            {/* Sacred Date: Balanced "12" */}
            <div className="font-playfair text-5xl sm:text-6xl md:text-7xl text-ivory font-black leading-tight my-0.5 drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
              12
            </div>

            {/* Month & Year */}
            <div className="font-cinzel text-base sm:text-lg md:text-xl text-gold font-extrabold tracking-[0.25em] uppercase drop-shadow-md mt-0.5 mb-1.5">
              November 2022
            </div>

            {/* Sacred Muhurtham Time */}
            <div className="font-poppins text-xs sm:text-sm text-champagne font-bold uppercase tracking-[0.15em] drop-shadow-md flex flex-wrap items-center justify-center gap-1.5">
              <span>Saturday</span>
              <span className="text-gold">•</span>
              <span className="text-gold-light font-extrabold">6:38 PM Muhurtham</span>
            </div>
          </div>

          {/* ========================================================
              B. TOP SCRATCH SPACE: Rich Burgundy / Maroon Glittering Velvet Foil (ONLY "M ❤️ D")
              ======================================================== */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20 transition-opacity duration-500"
              style={{
                opacity: scratchPercent >= 12 ? 0 : 1,
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
      </div>

      {/* Quick Tap to Reveal Option */}
      {!isRevealed && (
        <button
          type="button"
          onClick={handleInstantReveal}
          className="mt-2 text-xs font-cinzel tracking-widest text-gold-light/80 hover:text-gold underline cursor-pointer transition-colors"
        >
          ✦ Or Click Here to Reveal Instantly ✦
        </button>
      )}
    </div>
  );
};

export default ScratchCardReveal;
