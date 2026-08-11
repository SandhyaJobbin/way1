import { useNavigate } from 'react-router';

export function ZonePlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1024px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-card rounded-xl shadow-lift p-12 max-w-[640px] w-full relative overflow-hidden border border-line">
        {/* Decorative motif */}
        <div className="absolute top-8 left-8 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-accent/20" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>

        <h1 className="text-3xl font-display font-semibold text-ink mb-4 mt-8">
          Zone coming soon
        </h1>
        <p className="text-ink/80 text-base max-w-[480px] mx-auto mb-8">
          The hazard perception simulator is being prepared. Build your US driving context in the Lesson first.
        </p>

        <button
          onClick={() => navigate('/lesson')}
          className="px-8 h-[48px] rounded-pill bg-transparent border-[1.5px] border-ink text-ink font-semibold hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          Go to Lesson
        </button>
      </div>
    </div>
  );
}
