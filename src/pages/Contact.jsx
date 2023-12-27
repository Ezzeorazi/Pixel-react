import React from 'react'

const Contact = () => {
  return (
    <>
<section className="masthead w-100" id="signup" style={{height: '680px', marginTop: '120px'}}>
  <div className="container px-4 px-lg-5">
    <div className="row gx-4 gx-lg-5">
      <div className="col-md-12 col-lg-8 mx-auto text-center">
        <h2 className="text-white mb-4">Contactanos</h2>
      <form action="https://formsubmit.co/7a3e660869721db4c8c655f2b3bc13d0" method="POST">
        <div className="mb-2">
          <label htmlFor="companyName" className="form-label text-white">Nombre de su empresa</label>
          <input type="text" name="company" className="form-control" id="companyName" placeholder="Su nombre o de su empresa"/>
        </div>
      <div className="mb-2">
        <label htmlFor="exampleFormControlInput1" className="form-label text-white">Email</label>
        <input type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="Email"/>
      </div>
      
      <div className="mb-2">
        <label htmlFor="phone" className="form-label text-white">Teléfono</label>
        <input type="number" name="phone" className="form-control" id="phone" placeholder="Teléfono"/>
      </div>
      <div className="mb-2">
        <label htmlFor="country" className="form-label text-white">País</label>
        <input type="text" name="country" className="form-control" id="country" placeholder="País"/>
      </div>
      
      <div className="mb-2">
        <label htmlFor="exampleFormControlTextarea1" className="form-label text-white slide-in-right">Mensaje</label>
        <textarea name="mensaje" className="form-control" id="exampleFormControlTextarea1" placeholder="Mensaje" rows="3"></textarea>
      </div>
        <button type="submit" className="btn border btn-outline-warning mt-3">Contacto</button>
      </form>   
    </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Contact