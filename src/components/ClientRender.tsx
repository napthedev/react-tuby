import React, { FC, ReactElement, useEffect, useState } from "react";

const ClientRender: FC<{ children: ReactElement }> = ({ children }) => {
  const [rendered, setRendered] = useState(typeof window === "object");

  useEffect(() => {
    if (window) setRendered(true);
  }, [typeof window]);

  if (rendered) return children;

  return <></>;
};

export default ClientRender;
