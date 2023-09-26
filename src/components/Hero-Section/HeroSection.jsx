import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                You deserve a job <br /> that loves you back
              </h2>
              <p className="mb-5">
                Millions of people are searching for jobs, <br />
                salary information, company reviews, and <br />
                interview questions. Let's find your dream job today.
                <br />
                <br />
                Login to your account to get started.
              </p>
            </div>
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <div className="search" style={{ marginTop: "-25px" }}>
                {/* <input type="text" placeholder="Search" /> */}
                <button className="btn" style={{ textDecoration: "none" }}>
                  Login Here
                </button>
              </div>
            </Link>
          </Col>

          <Col lg="6" md="6">
            <img
              src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657298746/Resume-bro_eno32p.png"
              alt=""
              className="w-100 hero__img"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
