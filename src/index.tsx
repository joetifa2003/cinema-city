import React from "react";
import ReactDOM from "react-dom";
import "reflect-metadata";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
