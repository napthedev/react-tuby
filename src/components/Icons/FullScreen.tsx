import React from "react";

const FullScreen = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path d="M0 18.75H6.25V6.25H18.75V0H0V18.75Z" fill="white" />
      <path d="M31.25 0V6.25H43.75V18.75H50V0H31.25Z" fill="white" />
      <path d="M43.75 43.75H31.25V50H50V31.25H43.75V43.75Z" fill="white" />
      <path d="M6.25 31.25H0V50H18.75V43.75H6.25V31.25Z" fill="white" />
    </svg>
  );
};

export default FullScreen;
