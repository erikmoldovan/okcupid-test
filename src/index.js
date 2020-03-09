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
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    background: #0000ff;
  }
  
  #root {
    display: flex;
    min-height: calc(100vh - 48px);
    margin: 24px;
    background: #f3f5f9;
  }

  button {
    background: rgba(96, 209, 136, 1);
    color: #ffffff;
    cursor: pointer;
    border: none;
    font-size: 16px;
    padding: 12px 36px;
    border-radius: 4px;
    transition: background 0.3s;

    &:hover {
      background: rgba(96, 209, 136, 0.6);
    }
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root"),
);
