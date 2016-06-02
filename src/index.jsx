let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

// import React from "react";
// React.initializeTouchEvents(true);

export DjatokaClient from './components/djatoka-client';
export Viewer from './components/viewer';
export Minimap from './components/minimap';
export Zoom from './components/zoom';
export FillButton from './components/fill-button';
export FreeMovementButton from './components/free-movement-button';

// export {
// 	DjatokaClient,
// 	Viewer,
// 	Minimap,
// 	Zoom,
// 	FillButton,
// 	FreeMovementButton
// };
//
// export default DjatokaClient;
