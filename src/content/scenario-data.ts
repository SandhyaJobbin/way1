import rtorIcon from '../assets/icon-rtor.gif';
import fourWayIcon from '../assets/icon-4way.png';
import schoolBusIcon from '../assets/icon-schoolbus.gif';
import jaywalkIcon from '../assets/icon-jaywalk.gif';
import laneChangeIcon from '../assets/icon-lanechange.png';

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
  guideState: 'idle' | 'curious' | 'thinking' | 'concerned' | 'alert' | 'happy';
  delay?: number;
}

export const ZONE_INCIDENT: IncidentData = {
  id: 'PHX-4471-RTOR',
  source: 'Phoenix Sensor Array',
  timestamp: '14:23:07 UTC',
  type: 'Right-Turn-on-Red Anomaly',
  severity: 'high',
  confidence: 0.31,
  sensorFusion: ['LiDAR', 'Camera', 'Radar', 'V2X'],
  description:
    'Low-confidence pedestrian intent detection. Vehicle approaching intersection on red, pedestrian on curb.',
};

export const LESSON_BEHAVIORS = [
  {
    id: 'rtor',
    title: 'Right-Turn-on-Red',
    icon: '🔴→✅',
    iconUrl: rtorIcon,
    desc: 'Yielding to traffic and pedestrians before turning right on red.',
    confidenceLevel: 85
  },
  {
    id: 'four-way',
    title: 'Four-Way-Stop Etiquette',
    icon: '🛑',
    iconUrl: fourWayIcon,
    desc: 'Determining right of way based on arrival time and position.',
    confidenceLevel: 92
  },
  {
    id: 'school-bus',
    title: 'School-Bus Mandates',
    icon: '🚌',
    iconUrl: schoolBusIcon,
    desc: 'Strict stopping protocols when red lights are flashing.',
    confidenceLevel: 98
  },
  {
    id: 'jaywalking',
    title: 'Jaywalking Norms',
    icon: '🚶',
    iconUrl: jaywalkIcon,
    desc: 'Predicting intent when pedestrians cross outside designated areas.',
    confidenceLevel: 65
  },
  {
    id: 'lane-change',
    title: 'Aggressive Lane Change',
    icon: '🚗💨',
    iconUrl: laneChangeIcon,
    desc: 'Anticipating sudden cut-ins and aggressive merges.',
    confidenceLevel: 72
  }
];

export const LESSON_QUIZ = [
  {
    question: 'At a four-way stop, two cars arrive simultaneously. The AV is on the right. Who has right of way?',
    options: ['The AV', 'The other car', 'Neither'],
    answerIndex: 0
  },
  {
    question: 'When a school bus has its red lights flashing and stop arm extended, the AV must:',
    options: ['Pass cautiously', 'Stop completely', 'Honk and proceed'],
    answerIndex: 1
  },
  {
    question: 'A pedestrian steps off the curb 50 feet from a crosswalk. The AV should prioritize:',
    options: ['Maintaining speed', 'Yielding and reassessing intent', 'Switching lanes immediately'],
    answerIndex: 1
  }
];

export const SCORECARD_DIMENSIONS = [
  { name: '3D Spatial Rotation', max: 5 },
  { name: 'Telemetry Interpretation', max: 5 },
  { name: 'Occlusion Reasoning', max: 5 },
  { name: 'Complex Decision-Making', max: 5 },
];

export const ZONE_NARRATIVE: NarrativeLine[] = [
  {
    text: 'The AV detected an unusual pattern. Confidence flagged at 0.31. Let us look at what the sensors captured.',
    guideState: 'alert',
    delay: 0,
  },
  {
    text: 'The pedestrian stepped off the curb. The AV flagged intent uncertainty. What does the sensor data tell you?',
    guideState: 'thinking',
    delay: 400,
  },
  {
    text: 'Exactly. Low confidence on legal-status forces the AV to yield and flag.',
    guideState: 'happy',
    delay: 0,
  },
  {
    text: 'Not quite. The uncertainty of intent requires the AV to yield until the pedestrian action is clear.',
    guideState: 'concerned',
    delay: 0,
  }
];
