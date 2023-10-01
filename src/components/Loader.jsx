import React from "react";
import { RiseLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./Loader.scss"; // Import the Loader.scss file

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <RiseLoader
              color={"#17bf9e"}
              loading={loading}
              css={override}
              size={20}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
