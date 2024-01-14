import React from "react";
import { Link } from "react-router-dom";

const FooterEn = () => {
  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center text-white mb-4 mt-5">
          Interested in custom solutions for your goals? Want a plan that fits
          your budget?
        </h2>
        <p className="text-center text-white mb-4">
          Contact us to discuss your idea and discover the perfect package
          designed especially for you.
        </p>
        <div className="text-center mb-3">
          <Link hreflang="en" to="/en/contacten" className="btn btn-primary">
            CONTACT US
          </Link>
        </div>
        <hr />
      </div>
      <a
        href="https://wa.me/543413804322?text=Hello,%20I'm%20interested%20in%20your%20services"
        target="_blank"
        className="whatsapp-button mb-5"
        aria-label="click to chat on Whatsapp"
      >
        <img
          src="/img/logo wsp.png"
          alt="Whatsapp Logo"
          style={{ height: "50px", width: "50px" }}
        />
      </a>
      <footer className="bg-black text-white mt-4">
        <div className="container">
          <div className="row ">
            <div className="col-lg-5 mt-3">
              <h4>Pixel Maker</h4>
              <p>Web Design Rosario, Argentina</p>
              <p>
                Over 5 years of experience in design, development, and web
                solutions.
              </p>
              <div className="social d-flex justify-content-start">
                <a
                  className="mx-2"
                  href="https://www.facebook.com/pixelmakerweb"
                  target="_blank"
                  aria-label="click to follow us on facebook"
                >
                  <img
                    src="/img/logo fb.png"
                    alt="Facebook Logo"
                    style={{ height: "28px", width: "15px" }}
                  />
                </a>
                <a
                  className="mx-2"
                  href="https://www.linkedin.com/company/pixel-maker/ "
                  target="_blank"
                  aria-label="click to follow us on linkedin"
                >
                  <img
                    src="/img/logo linkedin.png"
                    alt="LinkedIn Logo"
                    style={{ height: "25px", width: "25px" }}
                  />
                </a>
                <a
                  className="mx-2"
                  href="https://www.instagram.com/pixelmakerdevs/"
                  target="_blank"
                  aria-label="click to follow us on instagram"
                >
                  <img
                    src="/img/logo instagram.png"
                    alt="Instagram Logo"
                    style={{ height: "25px", width: "25px" }}
                  />
                </a>
                <a
                  className="mx-2"
                  href="mailto:contacto@pixelmaker.com.ar"
                  target="_blank"
                  aria-label="click to get in touch with us"
                >
                  <img
                    src="/img/logo-email.png"
                    alt="Email Logo"
                    style={{ height: "35px", width: "30px" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-5 mt-3">
              <h4>SERVICES</h4>
              <ul className="list-unstyled">
                <li>Web design</li>
                <li>Online stores</li>
                <li>Hosting</li>
                <li>Domain renewal or purchase</li>
                <li>SSL Certificate</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mb-2">
              <p>Copyright © 2023 Pixel Maker. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterEn;
