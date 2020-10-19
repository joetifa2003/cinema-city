import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const links = ["افلام اجنبي", "افلام عربي", "مسلسلات تركي", "انمي"];

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white shadow-2xl bg-primary">
      <nav className="container flex flex-col items-center justify-between py-5 md:py-2 md:flex-row">
        <Link to="/" className="text-3xl font-bold text-white">
          Cinema City
        </Link>
        <div className="c-gap-wrapper">
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

export default Nav;
