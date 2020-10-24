import React from "react";

interface PropTypes {
  link: string;
}

const VideoDisplay = ({ link }: PropTypes) => {
  return (
    <div className="overflow-hidden">
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          overflow: "hidden",
        }}
      >
        <iframe
          src={`${link}`}
          title="IFRAME"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default React.memo(VideoDisplay);
