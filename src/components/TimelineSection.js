import React, { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.section4 || '#d9c1a3'};
  position: relative;
  overflow: hidden;
  margin-top: 0;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const Sky = styled.div`
  width: 100%;
  height: 70%;
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%); /* Initial afternoon blue sky */
  position: relative;
  transition: background 0.3s ease; /* Smoother gradient transition */
`;

const Field = styled.div`
  width: 100%;
  height: 30%;
  background: #4CA64C; /* Green field */
  position: relative;
`;

const Sun = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  bottom: 5%; /* Position near the bottom */
  left: 5%; /* Position at the far left */
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) brightness(1.1) contrast(1.1);
  z-index: 1; /* Lower z-index to place behind clouds */
  transform-origin: center center;
`;

const Moon = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: #E6E6FA; /* Lighter silver color */
  border-radius: 50%;
  bottom: 5%; /* Match sun's starting position */
  right: 5%; /* Position at bottom right */
  box-shadow: 0 0 15px rgba(230, 230, 250, 0.7);
  z-index: 1; /* Lower z-index to place behind clouds */
  opacity: 0; /* Hidden initially until night */
`;

const CloudsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2; /* Higher z-index than sun and moon */
  opacity: 0; /* Start invisible and animate in */
  overflow: hidden;
`;

// Create three cloud layers for parallax effect
const CloudLayer = styled.div`
  position: absolute;
  width: 200%;
  height: 100%;
  top: 0;
  left: 0;
`;

const CloudFront = styled(CloudLayer)`
  z-index: 5; /* Higher z-index to ensure clouds are in front */
`;

const CloudMiddle = styled(CloudLayer)`
  z-index: 4; /* Higher z-index to ensure clouds are in front */
`;

const CloudBack = styled(CloudLayer)`
  z-index: 3; /* Higher z-index to ensure clouds are in front */
`;

const Cloud = styled.img`
  position: absolute;
  opacity: 1; /* Fully opaque clouds */
  filter: brightness(1.05); /* Slightly brighter clouds */
  
  &.small {
    width: 80px;
  }
  
  &.medium {
    width: 120px;
  }
  
  &.large {
    width: 180px;
  }
`;

const Stars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0; /* Lowest z-index to place behind everything */
  pointer-events: none; /* Don't block interactions */
  opacity: 0; /* Initially completely hidden */
  visibility: hidden; /* Ensure stars are not visible at all */
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  opacity: 0; /* Start invisible */
  display: none; /* Initially not rendered */
`;

const Title = styled.h2`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.accent || '#bfa980'};
  margin: 2rem 0;
  font-family: ${({ theme }) => theme.fonts.main || '"Cormorant Garamond", serif'};
  font-weight: 600;
  position: relative;
  z-index: 10;
`;

const EventTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(0, -50%);
  width: 45%;
  max-width: 600px;
  text-align: left;
  z-index: 20; /* Higher z-index to ensure visibility */
  pointer-events: none; /* Allow clicking through */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const EventText = styled.p`
  font-size: 2.2rem; /* Larger font size */
  color: #333;
  font-family: ${({ theme }) => theme.fonts.main || '"Cormorant Garamond", serif'};
  font-weight: 600; /* Bolder text */
  opacity: 0;
  margin: 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95); /* More opaque background */
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 100%;
  text-align: left;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* Stronger shadow */
  pointer-events: none; /* Allow clicking through */
  border: 2px solid rgba(191, 169, 128, 0.3); /* Subtle border */
`;

// Add a keyframe animation for twinkling stars
const StarAnimation = createGlobalStyle`
  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`;

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const skyRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const eventTextRefs = useRef([]);
  const cloudsContainerRef = useRef(null);
  const cloudFrontRef = useRef(null);
  const cloudMiddleRef = useRef(null);
  const cloudBackRef = useRef(null);
  const starsRef = useRef(null);
  
  // Timeline events with start and end points (as fraction of scroll progress)
  const events = [
    { id: 1, text: "15:30 - Aankomst & Welkom", start: 0.1, end: 0.3 },
    { id: 2, text: "16:00 - Ceremonie", start: 0.3, end: 0.5 },
    { id: 3, text: "17:00 - Receptie & Borrel", start: 0.5, end: 0.7 },
    { id: 4, text: "19:00 - Diner", start: 0.7, end: 0.85 },
    { id: 5, text: "21:00 - Feest", start: 0.85, end: 1.0 },
  ];
  
  // Reset the event text refs array when the number of events changes
  useEffect(() => {
    eventTextRefs.current = eventTextRefs.current.slice(0, events.length);
  }, [events.length]);

  // Function to interpolate colors for sky transitions
  const interpolateColor = (color1, color2, factor) => {
    // Parse hex colors to RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Interpolate RGB values
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Main animation setup effect
  useEffect(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the section
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2000px", // Reduced scroll distance for testing
      pin: true,
      pinSpacing: true,
      scrub: true,
      markers: true, // Add visual markers for debugging
      onUpdate: (self) => {
        console.log("Scroll Progress:", self.progress);
        
        // Update sky color based on scroll progress
        if (skyRef.current) {
          // Define all sky states
          const skyStates = [
            { progress: 0, colors: ["#87CEEB", "#E0F6FF"] }, // Early Afternoon - bright blue
            { progress: 0.2, colors: ["#6495ED", "#B0E0E6"] }, // Late Afternoon - deeper blue
            { progress: 0.4, colors: ["#FF9E80", "#FFCC80"] }, // Early Sunset - orange-pink
            { progress: 0.6, colors: ["#FF4500", "#FFA500"] }, // Late Sunset - orange-red
            { progress: 0.85, colors: ["#191970", "#000080"] }, // Evening - dark blue
            { progress: 1, colors: ["#000000", "#000080"] }  // Night - black to dark blue
          ];
          
          // Find the two states to interpolate between
          let startState = skyStates[0];
          let endState = skyStates[skyStates.length - 1];
          
          for (let i = 0; i < skyStates.length - 1; i++) {
            if (self.progress >= skyStates[i].progress && self.progress < skyStates[i + 1].progress) {
              startState = skyStates[i];
              endState = skyStates[i + 1];
              break;
            }
          }
          
          // Calculate interpolation factor between the two states
          const stateDuration = endState.progress - startState.progress;
          const stateProgress = (self.progress - startState.progress) / stateDuration;
          
          const topColor = interpolateColor(startState.colors[0], endState.colors[0], stateProgress);
          const bottomColor = interpolateColor(startState.colors[1], endState.colors[1], stateProgress);
          
          skyRef.current.style.background = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;
        }
      },
    });

    // Sun animation
    if (sunRef.current) {
      // Initial setup for the sun image
      gsap.set(sunRef.current, { scale: 1, rotation: 0 });
      
      // Sun movement along an arc path
      gsap.to(sunRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500px",
          scrub: true,
        },
        motionPath: {
          path: [
            { x: "0vw", y: "0vh" },      // Start at bottom left
            { x: "25vw", y: "-25vh" },   // Rise to mid-left
            { x: "50vw", y: "-40vh" },   // Peak at the top center of the sky
            { x: "75vw", y: "-25vh" },   // Descend to mid-right
            { x: "100vw", y: "0vh" }     // Set at bottom right
          ],
          curviness: 1.2,
          autoRotate: false
        },
        duration: 3,
      });
      
      // Add slow rotation to the sun as it moves
      gsap.to(sunRef.current, {
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500px",
          scrub: true,
        },
        ease: "none",
      });
      
      // Fade out the sun during sunset
      gsap.to(sunRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=1200px",
          end: "+=1400px",
          scrub: true,
        },
        opacity: 0,
        duration: 0.5,
      });
    }

    // Moon animation
    if (moonRef.current) {
      // Make moon appear during sunset
      gsap.fromTo(moonRef.current, 
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=800px", // Start showing during sunset
            end: "+=1000px",
            scrub: true,
          },
          opacity: 1,
          duration: 1,
        }
      );
      
      // Move moon along path during night
      gsap.fromTo(moonRef.current,
        { x: "90vw", y: "0vh" }, // Start from bottom right
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=1000px",
            end: "+=2000px",
            scrub: true,
          },
          motionPath: {
            path: [
              { x: "90vw", y: "0vh" },     // Start at bottom right
              { x: "70vw", y: "-20vh" },   // Rise to mid-right
              { x: "50vw", y: "-30vh" },   // Peak at center
              { x: "30vw", y: "-20vh" },   // Descend to mid-left
              { x: "10vw", y: "0vh" }      // End at bottom left
            ],
            curviness: 1.2,
          },
          duration: 3,
        }
      );
    }

    // Clouds animation
    if (cloudsContainerRef.current) {
      // Quick fade-in for clouds at the beginning
      gsap.fromTo(cloudsContainerRef.current, 
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200px", // Shorter distance for quicker fade-in
            scrub: true,
          },
          opacity: 1,
          duration: 0.5, // Shorter duration for quicker fade-in
        }
      );
      
      // Then fade out clouds at sunset
      gsap.to(cloudsContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=800px",
          end: "+=1000px",
          scrub: true,
        },
        opacity: 0,
        duration: 1,
      });
    }
    
    // Parallax effect for clouds
    if (cloudFrontRef.current) {
      gsap.fromTo(cloudFrontRef.current,
        { x: "0%" },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000px",
            scrub: true,
          },
          x: "-30%", // Move fastest to the left
          ease: "none",
        }
      );
    }
    
    if (cloudMiddleRef.current) {
      gsap.fromTo(cloudMiddleRef.current,
        { x: "0%" },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000px",
            scrub: true,
          },
          x: "-20%", // Move medium speed
          ease: "none",
        }
      );
    }
    
    if (cloudBackRef.current) {
      gsap.fromTo(cloudBackRef.current,
        { x: "0%" },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000px",
            scrub: true,
          },
          x: "-15%", // Move slower for distant effect
          ease: "none",
        }
      );
    }

    // Stars animation - only appear after sun has disappeared during twilight
    if (starsRef.current) {
      // First make the entire stars container visible at the right moment
      gsap.fromTo(starsRef.current,
        { opacity: 0, visibility: "hidden" },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=1300px", // Start showing stars AFTER sun has faded out (1200px-1400px)
            end: "+=1310px", // Quick transition for the container
            scrub: true,
            onEnter: () => {
              console.log("Stars container becoming visible");
              // Make all stars display:block when container becomes visible
              gsap.set(starsRef.current.querySelectorAll('.star'), { display: 'block' });
            },
          },
          opacity: 1,
          visibility: "visible",
          duration: 0.1,
        }
      );
      
      // Then animate individual stars
      gsap.fromTo(starsRef.current.querySelectorAll('.star'),
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=1310px", // Start right after container is visible
            end: "+=1500px",
            scrub: true,
            onEnter: () => console.log("Individual stars twinkling in"),
          },
          opacity: 1,
          stagger: 0.005, // Slightly faster stagger for more stars to appear quickly
          duration: 1,
          ease: "power2.in"
        }
      );
    }

    // Event text animations
    console.log('Setting up event text animations for', events.length, 'events');
    if (eventTextRefs.current.length > 0) {
      events.forEach((event, index) => {
        if (eventTextRefs.current[index]) {
          console.log(`Setting up animation for event ${index}: ${event.text}`);
          // Make sure the event text is visible in the DOM
          gsap.set(eventTextRefs.current[index], { display: 'block', opacity: 0 });
          
          // Fade in the event text with a more noticeable animation
          gsap.fromTo(eventTextRefs.current[index], 
            { opacity: 0, y: 30, scale: 0.9 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `+=${event.start * 1800}px`, // Adjusted timing
                end: `+=${(event.start + 0.1) * 1800}px`, // Longer transition
                scrub: 0.5, // Smoother scrubbing
                onEnter: () => console.log(`Event ${index} entering: ${event.text}`),
                toggleActions: "play none none reverse", // More responsive behavior
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out", // More pronounced easing
            }
          );
          
          // Fade out the event text
          gsap.to(eventTextRefs.current[index], {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `+=${(event.end - 0.1) * 1800}px`, // Adjusted timing
              end: `+=${event.end * 1800}px`,
              scrub: 0.5, // Smoother scrubbing
              onLeave: () => console.log(`Event ${index} leaving: ${event.text}`),
            },
            opacity: 0,
            y: -30,
            scale: 0.9,
            duration: 1,
          });
        }
      });
    }

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Kill all tweens
      if (sunRef.current) gsap.killTweensOf(sunRef.current);
      if (moonRef.current) gsap.killTweensOf(moonRef.current);
      if (cloudsContainerRef.current) gsap.killTweensOf(cloudsContainerRef.current);
      if (cloudFrontRef.current) gsap.killTweensOf(cloudFrontRef.current);
      if (cloudMiddleRef.current) gsap.killTweensOf(cloudMiddleRef.current);
      if (cloudBackRef.current) gsap.killTweensOf(cloudBackRef.current);
      if (starsRef.current) gsap.killTweensOf(starsRef.current.querySelectorAll('.star'));
      eventTextRefs.current.forEach(ref => {
        if (ref) gsap.killTweensOf(ref);
      });
    };
  }, [events]);

  // Generate clouds for each layer with different sizes and positions
  const generateCloudLayer = (count, sizeClass, yRangeStart, yRangeEnd, xMultiplier) => {
    const cloudElements = [];
    for (let i = 0; i < count; i++) {
      const top = Math.random() * (yRangeEnd - yRangeStart) + yRangeStart; // Controlled vertical position
      const left = (Math.random() * 180) * xMultiplier; // Spread across extended width
      const rotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
      const flip = Math.random() > 0.5 ? 1 : -1; // Randomly flip some clouds
      
      cloudElements.push(
        <Cloud 
          key={`cloud-${sizeClass}-${i}`} 
          src="/cloud.png"
          alt=""
          className={sizeClass}
          style={{ 
            top: `${top}%`, 
            left: `${left}%`,
            transform: `rotate(${rotation}deg) scaleX(${flip})`,
          }} 
        />
      );
    }
    return cloudElements;
  };
  
  // Generate front, middle, and back cloud layers
  const generateFrontClouds = () => generateCloudLayer(8, 'large', 5, 25, 1);
  const generateMiddleClouds = () => generateCloudLayer(12, 'medium', 10, 40, 0.9);
  const generateBackClouds = () => generateCloudLayer(15, 'small', 15, 50, 0.8);

  // Generate stars for the night sky
  const generateStars = () => {
    const starElements = [];
    for (let i = 0; i < 200; i++) { // More stars for a better night sky
      const top = Math.random() * 60; // Between 0% and 60% from top (sky area)
      const left = Math.random() * 100; // Between 0% and 100% from left
      const size = 0.5 + Math.random() * 2.5; // Random sizes between 0.5-3px
      const animationDelay = Math.random() * 5; // More varied twinkle delay
      const animationDuration = 2 + Math.random() * 4; // Random duration between 2-6s
      
      starElements.push(
        <Star 
          key={`star-${i}`}
          className="star" 
          style={{ 
            top: `${top}%`, 
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
            animation: `twinkle ${animationDuration}s infinite ${animationDelay}s`
          }} 
        />
      );
    }
    return starElements;
  };

  return (
    <Section ref={sectionRef}>
      <StarAnimation /> {/* Add the global star animation */}
      <Title style={{ zIndex: 30 }}>Tijdsplanning van de Dag</Title>
      <BackgroundContainer>
        <Sky ref={skyRef}>
          <Sun ref={sunRef} src="/sun.png" alt="Sun" />
          <Moon ref={moonRef} />
          <CloudsContainer ref={cloudsContainerRef}>
            <CloudFront ref={cloudFrontRef}>{generateFrontClouds()}</CloudFront>
            <CloudMiddle ref={cloudMiddleRef}>{generateMiddleClouds()}</CloudMiddle>
            <CloudBack ref={cloudBackRef}>{generateBackClouds()}</CloudBack>
          </CloudsContainer>
          <Stars ref={starsRef}>{generateStars()}</Stars>
        </Sky>
        <Field />
      </BackgroundContainer>
      <EventTextContainer>
        {events.map((event, index) => (
          <EventText
            key={event.id}
            ref={(el) => (eventTextRefs.current[index] = el)}
          >
            {event.text}
          </EventText>
        ))}
      </EventTextContainer>
    </Section>
  );
}
