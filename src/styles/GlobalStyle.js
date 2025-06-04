import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    min-height: 100vh;
    transition: background 0.7s;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.accent};
    margin: 0;
  }
`;

export default GlobalStyle;
