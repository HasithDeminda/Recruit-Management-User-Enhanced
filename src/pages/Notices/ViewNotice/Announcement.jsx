import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./Announcement.css";

import vnoticeImg01 from "../../../assests/images/workshop.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

const Announcement = () => {
  var id = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    function getNotice() {
      axios
        .get(`http://localhost:8090/api/notice/specNotice/${id._id}`)
        .then((res) => {
          setTitle(res.data.notice.title);
          setDescription(res.data.notice.description);
          setPoster(res.data.notice.imageUrlPoster);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getNotice();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h3 className="fw-bold">Announcement</h3>
          </Col>
          <Col lg="4" md="" className="mb-">
            <div className="Vcard-container">
              <div className="Vimage-container">
                {/* <img src={poster} /> */}
                <img
                  src={
                    poster
                      ? poster
                      : "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                  }
                  alt=""
                />
              </div>

              <div className="Rcard-context">
                <div className="Vcard-title">
                  <h4>{title}</h4>
                  <br />
                  <div className="Vcard-body">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Announcement;
