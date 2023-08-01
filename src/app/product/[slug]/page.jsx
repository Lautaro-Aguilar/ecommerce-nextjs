import React from "react";
import { getProduct } from "../../../../ecommerce/sanityUtils";
import ImageContainer from "./ImageContainer";
import ProductDetailDesc from "./ProductDetailDesc";
import { Product } from "@/app/components";

async function Slug({ params }) {
  const { product, products } = await getProduct({ slug: params.slug });

  const { image, name, details, price } = product;

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <ImageContainer image={image} />
        </div>

        <ProductDetailDesc
          product={product}
          name={name}
          price={price}
          details={details}
        />
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slug;
