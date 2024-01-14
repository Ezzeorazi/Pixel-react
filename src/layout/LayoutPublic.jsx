import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const LayoutPublic = () => {
  useEffect(() => {
    document.documentElement.lang = "es";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Pixel Maker es una agencia de diseño digital en Argentina, especializada en desarrollo web, diseño gráfico y marketing digital. ¡Transforma tu marca con nosotros!"
      );
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
