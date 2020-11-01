import React from "react";
import ReactDOM from "react-dom";
import "reflect-metadata";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "./styles/global.scss";
import "aos/dist/aos.css";

AOS.init({
  once: true,
  startEvent: "load",
  easing: "ease-in-out",
  disable: "mobile",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
