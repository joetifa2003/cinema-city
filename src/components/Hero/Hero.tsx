import React from "react";
import "./Hero.css";
import Fade from "react-reveal/Fade";
import Background from "../../assets/Hero.jpg";

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-8/12 bg-primary"
      style={{
        background: `url(${Background}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-primary"></div>
      <div className="hidden custom-shape-divider-bottom-1603030511 md:block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="container">
        <Fade up>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            اهلا بكم في سينما سيتي
          </h1>
        </Fade>
        <Fade up delay={250}>
          <p className="text-xl font-bold text-white md:text-3xl">
            يمكنكم مشاهدة جميع الافلام و المسلسلات بجوده عالية و مترجمة اللي
            اللغة العربية
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default React.memo(Hero);
