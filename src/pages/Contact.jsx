import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [form, setForm] = useState({
    company: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!form.company) newErrors.company = 'El nombre de la empresa es necesario.';
    if (!emailRegex.test(form.email)) newErrors.email = 'El email no es válido.';
    if (!form.phone.match(/^[0-9]+$/)) newErrors.phone = 'El teléfono solo debe contener números.';
    if (!form.country) newErrors.country = 'El país es necesario.';
    if (!form.message) newErrors.message = 'El mensaje no puede estar vacío.';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      // Si hay errores, se actualiza el estado de errores y se evita el envío
      setErrors(newErrors);
    } else {
      // No hay errores, limpia cualquier error existente y procede al envío
      setErrors({});
      formRef.current.submit(); // Envía el formulario si la validación es exitosa
    }
  };
  

  return (
    <>
      <section className="masthead w-100 animate__animated animate__fadeIn" id="signup" style={{ height: '680px', marginTop: '120px' }}>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-12 col-lg-8 mx-auto text-center">
              <h2 className="text-white mb-4">Contactanos</h2>
              <Form ref={formRef}
                    action="https://formsubmit.co/7a3e660869721db4c8c655f2b3bc13d0"
                    method="POST"
                    noValidate 
                    onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="company">Nombre de su empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Su nombre o de su empresa"
                    value={form.company}
                    onChange={handleChange}
                    isInvalid={!!errors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.company}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="mobil">Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="country">País</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="País"
                    value={form.country}
                    onChange={handleChange}
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="message">Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Mensaje"
                    value={form.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="btn border btn-outline-warning mt-3">Contacto</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
