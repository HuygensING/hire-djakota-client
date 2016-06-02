let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

// import React from "react";
// React.initializeTouchEvents(true);

import DjatokaClient from "./components/djatoka-client";
import Viewer from "./components/viewer";
import Minimap from "./components/minimap";
import Zoom from "./components/zoom";
import FillButton from "./components/fill-button";
import FreeMovementButton from "./components/free-movement-button";

export {
	DjatokaClient,
	Viewer,
	Minimap,
	Zoom,
	FillButton,
	FreeMovementButton
};
export default DjatokaClient;
