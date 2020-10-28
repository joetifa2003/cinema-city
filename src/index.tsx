import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "./styles/global.css";
import "aos/dist/aos.css";

AOS.init({
  once: true,
  easing: "ease-in-out",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
