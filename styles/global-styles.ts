import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

${reset}

  html,
  body,
  input,
  button, textarea {
    font-family: "Pretendard" ,Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  * {
    box-sizing: border-box;
    line-height: 1.5;
  }
  
  input, button {
    display: block;
  }
  
  p {
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }
`;

export default GlobalStyle;
