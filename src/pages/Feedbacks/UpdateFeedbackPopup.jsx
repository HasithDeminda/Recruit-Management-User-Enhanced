import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import "./UpdateFeedbackPopup.scss";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import Notifications from "../../components/Modals/Notifications";

const UpdateFeedbackPopup = (props) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState();
  const [message, setMessage] = useState(props.comment);

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const closeModal = () => setOpen(false);

  // const handleOpen = () => {
  //   if (open) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // };

  const styles = {
    stars: {
      display: "flex",
      flexDirection: "row",
    },
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const updateFeedback = async (e) => {
    e.preventDefault();
    const Token = localStorage.getItem("token");

    const updateObject = {
      rating: rating,
      comment: message,
    };

    await axios
      .put(
        `https://rwa-webapp.azurewebsites.net/api/feedbacks/updateFeedback/${props._id}`,
        updateObject,
        {
          headers: {
            Authorization: `${Token}`,
          },
        }
      )
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Feedback Updated!",
          type: "success",
        });
        window.location.href = "/Feedbacks";
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Error!",
          type: "error",
        });
        console.log(err);
      });
  };

  return (
    <div className="feedbackcard-popup">
      <div
        className="close"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FaWindowClose
          onClick={(event) => closeModal()}
          style={{
            width: "30px",
            height: "40px",
            border: "none",
            cursor: "pointer",
            color: "red",
            borderRadius: "20%",
          }}
        />
      </div>
      <div className="feedbacks-content__section02">
        <div className="feedbacks-content__section02-content">
          <div className="feedbacks-content__section02-content-title">
            Update Your Feedback
          </div>

          <div className="feedbacks-content__section02-content-cfeedback">
            <div className="feedbacks-content__section02-content-cfeedback-stars">
              <div style={styles.stars}>
                <Rating initialValue={props.rating} onClick={handleRating} />
              </div>
            </div>

            <div className="feedbacks-content__section02-content-cfeedback-text">
              <textarea
                className="feedbacks-content__section02-content-cfeedback-textarea"
                placeholder="Write your feedback here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={updateFeedback}
              className="feedbacks-content__section02-content-cfeedback-text-btn-submit"
            >
              Update Feedback
            </button>
          </div>
        </div>
      </div>
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default UpdateFeedbackPopup;
