import React, { createContext, useContext, useEffect, useState } from 'react';
import brandingConfig from '../config/branding.json';

export type BrandConfig = {
  name: string;
  tagline: string;
  wordmark: {
    mode: 'text' | 'image';
    src?: string;
  };
  logoSlot: string | null;
  colorOverrides: {
    accentPrimary: string | null;
    accentSecondary: string | null;
    surface: string | null;
    ink: string | null;
  };
};

const BrandContext = createContext<BrandConfig | null>(null);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brand] = useState<BrandConfig>(brandingConfig as BrandConfig);

  useEffect(() => {
    // Apply color overrides to root CSS variables if present
    const root = document.documentElement;
    if (brand.colorOverrides.accentPrimary) {
      root.style.setProperty('--sem-accent', brand.colorOverrides.accentPrimary);
    }
    if (brand.colorOverrides.accentSecondary) {
      root.style.setProperty('--sem-accent-2', brand.colorOverrides.accentSecondary);
    }
    if (brand.colorOverrides.surface) {
      root.style.setProperty('--sem-surface', brand.colorOverrides.surface);
    }
    if (brand.colorOverrides.ink) {
      root.style.setProperty('--sem-ink', brand.colorOverrides.ink);
    }
  }, [brand]);

  return (
    <BrandContext.Provider value={brand}>
      {children}
    </BrandContext.Provider>
  );
};
