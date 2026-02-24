# Homepage Redesign Implementation Plan

This plan outlines the changes required to align the current homepage ([src/pages/index.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/pages/index.astro) and its sub-components) with the provided design mockup.

## User Review Required
> [!IMPORTANT]
> - I will use CSS gradients and advanced styling to approximate the images in the `Features` cards (the data lines, code editor, and robot arm), as I don't have the raw image assets. You can easily replace these with `<img>` tags or `background-image` URLs later. Is this acceptable?
> - Let me know if you have specific HEX color codes you want to enforce, otherwise, I will extract them visually from the mockup (e.g., the specific vibrant blue for the primary brand color).

## Proposed Changes

### Landing Page Components
I will update the CSS and structure within the existing [.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/pages/index.astro) components.

#### [MODIFY] [Hero.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/components/landing/Hero.astro)
- **Typography & Colors**: Update the `Industrial Innovation` highlight to the vibrant blue seen in the mockup. Adjust heading font weights to match the clean, modern look.
- **Buttons**: Style "Our Projects" as a solid blue pill. Style "View Docs" as a white pill with a thin grey outline and dark text.
- **Features List**: Change the checkmark icons to thin blue outlined circles with blue ticks, matching the design.
- **Visual Grid (Right Card)**: Replace the current dark purple gradient with the soft lavender/pink gradient from the design. Update the floating "MODEL PERFORMANCE" card to match the exact padding, rounded corners, and the specific pink/purple icon shown in the mockup.

#### [MODIFY] [Features.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/components/landing/Features.astro)
- **Cards Layout**: Maintain the 3-column grid.
- **Card Images**: Replace the current solid color placeholders with CSS-based visual approximations of the mockup images (or structured placeholders ready for your actual images).
- **Icons**: Update the circular icon backgrounds. "Core Research" and "Open Source" get light blue backgrounds, "Industrial" gets a light pink background.
- **Buttons**: Update the action buttons ("Learn more", "View Repos", etc.) to be soft light-blue pills to match the design. Update text color and borders.

#### [MODIFY] [Stats.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/components/landing/Stats.astro)
- **Container**: Instead of the background color spanning the full viewport width, contain it within a rounded, soft light-grey/pink rectangle that sits in the center of the page.
- **Typography**: Change the stat numbers to the vibrant primary blue and adjust the label text styling to match the mockup.

#### [MODIFY] [Footer.astro](file:///Users/johntao/Documents/GitHub/ElexvxAI-Doc/src/components/landing/Footer.astro)
- **Background**: Update to the light grey color from the mockup.
- **Logo**: Update the SVG to the "flask" style logo shown in the mockup.
- **Layout Adjustments**: Tweak spacing and padding to accurately reflect the generous whitespace in the design.

## Verification Plan
### Browser Testing
- Run `npm run dev` and use the browser tool to inspect the homepage at `http://localhost:4321`.
- Capture a screenshot of the newly rendered page.
- Compare the rendered screenshot side-by-side with the mockup to ensure layout, colors, and typography are highly accurate.
- Test responsiveness by checking the layout at desktop and mobile widths.
