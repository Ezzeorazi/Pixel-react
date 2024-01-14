import React from "react";
import { Outlet } from "react-router-dom";
import NavbarEn from "../components/NavbarEn";
import FooterEn from "../components/FooterEn";
import { useEffect } from "react";

export const LayoutPublicEn = () => {
  useEffect(() => {
    document.documentElement.lang = "en";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Pixel Maker is a digital design agency in Argentina, specialized in web development, graphic design and digital marketing, transform your brand with us!"
      );
  }, []);
  return (
    <>
      <NavbarEn />
      <Outlet />
      <FooterEn />
    </>
  );
};
