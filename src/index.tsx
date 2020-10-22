import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "./styles/global.css";
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";

AOS.init({
  once: false,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
