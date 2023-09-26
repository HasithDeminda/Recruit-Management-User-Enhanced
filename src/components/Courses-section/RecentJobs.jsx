import React from "react";
import { Container, Row, Col } from "reactstrap";
// import courseImg1 from "../../assests/images/web-design.png";
// import courseImg2 from "../../assests/images/graphics-design.png";
// import courseImg3 from "../../assests/images/ui-ux.png";
import Job1 from "../../assests/images/Job1.jpeg";
import Job2 from "../../assests/images/Job2.jpeg";
import Job3 from "../../assests/images/Job3.jpeg";
import "./RecentJobs.css";
import RecentJobCard from "./RecentJobCard";

const jobData = [
  {
    id: "01",
    title: "Intern Software Engineer",
    company: "hSenid Technologies Pvt. Ltd",
    jobType: "Internship",
    location: "Colombo",
    imgUrl: Job1,
  },

  {
    id: "02",
    title: "AWS System Administrators",
    company: "Digital Areana Pvt. Ltd",
    jobType: "Full Time",
    location: "Colombo",
    imgUrl: Job2,
  },

  {
    id: "03",
    title: "Software Engineers .NET",
    company: "EVICIO Pvt. Ltd",
    jobType: "Full Time",
    location: "Colombo",
    imgUrl: Job3,
  },
  // {
  //   id: "04",
  //   title: "Intern Software Engineer",
  //   company: "hSenid Technologies Pvt. Ltd",
  //   jobType: "Internship",
  //   location: "Colombo",
  //   imgUrl: Job1,
  // },

  // {
  //   id: "05",
  //   title: "AWS System Administrators",
  //   company: "Digital Areana Pvt. Ltd",
  //   jobType: "Full Time",
  //   location: "Colombo",
  //   imgUrl: Job2,
  // },

  // {
  //   id: "06",
  //   title: "Software Engineers .NET",
  //   company: "EVICIO Pvt. Ltd",
  //   jobType: "Full Time",
  //   location: "Colombo",
  //   imgUrl: Job3,
  // },
];

// const settings = {
//   infinite: true,
//   dots: true,
//   speed: 500,
//   slidesToShow: 1,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   slidesToScroll: 1,
// };

const RecentJobs = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Recently Posted Jobs</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <button className="btn">See All</button>
              </div>
            </div>
          </Col>

          {/* <Slider {...settings}> */}
          {jobData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <RecentJobCard key={item.id} item={item} />
            </Col>
          ))}
          {/* </Slider> */}
        </Row>
      </Container>
    </section>
  );
};

export default RecentJobs;
