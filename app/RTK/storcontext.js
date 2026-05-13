"use client";
import { createContext, useContext, useState } from "react";

const storecontext = createContext();

export const StoreProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenfeedback, setIsOpenfeedback] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isfevorite, setisfevorite] = useState(null);
  const [viewProfile, setviewprofile] = useState(false);

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
      }}
    >
      {children}
    </storecontext.Provider>
  );
};

export const useOpneing = () => useContext(storecontext);
