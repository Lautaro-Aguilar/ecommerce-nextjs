"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetailDesc = ({ product, name, price, details }) => {
  const { qty, decQty, incQty, onAdd, setShowCart} = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }
  return (
    <div className='product-detail-desc'>
      <h1>{name}</h1>
      <div className='reviews'>
        <div>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <p>(20)</p>
      </div>
      <h4>Details: </h4>
      <p>{details}</p>
      <p className='price'>${price}</p>
      <div className='quantity'>
        <h3>Quantity: </h3>
        <p className='quantity-desc'>
          <span className='minus' onClick={decQty}>
            <AiOutlineMinus />
          </span>
          <span className='num'>{qty}</span>
          <span className='plus' onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
      <div className='buttons'>
        <button
          type='button'
          className='add-to-cart'
          onClick={() => onAdd(product, qty)}
        >
          Add to Cart
        </button>
        <button type='button' className='buy-now' onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailDesc;
