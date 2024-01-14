import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactEn = () => {
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
    if (!form.company) newErrors.company = 'The company name is required.';
    if (!emailRegex.test(form.email)) newErrors.email = 'The email is not valid.';
    if (!form.phone.match(/^[0-9]+$/)) newErrors.phone = 'The phone should only contain numbers.';
    if (!form.country) newErrors.country = 'The country is needed.';
    if (!form.message) newErrors.message = 'The message cannot be empty.';
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
              <h2 className="text-white mb-4">Contact us</h2>
              <Form ref={formRef}
                    action="https://formsubmit.co/7a3e660869721db4c8c655f2b3bc13d0"
                    method="POST"
                    noValidate 
                    onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  {/* <Form.Label htmlFor="company">Name</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Your name or your company's name"
                    value={form.company}
                    onChange={handleChange}
                    isInvalid={!!errors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.company}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  {/* <Form.Label htmlFor="email">Email</Form.Label> */}
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
                  {/* <Form.Label htmlFor="phone">Phone number</Form.Label> */}
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  {/* <Form.Label htmlFor="country">Country</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  {/* <Form.Label htmlFor="message">Message</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="btn border btn-outline-warning mt-3">Contact us</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactEn;
