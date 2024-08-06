import { React, useState, useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { imageData } from "./imageData";

const Main01 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="main01_wrap">
      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        selectedItem={currentIndex}
        
        onChange={handleChange}
        statusFormatter={() => ""}
        interval={5000}
        className="w-[400px] lg:hidden"
        axis="vertical"
      >
        {imageData.map((image, index) => (
          <img key={index} src={image.img} alt={image.alt} />
        ))}
      </Carousel>
    </div>
  );
};

export default Main01;
