import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicControlProps {
  audioSrc: string;
  shouldPlay: boolean;
}

const MusicControl = ({ audioSrc, shouldPlay }: MusicControlProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play audio when shouldPlay becomes true
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      audio.volume = 0.45;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked by browser policy:", err);
        setIsPlaying(false);
      });
    }
  }, [shouldPlay]);

  // Robust toggle handler: explicitly pauses and resumes playback
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      audio.volume = 0.45;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback error:", err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Real, persistent DOM audio element with loop */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Gold/Burgundy Music Toggle Button */}
      <motion.button
        type="button"
        onClick={handleToggle}
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 w-13 h-13 bg-burgundy/90 backdrop-blur-md rounded-full border-2 border-gold shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/60 transition-transform select-none"
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Click to Mute / Pause" : "Click to Play Music"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="playing"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Volume2 className="text-gold w-5 h-5 drop-shadow" />
            </motion.span>
          ) : (
            <motion.span
              key="muted"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <VolumeX className="text-gold-light/70 w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default MusicControl;
