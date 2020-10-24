import React from "react";
import Image from "react-graceful-image";

interface PropTypes {
  name: string;
  desc: string;
  img: string;
}

const DisplayInfo = ({ name, desc, img }: PropTypes) => {
  return (
    <div className="flex flex-col mb-5 md:flex-row">
      <div className="flex justify-center mb-5 me-5 md:mb-0" data-aos="fade-up">
        <Image alt={name} src={img} className="w-64 min-w-64" />
      </div>
      <div className="w-full p-5 rounded-xl bg-primary-shades-600">
        <div dir="auto" data-aos="fade-up" className="text-3xl font-bold">
          {name}
        </div>
        <p
          dir="auto"
          data-aos="fade-up"
          data-aos-delay="250"
          className="font-bold"
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

export default React.memo(DisplayInfo);
