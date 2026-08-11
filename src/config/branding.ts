// Swap-ready branding configuration
// This layer allows the target client's identity to be applied post-award
// without code edits in the core application.

export const brandConfig = {
  // Client Identity
  companyName: 'Client AV',
  logoUrl: '', // path to logo image
  faviconUrl: '',
  
  // Theme Variables (these override index.css when applied via JS)
  theme: {
    primaryColor: '#0080FF',
    accentColor: '#00E59B',
    surfaceColor: '#F5F7FA',
    inkColor: '#1E2340',
  },
  
  // Apply theme dynamically to root
  applyTheme: () => {
    const root = document.documentElement;
    root.style.setProperty('--sem-accent', brandConfig.theme.primaryColor);
    root.style.setProperty('--sem-accent-2', brandConfig.theme.accentColor);
    root.style.setProperty('--sem-surface', brandConfig.theme.surfaceColor);
    root.style.setProperty('--sem-ink', brandConfig.theme.inkColor);
  }
};
