import React from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Overgang = styled.div`
  position: absolute;
  top: -15vh;
  left: 0;
  width: 100vw;
  height: 30vh;
  background: linear-gradient(to bottom, 
    ${({ theme }) => theme.colors.section2 || '#f3e5d0'} 0%, 
    ${({ theme }) => theme.colors.section2 || '#f3e5d0'} 20%,
    ${({ theme }) => `${theme.colors.section2}E6` || '#f3e5d0E6'} 40%,
    ${({ theme }) => `${theme.colors.section2}CC` || '#f3e5d0CC'} 50%,
    ${({ theme }) => `${theme.colors.section3}CC` || '#f7f2e8CC'} 60%,
    ${({ theme }) => `${theme.colors.section3}E6` || '#f7f2e8E6'} 80%,
    ${({ theme }) => theme.colors.section3 || '#f7f2e8'} 100%
  );
  pointer-events: none;
  z-index: 2;
`;

// (verwijderde dubbele declaratie)

const Section = styled.section`
  min-height: 180vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.section3 || '#f7f2e8'};
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 100vw; /* Full viewport width */
`;

const ImageWrapper = styled(motion.div)`
  width: 90vw;
  max-width: 600px; /* Increased max-width */
  margin-bottom: 2.1rem;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 32px 0 rgba(60,40,20,0.13), 0 2px 8px 0 rgba(80,60,40,0.09);
`;

const Title = styled(motion.h2)`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.accent || '#b68c4a'};
  margin-bottom: 1.7rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  position: relative;
  z-index: 10;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
`;

const Address = styled(motion.div)`
  font-size: 1.2rem;
  color: #7d674a;
  margin-bottom: 1.6rem;
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const MapWrapper = styled(motion.div)`
  width: 90vw;
  max-width: 600px; /* Increased max-width */
  height: 300px; /* Increased height */
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 1.7rem;
  box-shadow: 0 6px 32px 0 rgba(60,40,20,0.13), 0 2px 8px 0 rgba(80,60,40,0.09);
`;

const Tips = styled(motion.div)`
  font-size: 1rem;
  color: #8e7b5a;
  margin-bottom: 1.2rem;
  max-width: 800px; /* Increased max-width */
  width: 90vw; /* Full viewport width with margin */
  text-align: center;
  padding: 0.8rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Route = styled.div`
  font-size: 1rem;
  color: #8e7b5a;
  max-width: 800px; /* Increased max-width */
  width: 90vw; /* Full viewport width with margin */
  text-align: center;
`;

// Container for each animation section to center it in the viewport
const AnimationContainer = styled.div`
  min-height: 80vh;
  width: 100vw; /* Full viewport width */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
  padding: 2rem 0;
`;

export default function LocationSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const addressMapRef = useRef(null);
  
  // Create scroll progress for each section
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: addressMapProgress } = useScroll({
    target: addressMapRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for each element based on scroll progress
  const titleOpacity = useTransform(titleProgress, [0.1, 0.3], [0, 1]);
  const titleY = useTransform(titleProgress, [0.1, 0.3], [30, 0]);
  
  const mapOpacity = useTransform(addressMapProgress, [0.2, 0.4], [0, 1]);
  const mapX = useTransform(addressMapProgress, [0.2, 0.4], [100, 0]);
  
  const parkingOpacity = useTransform(addressMapProgress, [0.3, 0.5], [0, 1]);
  const parkingY = useTransform(addressMapProgress, [0.3, 0.5], [50, 0]);
  
  return (
    <Section ref={sectionRef}>
      <Overgang />
      
      {/* Title, Image and Address Section */}
      <AnimationContainer ref={titleRef}>
        <Title
          style={{ 
            opacity: titleOpacity,
            y: titleY,
            marginBottom: '1.5rem'
          }}
        >
          Locatie & Route
        </Title>
        
        {/* Vreemd.png image with fade-in animation - appears quickly */}
        <ImageWrapper
          style={{ 
            opacity: useTransform(titleProgress, [0.15, 0.25], [0, 1]),
            marginBottom: '1rem'
          }}
        >
          <img 
            src="/vreemd.png" 
            alt="De Vreemde Vogel" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </ImageWrapper>
        
        {/* Image caption */}
        <div
          style={{ 
            opacity: useTransform(titleProgress, [0.2, 0.3], [0, 1]),
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "#8e7b5a",
            textAlign: "center",
            maxWidth: '400px', 
            width: '90%',
            marginTop: '0.5rem'
          }}
        >
          
        </div>
      </AnimationContainer>
      
      {/* Map Section */}
      <AnimationContainer 
        ref={addressMapRef}
        style={{ marginTop: '-5rem' }} // Position the map higher
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw', /* Full viewport width */
          maxWidth: '100vw' /* No max-width restriction */
        }}>
          {/* Address flying in from left */}
          <Address
            style={{ 
              opacity: mapOpacity, 
              x: useTransform(addressMapProgress, [0.2, 0.4], [-100, 0]),
              maxWidth: '600px', /* Increased max-width */
              width: '90vw', /* Full viewport width with margin */
              marginBottom: '1.5rem'
            }}
          >
            De Vreemde Vogel Vlaardingen<br/>
            Van Baerlestraat 252<br/>
            3132 EK Vlaardingen
          </Address>
          
          {/* Map flying in from right */}
          <MapWrapper
            style={{ 
              opacity: mapOpacity, 
              x: mapX,
              marginBottom: '1rem',
              width: '90vw', /* Full viewport width with margin */
              maxWidth: '600px' /* Increased max-width */
            }}
          >
            <iframe
              title="Google Maps Locatie"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1509.1589511620614!2d4.308285666483044!3d51.91011659424194!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1745881659548!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapWrapper>
        </div>
        
        {/* Parking info right under the map */}
        <Tips
          style={{ 
            opacity: parkingOpacity, 
            y: parkingY,
            marginTop: '1rem'
          }}
        >
          <strong>Parkeren:</strong> Gratis parkeren is mogelijk op het terrein.
        </Tips>
      </AnimationContainer>
      
    </Section>
  );
}
  