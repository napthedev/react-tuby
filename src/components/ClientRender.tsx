import React, { FC, ReactElement, useEffect, useState } from "react";

const ClientRender: FC<{ children: ReactElement }> = ({ children }) => {
  const [rendered, setRendered] = useState(typeof window === "object");

  const typeofWindow = typeof window;

  useEffect(() => {
    if (window) setRendered(true);
  }, [typeofWindow]);

  if (rendered) return children;

  return <></>;
};

export default ClientRender;
