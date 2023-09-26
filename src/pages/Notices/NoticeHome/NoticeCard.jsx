import React from "react";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import {
  FaCalendarDay,
  FaEnvelopeOpenText,
  FaMapPin,
  FaPhoneAlt,
  FaRedoAlt,
  FaTrash,
  FaUserEdit,
  FaUserTie,
} from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { GiClick } from "react-icons/gi";

const NoticeCard = (props) => {
  const { _id, imageUrlPoster, description } = props.item;

  return (
    <div className="Rcard-container">
      <div className="Rimage-container">
        {/* <img src={imageUrlPoster} alt="Avatar" className="center"/> */}
        <img
                src={
                  imageUrlPoster
                    ? imageUrlPoster
                    : "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                }
                alt="Avatar"
                className="center"
              />
      </div>
      
      <div className="Rcard-context">
        <div className="card-title">
          <p class ="long-text">{description}</p>
        </div>
        <hr></hr>
        {/* <div className="Rbtn">
          <a href={`/ViewNotices/${_id}`}>View</a>
        </div> */}
        <div className="Rbtn">
        <Link to={"/ViewNotices/" + _id} >
              <button
                className="btn"
                style={{   
                  justifyContent: "center"
                }}
              >
                <GiClick
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
                <span>View</span>
              </button>
            </Link>
            </div>
      </div>
    </div>
  );
};

export default NoticeCard;
