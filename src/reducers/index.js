import Api from '../api';

const initialState = {
	api: {
		config: {},
	},
	fillMode: null,
	freeMovement: false,
	mousewheel: null,
	realViewPort: {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		zoom: 0,
		reposition: false,
	},
};

export default function (state = initialState, action) {
	let nextState = state;

	switch (action.type) {
		case 'INITIAL':
			nextState = { ...nextState,
				api: new Api(action.service, action.config),
				scaleMode: action.scaleMode,
			};
			break;

		case 'CREATE_NEXT_API':
			nextState = {
				...nextState,
				api: new Api(nextState.api.service, action.config),
			};
			break;

		case 'SET_REAL_VIEWPORT':
			nextState = {
				...nextState,
				realViewPort: {
					...nextState.realViewPort,
					...action.realViewPort,
				},
			};
			break;

		case 'SEND_MOUSEWHEEL':
			nextState = {
				...nextState,
				mousewheel: action.mousewheel,
			};
			break;

		case 'SET_FILL':
			nextState = {
				...nextState,
				fillMode: action.mode,
			};
			break;

		case 'SET_FREE_MOVEMENT':
			nextState = {
				...nextState,
				freeMovement: action.mode,
			};
			break;

		default:
	}

	return nextState;
}
