import React from "react";
import AllJobs from "../../components/All-Jobs/AllJobs";
import Company from "../../components/Company-section/Company";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <Header />
      <AllJobs />
      <Company />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
