import React from "react";

const Pause = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path
        d="M5 50H17.3077V0H5V50ZM32.6923 50H45V0H32.6923V50Z"
        fill="white"
      />
    </svg>
  );
};

export default Pause;
