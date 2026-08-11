import { useEffect } from 'react';
import { useProgressStore } from '../../store/progressStore';
import { StateGrid } from '../../components/StateGrid';

export function LessonSurface() {
  const { setCheckpoint } = useProgressStore();

  useEffect(() => {
    setCheckpoint('lesson', 'active');
  }, [setCheckpoint]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1024px] mx-auto min-h-screen space-y-16">
      
      {/* State Handbook */}
      <section>
        <StateGrid />
      </section>

    </div>
  );
}
