import { z } from 'zod';

export const HazardEventSchema = z.object({
  event_id: z.number(),
  first_appears: z.string(),
  begins_developing: z.string(),
  immediate_hazard: z.string(),
  hazard_ends: z.string(),
  what_is_visible: z.string(),
  object_type: z.string(),
  hazard_classification: z.string(),
  why_hazard: z.string(),
  recommended_response: z.string(),
  frame_location: z.string(),
  video_presence: z.enum(['VISIBLE_IN_VIDEO', 'NOT_IN_VIDEO']),
  perception_comparison: z.object({
    human_driver_observation: z.string(),
    av_platform_handling: z.string(),
  }),
});

export type HazardEvent = z.infer<typeof HazardEventSchema>;

export const ScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  videoSrc: z.string().nullable(),
  events: z.array(HazardEventSchema),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export const ContentPipelineSchema = z.object({
  scenarios: z.array(ScenarioSchema),
});

export type ContentPipeline = z.infer<typeof ContentPipelineSchema>;
