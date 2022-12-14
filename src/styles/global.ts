import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --primary: #0A4E92;
  --primary-light: #CAE4FF;
  --gray: #EFEFEF;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: var(--gray) !important;
}

`;

export default GlobalStyle;
