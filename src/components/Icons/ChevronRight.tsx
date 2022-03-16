import React from "react";

const ChevronRight = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path
        d="M10 44.125L28.5425 25L10 5.875L15.7085 0L40 25L15.7085 50L10 44.125Z"
        fill="white"
      />
    </svg>
  );
};

export default ChevronRight;
