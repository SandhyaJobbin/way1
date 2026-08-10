import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { IncidentData } from '../content/scenario-data';

interface TriageConsoleProps {
  incident: IncidentData;
  showScrubber?: boolean;
  showRoutingCards?: boolean;
  selectedRoutingId?: string | null;
  onRoutingSelect?: (id: string) => void;
}

const CAMERA_FEEDS = [
  { label: 'CAM-01', time: '14:22:08' },
  { label: 'CAM-03', time: '14:22:08' },
  { label: 'CAM-07', time: '14:22:07' },
  { label: 'CAM-12', time: '14:22:08' },
];

export function TriageConsole({
  incident,
  showScrubber = true,
  showRoutingCards = false,
  selectedRoutingId = null,
  onRoutingSelect,
}: TriageConsoleProps) {
  const [scrubberProgress, setScrubberProgress] = useState(0);

  useEffect(() => {
    if (!showScrubber) return;
    const interval = setInterval(() => {
      setScrubberProgress((p) => Math.min(p + 0.5, 100));
    }, 50);
    return () => clearInterval(interval);
  }, [showScrubber]);

  return (
    <>
      {/* LiDAR viewport — left panel */}
      <div className="absolute top-[12%] left-[4%] w-[28%] h-[52%] z-20">
        <div className="glass-panel h-full p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full"
                 style={{ backgroundColor: 'var(--c-triage-glow)' }} />
            <span className="font-data text-[10px] text-white/50 uppercase tracking-wider">LIDAR · 360°</span>
          </div>
          <div className="relative flex-1 rounded-lg overflow-hidden"
               style={{ backgroundColor: 'rgba(10, 20, 30, 0.6)' }}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {[40, 70, 100].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r}
                        fill="none" stroke="rgba(79, 195, 247, 0.15)" strokeWidth="0.5" />
              ))}
              <circle cx="100" cy="100" r="3" fill="var(--c-triage-glow)" />
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[
                  [60, 55, 6], [65, 62, 4], [58, 50, 3],
                  [140, 145, 5], [148, 138, 3],
                  [130, 60, 4], [122, 68, 3],
                  [45, 130, 3],
                ].map(([cx, cy, r], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r}
                          fill="rgba(79, 195, 247, 0.5)" />
                ))}
              </motion.g>
              <motion.line
                x1="100" y1="100" x2="100" y2="10"
                stroke="rgba(79, 195, 247, 0.4)" strokeWidth="1"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '100px 100px' }}
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between font-data text-[9px] text-white/40">
            <span>Objects: 8</span>
            <span>Range: 120m</span>
          </div>
        </div>
      </div>

      {/* Camera thumbnails — center panel */}
      <div className="absolute top-[12%] left-[36%] w-[28%] h-[52%] z-20">
        <div className="glass-panel h-full p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="font-data text-[10px] text-white/50 uppercase tracking-wider">CAMERAS · 4/12</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            {CAMERA_FEEDS.map((cam, i) => (
              <div key={cam.label}
                   className="relative rounded-lg overflow-hidden border"
                   style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(10, 20, 30, 0.7)' }}>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)' }}
                  animate={{ opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[60%] h-[20%] rounded-sm"
                       style={{ background: 'rgba(255, 183, 77, 0.15)' }} />
                </div>
                <div className="absolute top-1 left-1 font-data text-[8px] text-white/60">{cam.label}</div>
                <div className="absolute bottom-1 right-1 font-data text-[8px] text-white/40">{cam.time}</div>
                <motion.div
                  className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident metadata — right panel */}
      <div className="absolute top-[12%] right-[4%] w-[28%] h-[52%] z-20">
        <div className="glass-panel h-full p-4 flex flex-col">
          <div className="font-data text-[10px] text-white/40 uppercase tracking-wider mb-3">Incident Metadata</div>
          <div className="space-y-2.5 flex-1">
            <MetaRow label="ID" value={incident.id} />
            <MetaRow label="Source" value={incident.source} />
            <MetaRow label="Time" value={incident.timestamp} />
            <MetaRow label="Type" value={incident.type} />
            <MetaRow
              label="Severity"
              value={incident.severity.toUpperCase()}
              color={
                incident.severity === 'critical' ? '#ef4444' :
                incident.severity === 'high' ? 'var(--c-triage-timeline)' :
                'var(--c-triage-glow)'
              }
            />
            <MetaRow label="Confidence" value={String(incident.confidence)} />
            <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
            <div className="font-data text-[10px] text-white/40 uppercase tracking-wider mb-1">Sensor Fusion</div>
            <div className="flex gap-1.5">
              {incident.sensorFusion.map((s) => (
                <div key={s} className="px-2 py-0.5 rounded text-[9px] font-data"
                     style={{ backgroundColor: 'rgba(79, 195, 247, 0.15)', color: 'var(--c-triage-glow)' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline scrubber — bottom */}
      {showScrubber && (
        <div className="absolute bottom-[18%] left-[5%] w-[62%] z-25">
          <div className="glass-panel px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="font-data text-[10px] text-white/40">14:21:30</span>
              <div className="flex-1 relative h-1 rounded-full"
                   style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div className="absolute top-0 left-0 h-full rounded-full"
                     style={{
                       width: `${scrubberProgress}%`,
                       backgroundColor: 'var(--c-triage-timeline)',
                     }} />
                <motion.div
                  className="absolute top-1/2 w-2.5 h-2.5 rounded-full -translate-y-1/2"
                  style={{
                    left: `${scrubberProgress}%`,
                    backgroundColor: 'var(--c-triage-timeline)',
                    boxShadow: '0 0 8px rgba(255, 183, 77, 0.5)',
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <span className="font-data text-[10px] text-white/40">14:22:45</span>
            </div>
          </div>
        </div>
      )}

      {/* Routing cards */}
      {showRoutingCards && onRoutingSelect && (
        <div className="absolute bottom-[20%] right-[5%] z-25">
          <div className="flex gap-2">
            {[
              { id: 'fleet-ops', label: 'Fleet Ops', icon: '🚛', color: 'rgba(255, 183, 77, 0.3)' },
              { id: 'annotation', label: 'Annotation', icon: '🏷️', color: 'rgba(79, 195, 247, 0.3)' },
              { id: 'safety-lead', label: 'Safety Lead', icon: '🛡️', color: 'rgba(102, 187, 106, 0.3)' },
            ].map((card, i) => (
              <motion.button
                key={card.id}
                className="w-16 h-24 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: selectedRoutingId === card.id ? card.color : 'var(--c-triage-cards)',
                  borderColor: selectedRoutingId === card.id
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(79, 195, 247, 0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                onClick={() => onRoutingSelect(card.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-2xl">{card.icon}</div>
                  <div className="font-data text-[8px] text-white/50 mt-1">{card.label}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function MetaRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-data text-xs text-white/50">{label}</span>
      <span className="font-data text-xs" style={{ color: color || 'rgba(255,255,255,0.9)' }}>
        {value}
      </span>
    </div>
  );
}
