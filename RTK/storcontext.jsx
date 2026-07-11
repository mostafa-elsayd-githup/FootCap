"use client";
import { createContext, useContext, useState } from "react";

const storecontext = createContext();

export const StoreProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenfeedback, setIsOpenfeedback] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [isfevorite, setisfevorite] = useState(false);
  const [viewProfile, setviewprofile] = useState(false);
  const [AddToCart, setAddToCart] = useState(false);
  const [selectedSize, setselectedSize] = useState(false);


  return (
    <storecontext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedProduct,
        setSelectedProduct,
        isfevorite,
        setisfevorite,
        isOpenfeedback,
        setIsOpenfeedback,
        viewProfile,
        setviewprofile,
        setAddToCart,
        AddToCart,
        setselectedSize,
        selectedSize,
        setAddToCart,
        AddToCart
      }}
    >
      {children}
    </storecontext.Provider>
  );
};

export const useOpneing = () => useContext(storecontext);
