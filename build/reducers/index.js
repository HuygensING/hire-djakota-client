'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var nextState = state;

	switch (action.type) {
		case 'INITIAL':
			nextState = _extends({}, nextState, {
				api: new _api2.default(action.service, action.config),
				scaleMode: action.scaleMode
			});
			break;

		case 'CREATE_NEXT_API':
			nextState = _extends({}, nextState, {
				api: new _api2.default(nextState.api.service, action.config)
			});
			break;

		case 'SET_REAL_VIEWPORT':
			nextState = _extends({}, nextState, {
				realViewPort: _extends({}, nextState.realViewPort, action.realViewPort)
			});
			break;

		case 'SEND_MOUSEWHEEL':
			nextState = _extends({}, nextState, {
				mousewheel: action.mousewheel
			});
			break;

		case 'SET_FILL':
			nextState = _extends({}, nextState, {
				fillMode: action.mode
			});
			break;

		case 'SET_FREE_MOVEMENT':
			nextState = _extends({}, nextState, {
				freeMovement: action.mode
			});
			break;

		default:
	}

	return nextState;
};

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	api: {
		config: {}
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
		reposition: false
	}
};