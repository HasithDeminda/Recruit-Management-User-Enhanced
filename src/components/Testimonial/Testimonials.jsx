import React from "react";
import "./testimonial.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.png";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="testimonial__wrapper d-flex justify-content-between align-items-center ">
              <div className="testimonial__img w-50">
                <img src={img} alt="" className="w-100" />
              </div>

              <div className="testimonial__content w-50">
                <h2 className="mb-4">Our Clients Voice</h2>

                <Slider {...settings}>
                  <div className="mt-2">
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Excellent website to find Jobs
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis saepe id voluptas molestiae. Aperiam corrupti
                        voluptas earum at molestiae neque!
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Dimalka Heshan</h6>
                        <p>Colombo | Sri Lanka</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Thank You guys so much! I got my job
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis saepe id voluptas molestiae. Aperiam corrupti
                        voluptas earum at molestiae neque!
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Hasith Deminda</h6>
                        <p>Colombo | Sri Lanka</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Very user friendly website
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis saepe id voluptas molestiae. Aperiam corrupti
                        voluptas earum at molestiae neque!
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Nimna Thiranjaya</h6>
                        <p>Colombo | Sri Lanka</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
