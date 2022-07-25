import React from "react";

export const Advertisement = () => {
  return (
    <div className="advertisement-wrapper">
      <img
        src={window.location.origin + "/img/attendance.png"}
        alt="eventImg"
      ></img>
      <img
        src={window.location.origin + "/img/roulette.png"}
        alt="eventImg"
      ></img>
      {/* <a href="https://projectlion.io/school/kdt-frontend-3rd">
        <img src="img/projectLionAd.png"></img>
      </a> */}
    </div>
  );
};

export default Advertisement;
