import React from "react";

const ChevronLeft = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path
        d="M40 5.875L21.4575 25L40 44.125L34.2915 50L10 25L34.2915 0L40 5.875Z"
        fill="white"
      />
    </svg>
  );
};

export default ChevronLeft;
