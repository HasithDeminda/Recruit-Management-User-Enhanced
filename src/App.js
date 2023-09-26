import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Singup/Signup";
import Home from "./pages/Home/Home";
import JobDetails from "./pages/JobDetails/JobDetails";
import CandidateProfile from "./pages/Profile/CandidateProfile";
import EditProfile from "./pages/Profile/EditProfile";
import ResetPW from "./pages/ResetPW";
import ActivateEmailTemp from "./components/EmailTemp/ActivateEmailTemp";
import Notices from "./pages/Notices/Notices";
import ViewNotice from "./pages/Notices/ViewNotice";


import ApplyNow from "./pages/ApplyNow";
import Feedbacks from "./pages/Feedbacks/Feedbacks";

function App() {
  //Get the user from local storage
  const Token = localStorage.getItem("token");

  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <BrowserRouter>
        <Routes>
          {Token ? (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Login" element={<Navigate to="/Home" />} />
              <Route path="/signup" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Home/:id" element={<JobDetails />} />
              <Route path="/Profile" element={<CandidateProfile />} />
              <Route path="/Profile/edit" element={<EditProfile />} />
              <Route path="/Profile/resetPW" element={<ResetPW />} />
              <Route path="/Notices" element={<Notices />} />
              <Route path="/ViewNotices/:_id" element={<ViewNotice />} />
              <Route path="/Apply/:id" element={<ApplyNow />} />
              <Route path="/Feedbacks" element={<Feedbacks />} />
              <Route path="/jobDetails/:id" element={<JobDetails />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/Home" element={<Navigate to="/" />} />
              <Route path="/About" element={<Navigate to="/" />} />
              <Route path="/Notices" element={<Navigate to="/" />} />
              <Route path="/Guidance" element={<Navigate to="/" />} />
              <Route path="/Feedbacks" element={<Navigate to="/" />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/ActivationEmail" element={<ActivateEmailTemp />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
