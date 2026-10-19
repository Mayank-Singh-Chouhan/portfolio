---
name: Mayank Singh Chouhan, Portfolio
description: A plaster-cast gallery in ultramarine and lemon, where each piece of work hangs beside a real marble, printed in two inks and lit by the cursor.
colors:
  cobalt: "#1f2bd1"
  cobalt-deep: "#141c92"
  lemon: "#f2ec8b"
  vermilion: "#ee4a22"
  plaster: "#e4e3df"
  ink: "#0e0b24"
typography:
  display:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bodoni Moda Variable, Bodoni 72, Didot, serif"
    fontSize: "clamp(1.3rem, 2.6vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 125"
rounded:
  none: "0"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  room-y: "clamp(4rem, 10vw, 8rem)"
  wall-gap: "1.4rem"
  grid-gap: "clamp(1rem, 2.5vw, 2rem)"
components:
  button-primary:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.cobalt-deep}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.ink}"
  room-blue:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.lemon}"
    padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3.5rem)"
  room-lemon:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.cobalt-deep}"
  room-red:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.ink}"
  room-plaster:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.cobalt-deep}"
  wall-label:
    textColor: "{colors.lemon}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem 1.15rem"
  desk-row-hover:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.cobalt-deep}"
    padding: "1.1rem 1rem"
---

# Design System: Mayank Singh Chouhan, Portfolio

## Overview

**Creative North Star: "The Plaster-Cast Gallery"**

The page is a museum hall walked top to bottom. Each section is a room painted a single flat colour, and each piece of work is hung as a catalogued exhibit beside a real classical sculpture. The ground is drenched ultramarine with lemon ink; one room turns vermilion, one turns lemon, one turns plaster grey, so the walk has rhythm without a single gradient. Type does the monument work: Bodoni italic carved large, then small wide-tracked Archivo caps as wall labels.

The photographs are real CC0 marble, printed as a cobalt-to-lemon duotone so the stone reads as screenprint. A light follows the cursor (and drifts on its own on touch or when idle) and burns a soft hole through the print, so the true colour of the marble shows through. That is the signature; everything else stays flat, hairline-ruled, and unornamented.

**Key Characteristics:**
- One flat colour per room, full-bleed; colour changes between rooms, never within one.
- Two faces only: Bodoni Moda italic for names and titles, Archivo wide caps for labels, Archivo regular for reading.
- Hairline (1px) frames and rules instead of cards, shadows, or fills.
- Square corners everywhere; no radius exists in the system.
- Sculpture photographs are always duotone with a pointer-driven reveal.

### Image provenance

Rasters in `public/img` are CC0 (public domain dedication) photographs from Wikimedia Commons, credited with links in the page footer (`.credits`):
- `antinous-bust.jpg`: Antinous, National Archaeological Museum, Athens (hall).
- `laocoon.jpg`: Laocoön and His Sons, Vatican Museums (Botsync exhibit).
- `nike.jpg`: Winged Victory of Samothrace, Louvre (Forescribe exhibit).
- `venus.jpg`: Venus de Milo, Louvre (Foundations exhibit).
New sculpture imagery must be CC0 or equivalently cleared and credited in the same footer line.

## Colors

A saturated, flat, five-pigment palette plus one near-black: ultramarine ground, lemon ink, vermilion as a room, plaster as relief.

### Primary
- **Gallery Ultramarine** (`{colors.cobalt}`): the page ground, the hero, the nav, the contact room. Lemon text on it is the default reading pair.
- **Lemon Ink** (`{colors.lemon}`): all text and rules on cobalt, the primary button fill, scrollbar thumb, and the lemon room's background.

### Secondary
- **Vermilion Wall** (`{colors.vermilion}`): the full-bleed Foundations room, the button hover fill, and text selection. Always paired with ink text, never lemon.

### Neutral
- **Deep Ultramarine** (`{colors.cobalt-deep}`): text on lemon and plaster, the button label, scrollbar track, and the sculpture backing while images load.
- **Plaster Grey** (`{colors.plaster}`): the single quiet room for the catalogue of materials.
- **Night Ink** (`{colors.ink}`): text on vermilion, selection text, the sculpture backing in the red room.

### Duotone (SVG filter `#duotone`, defined in App.tsx)
Luminance is mapped to two inks: shadows to roughly rgb(20, 27, 166) (a slightly brighter ultramarine than `cobalt-deep`), highlights to rgb(242, 236, 139) (lemon). A linear contrast step (slope 1.75, intercept -0.3) runs first. The filter is the one place a colour is defined outside the CSS tokens; keep it in sync with the palette.

### Named Rules
**The One Colour Per Room Rule.** A room has exactly one background and one ink pair: cobalt/lemon, lemon/cobalt-deep, vermilion/ink, plaster/cobalt-deep. Never mix pairs inside a room and never put lemon text on vermilion.

**The Two-Ink Photograph Rule.** Sculpture is shown only as the cobalt-to-lemon duotone, with true colour visible only under the moving light. No untreated colour photographs outside the light.

## Typography

**Display Font:** Bodoni Moda Variable (with Bodoni 72, Didot, serif), italic, weight 500
**Body Font:** Archivo Variable (with Helvetica Neue, Arial, sans-serif)
**Label Font:** Archivo Variable at width axis 125, weight 600, uppercase

**Character:** A high-contrast Didone italic set tight and large against a wide, tracked grotesque, like carved inscription over a museum placard. Numerals are tabular throughout.

### Hierarchy
- **Display** (500 italic, `clamp(3.4rem, 10.5vw, 6rem)`, 0.9, -0.035em): the hero name and the contact heading, set in staggered lines (second line indented 0.9em, third 0.2em in the hero).
- **Headline** (500 italic, `clamp(2.6rem, 5.6vw, 4.5rem)`, 0.95, -0.03em): exhibit and section titles (h2).
- **Title** (500 italic, `clamp(1.3rem, 2.6vw, 2rem)`, 1.1, -0.02em): contact values on the desk rows.
- **Body** (400, 17px root, 1.6; lede up to `clamp(1.1rem, 1.6vw, 1.3rem)` at 1.5): wall-label paragraphs capped near 34rem; list items 1rem at 1.5.
- **Label** (600, 0.8rem, +0.14em, uppercase, wdth 125, 1.5): nav, plaques, captions, button text, definition terms, footer credits.

### Named Rules
**The Two Voices Rule.** Names and titles are Bodoni italic; everything that catalogues (dates, roles, captions, terms) is Archivo wide caps. Nothing else.

## Layout

A single scroll of full-bleed rooms. Each room is padded `clamp(4rem, 10vw, 8rem)` vertically and the shared gutter `clamp(1rem, 4vw, 3.5rem)` horizontally, with content held to a 78rem centred measure on a 12-column grid (gap `clamp(1rem, 2.5vw, 2rem)`).

Exhibits pair a figure and a wall label: figure on columns 1-7 and wall on 8-12; the lemon room flips them (figure 6-12, wall 1-5); the red room narrows the figure to columns 2-6. The materials room splits a title (1-5) from a two-column ruled catalogue (6-12). The contact room is a full-width display heading over ruled rows (1-8) with a visiting note (9-12).

The hero is a two-column split: copy left, a full-height bust bleeding off the right edge. The name never overlaps the image. Below 52rem everything stacks to one column, the bust moves above the copy at 40svh, the plaque and hint are hidden, the nav name is hidden and nav links spread across the width, and the narrow figure widens to 72%.

Spacing is rhythmic rather than tokenised: 0.35 to 1.6rem inside labels, 2 to 3rem between blocks, room-sized padding between rooms.

## Elevation & Depth

Flat. There are no shadows, gradients, or blurs. Depth comes from three things: full-bleed colour changes between rooms, hairline frames (1px) around labels, and the cursor light revealing true colour through the duotone print. The nav is sticky with a solid cobalt fill and a 1px lemon hairline at 35% opacity.

### Named Rules
**The Hairline Only Rule.** Separation is a 1px rule in the room's own ink (or lemon at 35% for the nav and footer). No shadows, no filled panels, no cards.

## Shapes

Square. Border radius is zero everywhere. Forms are rectangles defined by 1px strokes: wall labels, the hero plaque, ruled catalogue cells, and the sculpture rim (a 1px lemon-at-45% border, `currentColor` in the lemon and red rooms, removed on the hero bust). Photographs are cropped to their native ratios; the hero image is a full-height, edge-bleeding crop. The only drawn icon is a 1.6-stroke line arrow in inline SVG.

## Components

### Buttons
- **Shape:** Square, no radius, label-style caps.
- **Primary** (`.btn`): lemon fill, deep-ultramarine text, `0.95rem 1.4rem` padding, trailing arrow.
- **Hover:** fill flips to vermilion with ink text and the arrow gap widens from 0.7rem to 1.1rem (0.4s, expo-out `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Secondary:** plain caps text links with underline offset 0.35em, no fill.
- **Focus:** a 2px `currentColor` outline offset 4px, on every interactive element.

### Navigation
Sticky bar: name in caps at left, four room links (Hall, Work, Skills, Contact) at right. Links are caps buttons with a 1px underline that draws in from the left on hover or focus (0.5s). Smooth scroll to the room, instant when reduced motion is requested.

### Sculpture (signature component)
A figure holding two stacked copies of one photograph: the true-colour image beneath, and a duotone-filtered copy above it with a radial mask that is transparent at the centre and opaque at the edge. The mask centre follows the pointer through `--lx` / `--ly` with eased smoothing (0.08 per frame); after 2.6s of no pointer, or on touch, it drifts on a slow sine path around a per-image rest point. Light radius `clamp(110px, 20vw, 250px)` (the small variant `clamp(80px, 11vw, 160px)` is used on the hero bust). The animation pauses off-screen, and with reduced motion the light sits still at its rest point. Media enters with a top-down clip-path wipe (1.3s).

### Wall Label
A 1px `currentColor` frame holding a caps date line, a paragraph, and a ruled definition list (caps terms over short descriptions). The title sits above the frame, not inside it. Text enters with a 0.9s fade and 18px rise.

### Caption
Caps line directly under a figure, prefixed "Shown with:" and naming the sculpture and museum.

### Materials Catalogue
A ruled two-column grid of caps headings over plain lists; the second column is separated by a 1px vertical rule. One column below 52rem.

### Desk Rows
Contact links as ruled rows: caps term, Bodoni italic value, arrow. On hover or focus the row fills lemon with deep-ultramarine text and gains 1rem horizontal inset (0.4s, 0.5s for padding).

## Do's and Don'ts

### Do:
- **Do** give each room one flat background and its matching ink pair from the palette.
- **Do** set names and titles in Bodoni Moda italic and catalogue text in Archivo wide caps (0.8rem, +0.14em).
- **Do** frame content with 1px rules in the room's ink and keep every corner square.
- **Do** keep the headline clear of photographs; lemon text on duotone mid-tones fails contrast.
- **Do** honour reduced motion: reveals show immediately, scroll is instant, the cursor light rests still.
- **Do** credit every new photograph in the footer with source and licence.

### Don't:
- **Don't** add shadows, gradients, rounded corners, or filled cards.
- **Don't** show sculpture in untreated colour outside the cursor light.
- **Don't** put lemon text on vermilion or lemon text over a photograph.
- **Don't** introduce a third typeface or use Bodoni for small caps labels.
- **Don't** invent claims, metrics, or imagery for exhibits; every exhibit traces to the resume.

## Known drift (not canonized)

- `.plaque .mark` (vermilion text on a lemon chip, about 3:1) is styled in CSS but unused in the build; it fails AA and is not part of the system.
- The materials `h3` re-declares font family, style, and tracking inline in App.tsx instead of relying on `.caps`; the visual result matches the label style, the duplication is drift.
- Exact hex values inside the SVG duotone filter are hand-converted floats, not tokens.
