import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'State Handbook Review',
    status: 'completed' as const,
    desc: 'CA & AZ autonomous vehicle regulations',
  },
  {
    id: 2,
    title: 'Hazard Perception Prep',
    status: 'in_progress' as const,
    desc: 'Pedestrians, cyclists, and occlusion zones',
  },
  {
    id: 3,
    title: 'Zone Simulation Challenge',
    status: 'pending' as const,
    desc: 'Live reaction test with telemetry scoring',
  },
];

export function AVRoadmap() {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Training Progression
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative p-5 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">
                STAGE 0{step.id}
              </span>
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : step.status === 'in_progress' ? (
                <span className="w-3 h-3 rounded-full bg-accent animate-ping" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
            <p className="text-slate-500 text-xs mt-1">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
