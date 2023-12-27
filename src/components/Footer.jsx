import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center text-white mb-4">
          ¿Interesado en soluciones personalizadas para tus objetivos? Desea un
          plan ajustado a su presupuesto?{" "}
        </h2>
        <p className="text-center text-white mb-4">
          Póngase en contacto con nosotros para conversar sobre su idea y
          descubra el paquete perfecto diseñado especialmente para usted.
        </p>
        <div className="text-center mb-3">
          <Link to={"/contact"} className="btn btn-primary">
            CONTACTAR
          </Link>
        </div>
        <hr />
      </div>
      <a
        href="https://wa.me/543413804322?text=Hola,%20estoy%20interesado%20en%20sus%20servicios"
        target="_blank"
        className="whatsapp-button mb-5 tracking-in-contract-bck-bottom"
        aria-label="haz click para chatear por Whatsapp"
      >
        <i className="fab fa-whatsapp "></i>
      </a>
      <footer className="bg-black text-white">
        <div className="container">
          <div className="row ">
            <div className="col-lg-5 mt-3">
              <h4>Pixel Maker</h4>
              <p>Diseño web Rosario, Argentina</p>
              <p>
                Más de 5 años de experiencia en diseño, desarrollo y soluciones
                web.
              </p>
              <div className="social d-flex justify-content-start">
                <a
                  className="mx-2"
                  href="https://www.facebook.com/pixelmakerweb"
                  target="_blank"
                  aria-label="haz click para seguirnos en facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  className="mx-2"
                  href="https://www.linkedin.com/company/pixel-maker/ "
                  target="_blank"
                  aria-label="haz click para seguirnos por linkedin"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  className="mx-2"
                  href="https://www.instagram.com/pixelmakerdevs/"
                  target="_blank"
                  aria-label="haz click para seguirnos por instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="mx-2"
                  href="mailto:contacto@pixelmaker.com.ar"
                  target="_blank"
                  aria-label="haz click para contactarte con nosotros"
                >
                  <i className="fa-regular fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-5 mt-3">
              <h4>SERVICIOS</h4>
              <ul className="list-unstyled">
                <li>Diseño web</li>
                <li>Tiendas online</li>
                <li>Hosting</li>
                <li>Renovación o compra de dominio</li>
                <li>Certificado SSL</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mb-2">
              <p>
                Copyright © 2023 Pixel Maker. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
