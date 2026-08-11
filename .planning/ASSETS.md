# Asset Procurement Manifest — Gamified Training Module

> **RFP NEUTRALITY**: This demo is for an RFP. The module, code, and all bundled assets must NOT reference Waymo (names, logos, trademarked designs, branded footage). Everything below is vendor-neutral; a branding config layer allows client identity to be applied post-award.

Status: ✅ in-repo · 🛒 to-procure · ⚙ code-generated · ▶ video slot.

## 1. Branding (neutral working brand)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Working wordmark | Neutral text wordmark (e.g., "AV Context Trainer") — placeholder until award | In-house | — | ⚙ |
| Favicon / app icon | 32/192/512px, neutral AV motif (steering/lidar ring) | In-house SVG | — | ⚙ |
| "Training for the Autonomous Vehicle industry" lockup | Landing screen badge/text | In-house | — | ⚙ |
| Brand color tokens | #F5F7FA, #1E2340, #0080FF, #00E59B (generic palette, not trademarked) | Design tokens | — | ✅ |
| Branding config layer | JSON/config so client name+logo swap in post-award | In-house code | — | ⚙ |
| Client wordmark/logo (post-award only) | Do NOT bundle in RFP demo | Client | After award | 🛒 post-RFP |

## 2. Vehicles (generic AV, no real branded vehicles)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Hero car — isometric white generic AV | 3D render or R3F model, roof lidar puck, no OEM badges | Procure unbranded model or commission | Must be unbranded | 🛒 |
| Side-view generic AV | Illustration/render for Lesson media | Procure or in-house | Unbranded | 🛒 |
| Top-down BEV car sprite | Simple white car silhouette for BEV console | In-house SVG | — | ⚙ |

## 3. World Imagery (Phoenix + San Francisco)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Phoenix scene stills (2–4) | Desert streets, intersections, school zones | Licensed stock (no vendor branding) | Stock license | 🛒 |
| SF scene stills (2–4) | Urban streets, crosswalks, hills | Licensed stock (no vendor branding) | Stock license | 🛒 |
| Circular-cropped timeline photos | Timeline motif for lesson history section | Licensed stock | Stock license | 🛒 |
| Isometric 3D city scene | Light-gray city + gradient route path (hero/landing) | R3F procedural or baked illustration | — | ⚙ (or 🛒 if baked) |

## 4. Video — placeholder slots for RFP demo
All video surfaces ship as styled placeholder slots (poster + play affordance) wired to a video config. Actual footage only if licensed/client-approved.
| Slot | Use | Content policy | Status |
|---|---|---|---|
| Core AV explainer (≈3 min) | Lesson core video | Licensed AV-industry footage or client-approved post-award | ▶ 🛒 |
| World scenario clips (Phoenix/SF) | World sections | Licensed/generic AV dashcam-style footage, unbranded | ▶ 🛒 |
| AV-rules / safety methodology clip | Lesson AV-rules section | Licensed or post-award client video | ▶ 🛒 |
| Scenario challenge clips (3–6) | Zone scenario intros/replays | Simulated renders (code-gen) or licensed footage | ⚙/🛒 |
| Post-award reference embeds | waymo.com channel videos (e.g., "Sense, Solve, and Go", reference-driver, safe-to-deploy) | ONLY after award + client approval — keep URLs in this manifest, not in code | 🛒 post-RFP |

## 5. Sensor Visualization (Zone console)
| Asset | Spec | Source | Status |
|---|---|---|---|
| BEV top-down renderer | Magenta bounding boxes over navy canvas | R3F/canvas, code-generated | ⚙ |
| Lidar-style point cloud | Blue/purple points, road surface | R3F shader (reuse prior repo synthetic lidar work) | ⚙ |
| Camera strip frames | Simulated camera feeds per scenario | Rendered frames from scenario data or licensed stills | ⚙/🛒 |
| Sensor confidence indicators | Gauge/pill UI components | In-house components | ⚙ |

## 6. Icons (thin-stroke, reference-site style)
| Asset | Use | Source | Status |
|---|---|---|---|
| Nav icons (Lesson, Zone, Scorecard) | Shell nav | Custom SVG set | ⚙ |
| Checkpoint badges (route progress) | Gamification | Custom SVG, circular check motif | ⚙ |
| Difficulty tier icons (Foundation/Proficient/Advanced) | Zone tier selector | Custom SVG set | ⚙ |
| Scorecard category icons (4 categories) | Scorecard snapshot | Custom SVG set | ⚙ |
| Circular outline play/prev/next buttons | Media controls | Custom SVG | ⚙ |

## 7. Fonts
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Display face (rounded geometric sans) | Reference-site headline style | Open-licensed rounded grotesk (e.g., via Google Fonts) | Must be webfont-licensed | 🛒 (decide in plan phase) |
| Body face | Clean sans for UI/body | Pair with display choice | Webfont license | 🛒 |

## 8. Audio
| Asset | Spec | Source | Status |
|---|---|---|---|
| UI feedback sounds (optional) | Subtle clicks/success for challenges | CC0 library | 🛒 optional — decide in plan phase |
| Ambient/narration | None planned v1 | — | Out of scope |

## Procurement Actions (owner: user unless ⚙)
1. Choose neutral working brand name + approve placeholder wordmark.
2. Procure unbranded generic AV renders (isometric hero + side view).
3. License Phoenix/SF street imagery (stock, no vendor branding).
4. Source/license demo footage for video slots OR approve simulated-render placeholders.
5. Pick open-licensed display + body webfonts.
6. Optional: UI sound pack decision.
7. Post-award only: client branding kit + approved official video embeds.

*Last updated: 2026-08-11 — RFP neutrality constraint applied*
