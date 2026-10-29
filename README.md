# Isla & Theo — Rose & Light

Original wedding invitation concept for InviLinks. Buildless HTML, CSS and JavaScript; `dist/` contains the self-contained site. Names and event details are illustrative.

## Current experience

- A rigid floral glass cover made of two 3D slabs. Each leaf has front and back faces, two solid brass side faces, brass top and bottom edges, and glass bevels. Desktop depth 32px; phone depth 24px. Perspective, reflected light sweeps, an affixed right-panel monogram seal, shadows and caustic overlays run through a 7.2-second opening. Reduced-motion mode opens immediately.
- After opening, the browser scrolls one normal document. No wheel interception, fixed scene controller, nested section scrollers or bottom page controls.
- Fuller wedding content restores the story, five-part schedule, the earlier illustrative Glasshouse Garden venue in Tagaytay, a four-photo gallery with lightbox, garden formal dress guide, five guest FAQs, RSVP and countdown.
- Calendar download matches ceremony at 3:30 PM PHT on 20 June 2027.
- The supplied “Wedding Entrance X Beautiful In White” piano cover by James Wong is reused from the previous wedding concept. Starts on the opening tap, fades up to 40%, loops and has a persistent play/pause control. Pauses while the tab is hidden.
- RSVP remains an explicitly labeled device-only demo, with save, reload, edit and clear. It does not send replies to a host or database.
- Keyboard and reduced-motion support, inert cover/main states, responsive design.

## Art and credits

Floral glass, conservatory and garden-formal fashion artwork were generated as original image assets with the built-in image-generation tool. Live HTML typography and original SVG seal are separate. The new attire prompt specified anatomically correct full adult figures in a sage floor-length gown and tailored sand suit.

Runtime image files: `dist/assets/floral-glass.webp`, `dist/assets/conservatory.webp`, `dist/assets/garden-formal.webp`. Original generated glass master remains in `dist/assets/floral-glass.png`.

Real photographs are locally bundled from the earlier wedding project. `dist/assets/photo-credits.json` retains photographer names, source URLs, license and usage mapping. On-page credits identify used sources. Cormorant Garamond and DM Sans are locally bundled under SIL OFL; license files are in `dist/assets/`.

## Running

Use `sites-preview start` on this checkout. No build or dependencies are required. `.openai/hosting.json` declares the same private Site identity and static directory.

## Scroll motion

`dist/motion.js` uses restrained editorial dissolves with small vertical offsets (15px desktop, 11px phone), grouped typography, slow row reveals, and fine timeline line drawing. Section opacity is fully restored before the heading reaches the reading area. There are no repeated glass portals, flash overlays, text blur, rotations or scale effects on text.

Photographic motion stays inside fixed overflow-hidden masks: a 4.5% image overscan and a maximum ±9px desktop / ±5px phone optical drift. The venue and attire illustrations stay stationary; foreground bouquets and background stems now move at separate, restrained scroll depths. RSVP controls have no entry transformation. Native document scrolling and reduced-motion support remain.

Validated in desktop and 390px phone frames: no overlays or horizontal overflow, crisp fully visible headings, correct image masks, and no nested scroller. All wedding content, opening glass, music and reply behavior are preserved.

## Picture frames and botanical surrounds

Six photographs (two story images and four gallery images) now sit in antique-gold mouldings with ivory mats, recessed inner edges and soft cast shadows. Photograph motion stays inside the inner viewport; the moulding stays rigid. The enlarged gallery view is framed as well. Frames use responsive sizes, including the arched story portrait and smaller angled keepsake.

Every chapter has decorative edge garlands in blush roses, ivory magnolias, baby's breath and olive/eucalyptus foliage. The transparent illustration in `dist/assets/rose-garland.webp` was created using the built-in image-generation tool as a slender naturalistic botanical watercolor side garland, then positioned along the invitation margins. It does not receive pointer events or appear in the accessibility tree.

Checked desktop and 390px phone layouts: six photo frames, four gallery frames, nine floral surrounds, no horizontal overflow, and working gallery opening/closing.

## Complete invitation suite refinements

1. A custom outlined I/T monogram within an original oval botanical crest, repeated in the header, hero, seal, closing and photograph plates. The favicon uses `dist/assets/crest.svg`. Initial outlines derive from the locally bundled OFL Pinyon Script font.
2. A cast-metal antique-gold opening medallion in `dist/assets/engraved-seal.webp`, with the original vector crest overlaid as an engraved face. The seal is centered across the seam and mounted to the right panel, moving with it during opening. Rigid glass animation and music-on-tap remain.
3. Three alternating compositions combine the trailing garland and a new transparent corner bouquet, `dist/assets/corner-bouquet.webp`. Phone placement keeps florals outside the names and introductory line.
4. Local, preloaded Pinyon Script for names and selected short accents, with license included. Body details retain the serif/sans typography.
5. A large licensed photograph in `dist/assets/cinematic.webp` reveals by gradually reducing its inset mask and optical zoom. Native scroll continues without pinning or scroll interception. Darkened sky supports readable cream text. Reduced motion shows the photograph fully.
6. The photo mouldings have four fine original engraved corners, a tiny crest plate and ivory mat texture. Arched portrait corners are adapted to their shape.

Validation: desktop and 390px phone layouts, 24 engraved frame corners and six crest plates, three flower compositions, cinematic reveal progress and loaded photograph, no horizontal overflow, completed 7.2s opening and confirmed music playback. Device-local RSVP remains a demo.

### New generated artwork

Built-in image-generation tool used for both assets. Final files are project-local WebP conversions preserving transparency.

Seal prompt: Use case: product-mockup. Asset for an ornate ivory blush and antique-gold wedding invitation. Create a single exquisite small circular antique-gold seal medallion, viewed perfectly front-on, isolated with true transparency. Physical cast brass medallion with substantial thickness visible around the rim, softly aged satin gold, finely engraved curling olive branches and tiny rose reliefs in an intricate outer wreath rim, very fine beaded concentric metal rings, subtle old-world craftsmanship, softly worn raised gold highlights, dark delicate engraving grooves. The broad circular inner face is BLANK smooth lightly brushed pale gold, reserved for separately coded initials, approximately central 55 percent of diameter, absolutely no letters or symbols in the center. The rim has restrained dimensional relief flowers and intertwined botanical filigree, not spikes, not jewelry gems, no diamonds, no crown. Sophisticated French wedding stationery heirloom, natural directional light from upper left, realistic metallic reflections and gentle self-shadow on the metal, fine macro texture. 1:1 square composition with ample transparent margin; no external drop shadow, no backing, no text, no hands, no mockup surface, no box, no background. Beautiful rich engraved detail, authentic metal rather than a flat vector or plastic coin.

Bouquet prompt: Use case: illustration-story. Original luxury wedding stationery botanical illustration asset, true transparent background. A graceful asymmetric L-shaped CORNER BOUQUET, widest and most lush at lower left, with fine airy stems extending gently UP the left edge and RIGHT across the bottom, leaving the upper right open. Three lush dusty blush garden roses of different sizes, two ivory magnolias, dainty baby's breath, small rose buds, soft olive and eucalyptus foliage, a few fine antique-gold engraved curling stems. Hand-painted naturalistic watercolor crossed with delicate botanical engraving, authentic nuanced petals, paper-like pigment only within artwork, refined restrained colors, no artificial glow. Not a wreath, not a straight garland, not a rectangle, no vase, no frame, no text, no people, no colored background. The bouquet should be beautifully composed and airy, detailed and dimensional, suitable for a bottom corner of an ivory floral wedding invitation. Keep all flowers intact with generous transparent margin around every leaf. Square composition. True alpha transparency, no rectangular white matte or external shadow.

The exposed 3D perimeter faces are opaque satin brass with continuous warm metallic shading and fine bevel highlights. The old green laminated stripes and green edge glow are removed. Glass artwork, slab geometry, animation timing and the invitation content are unchanged.

The opening monogram medallion is a child of the right glass panel, centered across the seam in the closed state. It stays affixed like a stamp with a close contact shadow and turns rigidly with that panel. Its independent floating/fading release animation is removed; it turns with the right panel.

Text entrances now use a gentle upward pop (22px desktop / 16px phone), a small scale settle and a soft fade, with short staggered groups. Headings, paragraphs, schedule text, venue details, attire labels, FAQ copy, RSVP introduction/form and closing wording enter as they appear. Observation starts after the cover opens and resets on replay. Keyboard focus reveals content immediately; reduced motion shows text without animation.

## Immersive material and narrative refinements

- The existing brass-edged glass has a pointer-responsive light source and a moving highlight on its metal edges. During opening, a soft botanical projection moves over the invitation below. The centered monogram stays mounted to the right leaf, gives a slight press response, and moves with it.
- The opening coordinates the unchanged 7.2-second glass motion with a 5-second music fade and a late, staggered welcome reveal. Replay clears both timers and resets the lighting and text entrances.
- Each botanical surround has two depth wrappers: distant stems and foreground bouquets. Their movements stay small and do not move wording or intercept scrolling.
- Three existing licensed photographs reveal inside one quiet composition through a short native CSS sticky interval. Scroll-controlled masks finish while the frame stays fully visible; the names and date stay steady. Reduced motion presents one static photograph in normal flow.
- The conservatory illustration has three keyboard-accessible, touch-friendly tabs for the garden ceremony, conservatory reception, and arrival information. All spaces and event details remain explicitly illustrative.
- Gallery photo mouldings respond subtly to pointer position; the album uses a stable framed stage, directional fades, a photo counter, arrow-key/button controls and horizontal touch swipes. Caption selection targets the actual caption, excluding the decorative frame monogram.
- RSVP and farewell backgrounds gradually warm toward the ending. Text contrast, native scrolling, keyboard access, and reduced-motion support remain.

No new images, dependencies or third-party services were added. The additional scripts and stylesheet are locally hosted. RSVP remains a device-only sample and sends nothing.

## Scroll timing and falling flowers refinement

The photo chapter uses a short native CSS sticky interval. Two brief, scroll-scrubbed masked reveals finish at 36% and 74% of that interval, leaving a final hold before the photograph moves out. A single fixed names/date treatment replaces stacked changing captions, duplicate notes, step indicators, inset animation and zoom. There is no wheel interception or nested scroll. Reduced motion uses one static photograph in normal flow.

Ten lightweight original CSS/SVG blossoms and rose petals (six on phones) fall along the outside margins in response to scroll position. They never capture input, stop when scroll position stops, hide over dialogs and before opening, and are disabled with reduced motion. No new image downloads or dependencies.

The illustrated venue pins now show actual schedule times instead of location ordinals: arrival 3:00 PM, ceremony 3:30 PM, reception 5:30 PM. Detail panels use the same times.

Photographic changes use a clean horizontal mask, with no double exposure or overlapping captions while a user pauses mid-transition.

Venue detail wording now uses direct guest-facing headings, a chronological reception description and a concise arrival note. Schedule times are unchanged. Falling flowers use a deeper dusty-rose palette, defined petal edges, slightly larger silhouettes and a soft contact shadow so they remain visible against ivory paper.

Fixed the mobile venue detail layout: an obsolete two-column rule reserved a 29px ordinal column after the ordinal was removed, placing all text into that narrow column. Panels now use full-width block flow at every breakpoint, with one visible tab panel at a time.
