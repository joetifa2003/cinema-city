import React from "react";
import { hydrate, render } from "react-dom";
import "reflect-metadata";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss";

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const root = document.getElementById("root");

if (root?.hasChildNodes()) {
  hydrate(app, root);
} else {
  render(app, root);
}
