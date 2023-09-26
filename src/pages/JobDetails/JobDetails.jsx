import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./JobDetails.scss";
import { FaCalendarCheck, FaCalendarTimes, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import Notifications from "../../components/Modals/Notifications";

const JobDetails = () => {
  const { id } = useParams();

  //Get the user from local storage
  const Token = window.localStorage.getItem("token");

  const [_id, set_id] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [requirement, setRequirement] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [comEmail, setComEmail] = useState("");
  const [webSiteUrl, setWebSiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [descImgUrl, setDescImgUrl] = useState(null);
  const [expDate, setExpDate] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [jobUrgency, setjobUrgency] = useState("");

   //Alert Notification
   const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });


  // console.log(jobUrgency);

  useEffect(() => {
    function getDetails() {
      axios
        .get(
          `https://rwa-webapp.azurewebsites.net/api/jobMgt/GetSpecificJob/${id}`
        )

        .then((res) => {
          set_id(res.data.job._id);
          setJobTitle(res.data.job.jobTitle);
          setcompanyName(res.data.job.companyName);
          setLocation(res.data.job.location);
          setJobType(res.data.job.jobType);
          setDescription(res.data.job.description);
          setAbout(res.data.job.about);
          setRequirement(res.data.job.requirement);
          setPostedBy(res.data.job.postedBy);
          setComEmail(res.data.job.comEmail);
          setWebSiteUrl(res.data.job.webSiteUrl);
          setFacebookUrl(res.data.job.facebookUrl);
          setTwitterUrl(res.data.job.twitterUrl);
          setInstagramUrl(res.data.job.instagramUrl);
          setLinkedinUrl(res.data.job.linkedinUrl);
          setDescImgUrl(res.data.job.descImgUrl);
          setExpDate(res.data.job.expDate);
          setPostedDate(res.data.job.postedDate);
          setCategory(res.data.job.category);
          setSubCategory(res.data.job.subCategory);
          setjobUrgency(res.data.job.jobUrgency);

          // console.log(res.data.job);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getDetails();
  }, []);



  //add to save jobs===========================================

  const saveAjob = () => {
    try {
      const setAxiosToken = (token) => {
        axios.defaults.headers.common["Authorization"] = `${token}`;
        axios.defaults.headers.post["Content-Type"] =
          "application/json; charset=utf-8";
      };
      setAxiosToken(Token);

      axios
        .post(`https://rwa-webapp.azurewebsites.net/api/savedjobs/savejob/${id}`)
        .then((res) => {
          console.log(res);
          setNotify({
            isOpen: true,
            message: "Job Added To Favourite Jobs!",
            type: "success",
          });
          
          setTimeout(() => (window.location.href = "/Home"), 1500);
        });
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Job Already in favourits!",
        type: "error",
      });
    }
  };

  return (
    <div>
      <Header />
      <Container className="job-details-container">
        <div className="job-details-container__header">
          <div className="job-details-container__header-left">
            <div className="job-details-container__header-left-topic">
              <span>{jobTitle}</span>
            </div>

            <div className="job-details-container__header-left-companydata">
              <div className="job-details-container__header-left-companydata-company">
                <i className="ri-building-fill"></i>
                <span>{companyName}</span>
              </div>

              <div className="job-details-container__header-left-companydata-location">
                <i className="ri-map-pin-line"></i>
                <span>{location}</span>
              </div>
            </div>

            <div className="job-details-container__header-left-jobtype">
              <div className="job-details-container__header-left-jobtype-time">
                <button>{jobType}</button>
              </div>

              {/* {jobUrgency === "Urgent" ? ( */}
              <div className="job-details-container__header-left-jobtype-urgency">
                <button>Urgent</button>
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div className="job-details-container__header-right">
            <div className="job-details-container__header-right-image">
              <img
                src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657546136/Resume_folder-bro_oa6te4.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          className="job-details-container__body"
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          <div className="job-details-container__body-description">
            <div className="job-details-container__body-description-header">
              <h4>Description</h4>
            </div>
            {description}
          </div>

          <div
            className="job-details-container__body-description"
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            <div className="job-details-container__body-description-header">
              <h4>About the Role</h4>
            </div>
            {about}
          </div>

          <div
            className="job-details-container__body-description"
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            <div className="job-details-container__body-description-header">
              <h4>Requirements</h4>
            </div>
            {requirement}
          </div>
        </div>

        <div className="job-details-container__footer">
          <div className="job-details-container__footer-content">
            <div className="job-details-container__footer-content-left">
              <img src={descImgUrl} alt="" />
            </div>
            <div className="job-details-container__footer-content-right">
              <div className="job-details-container__footer-content-right-dates">
                <div
                  className="job-details-container__footer-content-right-dates-postedOn"
                  style={{
                    marginLeft: "-20px",
                  }}
                >
                  <div className="job-details-container__footer-content-right-dates-postedOn-icon">
                    <FaCalendarCheck />
                  </div>
                  <div className="job-details-container__footer-content-right-dates-postedOn-content">
                    <div className="job-details-container__footer-content-right-dates-postedOn-content-title">
                      Posted On
                    </div>
                    <div className="job-details-container__footer-content-right-dates-postedOn-content-datetime">
                      {postedDate.slice(0, 10)}
                    </div>
                  </div>
                </div>

                <div className="job-details-container__footer-content-right-dates-experingon">
                  <div className="job-details-container__footer-content-right-dates-experingon-icon">
                    <FaCalendarTimes />
                  </div>
                  <div className="job-details-container__footer-content-right-dates-experingon-content">
                    <div className="job-details-container__footer-content-right-dates-experingon-content-title">
                      Expering On
                    </div>
                    <div className="job-details-container__footer-content-right-dates-experingon-content-datetime">
                      {expDate.slice(0, 10)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="job-details-container__footer-content-right-apply">
                <Link to={`/Apply/${_id}`}>
                  <button>Apply Now</button>
                </Link>

                <div
                  title="Add to Favourites"
                  onClick={saveAjob}
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                >
                  <FaRegHeart
                    style={{
                      fontSize: "24px",
                      color: "red",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="job-details-container__footer-footer">
            <span>
              Unemployment in Sri Lanka is estimated to be over 400,000, Share
              this job and help another!
            </span>
          </div>
        </div>
      </Container>
      <Notifications notify={notify} setNotify={setNotify} />
      <Footer />
    </div>
  );
};

export default JobDetails;
