import "react-app-polyfill/ie11";
import "../css/main.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import TestPlayer from "./TestPlayer";

const App = () => {
  return (
    <div>
      <TestPlayer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
