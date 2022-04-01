import React from "react";

const PictureInPicture = ({ ...others }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path
        d="M40.9091 22.6667H22.7273V36.6667H40.9091V22.6667ZM50 41.3333V8.62C50 6.05333 47.9545 4 45.4545 4H4.54545C2.04545 4 0 6.05333 0 8.62V41.3333C0 43.9 2.04545 46 4.54545 46H45.4545C47.9545 46 50 43.9 50 41.3333ZM45.4545 41.38H4.54545V8.59667H45.4545V41.38Z"
        fill="white"
      />
    </svg>
  );
};

export default PictureInPicture;
