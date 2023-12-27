import React from "react";

const Carrousel = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
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
              <h3>Creamos su página web personalizada</h3>
              <p>
                Con un diseño distintivo construimos una presencia digital que
                potencia tu marca. <br />
                Creamos páginas interactivas y formularios eficientes para
                garantizar una experiencia de usuario inigualable. <br />
                Tras tu aprobación, tu sitio estará listo para impresionar y
                facilitar la interacción con tus clientes.
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
              <h3>Tecnologías Utilizadas</h3>
              <p>
                HTML y CSS son la base de toda web, Bootstrap acelera el
                desarrollo, <br />
                Javascript hace tu sitio interactivo, y React nos permite
                construir interfaces de usuario modernas y eficientes.
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
              <h3>Hosting y Dominio Incluidos</h3>
              <p>
                *Si no requieres base de datos, el hosting y dominio <br />{" "}
                están incluidos en el precio de nuestros planes.
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
              <h3>Certificado SSL Gestionado</h3>
              <p>
                Nos encargamos del SSL para que tu sitio sea seguro, ya incluido
                en el precio de nuestros planes.
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

export default Carrousel;
