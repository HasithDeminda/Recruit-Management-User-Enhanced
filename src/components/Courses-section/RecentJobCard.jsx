import React from "react";
import { Link } from "react-router-dom";

const RecentJobCard = (props) => {
  const { imgUrl, title, company, jobType, location } = props.item;

  return (
    <div className="single__course__item">
      <div className="course__img" style={{ overflow: "hidden" }}>
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-4">{title}</h6>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i className="ri-building-fill"></i> {company} Lessons
          </p>

          <p className="students d-flex align-items-center gap-1">
            <i className="ri-user-line"></i> {jobType}
          </p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
            <i className="ri-map-pin-line"></i> {location}
          </p>
        </div>
        <p
          className="enroll d-flex align-items-center gap-1"
          style={{ justifyContent: "center" }}
        >
          <Link to={`/login`}>
            <button className="btn">Apply Now</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecentJobCard;
