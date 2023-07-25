import Image from "next/image";
import styles from "./page.module.css";

import React from "react";

const Home = () => {
  return (
    <>
      Hero Banner
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div>{["Product 1", "Product 2"].map((product) => product)}</div>
      Footer
    </>
  );
};

export default Home;
