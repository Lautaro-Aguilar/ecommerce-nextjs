"use client";
import React from "react";
import { HeroBanner, Product, FooterBanner } from "./components/index";
import { getBanner, getProducts } from "../../ecommerce/sanityUtils";

async function Home() {
  const products = await getProducts();
  const bannerData = await getBanner();
  return (
    <>
      <HeroBanner heroBanner={bannerData} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <FooterBanner footerBanner={bannerData} />
    </>
  );
}

export default Home;
