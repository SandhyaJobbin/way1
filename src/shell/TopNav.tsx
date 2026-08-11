import { NavLink } from 'react-router';
import { useBrand } from './BrandProvider';

export function TopNav() {
  const brand = useBrand();

  return (
    <div className="fixed top-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <nav className="h-[64px] glass-panel-dark rounded-pill shadow-lift pointer-events-auto flex items-center px-2">
        <div className="pl-6 pr-8 border-r border-line-glass flex items-center h-full">
          {brand.wordmark.mode === 'text' && (
            <span className="text-sm font-semibold uppercase tracking-[0.1em] text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
              {brand.name}
            </span>
          )}
          {brand.wordmark.mode === 'image' && brand.wordmark.src && (
            <img src={brand.wordmark.src} alt={brand.name} className="h-5 object-contain" />
          )}
        </div>
        
        <div className="flex items-center px-2 gap-2 h-full">
          <NavLink
            to="/lesson"
            className={({ isActive }) =>
              `relative px-6 h-[48px] flex items-center justify-center rounded-pill text-base font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                isActive ? 'bg-accent text-white shadow-[0_0_15px_rgba(0,128,255,0.4)]' : 'text-ink-muted hover:text-white hover:bg-white/5'
              }`
            }
          >
            Lesson
          </NavLink>
          <NavLink
            to="/zone"
            className={({ isActive }) =>
              `relative px-6 h-[48px] flex items-center justify-center rounded-pill text-base font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                isActive ? 'bg-accent text-white shadow-[0_0_15px_rgba(0,128,255,0.4)]' : 'text-ink-muted hover:text-white hover:bg-white/5'
              }`
            }
          >
            Zone
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
