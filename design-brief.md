# Design Brief — Nabeel Keblawi Portfolio

## Aesthetic
- Light mode only
- Professional, clean, minimal
- No rounded-everything, no playful gradients — serious but not cold
- Generous whitespace; let content breathe
- Reference: jwtechdata.com (white background, professional blue, interactive feel)

## Color Palette

| Role              | Name           | Hex       | Tailwind class   |
|-------------------|----------------|-----------|------------------|
| Primary           | Navy           | #1B3A6B   | `bg-navy`        |
| Primary dark      | Navy Dark      | #142D54   | `bg-navy-dark`   |
| Accent            | Blue Accent    | #4A90D9   | `bg-blue-accent` |
| Accent light      | Blue Light     | #E8F1FB   | `bg-blue-light`  |
| Page background   | White          | #FFFFFF   | `bg-white`       |
| Surface / cards   | Off White      | #F8FAFC   | `bg-surface`     |
| Text primary      | Dark Slate     | #1E293B   | `text-text`      |
| Text secondary    | Slate          | #64748B   | `text-text-secondary` |
| Border / divider  | Light Gray     | #E2E8F0   | `border-border`  |

## Typography
- Headings: Inter or similar clean sans-serif, medium-to-bold weight
- Body: Inter, 16px base, relaxed line height (1.75)
- No serif fonts
- Hierarchy: H1 large/bold → H2 medium → body regular

## Layout
- Max content width: 800px (centered)
- Generous vertical padding between sections
- Left-aligned text (not centered walls of copy)
- Simple top nav: name/logo left, links right
- No sidebars

## Interactive Elements
- Links and buttons use `blue-accent` (#4A90D9)
- Hover states: navy darkens slightly, links get underline or color shift
- Subtle transitions (150–200ms) — nothing flashy
- No heavy animations or scroll effects

## What to Avoid
- Dark mode
- Rounded pill buttons
- Gradient backgrounds
- Drop shadows on everything
- Centered hero text blocks that feel like landing page templates
- Clutter — if in doubt, remove it
