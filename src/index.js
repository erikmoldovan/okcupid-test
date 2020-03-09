import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createGlobalStyle } from 'styled-components'

import { reducer } from "./madlibs";
import App from "./components/App";

const store = createStore(reducer);

const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f4f4f4;
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
  
  #root {
    display: flex;
    height: 100vh;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root"),
);
