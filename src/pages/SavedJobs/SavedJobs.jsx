import React, { useEffect, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { Col, Container, Row } from "reactstrap";
import SavedJobsCard from "../../components/All-Jobs/SavedJobsCard";
import "./SavedJobs.scss";
import courseImg01 from "../../assests/images/web-development.png";
import courseImg02 from "../../assests/images/kids-learning.png";
import courseImg03 from "../../assests/images/seo.png";
import courseImg04 from "../../assests/images/ui-ux.png";
import axios from "axios";

const SavedJobs = () => {
  const Token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([
    {
      _id: "",
      jobTitle: "",
      companyName: "",
      descImgUrl: "",
      jobType: "",
      location: "",
      jobDetails: "",
    },
  ]);

  useEffect(() => {
    function getDetails() {
      axios
        .get(`https://rwa-webapp.azurewebsites.net/api/savedjobs/savedJobs`, {
          headers: {
            Authorization: `${Token}`,
          },
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    }

    getDetails();
  }, []);

  console.log(jobs);

  const filterData = (jobs, searchKey) => {
    const result = jobs.filter((savejobs) =>
      savejobs.jobDetails.jobTitle.toLowerCase().includes(searchKey)
    );
    setJobs(result);
  };

  const onSearch = (e) => {
    console.log(e.target.value);
    const search = e.target.value.toLowerCase();

    axios
      .get(`https://rwa-webapp.azurewebsites.net/api/savedjobs/savedJobs`, {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        filterData(res.data.jobs, search);
      });
  };
  return (
    <div className="savedjobs-container">
      <div className="search-reports">
        <div className="search-reports-container">
          <input
            className="search-reports-input"
            type="text"
            placeholder="Search"
            onChange={onSearch}
          />
          <button className="search-btn">Search</button>
        </div>

        {/* <button className="report-btn">
          <TbReportAnalytics />
          Generate Report
        </button> */}
      </div>

      <div className="savedjobs-body">
        <section>
          <Container>
            <Row>
              {jobs.map((item) => (
                <Col lg="4" md="6" className="mb-4" key={item._id}>
                  <SavedJobsCard item={item.jobDetails} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default SavedJobs;
