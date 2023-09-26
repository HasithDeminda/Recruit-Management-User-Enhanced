import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AllNotices from "./NoticeHome/AllNotices";

const Notices = () => {
  return (
    <div>
      <Header />
      <AllNotices/>
      <Footer />
    </div>
  )

};

export default Notices;
