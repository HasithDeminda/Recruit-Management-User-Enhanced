import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import courseImg01 from "../../assests/images/web-development.png";
import courseImg02 from "../../assests/images/kids-learning.png";
import courseImg03 from "../../assests/images/seo.png";
import courseImg04 from "../../assests/images/ui-ux.png";

import "./AllJobs.css";
import JobCard from "./JobCard";
import axios from "axios";

const AllJobs = () => {
  //Get id from local storage
  const userId = localStorage.getItem("Token");

  const [jobs, setJobs] = useState([
    {
      _id: "",
      jobTitle: "",
      companyName: "",
      descImgUrl: "",
      jobType: "",
      location: "",
    },
  ]);

  useEffect(() => {
    function getDetails() {
      axios
        .get("https://rwa-webapp.azurewebsites.net/api/jobMgt/GetAllActiveJobs")

        .then((res) => {
          setJobs(res.data.allActiveJobs);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getDetails();
  }, []);
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Featured Jobs</h2>
          </Col>

          {jobs.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item._id}>
              <JobCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AllJobs;
