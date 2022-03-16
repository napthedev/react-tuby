import * as React from "react";
import * as ReactDOM from "react-dom";

import TestPlayer from "../example/TestPlayer";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TestPlayer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
