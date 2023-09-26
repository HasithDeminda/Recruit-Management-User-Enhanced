import { useState } from "react";
import axios from "axios";
import styles from "../components/Auth/Login/styles.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Notifications from "../components/Modals/Notifications";

const ResetPW = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== newConfirmPassword) {
        setError("Passwords do not match");
      } else if (newPassword.length < 6) {
        setError("Password must be at least 6 characters");
      } else {
        const url = `https://rwa-webapp.azurewebsites.net/api/user/UserResetPassword`;
        const data = { oldPassword: oldPassword, newPassword: newPassword };

        const setAxiosToken = (token) => {
          axios.defaults.headers.common["Authorization"] = `${token}`;
          axios.defaults.headers.post["Content-Type"] =
            "application/json; charset=utf-8";
        };

        const Token = localStorage.getItem("token");
        setAxiosToken(Token);
        console.log(Token);

        await axios.patch(url, data).then((res) => {
          if (res.data.success) {
            console.log("success");
            setNotify({
              isOpen: true,
              message: "Password Updated Successfully",
              type: "success",
            });
            localStorage.removeItem("token");
            localStorage.removeItem("Token");
            localStorage.removeItem("Authorization");
            setTimeout(() => (window.location = "/Login"), 700);
          }
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="adminLoginContainer">
      <Header />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Reset Your Password</h1>
              <input
                type="password"
                placeholder="Old Password"
                name="email"
                required
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="New Password"
                name="email"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                name="password"
                required
                onChange={(e) => {
                  setNewConfirmPassword(e.target.value);
                }}
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              {/* <button type="submit" className={styles.green_btn}>
                Reset
              </button> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <input
                  className="update-btn"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#1a97f5",
                    width: "150px",
                    color: "white",
                    height: "40px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  }}
                  type="submit"
                  value="Reset"
                />
              </div>
            </form>
          </div>
          <div className={styles.right}>
            <h1>Reset Password</h1>
            <span
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                color: "white",
                textAlign: "center",
              }}
            >
              Please enter your new password and re-enter your new password to
              reset your password.
            </span>

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
      <Footer />
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ResetPW;
