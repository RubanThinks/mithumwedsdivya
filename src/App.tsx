import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import FamilySection from './components/FamilySection';
import CeremonySection from './components/CeremonySection';
import LocationSection from './components/LocationSection';
import TravelSection from './components/TravelSection';
import Footer from './components/Footer';
import MusicControl from './components/MusicControl';
import FallingHeartsRain from './components/FallingHeartsRain';
import { useLenis } from './hooks/useLenis';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  // Lenis smooth scrolling integration
  useLenis();

  const handleOpenInvitation = useCallback(() => {
    setShowIntro(false);
    setShouldPlayMusic(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-forest-dark text-ivory">
      {/* Permanent, continuous falling heart rain across both intro and entire website */}
      <FallingHeartsRain />

      {/* Cinematic Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen
            isVisible={showIntro}
            onOpenInvitation={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Main Wedding Website Sections */}
      <AnimatePresence>
        {!showIntro && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative z-10"
          >
            {/* 1. Main Couple Introduction Section */}
            <HeroSection />

            {/* 2. Couple's Portrait Gallery */}
            <CoupleSection />

            {/* 3. Family Introduction Section */}
            <FamilySection />

            {/* 4. Wedding Celebration (Diamond Heart Scratch Card with Monogram M ❤️ D) */}
            <CeremonySection />

            {/* 5. Our Wedding Venue & Map */}
            <LocationSection />

            {/* 6. Travel Guide: Nearest Airport & Railway Station with Maps Action Buttons */}
            <TravelSection />

            {/* 7. Traditional Indian Gratitude & Blessings Finale */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Audio Experience */}
      {!showIntro && (
        <MusicControl
          audioSrc="/audio/wedding-song.mp3"
          shouldPlay={shouldPlayMusic}
        />
      )}
    </div>
  );
}

export default App;
