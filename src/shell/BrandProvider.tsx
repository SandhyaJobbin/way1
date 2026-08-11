import { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { brand } from '../content';

type BrandContextType = typeof brand;

const BrandContext = createContext<BrandContextType | null>(null);

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const contextValue = useMemo(() => brand, []);

  useEffect(() => {
    // Apply branding overrides to CSS variables
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
  }, []);

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  );
}
