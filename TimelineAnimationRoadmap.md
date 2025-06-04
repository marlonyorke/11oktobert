# Timeline Animation Roadmap for Wedding Website (Section 4)

This document outlines the step-by-step plan for implementing an immersive, fixed-scrolling timeline section with dynamic background and time-synchronized elements for the wedding website. Each step's progress will be tracked with a green checkmark (✅) when completed. Updates and changes will be documented as we progress.

## Definition of Done (DoD)

The **Definition of Done** establishes the criteria that must be met for a step or phase to be considered complete. For each roadmap phase, specific DoD criteria and tests are provided to validate completion. Generally, a step is done when:
- All specified tasks are implemented as described.
- The feature or component functions as intended in the local development environment.
- Any code changes are documented and integrated without breaking existing functionality.
- Tests or verification steps (manual or automated) confirm the expected behavior.

## Roadmap Phases

### 1. Setup and Dependencies
- [✅] Install GSAP and ScrollTrigger: Use npm to install `gsap` and `@gsap/shockingly` (which includes ScrollTrigger) to enable advanced animations and pinning.
- [✅] Verify Installation: Confirm the packages are correctly added to `package.json`.

**Status**: Completed on 2025-05-02.
**Updates**: GSAP version 3.13.0 was successfully installed using `npm install gsap`. This version includes ScrollTrigger by default. Installation was verified with `npm list gsap`. Note: An initial attempt to install `@gsap/shockingly` failed due to an incorrect package name, but the core `gsap` package suffices for our needs.

**Definition of Done**:
- GSAP package is installed and listed in `package.json` with a version that includes ScrollTrigger.
- Command `npm list gsap` returns a valid version without errors.

**Tests to Validate DoD**:
- Run `npm list gsap` to confirm the package and version are correctly installed.
- Import GSAP and ScrollTrigger in a test file or component to ensure no import errors occur.

### 2. Component Structure
- [✅] Create TimelineSection.js: Develop a new React component for the timeline section to keep the codebase organized.
- [✅] Add to App.js: Include this new component in the main application structure, ensuring it fits logically after existing sections.

**Status**: Completed on 2025-05-02.
**Updates**: Created `TimelineSection.js` in `src/components` with a basic React component structure, including a styled section and a title 'Tijdsplanning van de Dag' as a placeholder. Updated `App.js` to import `TimelineSection` and render `<TimelineSection />` after `<LocationSection />`. No errors observed in the development environment after these changes.

**Definition of Done**:
- `TimelineSection.js` file exists in the `src/components` directory with basic React component structure.
- `App.js` includes an import for `TimelineSection` and renders `<TimelineSection />` in the correct order among other sections.
- No errors or warnings are generated in the console when the app is run with the new component.

**Tests to Validate DoD**:
- Check if `TimelineSection.js` file is created and contains a valid React component export.
- Verify `App.js` renders `<TimelineSection />` after `<LocationSection />` or as per agreed order.
- Run `npm start` and confirm the app loads without errors related to the new component.

### 3. Basic Layout and Styling
- [✅] Define Section Container: Style the section with a fixed height and width to cover the viewport, preparing it for pinning.
- [✅] Background Layers: Set up initial CSS for sky (gradient), field, and celestial objects (sun/moon) as separate styled components.

**Status**: Completed on 2025-05-02.
**Updates**: Updated `TimelineSection.js` to style the section container with `height: 100vh` and `width: 100vw` for full viewport coverage, set `position: relative` and `overflow: hidden` for future pinning. Added styled components for background layers: `Sky` with a blue gradient (70% height), `Field` with green color (30% height), `Sun` as a yellow circular element, and `Moon` as a grey circular element (initially hidden). The title 'Tijdsplanning van de Dag' is positioned with a higher z-index to stay above backgrounds. Visual elements render correctly in the browser with no styling errors observed.

**Definition of Done**:
- The `TimelineSection` component has a styled container with viewport-filling dimensions (e.g., `height: 100vh`, `width: 100vw`).
- Background elements (sky with gradient, field, sun/moon) are defined as styled components or elements within `TimelineSection.js` with initial static styling.
- The section renders with visible background layers when viewed in the browser.

**Tests to Validate DoD**:
- Inspect the rendered `TimelineSection` in the browser to confirm the container fills the viewport.
- Verify that sky, field, and sun/moon elements are visible with initial styling (even if static).
- Check browser developer tools for any styling errors or overlaps in the layout.

### 4. ScrollTrigger Implementation
- [✅] Pinning the Section: Use GSAP ScrollTrigger to pin the section in place over a defined scroll distance, ensuring it stays fixed while scrolling.
- [✅] Scroll Progress Tracking: Configure ScrollTrigger to track scroll progress, which will drive all animations (e.g., sky color change, sun movement).

**Status**: Completed on 2025-05-02.
**Updates**: Updated `TimelineSection.js` to import GSAP and ScrollTrigger, registered the plugin, and implemented `ScrollTrigger.create` to pin the section from `top top` to a scroll distance of 5x viewport height (`end: "+=500%"`). Added scroll progress tracking with console logging to verify progress values update from 0 to 1 during scrolling. Cleanup function added to kill triggers on unmount. The section remains fixed in the viewport for the specified scroll range, and progress logs are visible in browser dev tools.

**Definition of Done**:
- ScrollTrigger is imported and initialized in `TimelineSection.js` to pin the section for a specified scroll distance (e.g., equivalent to 500vh).
- Scroll progress is tracked and logged (e.g., via console) to confirm it updates from 0 to 1 over the pinned scroll range.
- The section remains fixed in the viewport while scrolling over the defined range.

**Tests to Validate DoD**:
- Scroll through the website and confirm the timeline section stays fixed for the intended duration without page movement.
- Add a temporary console log for ScrollTrigger progress and verify in browser dev tools that progress values change from 0 to 1 during scrolling.
- Test on multiple screen sizes to ensure pinning works consistently.

### 5. Animation Development
- [✅] Sky Transition: Implement CSS gradient animations for the sky, tied to scroll progress, to transition from afternoon blue to sunset to night.
- [✅] Sun/Moon Movement: Animate the sun along an arc path based on scroll position, transitioning to a moon at night.
- [✅] Text and Event Changes: Create animations for each timeline event's text to fade or slide in/out at specific scroll points, matching the time of day.
- [✅] Atmospheric Elements: Add subtle animations for clouds, stars, and venue elements (e.g., lanterns at night), with opacity and position changes.

**Status**: Completed on 2025-05-02.
**Updates**: Updated `TimelineSection.js` to implement animations using GSAP and ScrollTrigger. Sky gradient changes based on scroll progress (afternoon blue to sunset orange to night black). Sun moves along an arc path and fades out, replaced by the moon during night segments. Event texts for timeline segments (e.g., '15:30 - Arrival & Welcome') fade in/out at specific scroll ranges. Added clouds (visible during day, fade at night) and stars (appear at night) with random positioning and opacity animations. All visual transitions are tied to scroll progress and render smoothly in the browser.

**Definition of Done**:
- Sky background gradient changes color based on scroll progress (e.g., blue to orange to dark blue).
- Sun moves along an arc and transitions to moon at night scroll points, with visibility toggling appropriately.
- Text for each timeline event (e.g., 'Arrival & Welcome') appears and disappears at correct scroll positions.
- Atmospheric elements like clouds and stars animate (e.g., opacity or position shifts) at relevant scroll points.

**Tests to Validate DoD**:
- Scroll through the section and visually confirm sky color transitions match described time periods (afternoon to night).
- Verify sun moves in an arc and switches to moon during 'Party' or 'Farewell' segments.
- Check that each event’s text displays only during its corresponding scroll range and animates as expected.
- Observe atmospheric elements (clouds during day, stars at night) changing with scroll position.

### 6. Time-Synchronized Visuals
- [ ] Segment Scroll Ranges: Divide the scroll distance into segments corresponding to each time period (e.g., 15:30-16:00 for Arrival), mapping specific visual states as described (lighting, sky state, etc.).
- [ ] Parallax Effects: Implement parallax for depth, with different movement speeds for background and foreground elements.

**Status**: Not started.
**Updates**: None yet.

**Definition of Done**:
- Scroll distance is segmented into ranges for each time period (e.g., 15:30-16:00 takes 10% of total scroll), with visuals matching descriptions for each event.
- Parallax effect is implemented, with background elements (e.g., sky, distant clouds) moving slower than foreground elements (e.g., venue details).
- Transitions between time segments feel smooth and aligned with timeline events.

**Tests to Validate DoD**:
- Scroll slowly and confirm visual changes (sky, lighting) align with each time period’s description at expected scroll positions.
- Verify parallax by checking if background layers move at different speeds compared to foreground during scroll.
- Test segment transitions to ensure no abrupt visual jumps occur between time periods.

### 7. Lighting and Shadows
- [ ] Dynamic Lighting: Adjust the overall brightness and color tone based on the sun’s position to simulate realistic lighting.
- [ ] Shadow Animation: Add subtle shadow effects that lengthen or shift direction as the sun moves.

**Status**: Not started.
**Updates**: None yet.

**Definition of Done**:
- Overall brightness and color tone of the section adjust with sun position (e.g., warm golden light at golden hour, cool blue at night).
- Shadows of elements (if applicable, e.g., venue or text) change length or direction based on sun position.
- Lighting effects enhance the time-of-day atmosphere without overpowering other visuals.

**Tests to Validate DoD**:
- Scroll to different time periods and confirm brightness/tone matches (e.g., bright at 15:30, dim at 00:15).
- Visually check shadow effects (if implemented) to ensure they elongate or shift realistically with sun movement.
- Verify lighting doesn’t obscure text or key elements by inspecting readability at various scroll points.

### 8. Responsive Design and Optimization
- [ ] Mobile Adaptation: Ensure the visual scale adjusts for smaller screens while maintaining the full day-to-night experience.
- [ ] Performance Tweaks: Simplify animations for mobile devices and older browsers, possibly with fallback static visuals if needed.

**Status**: Not started.
**Updates**: None yet.

**Definition of Done**:
- Timeline section renders correctly on mobile devices, with scaled visuals and readable text while preserving day-to-night transitions.
- Performance is optimized, with reduced animation complexity on mobile or older browsers (e.g., fewer simultaneous animations).
- Fallback visuals or simplified effects display if full animations are unsupported.

**Tests to Validate DoD**:
- Test on mobile devices or browser dev tools’ mobile view to confirm visuals scale and text remains legible.
- Measure load time and scroll smoothness on a low-end device or throttled network; confirm no significant lag.
- Use an older browser version (if available) to verify fallback visuals or simplified animations work as intended.

### 9. Testing and Refinement
- [ ] Cross-Browser Testing: Check the animation performance and appearance across different browsers and devices.
- [ ] User Feedback: Adjust timing, colors, or element visibility based on feedback or test user input for optimal storytelling impact.

**Status**: Not started.
**Updates**: None yet.

**Definition of Done**:
- Section functions consistently across major browsers (Chrome, Firefox, Safari, Edge) with no major visual or performance discrepancies.
- Feedback from user testing (if conducted) or client input is incorporated, with adjustments made to timing, colors, or visibility for better user experience.
- All reported bugs or issues related to animations or rendering are resolved.

**Tests to Validate DoD**:
- Open the website in Chrome, Firefox, Safari, and Edge to confirm consistent rendering and animation behavior.
- Scroll through the section on each browser to verify pinning and transitions work without glitches.
- Collect feedback (if applicable) and confirm changes based on feedback are visible and effective.

### 10. Final Integration
- [ ] Polish Transitions: Smooth out any abrupt changes in animations for a seamless experience.
- [ ] Deploy and Review: Ensure the section integrates well with the rest of the site and review the final effect in the live environment.

**Status**: Not started.
**Updates**: None yet.

**Definition of Done**:
- All animations and visual transitions are smooth, with no jarring or abrupt changes during scrolling.
- The timeline section integrates seamlessly with other website sections, maintaining consistent styling and flow.
- The feature works as expected in the deployed (live) environment, with no deployment-specific issues.

**Tests to Validate DoD**:
- Scroll through the entire section to confirm all transitions (sky, text, elements) are fluid and seamless.
- Verify the section’s styling and behavior align with adjacent sections (no visual clashes or overlaps).
- Deploy to a staging or live server and test the full website to ensure the timeline section performs as in development.

## Discussion on Order of Steps

The order of steps outlined above is designed to build the feature logically:
- Start with setup and dependencies to ensure we have the necessary tools (GSAP/ScrollTrigger).
- Create the component structure to integrate with the existing React app.
- Build the basic layout before adding complex animations.
- Implement ScrollTrigger early to establish the fixed-scrolling mechanic.
- Develop animations and visual elements in layers (sky, sun, text, etc.) for manageable progress.
- Focus on responsiveness and testing towards the end to refine the feature.
- Finalize with polishing and deployment.

**Question**: Do you agree with this sequence, or do you think certain steps (e.g., animations or responsive design) should be prioritized earlier? Please let me know if you'd like to rearrange any phases.

## Tracking Progress and Changes

As we complete each step, I will update this Markdown file by:
- Marking completed tasks with a green checkmark (✅) in the checklist.
- Adding detailed updates under the respective step’s **Updates** section to document what was done, any code changes, and relevant decisions or feedback.

This will allow you to see the evolution of the project step by step. I’ll ensure the file is updated after each significant action or discussion.

**Next Steps**: Let’s discuss if the order of steps is suitable. Once confirmed, I can start with Step 6 (Time-Synchronized Visuals) and update this roadmap accordingly.
