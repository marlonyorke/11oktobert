import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import styled from "styled-components";

const PETALS = [
  // Langzamere set met verder vallen
  { img: "/blad1.png", size: 54, x: 8, yStart: -10, delay: 0.0, speed: 0.6, shadow: 0.13 },
  { img: "/blad2.png", size: 38, x: 20, yStart: -18, delay: 0.15, speed: 0.5, shadow: 0.10 },
  { img: "/blad3.png", size: 48, x: 35, yStart: -5, delay: 0.3, speed: 0.7, shadow: 0.14 },
  { img: "/blad4.png", size: 60, x: 60, yStart: -22, delay: 0.5, speed: 0.4, shadow: 0.12 },
  { img: "/blad5.png", size: 42, x: 80, yStart: -12, delay: 0.2, speed: 0.65, shadow: 0.15 },
  { img: "/blad1.png", size: 35, x: 15, yStart: -30, delay: 0.45, speed: 0.75, shadow: 0.09 },
  { img: "/blad2.png", size: 44, x: 55, yStart: -25, delay: 0.25, speed: 0.55, shadow: 0.11 },
  { img: "/blad3.png", size: 52, x: 72, yStart: -8, delay: 0.32, speed: 0.8, shadow: 0.14 },
  { img: "/blad4.png", size: 40, x: 28, yStart: -15, delay: 0.38, speed: 0.6, shadow: 0.13 },
  { img: "/blad5.png", size: 38, x: 85, yStart: -20, delay: 0.6, speed: 0.45, shadow: 0.12 },
  // Extra set met meer variatie en verder naar beneden
  { img: "/blad1.png", size: 65, x: 12, yStart: -35, delay: 0.7, speed: 0.85, shadow: 0.16 },
  { img: "/blad2.png", size: 32, x: 25, yStart: -40, delay: 0.55, speed: 0.4, shadow: 0.08 },
  { img: "/blad3.png", size: 58, x: 40, yStart: -15, delay: 0.8, speed: 0.9, shadow: 0.17 },
  { img: "/blad4.png", size: 70, x: 65, yStart: -45, delay: 0.9, speed: 0.5, shadow: 0.14 },
  { img: "/blad5.png", size: 36, x: 88, yStart: -25, delay: 0.4, speed: 0.7, shadow: 0.11 },
  { img: "/blad1.png", size: 48, x: 5, yStart: -50, delay: 0.65, speed: 0.95, shadow: 0.15 },
  { img: "/blad2.png", size: 52, x: 50, yStart: -38, delay: 0.75, speed: 0.6, shadow: 0.13 },
  { img: "/blad3.png", size: 42, x: 78, yStart: -28, delay: 0.85, speed: 0.85, shadow: 0.12 },
  { img: "/blad4.png", size: 62, x: 32, yStart: -42, delay: 0.95, speed: 0.65, shadow: 0.16 },
  { img: "/blad5.png", size: 46, x: 92, yStart: -32, delay: 0.35, speed: 0.5, shadow: 0.10 }
];

const Petal = styled(motion.img)`
  position: absolute;
  filter: drop-shadow(0 4px 8px rgba(120, 85, 70, 0.13));
  pointer-events: none;
  will-change: transform, opacity;
`;

export default function FallingPetalsLayer() {
  const { scrollY } = useViewportScroll();
  // Parallax: beweeg 20% langzamer dan content (dus 80% van scrollafstand)
  return (
    <div style={{ position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 5 }}>
      {PETALS.map((petal, i) => {
        // Scroll-animatie: van yStart% vh tot 400% vh
        const scrollMax = 4 * window.innerHeight;
        const y = useTransform(
          scrollY,
          [0, scrollMax],
          [petal.yStart + "%", (400 * petal.speed) + "%"]
        );
        // Fade-in en fade-out: Start pas na 50px scroll, verschijnt na delay, verdwijnt zeer ruim voor nieuwe sectie
        const opacity = useTransform(
          scrollY, 
          [
            0, // Opacity is 0 bij scroll 0
            50, // Opacity is nog steeds 0 na 50px scroll
            (petal.delay * scrollMax) + 50, // Start fade-in (nu iets later)
            (petal.delay + 0.2) * scrollMax + 50, // Volledig zichtbaar
            scrollMax * 0.65, // Begin fade-out
            scrollMax * 0.75  // Volledig verdwenen
          ], 
          [0, 0, 1, 1, 1, 0] // Opacity waarden
        );
        // Schaal: tussen 0.9 en 1.1 (varieer per blaadje)
        const scale = useTransform(scrollY, [0, scrollMax], [0.9, 1.1]);
        // Rotatie: 360 graden per 10s
        const [rotate, setRotate] = React.useState(0);
        React.useEffect(() => {
          let frame;
          let start = Date.now();
          function animate() {
            setRotate(((Date.now() - start) / 15000) * 360);
            frame = requestAnimationFrame(animate);
          }
          animate();
          return () => cancelAnimationFrame(frame);
        }, []);
        return (
          <Petal
            key={i}
            src={petal.img}
            style={{
              left: `${petal.x}%`,
              top: 0,
              width: petal.size,
              height: "auto",
              y,
              opacity,
              scale,
              rotate,
              filter: `drop-shadow(0 4px 8px rgba(120,85,70,${petal.shadow}))`
            }}
            alt="bloemblaadje"
            draggable={false}
          />
        );
      })}
    </div>
  );
}
