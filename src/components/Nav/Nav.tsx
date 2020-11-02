import React, { useState } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

const Nav = () => {
  const links = ["افلام اجنبي", "افلام عربي", "مسلسلات تركي", "انمي"];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuSpring = useSpring({
    config: {
      tension: 210,
      friction: 40,
    },
    transform: menuOpen ? "translateX(0%)" : "translateX(-100%)",
  });

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white shadow-2xl bg-primary">
      <nav className="container flex items-center justify-between py-5 md:py-2">
        <Link to="/" className="text-3xl font-bold text-white">
          Cinema City
        </Link>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <span
            style={{
              width: "32px",
              height: "32px",
            }}
            className="block iconify md:hidden"
            data-icon="gg:menu-left"
            data-inline="false"
          ></span>
        </button>
        <animated.div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-opacity-75 bg-primary-shades-600"
          style={{
            ...{
              backdropFilter: "blur(5px)",
            },
            ...menuSpring,
          }}
        ></animated.div>
        <animated.div
          className="fixed top-0 left-0 w-2/3 h-screen bg-primary"
          style={{
            ...menuSpring,
          }}
        ></animated.div>
        <div className="hidden md:table c-gap-wrapper">
          <div className="flex h-full c-gap c-gap-x-2">
            {links.map((v, i) => (
              <button
                key={i}
                className="h-full p-2 font-bold hover:bg-purple-900"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Nav);
