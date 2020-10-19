import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";

AOS.init();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
