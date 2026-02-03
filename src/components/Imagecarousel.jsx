import React, { useState, useEffect } from "react";
import school1 from "../assets/school1.jpg";
import school2 from "../assets/school2.jpg";
import school3 from "../assets/school3.jpg";

const Imagecarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [school1, school2, school3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={image} alt={`School ${index + 1}`} />
        </div>
      ))}
      
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Imagecarousel;
