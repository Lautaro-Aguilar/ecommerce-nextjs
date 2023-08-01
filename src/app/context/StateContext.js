'use client'
import React, {createContext, useContext, useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'

const Context = createContext()

// eslint-disable-next-line react/prop-types
export const StateContext = ({children}) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('carrito')
      if (savedCart) { 
        return JSON.parse(savedCart)
      } else {
        return []
      }
    }
  })
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct
  // eslint-disable-next-line no-unused-vars
  let index

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cartItems))
    const totalQuantities = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    setTotalQuantities(totalQuantities)
    setTotalPrice(totalPrice)
  }, [cartItems])

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...cartItems, {...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const incQty = () => setQty((prevQty) => prevQty + 1)
  const decQty = () =>
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
