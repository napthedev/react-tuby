import React from "react";

const ExitFullScreen = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path d="M12.5 12.5H0V18.75H18.75V0H12.5V12.5Z" fill="white" />
      <path d="M37.5 12.5V1.14441e-05H31.25V18.75H50V12.5H37.5Z" fill="white" />
      <path d="M31.25 50H37.5V37.5H50V31.25H31.25V50Z" fill="white" />
      <path d="M0 37.5H12.5V50H18.75V31.25H0V37.5Z" fill="white" />
    </svg>
  );
};

export default ExitFullScreen;
