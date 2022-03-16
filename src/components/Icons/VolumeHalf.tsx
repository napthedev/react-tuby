import React from "react";

const VolumeHalf = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path
        d="M0 34.375H14.8148L33.3333 50V0L14.8148 15.625H0V34.375ZM40.7407 12.5V37.5C46.2222 35.375 50 30.5312 50 25C50 19.5625 46.2222 14.8125 40.7407 12.5Z"
        fill="white"
      />
    </svg>
  );
};

export default VolumeHalf;
