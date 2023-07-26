import Image from "next/image";
import styles from "./page.module.css";

import React from "react";
import { HeroBanner, Footer, Product } from "./Components";
import { getProducts } from "../../ecommerce/sanityUtils";

async function Home() {
  const products = await getProducts();
  return (
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => product.name)}
      </div>
      <Footer />
    </>
  );
}

export default Home;
