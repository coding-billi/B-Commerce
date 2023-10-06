import React from "react";

const ImageGallery = ({ images, setHoveredImage, hoveredImage }) => {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-box ${index === hoveredImage && "custom-border"}`}
          onMouseEnter={() => setHoveredImage(index)}
          // onMouseLeave={() => setHoveredImage(null)} // Reset hover effect on leave
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="scaled-image"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
