const fs = require('fs');
const path = require('path');

const datasetPath = path.join(__dirname, '../newassets/zone/dataset.json');
const outputPath = path.join(__dirname, '../src/content/scenarios.json');

const data = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

function timeToSeconds(timeStr) {
  if (!timeStr || timeStr === 'N/A') return null;
  const parts = timeStr.split(':');
  if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return 0;
}

// Very rough mapping of textual locations to percentages (x, y, w, h)
function mapLocationToRegion(locationStr) {
  const str = locationStr.toLowerCase();
  let x = 30, y = 30, w = 40, h = 40; // Default center
  
  if (str.includes('bottom-left')) { x = 0; y = 60; }
  else if (str.includes('bottom-right')) { x = 60; y = 60; }
  else if (str.includes('bottom-center')) { x = 30; y = 60; }
  else if (str.includes('center-left')) { x = 10; y = 30; }
  else if (str.includes('center-right')) { x = 60; y = 30; }
  else if (str.includes('left')) { x = 10; y = 30; w = 30; h = 60; }
  else if (str.includes('right')) { x = 60; y = 30; w = 30; h = 60; }
  else if (str.includes('center')) { x = 30; y = 30; }

  return { x, y, w, h };
}

const scenario = {
  id: "scenario-1",
  worldId: "phoenix",
  clip: {
    slot: "pov-dashcam-1",
    src: "/zone/render.mp4",
    poster: "" // can fill in later
  },
  hazards: []
};

data.forEach((item, index) => {
  if (item.video_presence !== "VISIBLE_IN_VIDEO") return;
  
  const t = timeToSeconds(item.immediate_hazard);
  const start = timeToSeconds(item.first_appears) || (t - 2);
  const end = timeToSeconds(item.hazard_ends) || (t + 5);

  if (t !== null) {
    scenario.hazards.push({
      t: t,
      category: item.object_type,
      hitRegion: mapLocationToRegion(item.frame_location),
      window: [start, end],
      points: 100,
      explanation: item.perception_comparison.human_driver_observation,
      avHandling: item.perception_comparison.av_platform_handling
    });
  }
});

fs.writeFileSync(outputPath, JSON.stringify([scenario], null, 2));
console.log('Successfully written scenarios.json');
