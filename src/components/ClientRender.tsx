import React, { FC, ReactElement, useEffect, useState } from "react";

const ClientRender: FC<{ children: ReactElement }> = ({ children }) => {
  const [rendered, setRendered] = useState(typeof window !== "undefined");

  useEffect(() => {
    setRendered(true);
  }, []);

  if (rendered) return children;

  return <></>;
};

export default ClientRender;
