export function LidarSVGFallback({ className }: { className?: string }) {
  // 40 static lidar-dot positions: road strip + pedestrian scatter
  const dots = [
    [192,230],[208,230],[224,230],[180,210],[220,210],[200,195],[185,180],[215,180],
    [175,165],[225,165],[168,150],[232,150],[162,135],[238,135],[158,120],[242,120],
    [120,250],[140,250],[260,250],[280,250],[110,235],[290,235],[100,215],[300,215],
    [95,195],[305,195],[88,175],[312,175],[85,155],[315,155],[82,135],[318,135],
    [78,115],[322,115],[75,95],[325,95],[72,75],[328,75],[70,55],[330,55],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      style={{ width: '100%', height: '100%' }}
      aria-label="Lidar scan fallback — WebGL unavailable"
    >
      <rect width="400" height="300" fill="#0a0e1a" />
      {/* Road perspective lines */}
      <line x1="155" y1="300" x2="185" y2="50" stroke="#1a2a3a" strokeWidth="1" />
      <line x1="245" y1="300" x2="215" y2="50" stroke="#1a2a3a" strokeWidth="1" />
      {/* Lidar dots */}
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="#4db8ff" opacity="0.6" />
      ))}
      <text x="200" y="290" fill="#4db8ff" fontSize="10" textAnchor="middle" opacity="0.5">
        LIDAR — WebGL unavailable
      </text>
    </svg>
  );
}