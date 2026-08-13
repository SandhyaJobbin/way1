import { Play } from 'lucide-react';

const videos = [
  {
    title: 'Urban Crosswalk & Pedestrian Yield',
    duration: '1:45',
    file: '/assets/san-francisco-crosswalk.mp4',
    tag: 'City Driving',
  },
  {
    title: 'School Zone & Reduced Speed Rules',
    duration: '2:10',
    file: '/assets/school-zone-sign.mp4',
    tag: 'Special Zones',
  },
  {
    title: 'Suburban Intersection Hazards',
    duration: '1:30',
    file: '/assets/suburban-street-sunset.mp4',
    tag: 'Suburban',
  },
];

export function VideoGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">
        Featured Video Scenarios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
              <video
                src={vid.file}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-accent flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
                {vid.duration}
              </span>
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {vid.tag}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-2">
                {vid.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
