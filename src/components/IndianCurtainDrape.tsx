import React from 'react';

const IndianCurtainDrape: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 overflow-hidden select-none">
      <img
        src="/images/curtain-drape.png"
        alt="Royal Indian Wedding Curtain Drape"
        className="w-full h-auto max-h-20 sm:max-h-24 md:max-h-32 object-cover object-top drop-shadow-2xl"
      />
    </div>
  );
};

export default IndianCurtainDrape;
