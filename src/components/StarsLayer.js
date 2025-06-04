import React from "react";
import { motion } from "framer-motion";

const STAR_COUNT = 40;
const STAR_MIN_SIZE = 3;
const STAR_MAX_SIZE = 7;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
  const left = randomBetween(3, 97); // percentage
  const size = randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE); // px
  const duration = randomBetween(7, 15); // sec
  const delay = randomBetween(0, 10); // sec
  const opacity = randomBetween(0.6, 1);
  // Each star gets a random pulse delay and pulse duration
  const pulseDelay = randomBetween(0, 2);
  const pulseDuration = randomBetween(2, 3.5);
  return { left, size, duration, delay, opacity, pulseDelay, pulseDuration, key: i };
});

export default function StarsLayer() {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {stars.map((star) => (
        <motion.div
          key={star.key}
          initial={{ y: '100vh', opacity: 0, scale: 1 }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, star.opacity, 0],
            scale: [1, 1.22, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            scale: {
              duration: star.pulseDuration,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: star.pulseDelay
            }
          }}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #ffe600', // bright yellow inner stroke
            opacity: star.opacity,
            boxShadow: `0 0 8px 2px #ffe6a0, 0 0 2px 1px #fff`,
          }}
        />
      ))}
    </div>
  );
}
