import React from "react";
import Image from "react-graceful-image";
import Ratio from "react-ratio";

interface PropTypes {
  name: string;
  desc: string;
  img: string;
}

const DisplayInfo = ({ name, desc, img }: PropTypes) => {
  return (
    <div className="flex flex-col mb-5 md:flex-row">
      <div className="flex justify-center mb-5 me-5 md:mb-0" data-aos="fade-up">
        <Ratio ratio={0.69} className="w-64 min-w-64">
          <Image
            alt={name}
            src={img}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </Ratio>
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
