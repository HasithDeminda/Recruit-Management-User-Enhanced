import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Announcement from "./ViewNotice/Announcement";

const ViewNotice = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <Announcement />
      <br />
      <Footer />
    </div>
  );
};

export default ViewNotice;
