export interface IncidentData {
  id: string;
  source: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  sensorFusion: string[];
  description: string;
}

export interface RoutingOption {
  id: string;
  label: string;
  icon: string;
  reasonCode: string;
  description: string;
  recommended: boolean;
}

export interface NarrativeLine {
  text: string;
  wayoState: 'idle' | 'curious' | 'thinking' | 'concerned' | 'alert' | 'happy';
  delay?: number;
}

export const TRIAGE_INCIDENT: IncidentData = {
  id: 'TRI-2291-RA',
  source: 'Zone 1 — MCPI Sensor Array',
  timestamp: '14:23:07 UTC',
  type: 'Construction Zone Anomaly',
  severity: 'high',
  confidence: 0.17,
  sensorFusion: ['LiDAR', 'Camera', 'Radar', 'V2X'],
  description:
    'Low-confidence construction zone detection. Sensor fusion disagreement on barrier boundaries. Manual triage required before fleet-wide alert.',
};

export const TRIAGE_ROUTING_OPTIONS: RoutingOption[] = [
  {
    id: 'fleet-ops',
    label: 'Forward to Fleet Ops',
    icon: '🚛',
    reasonCode: 'FLEET_WIDE',
    description: 'Broadcast alert to all active vehicles in sector. Fleet Ops coordinates rerouting.',
    recommended: false,
  },
  {
    id: 'annotation',
    label: 'Send to Annotation Studio',
    icon: '🏷️',
    reasonCode: 'ANNOTATE',
    description: 'Route to human annotators for bounding-box correction and label verification.',
    recommended: true,
  },
  {
    id: 'safety-lead',
    label: 'Escalate to Safety Lead',
    icon: '🛡️',
    reasonCode: 'ESCALATE',
    description: 'Flag for senior safety review. Pauses autonomous decisions in affected sector.',
    recommended: false,
  },
];

export const ACT1_NARRATIVE: NarrativeLine[] = [
  {
    text: 'Welcome to the Waymo Triage Ops module. You are the critical link between sensor data and fleet safety.',
    wayoState: 'idle',
    delay: 0,
  },
  {
    text: 'Every day, autonomous vehicles process millions of sensor readings. Most are routine. Some are not.',
    wayoState: 'curious',
    delay: 400,
  },
  {
    text: 'When confidence drops below threshold, the system flags it for human review. That is where you come in.',
    wayoState: 'thinking',
    delay: 400,
  },
  {
    text: 'A low-confidence incident has just arrived from Zone 1. Confidence: 0.17 — well below the 0.85 threshold.',
    wayoState: 'concerned',
    delay: 300,
  },
  {
    text: 'Let us head to the triage console and examine what the sensors are telling us.',
    wayoState: 'alert',
    delay: 300,
  },
];

export const ZONE2_NARRATIVE: NarrativeLine[] = [
  {
    text: 'This is the triage console. The incident — TRI-2291-RA — is waiting for your decision.',
    wayoState: 'idle',
    delay: 0,
  },
  {
    text: 'Left: LiDAR point cloud. The sweep is live — 8 detected objects, 2 flagged as unknown.',
    wayoState: 'curious',
    delay: 400,
  },
  {
    text: 'Center: Camera feeds. Notice the construction barrier — sensor fusion disagrees on its exact boundaries.',
    wayoState: 'thinking',
    delay: 400,
  },
  {
    text: 'Use the jog dial to scrub through the timeline and observe how the detection evolves.',
    wayoState: 'curious',
    delay: 300,
  },
  {
    text: 'When ready, select a routing option on the right. Your choice determines what happens next in the ecosystem.',
    wayoState: 'alert',
    delay: 300,
  },
];
