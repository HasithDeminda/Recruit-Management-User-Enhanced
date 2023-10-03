import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import "./EditProfile.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "reactstrap";
import Notifications from "../../components/Modals/Notifications";

const EditProfile = () => {
  //Get the user from local storage
  const Token = localStorage.getItem("token");

  //Get user using useEffect

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [description, setdescription] = useState("");
  const [fburl, setFburl] = useState("");
  const [instaurl, setInstaurl] = useState("");
  const [lnkdinurl, setLnkdinurl] = useState("");
  const [pturl, setPturl] = useState("");
  const [tturl, setTturl] = useState("");
  const [cv, setCv] = useState(null);
  const [heading, setHeading] = useState("");
  const [error, setError] = useState("");
  const [updateError, setupdateError] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNoError: "",
  });

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  //Get user data with useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/user/userProfile", {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        setFirstName(res.data.logedUser.firstName);
        setLastName(res.data.logedUser.lastName);
        setEmail(res.data.logedUser.email);
        setPhoneNo(res.data.logedUser.phoneNo);
        setImageUrl(res.data.logedUser.imageUrl);
        setDob(res.data.logedUser.dob);
        setAddress(res.data.logedUser.address);
        setdescription(res.data.logedUser.description);
        setFburl(res.data.logedUser.fburl);
        setInstaurl(res.data.logedUser.instaurl);
        setLnkdinurl(res.data.logedUser.lnkdinurl);
        setPturl(res.data.logedUser.pturl);
        setTturl(res.data.logedUser.tturl);
        setCv(res.data.logedUser.cv);
        setHeading(res.data.logedUser.heading);

        console.log(res.data.logedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function sendData(e) {
    e.preventDefault();

    const PhoneNumberRegex = new RegExp("^[0-9-+]{9,15}$");
    const spetialCharaterRegex = new RegExp("[^A-Za-z\\s]");

    if (spetialCharaterRegex.test(firstName)) {
      var firstNameError =
        "First Name should not contain special characters and numbers";
    } else {
      var firstNameError = "";
    }
    if (spetialCharaterRegex.test(lastName)) {
      var lastNameError =
        "Last Name should not contain special characters and numbers";
    } else {
      var lastNameError = "";
    }

    if (!PhoneNumberRegex.test(phoneNo)) {
      var phoneNoError = "Phone Number must be a 10 digit number";
    } else {
      var phoneNoError = "";
    }

    setupdateError({
      firstNameError,
      lastNameError,
      phoneNoError,
    });

    if (!firstNameError && !lastNameError && !phoneNoError) {
      const fileName = new Date().getTime().toString() + imageUrl.name;
      const cvName = new Date().getTime().toString() + cv.name;
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        "User/Profile Image" + fileName,
        "User/Resume" + cvName
      );

      const uploadTask = uploadBytesResumable(storageRef, imageUrl, cv);

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
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((imageUrl, cv) => {
            console.log("File available at :", imageUrl, cv);

            const updatedProfle = {
              firstName,
              lastName,
              email,
              phoneNo,
              description,
              instaurl,
              lnkdinurl,
              pturl,
              tturl,
              dob,
              address,
              imageUrl,
              cv,
              heading,
            };
            console.log(updatedProfle);
            axios
              .patch(
                "http://localhost:8090/api/user/userUpdateProfile",
                updatedProfle,
                {
                  headers: {
                    Authorization: `${Token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                setNotify({
                  isOpen: true,
                  message: "Profile Updated Successfully",
                  type: "success",
                });
                setTimeout(() => navigate("/Profile"), 2000);
              })
              .catch((res) => {
                setNotify({
                  isOpen: true,
                  message: "Error updating user profile !",
                  type: "error",
                });
              });
          });
        }
      );
    }
  }

  return (
    <div>
      <Header />
      <Container className="post-new-jobs">
        <div
          className="topic mt-3"
          style={{
            letterSpacing: "1.5px",
          }}
        >
          Edit Profile
        </div>
        <div className="personal-info-container">
          <form className="addJobForm">
            <div className="form-left">
              <div className="topic">Personal Information</div>
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label>First Name</label>
              </div>
              {updateError.firstNameError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {updateError.firstNameError}
                </div>
              )}
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label>Last Name</label>
              </div>
              {updateError.lastNameError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {updateError.lastNameError}
                </div>
              )}
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                />
                <label>Contact Number</label>
              </div>
              {updateError.phoneNoError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {updateError.phoneNoError}
                </div>
              )}
              <div className="input-box">
                <input type="email" required value={email} readonly />
                <label>Email</label>
              </div>

              <div className="input-box">
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
                <label>Date of Bith</label>
              </div>

              <div className="input-box">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <label>Address</label>
              </div>

              <br />

              <br />
              <br />
            </div>

            <div className="form-right">
              <div
                className="topic"
                style={{
                  visibility: "hidden",
                }}
              >
                Personal Information
              </div>

              <div className="input-box">
                <textarea
                  type="text"
                  required
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
                <label>Bio</label>
              </div>

              <div
                className="input-box"
                style={{
                  marginTop: "110px",
                }}
              >
                <input
                  type="text"
                  required
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value);
                  }}
                />
                <label>Heading</label>
              </div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "200",
                  marginBottom: "10px",
                  marginTop: "-10px",
                  fontSize14px: "14px",
                }}
              >
                Upload New Profile Image{" "}
                <MdCloudUpload style={{ color: "red", marginTop: "5px" }} />
              </span>
              <div className="input-box">
                <input
                  type="file"
                  required
                  accept="image/png, image/jpeg"
                  style={{
                    padding: "10px 20px",
                    marginTop: "-22px",
                  }}
                  autoFocus={true}
                  onChange={(e) => {
                    setImageUrl(e.target.files[0]);
                  }}
                />
              </div>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "200",
                  marginBottom: "10px",
                  marginTop: "-35px",
                }}
              >
                Upload New Resume
                <MdCloudUpload style={{ color: "red", marginTop: "5px" }} />
              </span>
              <div className="input-box">
                <input
                  type="file"
                  style={{ padding: "10px 20px", marginTop: "-22px" }}
                  autoFocus={true}
                  onChange={(e) => {
                    setCv(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        {/* ----Social Links----- */}
        <div
          className="personal-info-container"
          style={{
            marginTop: "10px",
          }}
        >
          <form className="addJobForm">
            <div className="form-left">
              <div className="topic">Social Links</div>
              <div
                className="input-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaFacebookF
                  style={{
                    color: "#17bf9e",
                  }}
                />
                <>
                  <input
                    type="text"
                    style={{
                      width: "92%",
                      marginLeft: "40px",
                    }}
                    required
                    value={fburl}
                    onChange={(e) => {
                      setFburl(e.target.value);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    Facebook
                  </label>
                </>
              </div>
              <div
                className="input-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaLinkedin
                  style={{
                    color: "#17bf9e",
                  }}
                />
                <>
                  <input
                    type="text"
                    style={{
                      width: "92%",
                      marginLeft: "40px",
                    }}
                    required
                    value={lnkdinurl}
                    onChange={(e) => {
                      setLnkdinurl(e.target.value);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    LinkedIn
                  </label>
                </>
              </div>

              <div
                className="input-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaGlobe
                  style={{
                    color: "#17bf9e",
                  }}
                />
                <>
                  <input
                    type="text"
                    style={{
                      width: "92%",
                      marginLeft: "40px",
                    }}
                    required
                    value={pturl}
                    onChange={(e) => {
                      setPturl(e.target.value);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    Portfolio Link
                  </label>
                </>
              </div>

              <br />

              <br />
              <br />
            </div>

            <div className="form-right">
              <div
                className="input-box"
                style={{
                  marginTop: "65px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaInstagram
                  style={{
                    color: "#17bf9e",
                  }}
                />
                <>
                  <input
                    type="text"
                    style={{
                      width: "92%",
                      marginLeft: "40px",
                    }}
                    required
                    value={instaurl}
                    onChange={(e) => {
                      setInstaurl(e.target.value);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    Instagram
                  </label>
                </>
              </div>

              <div
                className="input-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FaTwitter
                  style={{
                    color: "#17bf9e",
                  }}
                />
                <>
                  <input
                    type="text"
                    style={{
                      width: "92%",
                      marginLeft: "40px",
                    }}
                    required
                    value={tturl}
                    onChange={(e) => {
                      setTturl(e.target.value);
                    }}
                  />
                  <label
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    Twitter
                  </label>
                </>
              </div>
            </div>
          </form>
        </div>

        <button className="edit-btn">
          <div className="text" type="button" onClick={sendData}>
            Update
          </div>
        </button>
      </Container>
      <Footer />
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default EditProfile;
