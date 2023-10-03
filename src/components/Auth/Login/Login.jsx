import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Notifications from "../../Modals/Notifications";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "http://localhost:8090/api/user/userLogin";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginContainer">
      <Header />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className={styles.green_btn}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                textAlign: "center", // Added for better alignment
              }}
            >
              <button
                className={styles.social_media_btn}
                onClick={() => {
                  window.location.href = "http://localhost:8090/auth/google";
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#4285F4",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <span>
                  <FcGoogle size={33} />
                </span>
              </button>

              <button
                className={styles.social_media_btn}
                onClick={() => {
                  window.location.href = "http://localhost:8090/auth/facebook";
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#1877F2",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <span>
                  <FaFacebook size={30} />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <span
              style={{ fontSize: "16px", marginBottom: "10px", color: "white" }}
            >
              Create a new account from here
            </span>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>

            <img
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              src="https://res.cloudinary.com/desnqqj6a/image/upload/v1657722063/Mobile_login-bro_ohbyf6.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <Notifications notify={notify} setNotify={setNotify} />
      <Footer />
    </div>
  );
};

export default Login;
