import React, { useState } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import DropDown from "../UI/DropDown";

const Nav = () => {
  const links = [
    {
      name: "تركي",
      options: [
        {
          name: "افلام تركي",
          onClick: () => {},
        },
        {
          name: "مسلسلات تركي",
          onClick: () => {},
        },
      ],
    },
    {
      name: "اجنبي",
      options: [
        {
          name: "افلام اجنبي",
          onClick: () => {},
        },
        {
          name: "مسلسلات اجنبي",
          onClick: () => {},
        },
      ],
    },
    {
      name: "عربي",
      options: [
        {
          name: "افلام عربي",
          onClick: () => {},
        },
        {
          name: "مسلسلات عربي",
          onClick: () => {},
        },
      ],
    },
    {
      name: "انمي",
      options: [
        {
          name: "افلام انمي",
          onClick: () => {},
        },
        {
          name: "مسلسلات انمي",
          onClick: () => {},
        },
      ],
    },
    {
      name: "دراما",
      options: [
        {
          name: "افلام دراما",
          onClick: () => {},
        },
        {
          name: "مسلسلات دراما",
          onClick: () => {},
        },
      ],
    },
    {
      name: "اكشن",
      options: [
        {
          name: "افلام اكشن",
          onClick: () => {},
        },
        {
          name: "مسلسلات اكشن",
          onClick: () => {},
        },
      ],
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSpring, setMenuSpring] = useSpring(() => ({
    config: {
      tension: 210,
      friction: 40,
    },
    transform: "translateX(-100%)",
  }));

  setMenuSpring({
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
            ...menuSpring,
            ...{
              backdropFilter: "blur(5px)",
            },
          }}
        ></animated.div>
        <animated.div
          className="fixed top-0 left-0 w-1/2 h-screen bg-primary"
          style={{
            ...menuSpring,
          }}
        >
          {links.map((v, i) => (
            <DropDown name={v.name} options={v.options} float={false} />
          ))}
        </animated.div>
        <div className="hidden md:table c-gap-wrapper">
          <div className="flex h-full c-gap c-gap-x-2">
            {links.map((v, i) => (
              <DropDown name={v.name} options={v.options} float={true} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Nav);
