import React, { FC } from "react";

import ClientRender from "./components/ClientRender";
import ErrorBoundary from "./components/ErrorBoundary";
import Main from "./components/Main";
import { PlayerProps } from "./shared/types";

export const Player: FC<PlayerProps> = props => {
  const { dimensions, primaryColor } = props;

  return (
    <div
      className="tuby"
      style={{
        ...(typeof dimensions === "number"
          ? { width: "100%", height: 0, paddingBottom: `${dimensions}%` }
          : typeof dimensions === "object"
          ? {
              width: dimensions.width,
              height: dimensions.height,
            }
          : { width: "100%", height: 0, paddingBottom: "56.25%" }),
        ...(primaryColor
          ? {
              ["--tuby-primary-color" as any]: primaryColor,
            }
          : {}),
      }}
    >
      <ClientRender>
        <ErrorBoundary renderer={props.children} {...props}>
          <Main {...props} />
        </ErrorBoundary>
      </ClientRender>
    </div>
  );
};

export { PlayerProps } from "./shared/types";
