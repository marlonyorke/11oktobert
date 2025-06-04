import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import InvitationSection from "./components/InvitationSection";
import TimeSection from "./components/TimeSection";
import LocationSection from "./components/LocationSection";
import TimelineSection from "./components/TimelineSection";

const theme = {
  colors: {
    background: "#f6f1e7",
    accent: "#bfa980",
    text: "#4c3b2a",
    section1: "#f6f1e7",
    section2: "#f3e5d0",
    section3: "#e8d8c3",
    section4: "#d9c1a3",
    section5: "#e7e1d1",
    section6: "#f4ede4",
    section7: "#f8f6f2"
  },
  fonts: {
    main: "'Cormorant Garamond', serif",
    accent: "'Dancing Script', cursive"
  }
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <InvitationSection />
        <TimeSection />
        <LocationSection />
        <TimelineSection />
        {/* Hier komen de overige secties als aparte components */}
      </Main>
    </ThemeProvider>
  );
}

export default App;
