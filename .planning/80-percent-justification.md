# Justification for 80% Pass Threshold (Hazard Perception)

**Requirement:** ASSESS-03 (Pass threshold at ~80% composite score with documented justification delivered alongside implementation)

## Rationale for 80%

In the context of Autonomous Vehicle (AV) Operations and Hazard Perception, the standard for acceptable performance is stringent. Operators are expected to identify developing hazards with high accuracy and speed. However, requiring 100% perfection in a simulated environment can lead to high failure rates due to hardware differences (e.g., mouse vs trackpad reaction times) and minor UI misclicks, which do not strictly correlate to an operator's real-world awareness.

The ~80% threshold provides a balanced passing gate because:
1. **Margin of Error:** It allows for 1-2 missed hazards or a handful of false clicks without failing an otherwise proficient operator.
2. **Pedagogical Value:** A learner who scores 80-99% will still be presented with the `ReviewMistakes` screen, giving them the chance to learn from the missed scenarios without the punitive friction of completely restarting the lesson.
3. **Composite Scoring:** The score isn't purely accuracy-based; it is a composite of Detection, Reaction Speed (penalty applied if >1.5s), and False Clicks (-5% per click). An 80% threshold ensures that an operator cannot pass by haphazardly clicking everywhere (false click penalty) nor by reacting extremely slowly, even if they eventually detect all hazards.

## Scorecard Category Mapping

The composite score maps into four specific technical scorecard categories. For the passing operator (≥80%):
- **3D Spatial Rotation:** Base score + tier modifier.
- **Telemetry Interpretation:** Base score - penalty for lower tiers, meaning only Advanced tier operators score high here.
- **Occlusion Reasoning:** Heavily tied to reaction time.
- **Complex Decision-Making:** 1:1 mapping with the final composite score.

This ~80% threshold has been hardcoded into `src/lib/scoring.ts` and will gate the SCORM `lesson_status` completion event sent to Reach 360.
