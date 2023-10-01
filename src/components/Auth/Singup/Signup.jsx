import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Notifications from "../../Modals/Notifications";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [customErrors, setCustomErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const EmailRegex = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
      );
      const spetialCharaterRegex = new RegExp("[^A-Za-z\\s]");
      if (spetialCharaterRegex.test(firstName)) {
        var firstNameError =
          "First name can not contain special characters and numbers";
      } else {
        var firstNameError = "";
      }

      if (spetialCharaterRegex.test(lastName)) {
        var lastNameError =
          "Last name can not contain special characters and numbers";
      } else {
        var lastNameError = "";
      }

      if (!EmailRegex.test(email)) {
        var emailError = "Invalid Email Address";
      } else {
        var emailError = "";
      }

      setCustomErrors({
        firstNameError,
        lastNameError,
        emailError,
      });

      if (!firstNameError && !lastNameError && !emailError) {
        if (password !== cPassword) {
          setError("Passwords do not match");
        } else if (password.length < 6) {
          setError("Password must be at least 6 characters");
        } else {
          const data = {
            firstName,
            lastName,
            email,
            password,
          };
          const url =
            "https://rwa-webapp.azurewebsites.net/api/user/userRegister";
          await axios
            .post(url, data)
            .then((res) => {
              setNotify({
                isOpen: true,
                message: "Registered Successfully!",
                type: "success",
              });

              setTimeout(navigate("/ActivationEmail"), 1500);
              console.log(res.message);
            })
            .catch((err) => {
              setNotify({
                isOpen: true,
                message: "Error In Registering",
                type: "error",
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="adminRegisterContainer">
      <Header />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back!</h1>
            <span
              style={{ fontSize: "16px", marginBottom: "10px", color: "white" }}
            >
              Already have an account?
            </span>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Log In
              </button>
            </Link>
            <img
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657722327/Sign_up-bro_1_orlgzw.png"
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                className={styles.input}
              />
              {customErrors.firstNameError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {customErrors.firstNameError}
                </div>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                className={styles.input}
              />
              {customErrors.lastNameError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {customErrors.lastNameError}
                </div>
              )}
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className={styles.input}
              />
              {customErrors.emailError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "-10px",
                  }}
                >
                  {customErrors.emailError}
                </div>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                onChange={(e) => {
                  setcPassword(e.target.value);
                }}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className={styles.green_btn}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Signup;
