import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./AllJobs.css";
import JobCard from "./JobCard";
import axios from "axios";
import Loader from "../../components/Loader"; // Assuming Loader component is in the same directory

const AllJobs = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    function getDetails() {
      setLoading(true);
      axios
        .get("https://rwa-webapp.azurewebsites.net/api/jobMgt/GetAllActiveJobs")
        .then((res) => {
          setJobs(res.data.allActiveJobs);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getDetails();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      {!loading && (
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
      )}
    </>
  );
};

export default AllJobs;
