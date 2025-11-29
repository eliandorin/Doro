import React, { useState } from 'react';
import { BrandTheme } from './types';
import { ClinicalLayout } from './components/ClinicalLayout';
import { LuxuryLayout } from './components/LuxuryLayout';
import { HypeLayout } from './components/HypeLayout';
import { BrandSwitcher } from './components/BrandSwitcher';

const App: React.FC = () => {
  const [theme, setTheme] = useState<BrandTheme>(BrandTheme.CLINICAL);

  const renderLayout = () => {
    switch (theme) {
      case BrandTheme.CLINICAL:
        return <ClinicalLayout />;
      case BrandTheme.LUXURY:
        return <LuxuryLayout />;
      case BrandTheme.HYPE:
        return <HypeLayout />;
      default:
        return <ClinicalLayout />;
    }
  };

  return (
    <>
      {renderLayout()}
      <BrandSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </>
  );
};

export default App;
