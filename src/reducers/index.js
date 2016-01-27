import Api from "../api";

const initialState = {
	realViewPort: {x: 0, y: 0, w: 0, h: 0, zoom: 0, reposition: false},
	mousewheel: null,
	fillMode: null,
	freeMovement: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case "INITIAL":
			state = {...state, ...action.initialState, ...{
				api: new Api(action.initialState.service, action.initialState.config),
			}};
		case "SET_REAL_VIEWPORT":
			state = {...state, realViewPort: {...state.realViewPort, ...action.realViewPort}};
		case "SEND_MOUSEWHEEL":
			state = {...state, mousewheel: action.mousewheel};
		case "SET_FILL":
			state = {...state, fillMode: action.mode};
		case "SET_FREE_MOVEMENT":
			state = {...state, freeMovement: action.mode};
	}

	return state
};