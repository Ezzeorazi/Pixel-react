import React from "react";
import { NavLink } from "react-router-dom";
import Carrousel from "../components/Carrousel";

const Home = () => {
  return (
    <>
      <header className="masthead animate__animated animate__fadeIn">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1>Agencia de Marketing digital y Desarrollo Web</h1>

              <NavLink
                className="btn btn-primary tracking-in-contract-bck-bottom mb-4"
                to="/portfolio"
              >
                Conocenos mas
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      {/* carrousel */}
      <Carrousel />
      <div className="bg-primary text-dark ">
        <div className="container-fluid px-4 px-lg-5 mb-3 p-0 mt-5">
          <h2 className="text-center text-white pt-5 ">¿Qué ofrecemos?</h2>
          <h5 className="text-center text-white pb-2">
            Soluciones completas que satisfacen las necesidades de tu proyecto.
          </h5>
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-4 mb-3 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="img/sitiosWeb.png"
                    alt="img-sitiosweb-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Sitios Web</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Creamos sitios web a medida que son la cara digital de tu
                      negocio o proyecto. Nuestros sitios web son diseños únicos
                      y funcionales que se adaptan a tus necesidades y reflejan
                      la personalidad de tu marca.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">En tendencia</div>
                <div className="card-body text-center">
                  <img
                    src="img/landingPage.png"
                    alt="img-landing-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Landing Page</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Un sitio web bien diseñado es esencial para establecer una
                      presencia en línea sólida. Te ayuda a atraer y retener a
                      clientes, compartir información relevante y presentar tu
                      negocio de manera profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-0 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="img/tiendaOnline.png"
                    alt="img-sitiosweb-responsive"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Tiendas Online</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Creamos tiendas en línea completas donde puedes vender tus
                      productos o servicios de manera segura y conveniente.
                      Desde la selección de productos hasta el proceso de pago,
                      diseñamos una experiencia de compra eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">En tendencia</div>
                <div className="card-body text-center">
                  <img
                    src="img/logo-SEO.png"
                    alt="img-SEO"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">SEO</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Optimizamos tu sitio web para mejorar su visibilidad en
                      los motores de búsqueda, asegurando que atraiga a los
                      visitantes adecuados. A través de estrategias de SEO
                      efectivas, incrementamos la calidad y cantidad del tráfico
                      web, conectándote con aquellos que buscan tus productos o
                      servicios.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <img
                    src="img/logo-Marketing.png"
                    alt="img-Marketing-digital"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Marketing Digital</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Desarrollamos estrategias de marketing digital efectivas
                      que incrementan la presencia online de tu negocio. Desde
                      administración de redes sociales hasta campañas de email
                      marketing, nos aseguramos de que tu mensaje llegue a tu
                      público objetivo de la manera más impactante.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-4 mt-4">
              <div className="card py-4 h-100">
                <div className="badge">En tendencia</div>
                <div className="card-body text-center">
                  <img
                    src="img/logo-diseñografico.png"
                    alt="img-Logo-DiseñoGrafico"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5 className="text-uppercase mt-3">Diseño Grafico</h5>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black">
                    <p>
                      Transformamos ideas en diseños gráficos atractivos y
                      poderosos que capturan la esencia de tu negocio. Desde
                      logotipos hasta materiales de marketing, nos enfocamos en
                      crear visuales que no solo llamen la atención, sino que
                      también establezcan una conexión duradera con tu
                      audiencia.
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

export default Home;
