import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import Notifications from "../../components/Modals/Notifications";
import "./AppliedJobs.scss";

const AppliedJobs = () => {
  const Token = localStorage.getItem("token");
  const [applied, setApplied] = useState([
    {
      _id: "",
      userId: "",
      jobId: "",
      userResumeUrl: "",
      appliedJobTitle: "",
      appliedJobImageUrl: "",
      appliedJobCategory: "",
      appliedJobSubCategory: "",
      appliedCompanyName: "",
      appliedCompanyLocation: "",
      appliedCompanyEmail: "",
      appliedJobStatus: "",
    },
  ]);

  const [appliedJobId, setAppliedJobId] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    function getDetails() {
      axios
        .get(
          "https://rwa-webapp.azurewebsites.net/api/applyJob/getUserAppliedJobs",
          {
            headers: {
              Authorization: `${Token}`,
            },
          }
        )

        .then((res) => {
          console.log(res.data.userAppliedjobs);
          setApplied(res.data.userAppliedjobs);
          // setAppliedJobId(res.data.userAppliedjobs._id);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getDetails();
  }, []);

  //Delete applied job
  const deleteAppliedJob = (appliedJobId) => {
    axios
      .put(
        `https://rwa-webapp.azurewebsites.net/api/applyJob/removeAppliedJob/${appliedJobId}`,
        {
          headers: {
            Authorization: `${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Job Removed successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const filterData = (applied, searchKey) => {
    const result = applied.filter(
      (apliedJob) =>
        apliedJob.appliedJobTitle.toLowerCase().includes(searchKey) ||
        apliedJob.appliedCompanyName.toLowerCase().includes(searchKey)
    );

    setApplied(result);
  };

  const onSearrch = (e) => {
    console.log(e.target.value);

    const searchKey = e.target.value.toLowerCase();

    axios
      .get(
        "https://rwa-webapp.azurewebsites.net/api/applyJob/getUserAppliedJobs",
        {
          headers: {
            Authorization: `${Token}`,
          },
        }
      )

      .then((res) => {
        // setApplied(res.data.userAppliedjobs);

        filterData(res.data.userAppliedjobs, searchKey);
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="applications-container">
      <div className="search-reports">
        <div className="search-reports-container">
          <input
            className="search-reports-input"
            type="text"
            placeholder="Search"
            onChange={onSearrch}
          />
          <button className="search-btn">Search</button>
        </div>

        {/* <button className="report-btn">
          <TbReportAnalytics />
          Generate Report
        </button> */}
      </div>

      <div className="applications-body">
        {applied.map((item) => (
          <div className="applications-body-row" key={item._id}>
            <div className="applications-body-row-img">
              <img src={item.appliedJobImageUrl} alt="avatar" />
            </div>
            <div className="applications-body-row-details">
              <div className="applications-body-row-details-title">
                {item.appliedJobTitle}
              </div>
              <div className="jobTime">
                <button>Full Time</button>
              </div>
              <div className="applications-body-row-details-companydata">
                <div className="applications-body-row-details-companydata-company">
                  <i className="ri-building-fill"></i>
                  <span>{item.appliedCompanyName}</span>
                </div>
                <div className="applications-body-row-details-companydata-location">
                  <i className="ri-map-pin-line"></i>
                  <span>{item.appliedCompanyLocation}</span>
                </div>
              </div>
            </div>

            <div
              className="vl"
              style={{
                borderLeft: "1px solid #888181",
                height: "175px",
              }}
            ></div>

            <div className="applications-body-row-status">
              <div className="applications-body-row-status-btns">
                <Link to={`/jobDetails/${item.jobId}`}>
                  <button className="applications-body-row-status-btns-view">
                    View
                  </button>
                </Link>

                <button
                  className="applications-body-row-status-btns-delete"
                  onClick={(event) => {
                    deleteAppliedJob(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AppliedJobs;
