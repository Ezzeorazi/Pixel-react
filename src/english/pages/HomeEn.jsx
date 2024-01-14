import React from "react";
import { NavLink } from "react-router-dom";
import CarrouselEn from "../components/CarrouselEn";

const HomeEn = () => {
  return (
    <>
      <header className="masthead animate__animated animate__fadeIn">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1>Digital Marketing and Web Development Agency</h1>

              <NavLink
                hreflang="en"
                className="btn btn-primary tracking-in-contract-bck-bottom mb-4"
                to="/en/portfolioen"
              >
                Learn more
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      {/* carrousel */}
      <CarrouselEn />
      <div className="bg-primary text-dark ">
        <div className="container-fluid px-4 px-lg-5 mb-3 p-0 mt-5">
          <h2 className="text-center text-white pt-5 ">What we offer?</h2>
          <h5 className="text-center text-white pb-2">
            Complete solutions that meet your project needs.
          </h5>
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-4 mb-3 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="/img/sitiosWeb.png"
                    alt="img-sitiosweb-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Websites</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      We create custom websites that are the digital face of
                      your business or project. business or project. Our
                      websites are unique and functional designs designs that
                      adapt to your needs and reflect your brand's your brand's
                      personality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">tendency</div>
                <div className="card-body text-center">
                  <img
                    src="/img/landingPage.png"
                    alt="img-landing-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Landing Page</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      A well-designed website is essential to establish a solid
                      online presence. a solid online presence. It helps you
                      attract and retain customers, share relevant information
                      and present your business your business in a professional
                      manner.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="/img/tiendaOnline.png"
                    alt="img-sitiosweb-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">E-Commerce</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      We create complete e-commerce where you can sell your
                      products or services products or services in a secure and
                      convenient way. From product selection to the checkout
                      process, we design an efficient shopping experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">tendency</div>
                <div className="card-body text-center">
                  <img
                    src="/img/logo-SEO.png"
                    alt="img-SEO"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">SEO</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      We optimize your website to improve its visibility on
                      search engines, ensuring that it search engines, ensuring
                      it attracts the right visitors. the right visitors.
                      Through effective SEO strategies strategies, we increase
                      the quality and quantity of web traffic, connecting you
                      connecting you with those looking for your products or
                      services. services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="/img/logo-Marketing.png"
                    alt="img-Marketing-digital"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Marketing Digital</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      We develop effective digital marketing strategies that
                      increase the online presence of your business. From social
                      media management to email marketing campaigns marketing
                      campaigns, we make sure that your message reaches your
                      target target audience in the most impactful way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">tendency</div>
                <div className="card-body text-center">
                  <img
                    src="/img/logo-diseñografico.png"
                    alt="img-Logo-DiseñoGrafico"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Graphic Design</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      We transform ideas into attractive and powerful graphic
                      designs that capture the essence of your business. From
                      from logos to marketing materials, we focus on creating
                      visuals that not only creating visuals that not only catch
                      the eye, but also make a lasting establish a lasting
                      connection with your audience. audience.
                    </p>
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

export default HomeEn;
