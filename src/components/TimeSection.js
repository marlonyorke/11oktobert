import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import StarsLayer from "./StarsLayer";

const Section = styled.section`
  min-height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.section2};
  position: relative;
  overflow: hidden;
  width: 100vw; /* Full viewport width */
`;

const TimeTitle = styled(motion.h2)`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.accent};
  width: 100%; /* Full width */
  text-align: center; /* Center text */
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1.2rem;
  width: 100vw; /* Full viewport width */
`;

const Time = styled(motion.div)`
  font-size: 3.6rem;
  font-weight: bold;
  color: #d6a76a;
  letter-spacing: 0.06em;
  position: relative;
  z-index: 2;
`;

const TimeShadow = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 54%;
  width: 110%;
  height: 55%;
  background: radial-gradient(ellipse at center, #ffe5c7cc 60%, transparent 100%);
  filter: blur(10px);
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  width: 100%; /* Full width */
  text-align: center; /* Center text */
  padding: 0 1rem; /* Add some padding */
`;

function getTimeRemaining(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const TimerContainer = styled.div`
  margin-top: 2.2rem;
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  width: 100vw; /* Full viewport width */
`;
const TimerBlock = styled(motion.div)`
  background: #fff8f0cc;
  border-radius: 1.1rem;
  box-shadow: 0 2px 10px 0 #e7d3b1aa;
  padding: 0.7rem 1.2rem 0.3rem 1.2rem;
  min-width: 54px;
  text-align: center;
  color: #a97a50;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TimerNumber = styled(motion.span)`
  font-size: 2.1rem;
  font-weight: bold;
  color: #d6a76a;
  text-shadow: 0 2px 8px #e7d3b1aa;
`;
const TimerLabel = styled.span`
  font-size: 0.92rem;
  color: #a97a50;
  margin-top: 0.1rem;
  letter-spacing: 0.01em;
`;

export default function TimeSection() {
  const targetDate = new Date("2025-10-11T14:30:00"); // Pas aan naar jouw tijdstip!
  const [remaining, setRemaining] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <>
    <Section style={{ position: 'relative', overflow: 'hidden' }}>
      <StarsLayer />
      <TimeTitle
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Tijd
      </TimeTitle>
      <TimeWrapper>
        <TimeShadow
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 8, -8, 0],
            opacity: [0.37, 0.53, 0.37]
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
        <Time
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          14:30
        </Time>
      </TimeWrapper>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Kom op tijd, zodat je niets mist van hdeze mooie dag!
      </Subtitle>
      <TimerContainer>
        {remaining ? (
          <>
            <TimerBlock>
              <TimerNumber
                key={remaining.days}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                {remaining.days}
              </TimerNumber>
              <TimerLabel>{remaining.days === 1 ? "dag" : "dagen"}</TimerLabel>
            </TimerBlock>
            <TimerBlock>
              <TimerNumber
                key={remaining.hours}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                {remaining.hours}
              </TimerNumber>
              <TimerLabel>uur</TimerLabel>
            </TimerBlock>
            <TimerBlock>
              <TimerNumber
                key={remaining.minutes}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                {remaining.minutes}
              </TimerNumber>
              <TimerLabel>min</TimerLabel>
            </TimerBlock>
            <TimerBlock>
              <TimerNumber
                key={remaining.seconds}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                {remaining.seconds}
              </TimerNumber>
              <TimerLabel>sec</TimerLabel>
            </TimerBlock>
          </>
        ) : (
          <TimerBlock style={{ background: '#ffe8c8', color: '#a97a50', boxShadow: '0 2px 10px 0 #e7d3b1aa' }}>
            <TimerNumber
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              style={{ color: '#a97a50' }}
            >
              Het feest is begonnen!
            </TimerNumber>
          </TimerBlock>
        )}
      </TimerContainer>
    </Section>
    </>
  );
}
