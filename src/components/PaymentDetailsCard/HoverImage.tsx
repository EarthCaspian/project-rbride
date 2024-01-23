import React, { useState } from "react";

type ImageProps = {
  normalSrc: string;
  hoverSrc: string;
  alt: string;
};

const HoverImage: React.FC<ImageProps> = ({ normalSrc, hoverSrc, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <img
      src={isHovered ? hoverSrc : normalSrc}
      alt={alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{position: "relative", objectFit: "cover", width: "100%", height: "100%"}}
    />
  );
};

export default HoverImage;
