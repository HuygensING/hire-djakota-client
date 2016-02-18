import Api from "../api";

const initialState = {
	api: {
		config: {}
	},
	fillMode: null,
	freeMovement: false,
	mousewheel: null,
	realViewPort: {x: 0, y: 0, w: 0, h: 0, zoom: 0, reposition: false}
};

export default function(state = initialState, action) {
	switch(action.type) {
		case "INITIAL":
			state = {...state,
				api: new Api(action.service, action.config),
				scaleMode: action.scaleMode
			};
			break;

		case "CREATE_NEXT_API":
			state = {...state, api: new Api(state.service, action.config)};
			break;

		case "SET_REAL_VIEWPORT":
			state = {...state, realViewPort: {...state.realViewPort, ...action.realViewPort}};
			break;

		case "SEND_MOUSEWHEEL":
			state = {...state, mousewheel: action.mousewheel};
			break;

		case "SET_FILL":
			state = {...state, fillMode: action.mode};
			break;

		case "SET_FREE_MOVEMENT":
			state = {...state, freeMovement: action.mode};
			break;
	}

	return state;
}
