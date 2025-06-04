import React from "react";
import styled from "styled-components";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import FallingPetalsLayer from "./FallingPetalsLayer";

const LeavesLeft = styled(motion.img)`
  position: fixed;
  left: 0;
  top: 0;
  width: 50vw;
  height: auto;
  max-width: 50vw;
  max-height: 100vh;
  min-width: 180px;
  display: block;
  z-index: 1;
  pointer-events: none;
  @media (max-width: 900px) {
    width: 60vw;
    max-width: 60vw;
  }
  @media (max-width: 600px) {
    width: 90vw;
    max-width: 90vw;
  }
`;

const LeavesRight = styled(motion.img)`
  position: fixed;
  right: 0;
  top: 0;
  width: 25vw;
  height: auto;
  max-width: 25vw;
  max-height: 100vh;
  min-width: 120px;
  display: block;
  z-index: 1;
  pointer-events: none;
  @media (max-width: 900px) {
    width: 30vw;
    max-width: 30vw;
  }
  @media (max-width: 600px) {
    width: 40vw;
    max-width: 40vw;
  }
`;

const Section = styled.section`
  height: 400vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.section1};
  position: relative;
  overflow-x: hidden;
`;

const CenteredColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
`;

const Ornament = styled(motion.img)`
  position: absolute;
  width: 180px;
  top: 5%;
  left: 5%;
  opacity: 0.3;
  pointer-events: none;
`;

const FadeOnScroll = styled(motion.div)`
  opacity: 0;
`;

export default function InvitationSection() {
  // Scroll hooks voor fade-out effect
  const { scrollY } = useViewportScroll();
  // fade van 1 naar 0 tussen 0 en 4*window.innerHeight scroll, maar eerder verdwijnen
  const scrollMax = 4 * window.innerHeight;
  const leafOpacity = useTransform(scrollY, [0, 0.8 * scrollMax, 0.9 * scrollMax], [1, 1, 0]);
  // veel langzamere beweging omhoog tijdens scroll
  const leafY = useTransform(scrollY, [0, scrollMax], [0, -50]);
  // leaves2 fade-out effect, zelfde als leaf.png
  const leaves2Opacity = useTransform(scrollY, [0, 0.8 * scrollMax, 0.9 * scrollMax], [1, 1, 0]);

  const blockOpacity = (scrollY, blockPosition) => {
    return useTransform(scrollY, [blockPosition - window.innerHeight / 2, blockPosition + window.innerHeight / 2], [0, 1]);
  };

  return (
    <Section>
      {/* Wrapper div voor de FallingPetalsLayer om de fade-out te forceren */}
      <motion.div style={{ 
        opacity: useTransform(scrollY, [0.7 * scrollMax, 0.8 * scrollMax], [1, 0]),
        position: 'relative', // Nodig om de fixed position binnenin correct te laten werken
        zIndex: 5 // Zelfde zIndex als de laag zelf had
      }}>
        <FallingPetalsLayer />
      </motion.div>

      {/* Leaves 2 links */}
      <LeavesLeft
        src="/leaves 2.png"
        alt="Bohemian bladeren links"
        style={{
          opacity: useTransform(scrollY, [50, 200, 0.8 * scrollMax, scrollMax], [0, 1, 1, 0]), // Fade-in na 50px, fade-out vanaf 80%
          y: leafY,
          x: useTransform(scrollY, [0.8 * scrollMax, scrollMax], [0, -300]), // Wegvliegen naar links tijdens fade-out
          zIndex: 2,
          pointerEvents: "none"
        }}
        transition={{ duration: 1.5, ease: "easeOut" }} // Transition voor smooth fade-in
      />
      {/* Leaf rechtsboven */}
      <LeavesRight
        src="/leaf.png"
        alt="Bohemian blad"
        style={{
          opacity: useTransform(scrollY, [50, 200, 0.8 * scrollMax, scrollMax], [0, 1, 1, 0]), // Fade-in na 50px, fade-out vanaf 80%
          y: leafY,
          x: useTransform(scrollY, [0.8 * scrollMax, scrollMax], [0, 300]), // Wegvliegen naar rechts tijdens fade-out
          zIndex: 2
        }}
        transition={{ duration: 1.5, ease: "easeOut" }} // Transition voor smooth fade-in
      />
      {/* Centrale foto die verschijnt met de titel en fade-out voor de volgende tekst */}
      <CenteredColumn>
        {/* Blok 1: Titel die verschijnt en weer verdwijnt voor sectie 2 */}
        <motion.div
          style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            opacity: useTransform(
              scrollY, 
              [0, 0.1 * scrollMax, 0.25 * scrollMax, 0.35 * scrollMax], 
              [0, 1, 1, 0]
            ),
            pointerEvents: 'auto'
          }}
        >
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "3rem",
            margin: 0,
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>Marlon & Rian gaan trouwen!</h1>
        </motion.div>
        
        {/* Foto die verschijnt en weer verdwijnt */}
        <motion.div
          style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            opacity: useTransform(
              scrollY, 
              [0, 0.1 * scrollMax, 0.25 * scrollMax, 0.35 * scrollMax], 
              [0, 1, 1, 0]
            ),
            pointerEvents: 'auto'
          }}
        >
          <motion.img
            src="/family.jpg"
            alt="overgangsfoto bruidspaar"
            style={{
              width: '100%',
              maxWidth: 180,
              height: 'auto',
              aspectRatio: '3/4',
              objectFit: 'contain',
              borderRadius: '18px',
              boxShadow: '0 12px 32px 0 rgba(60,40,20,0.22), 0 2px 8px 0 rgba(80,60,40,0.09)',
              filter: 'brightness(0.99) sepia(0.09) saturate(0.85)',
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Blok 2: Datum in het midden van het scherm */}
        <motion.div
          style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: useTransform(
              scrollY, 
              [0.35 * scrollMax, 0.45 * scrollMax, 0.60 * scrollMax, 0.70 * scrollMax], 
              [0, 1, 1, 0]
            ),
            pointerEvents: 'auto'
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "2.5rem",
            margin: 0,
            textAlign: "center"
          }}>11 oktober 2025</h2>
        </motion.div>

        {/* Blok 3: Uitnodigingstekst onder de datum */}
        <motion.div
          style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            position: 'absolute',
            top: '60%',
            opacity: useTransform(
              scrollY, 
              [0.70 * scrollMax, 0.80 * scrollMax, 0.90 * scrollMax, scrollMax], 
              [0, 1, 1, 0]
            ),
            pointerEvents: 'auto'
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center"
          }}>
            Wij nodigen je van harte uit om samen met ons deze bijzondere dag te vieren. Scroll naar beneden voor alle details!
          </p>
        </motion.div>
      </CenteredColumn>
      {/* Gradient overgang naar volgende sectie */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: '20vh',
          pointerEvents: 'none',
          zIndex: 1,
          background: `linear-gradient(to bottom, ${typeof theme !== 'undefined' ? theme.colors.section1 : '#f6f1e7'} 0%, ${typeof theme !== 'undefined' ? theme.colors.section2 : '#f3e5d0'} 100%)`
        }}
      />
    </Section>
  );
}
