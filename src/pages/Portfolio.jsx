import React from 'react'
import { Link } from 'react-router-dom'

const Portfolio = () => {
  return (
<>
<div className="container bg-black w-100 animate__animated animate__fadeIn" style={{marginTop: '150px'}}>
  <div className="row gx-0 mb-lg-0 justify-content-center" id="projects">
    <h2 className="text-center text-white mb-4">Portafolio</h2>
  <div className="col-lg-6">
    <img className="img-fluid w-100 h-100" src="img/optilab.webp" alt="pagina-optilab"/></div>  
  <div className="col-lg-6">
    <div className="bg-black text-center h-100 project">
      <div className="d-flex h-100">
        <div className="project-text w-100 my-auto text-center text-lg-left">
          <h4 className="text-white  mt-3" >OPTILAB</h4>
          <p className="m-2 text-white-50">
          Página web con el objetivo de reflejar una imagen profesional y formal de la empresa Optilab Chajari. 
          Esta plataforma sirve como un punto de contacto esencial para los clientes y prospectos, 
          ofreciendo información detallada sobre los productos, servicios disponibles y formas de contacto directo.
          </p>
          <div className="text-center m-4">
            <a href="https://optilabchajari.com" className="btn btn-primary" target="_blank"  >OPTILAB</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div className="row gx-0 mb-lg-0 justify-content-center">
  <div className="col-lg-6">
    <img className="img-fluid w-100" src="img/Golden-Inicio.webp" alt="pagina-golden"/></div>
    <div className="col-lg-6 order-lg-first">
      <div className="bg-black text-center h-100 project">
        <div className="d-flex h-100">
          <div className="project-text w-100 my-auto text-center text-lg-right">
            <h4 className="text-white mt-3">GOLDEN HORSES</h4>
            <p className="m-2 text-white-50">
              Golden Horses es un sitio web responsive creado en colaboración con los diseñadores del producto y su productor. 
              Este proyecto se enfoca en capturar la esencia de un producto natural, libre de fertilizantes, que compite con las grandes compañías del mercado. 
              La plataforma ofrece información detallada sobre el producto, abarcando desde sus beneficios hasta su información nutricional.
            </p>
            <div className="text-center m-4">
              <a href="https://goldenhorses.com.ar/index.html" className="btn btn-primary" target="_blank" >GOLDEN HORSES</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row gx-0 mb-lg-0 justify-content-center" >
  <div className="col-lg-6">
    <img className="img-fluid img-cover" src="img/una-vida.webp" alt="pagina-unavida.tech"/></div>  
  <div className="col-lg-6">
    <div className="bg-black text-center h-100 project">
      <div className="d-flex h-100">
        <div className="project-text w-100 my-auto text-center text-lg-left">
          <h4 className="text-white  mt-3" >UNA VIDA .TECH</h4>
          <p className="m-2 text-white-50">
            Unavida.tech es un sitio web dinámico y eficiente, desarrollado con HTML, CSS y JavaScript puro, 
            evitando el uso de librerías para optimizar el rendimiento. Diseñado específicamente 
            para empresas en busca de soluciones tecnológicas, esta plataforma digital se centra en la transformación 
            y mejora de procesos empresariales a través de la tecnología. 
            Ofrece una interfaz intuitiva y una experiencia de usuario fluida, 
            destacando por su enfoque en la eficiencia y la innovación tecnológica.
          </p>
          <div className="text-center m-4">
            <a href="https://unavida.tech" className="btn btn-primary" target="_blank"  >UNAVIDA.TECH</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</>
  )
}

export default Portfolio