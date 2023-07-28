"use client";
import React, { useState } from "react";
import { urlFor } from "../../../../ecommerce/sanityUtils";

const ImageContainer = (image) => {
  console.log(image);
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className='image-container'>
        <img
          src={urlFor(image.image[index]).url()}
          className='product-detail-image'
        />
      </div>
      <div className='small-images-container'>
        {image.image?.map((item, i) => (
          <img
            key={i}
            src={urlFor(item)}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
