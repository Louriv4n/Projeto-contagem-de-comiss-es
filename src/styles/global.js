import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    min-height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.gray600};
    font-family: ${(props) => props.theme.fontFamily.sans};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fontFamily.heading};
    font-weight: bold;
    color: ${(props) => props.theme.colors.white};
  }
`;
