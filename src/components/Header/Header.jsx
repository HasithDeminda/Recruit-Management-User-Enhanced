import React, { useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { MdOutlineMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const navLinks = [
  {
    display: "Home",
    url: "/Home",
  },
  {
    display: "About",
    url: "#",
  },

  {
    display: "Notices",
    url: "/Notices",
  },
  {
    display: "Career-Guidance",
    url: "#",
  },
  {
    display: "Feedbacks",
    url: "/Feedbacks",
  },
  {
    display: "Contact",
    url: "#",
  },
];

//Get the user from local storage
export const Token = localStorage.getItem("token");

export const isLogged = () => {
  if (Token) {
    return true;
  } else {
    return false;
  }
};

const Header = () => {
  //get user data from db
  const [data, setData] = useState({
    imageUrl: "",
  });

  //use Effect

  useEffect(() => {
    axios
      .get("https://rwa-webapp.azurewebsites.net/api/user/userProfile", {
        headers: {
          Authorization: `${Token}`,
        },
      })
      .then((res) => {
        setData(res.data.logedUser);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i style={{ marginTop: "-8px" }}>
                <MdOutlineMenuBook />
              </i>{" "}
              Recruiters
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5 ">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            {isLogged() ? (
              <div className="nav__right">
                <Link to="/Profile">
                  <div className="profile-image">
                    <img
                      src={
                        data.imageUrl
                          ? data.imageUrl
                          : "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg"
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
