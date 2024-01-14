import React from "react";

const CarrouselEn = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide mt-5">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* <!-- Imagen para dispositivos no móviles (md y mayores) --> */}
            <img
              src="/img/carrousel-01-desktop.webp"
              className="d-none d-md-block w-100"
              alt="img-que-hacemos"
              style={{ maxHeight: "450px" }}
            />
            {/* <!-- Imagen para dispositivos móviles (xs, sm) --> */}
            <img
              src="/img/carrousel-01-mobile.webp"
              className="d-block d-md-none w-100"
              alt="img-que-hacemos"
              style={{ maxHeight: "500px" }}
            />

            <div className="carousel-caption d-none d-md-block text-start w-50 mb-3">
              <h3>We create your customized website</h3>
              <p>
                With a distinctive design we build a digital presence that will
                your brand. <br />
                We create interactive pages and efficient forms to ensure an
                unparalleled guarantee an unparalleled user experience. <br />
                After your approval, your site will be ready to impress and
                facilitate your facilitate interaction with your customers.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            {/* <!-- Imagen para dispositivos no móviles (md y mayores) --> */}
            <img
              src="/img/carrousel-02-desktop.webp"
              className="d-none d-md-block w-100"
              alt="img-tecnologias"
              style={{ maxHeight: "450px" }}
            />
            {/* <!-- Imagen para dispositivos móviles (xs, sm) --> */}
            <img
              src="/img/carrousel-02-mobile.webp"
              className="d-block d-md-none w-100"
              alt="img-tecnologias-mobile"
              style={{ maxHeight: "500px" }}
            />

            <div className="carousel-caption d-none d-md-block text-start w-25 mb-3">
              <h3>Technologies</h3>
              <p>
                HTML and CSS are the basis of any web, Bootstrap accelerates the
                development development, <br />
                Javascript makes your site interactive, and React allows us to
                build modern and efficient build modern and efficient user
                interfaces.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            {/* <!-- Imagen para dispositivos no móviles (md y mayores) --> */}
            <img
              src="/img/carrousel-03-desktop.webp"
              className="d-none d-md-block w-100"
              alt="img-hosting"
              style={{ maxHeight: "450px" }}
            />
            {/* <!-- Imagen para dispositivos móviles (xs, sm) --> */}
            <img
              src="/img/carrousel-03-mobile.webp"
              className="d-block d-md-none w-100"
              alt="img-hosting-mobile"
              style={{ maxHeight: "500px" }}
            />

            <div className="carousel-caption d-none d-md-block text-start w-100 mb-3">
              <h3>Hosting and Domain Included</h3>
              <p>
                *If you do not require a database, the hosting and domain name{" "}
                <br />
                are included in the price of our plans.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            {/* <!-- Imagen para dispositivos no móviles (md y mayores) --> */}
            <img
              src="/img/carrousel-04-desktop.webp"
              className="d-none d-md-block w-100"
              alt="img-ssl"
              style={{ maxHeight: "450px" }}
            />
            {/* <!-- Imagen para dispositivos móviles (xs, sm) --> */}
            <img
              src="/img/carrousel-04-mobile.webp"
              className="d-block d-md-none w-100"
              alt="img-ssl-mobile"
              style={{ maxHeight: "500px" }}
            />

            <div className="carousel-caption d-none d-md-block text-start w-75 mb-3">
              <h3>Managed SSL Certificate</h3>
              <p>
                We take care of the SSL to make your site secure, already
                included in the price in the price of our plans.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default CarrouselEn;
