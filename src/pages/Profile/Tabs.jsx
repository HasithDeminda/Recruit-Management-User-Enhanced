import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Tabs1() {
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <Tabs defaultActiveKey="first">
        <Tab
          eventKey="first"
          title="Dashboard"
          style={{
            backgroundColor: " #17BF9E",
            padding: 30,
            borderRadius: "20px 0px 0px 20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          Hii, I am 1st tab content
        </Tab>
        <Tab eventKey="second" title="Setting">
          Hii, I am 2nd tab content
        </Tab>
        <Tab eventKey="third" title="Aboutus">
          Hii, I am 3rd tab content
        </Tab>
      </Tabs>
    </div>
  );
}
