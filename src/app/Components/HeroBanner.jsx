import React from "react";
import Link from "next/link";

import { urlFor } from "../../../ecommerce/sanityUtils";

const HeroBanner = async ({
  heroBanner: {
    smallText,
    midText,
    largeText1,
    image,
    desc,
    product,
    buttonText,
  },
}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image).url()}
          alt='headphones'
          className='hero-banner-image'
        />

        <div>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
