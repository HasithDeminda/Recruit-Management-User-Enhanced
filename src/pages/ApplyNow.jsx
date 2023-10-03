import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { MdCloudUpload } from "react-icons/md";
import "./ApplyNow.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import Notifications from "../components/Modals/Notifications";

const ApplyNow = () => {
  //Get token from local storage
  const Token = localStorage.getItem("token");

  const [btnLoading, setbtnLoading] = useState(false);

  const params = useParams();

  const jobId = params.id;

  const navigate = useNavigate();

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [userResumeUrl, setuserResumeUrl] = useState(null);
  const [emailSubject, setemailSubject] = useState();
  const [emailBody, setemailBody] = useState();
  const [fullName, setfullName] = useState();

  const [error, setError] = useState({
    fullNameError: "",
    emailSubjectError: "",
    emailBodyError: "",
    userResumeUrlError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnLoading(true);
    try {
      const PhoneNumberRegex = new RegExp("^[0-9-+]{9,15}$");
      const spetialCharaterRegex = new RegExp("[^A-Za-z\\s]");
      const subjectRegex = new RegExp("[^A-Za-z]");
      const emailRegex = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
      );

      if (!fullName) {
        var fullNameError = "Full Name is required";
      } else if (spetialCharaterRegex.test(fullName)) {
        var fullNameError = "Full Name cannot contain special characters";
      } else {
        fullNameError = "";
      }

      if (!emailSubject) {
        var emailSubjectError = "Email Subject is required";
      } else if (spetialCharaterRegex.test(emailSubject)) {
        var emailSubjectError =
          "Email Subject cannot contain special characters";
      } else {
        emailSubjectError = "";
      }
      if (!emailBody) {
        var emailBodyError = "Email Body is required";
      } else {
        emailBodyError = "";
      }

      if (!userResumeUrl) {
        var userResumeUrlError = "Resume is required";
      } else {
        userResumeUrlError = "";
      }

      setError({
        fullNameError,
        emailSubjectError,
        emailBodyError,
        userResumeUrlError,
      });

      console.log(error);

      if (
        !fullNameError &&
        !emailSubjectError &&
        !emailBodyError &&
        !userResumeUrlError
      ) {
        const fileName = new Date().getTime().toString() + userResumeUrl.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, userResumeUrl);

        //Upload the file to Firebase Storage
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + " % done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            setbtnLoading(false);
          },
          () => {
            setbtnLoading(false);
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((userResumeUrl) => {
              console.log("File available at :", userResumeUrl);

              const data = {
                userResumeUrl: userResumeUrl,
                emailSubject: emailSubject,
                emailBody: emailBody,
                fullName: fullName,
              };
              console.log(data);
              axios
                .post(
                  //Call API from .env file
                  `${process.env.BE_URI}/job/apply/${jobId}`,
                  data,
                  {
                    headers: {
                      Authorization: `${Token}`,
                    },
                  }
                )
                .then(() => {
                  setNotify({
                    isOpen: true,
                    message: "Applied Successfully !",
                    type: "success",
                  });
                  setTimeout(() => navigate("/Home"), 1500);
                })
                .catch((res) => {
                  setNotify({
                    isOpen: true,
                    message: res.response.data.message,
                    type: "error",
                  });
                  // console.log(res.response.data.message);
                });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setbtnLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="add-new-admin">
        <div className="topic-admin">Apply Now</div>
        <span className="desc-admin">
          You can input your details here. We will send it to the relevant
          receiver.
        </span>

        <div className="personal-info-container">
          <form className="addNewAdmin-form">
            <div className="form-left">
              <div className="input-box">
                <input
                  type="text"
                  required
                  onChange={(e) => setfullName(e.target.value)}
                />
                <label>Full Name</label>
              </div>
              {error.fullNameError && (
                <span
                  className="error-message"
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {error.fullNameError}
                </span>
              )}

              <div className="input-box">
                <input
                  type="text"
                  required
                  onChange={(e) => setemailSubject(e.target.value)}
                />
                <label>Email Subject</label>
              </div>
              {error.emailSubjectError && (
                <span
                  className="error-message"
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "20px",
                    marginTop: "-10px",
                  }}
                >
                  {error.emailSubjectError}
                </span>
              )}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "200",
                  marginBottom: "10px",
                }}
              >
                Upload Your Resume{" "}
                <MdCloudUpload style={{ color: "red", marginTop: "5px" }} />
              </span>
              <div class="input-box">
                <input
                  type="file"
                  required
                  style={{ padding: "10px 20px", marginTop: "-15px" }}
                  autoFocus={true}
                  onChange={(e) => setuserResumeUrl(e.target.files[0])}
                />
              </div>
              {error.userResumeUrlError && (
                <span
                  className="error-message"
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-25px",
                  }}
                >
                  {error.userResumeUrlError}
                </span>
              )}
              <div
                class="input-box"
                style={{
                  height: "100px",
                }}
              >
                <textarea
                  type="text"
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                  required
                  onChange={(e) => setemailBody(e.target.value)}
                />
                <label>Message </label>
              </div>
              <br />

              <br />
              {error.emailBodyError && (
                <span
                  className="error-message"
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {error.emailBodyError}
                </span>
              )}
              <br />
            </div>

            <div className="form-right">
              <div className="right-img">
                <img
                  src="https://res.cloudinary.com/desnqqj6a/image/upload/v1665211757/Mailbox-bro_1_jh1kxo.png"
                  alt=""
                />
              </div>
            </div>
          </form>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-30px",
              marginBottom: "50px",
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              disabled={btnLoading}
              style={{
                padding: "10px 40px",
                backgroundColor: btnLoading ? "#b4b4b4" : "#17bf9e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: btnLoading ? "not-allowed" : "pointer",
              }}
            >
              {btnLoading ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Notifications notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ApplyNow;
