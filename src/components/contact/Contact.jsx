import React from 'react';

const ContactPage = () => {
  const showPopup = (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way
    alert('Thanks for your review');
  };

  return (
    <div>
      {/* Contact Start */}
      <div className="container-fluid contact py-5" id="ContactPage" >
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: '700px' }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <a
                    href="https://api.whatsapp.com/send?phone=919363620057&text=For%20Orders"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      type="button"
                      className="btn btn-primary border-0 border-secondary py-3 px-4 rounded-pill text-white"
                    >
                      <i className="bi bi-whatsapp"></i> For Orders
                    </button>
                  </a>
                </div>
              </div>

              <div className="col-lg-7">
                <form onSubmit={showPopup}>
                  <input
                    type="text"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                  />
                  <textarea
                    className="w-100 form-control border-0 mb-4"
                    rows="5"
                    cols="10"
                    placeholder="Your Message"
                  ></textarea>
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">C.K Colony, New Sidhapudur, Coimbatore.</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">ollirorganics@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">9363620057</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}

      
    </div>
  );
};

export default ContactPage;
