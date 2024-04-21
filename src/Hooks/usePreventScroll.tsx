import React, { useState, useEffect } from "react";

const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    const preventScroll = () => {
      if (typeof window !== "undefined" && window.document) {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
      }
    };
    preventScroll();

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

export default usePreventScroll;
