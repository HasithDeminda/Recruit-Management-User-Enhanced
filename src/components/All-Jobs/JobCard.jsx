import React from "react";
import { Link } from "react-router-dom";
import truncate from "truncate";

const JobCard = (props) => {
  const { _id, jobTitle, companyName, descImgUrl, jobType, location } =
    props.item;

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <Link
          to={`/Home/${_id}
        `}
        >
          <img
            src={descImgUrl}
            alt=""
            className="w-100"
            style={{
              height: "300px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          />
        </Link>
        <button className="btn free__btn">{jobType}</button>
      </div>

      <div className="free__course__details">
        <h6 title={jobTitle}>{truncate(jobTitle, 30)}</h6>

        <div className=" d-flex align-items-center gap-5">
          <span
            className=" d-flex align-items-center gap-2"
            title={companyName}
          >
            <i className="ri-building-fill"></i> {truncate(companyName, 15)}
          </span>

          <span className=" d-flex align-items-center gap-2" title={location}>
            <i className="ri-map-pin-line"></i> {truncate(location, 15)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
