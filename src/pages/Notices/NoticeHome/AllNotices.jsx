import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import NoticeCard from "./NoticeCard";
import "./AllNotices.css";

import noticeImg01 from "../../../assests/images/maintain.jpg";
import noticeImg02 from "../../../assests/images/helpff.jpg";
import noticeImg03 from "../../../assests/images/trp.jpg";

import backimg from "../../../assests/images/backpost.png";
import axios from "axios";

const AllNotices = () => {
  const [notices, setNotices] = useState([
    {
      _id: "",
      description: "",
      imageUrlPoster: "",
    },
  ]);

  useEffect(() => {
    function getNotices() {
      axios
        .get(`http://localhost:8090/api/notice/GetAllActiveNotices`)
        .then((res) => {
          setNotices(res.data.allActivenotices);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getNotices();
  }, []);

  return (
    <div>
      <div style={{ height: "500px" }}>
        <img
          src={backimg}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <section style={{ marginTop: "-500px" }}>
        <Container>
          <div>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h1 className="fw-bold">Featured Notices</h1>
                <br />
                <br />
              </Col>

              {notices.map((item) => (
                <Col lg="4" md="" className="mb-" key={item.id}>
                  <NoticeCard item={item} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AllNotices;
