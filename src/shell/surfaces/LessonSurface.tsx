import { useEffect, useState } from 'react';
import { useProgressStore } from '../../store/progressStore';
import { nuances } from '../../content';
import { NuanceCard } from '../../components/NuanceCard';
import { StateGrid } from '../../components/StateGrid';

export function LessonSurface() {
  const { setCheckpoint } = useProgressStore();
  const [essentialsCompleted, setEssentialsCompleted] = useState(false);

  useEffect(() => {
    setCheckpoint('lesson', 'active');
  }, [setCheckpoint]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1024px] mx-auto min-h-screen space-y-16">
      
      {/* Part 1: US Driving Essentials */}
      <section>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold text-ink mb-4">US Driving Essentials</h1>
          <p className="text-ink/80 text-lg max-w-2xl">
            Review how human driving behavior differs from autonomous vehicle (AV) handling in these core scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {nuances.map(nuance => (
            <NuanceCard key={nuance.id} nuance={nuance} />
          ))}
        </div>

        {!essentialsCompleted && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                setEssentialsCompleted(true);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-pill bg-ink text-white font-semibold hover:bg-accent hover:text-ink transition-colors shadow-lg"
            >
              Continue to State Handbook
            </button>
          </div>
        )}
      </section>

      {/* Part 2: State Handbook */}
      {essentialsCompleted && (
        <section className="pt-8 border-t border-line">
          <StateGrid />
        </section>
      )}

    </div>
  );
}
