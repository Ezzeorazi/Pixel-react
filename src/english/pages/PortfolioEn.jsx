import React from "react";

const PortfolioEn = () => {
  return (
    <>
      <div
        className="container bg-black w-100 animate__animated animate__fadeIn"
        style={{ marginTop: "150px" }}
      >
        <div className="row gx-0 mb-lg-0 justify-content-center" id="projects">
          <h2 className="text-center text-white mb-4">Portfolio</h2>
          <div className="col-lg-6">
            <img
              className="img-fluid w-100 h-100"
              src="/img/optilab.webp"
              alt="pagina-optilab"
            />
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white  mt-3">OPTILAB</h4>
                  <p className="m-2 text-white-50">
                  Web page with the objective of reflecting a professional and formal
                    professional and formal image of the company Optilab Chajari. This
                    platform serves as an essential point of contact for clients and prospects, offering
                    customers and prospects, offering detailed information
                    products, services available and ways of direct contact.
                    direct contact.
                  </p>
                  <div className="text-center m-4">
                    <a
                      href="https://optilabchajari.com"
                      className="btn btn-primary"
                      target="_blank"
                    >
                      OPTILAB
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-0 mb-lg-0 justify-content-center">
          <div className="col-lg-6">
            <img
              className="img-fluid w-100"
              src="/img/Golden-Inicio.webp"
              alt="pagina-golden"
            />
          </div>
          <div className="col-lg-6 order-lg-first">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-right">
                  <h4 className="text-white mt-3">GOLDEN HORSES</h4>
                  <p className="m-2 text-white-50">
                  Golden Horses is a responsive website created in collaboration with the designers of the
                    collaboration with the designers of the product and its
                    producer. This project is focused on capturing the essence of a natural, fertilizer free
                    a natural, fertilizer-free product that competes with the big companies in the
                    companies in the market. The platform offers
                    detailed information about the product, ranging from its benefits to its nutritional
                    benefits to nutritional information.
                  </p>
                  <div className="text-center m-4">
                    <a
                      href="https://goldenhorses.com.ar/index.html"
                      className="btn btn-primary"
                      target="_blank"
                    >
                      GOLDEN HORSES
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-0 mb-lg-0 justify-content-center">
          <div className="col-lg-6">
            <img
              className="img-fluid img-cover"
              src="/img/una-vida.webp"
              alt="pagina-unavida.tech"
            />
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white  mt-3">UNA VIDA .TECH</h4>
                  <p className="m-2 text-white-50">
                  Unavida.tech is a dynamic and efficient website,
                    developed with pure HTML, CSS and JavaScript, avoiding the use of libraries to
                    libraries to optimize performance. Designed
                    specifically for companies looking for technological solutions
                    solutions, this digital platform is focused on business process
                    transformation and improvement of business processes through technology.
                    technology. It offers an intuitive interface and a seamless user
                    user experience, and stands out for its focus on efficiency and technological innovation.
                    efficiency and technological innovation.
                  </p>
                  <div className="text-center m-4">
                    <a
                      href="https://unavida.tech"
                      className="btn btn-primary"
                      target="_blank"
                    >
                      UNAVIDA.TECH
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioEn;
