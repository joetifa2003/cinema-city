import React, { useEffect, useRef, useState } from "react";
import { config, useSpring } from "react-spring";
import { animated } from "react-spring";

const DropDown = ({
  name,
  options,
  float,
}: {
  name: string;
  options: { name: string; onClick: () => void }[];
  float: boolean;
}) => {
  const [mainHoverd, setMainHoverd] = useState(false);
  const [contentHoverd, setContetnHoverd] = useState(false);
  const [height, setHeight] = useState();
  const ref: any = useRef(null);

  const hovered = mainHoverd || contentHoverd;

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, []);

  const [dropDownSpring, setDropDownSpring] = useSpring(() => ({
    config: config.stiff,
    height: height || "",
  }));

  setDropDownSpring({
    height: hovered && height ? height : 0,
  });

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center p-2 font-bold hover:bg-purple-900"
        onMouseOver={() => setMainHoverd(true)}
        onMouseOut={() => setMainHoverd(false)}
      >
        {name}
        <span
          className="mr-2 iconify"
          data-icon="bx:bx-down-arrow-alt"
          data-inline="false"
        ></span>
      </button>
      <animated.div
        className={`${
          float && "absolute"
        } px-5 overflow-hidden top-full bg-primary rounded-b-xl`}
        ref={ref}
        style={{
          ...dropDownSpring,
          ...{
            width: "max-content",
            minWidth: "max-content",
          },
        }}
        onMouseOver={() => setContetnHoverd(true)}
        onMouseOut={() => setContetnHoverd(false)}
      >
        {options.map((item, index) => (
          <button
            className="block w-full p-2 my-2 font-bold rounded-md hover:bg-purple-900 text-start"
            key={index}
            style={{
              width: "max-content",
              minWidth: "max-content",
            }}
            onClick={item.onClick}
          >
            {item.name}
          </button>
        ))}
      </animated.div>
    </div>
  );
};

export default DropDown;
