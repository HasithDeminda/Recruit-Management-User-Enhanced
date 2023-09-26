import {React, useState} from "react";
import { Link } from "react-router-dom";
import truncate from "truncate";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import Notifications from "../../components/Modals/Notifications";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { red } from "@mui/material/colors";


const SavedJobsCard = (props) => {
  const { _id, jobTitle, companyName, descImgUrl, jobType, location } =
    props.item;

  const Token = window.localStorage.getItem("token");

  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //Alert Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  function deleteHandler() {
    setConfirmDialog({
      ...ConfirmDialog,
      isOpen: false,
    });
    axios
      .delete(`https://rwa-webapp.azurewebsites.net/api/savedjobs/deleteJob/${_id}`, {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Favourite Job Deleted!",
          type: "success",
        });
        setTimeout(window.location.reload.bind(window.location), 1000);
        console.log(res);
      })

      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Error Deleting favourite Job!",
          type: "error",
        });
        console.log(err);
      });
  }

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <Link to={`/Home/${_id}`}>
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

        <div className=" d-flex justify-content-between">
          <span
            className=" d-flex align-items-center gap-2"
            title={companyName}
          >
            <i className="ri-building-fill"></i> {truncate(companyName, 15)}
          </span>

          <span className=" d-flex justify-content-end">
            <MdDelete
              className="userlist-delete-btn"
              size={25}
              color="red"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Delete Announcement!",
                  subTitle:
                    "Are you sure you want to delete this Announcement?",
                  onConfirm: (event) => {
                    deleteHandler();
                  },
                });
              }}
            />
            {/* <button
              className="userlist-delete-btn"
              // onClick={(event) => deleteHandler()}
              onClick={(event) => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Delete Favourite Job!",
                  subTitle:
                    "Are you sure you want to delete this Favourite Job?",
                  onConfirm: (event) => {
                    deleteHandler();
                  },
                });
              }}
            >
                Delete </button> */}
          </span>

          {/* <button >
            <a href="/">delete Saved</a>
          </button> */}
        </div>
        <span className=" d-flex align-items-center gap-2" title={location}>
          <i className="ri-map-pin-line"></i> {truncate(companyName, 15)}
        </span>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default SavedJobsCard
