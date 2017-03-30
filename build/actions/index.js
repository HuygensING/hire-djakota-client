"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setRealViewPort = setRealViewPort;
exports.sendMouseWheel = sendMouseWheel;
exports.setFill = setFill;
exports.setFreeMovement = setFreeMovement;
exports.createNextApi = createNextApi;
function setRealViewPort(realViewPort) {
	return {
		type: "SET_REAL_VIEWPORT",
		realViewPort: realViewPort
	};
}

function sendMouseWheel(wheelState) {
	return {
		type: "SEND_MOUSEWHEEL",
		mousewheel: wheelState
	};
}

function setFill(mode) {
	return {
		type: "SET_FILL",
		mode: mode
	};
}

function setFreeMovement(mode) {
	return {
		type: "SET_FREE_MOVEMENT",
		mode: mode
	};
}

function createNextApi(config) {
	return {
		type: "CREATE_NEXT_API",
		config: config
	};
}