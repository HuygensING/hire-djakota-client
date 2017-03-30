"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actions = require("../actions");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _requestAnimationFrame = require("../util/request-animation-frame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from "react";

// class Minimap extends React.Component {
// 	render() {
// 		return (
// 			<div>MINI</div>
// 		);
// 	}
// }

// Minimap.propTypes = {};

// Minimap.defaultProps = {};

// export default Minimap;

var RESIZE_DELAY = 5;

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Minimap = function (_React$Component) {
	_inherits(Minimap, _React$Component);

	function Minimap(props) {
		_classCallCheck(this, Minimap);

		var _this = _possibleConstructorReturn(this, (Minimap.__proto__ || Object.getPrototypeOf(Minimap)).call(this, props));

		_this.state = {
			width: null,
			height: null
		};
		_this.resizeListener = _this.onResize.bind(_this);
		_this.animationFrameListener = _this.onAnimationFrame.bind(_this);
		_this.abortAnimationFrame = false;
		_this.imageCtx = null;
		_this.interactionCtx = null;
		_this.resizeDelay = -1;
		_this.mouseState = MOUSE_UP;
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.touchMoveListener = _this.onTouchMove.bind(_this);
		_this.frameBuffer = [];
		return _this;
	}

	_createClass(Minimap, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.abortAnimationFrame = false;
			this.onResize();
			this.imageCtx = this.refs.minimap.children[0].getContext("2d");
			this.interactionCtx = this.refs.minimap.children[1].getContext("2d");
			window.addEventListener("resize", this.resizeListener);
			window.addEventListener("mousemove", this.mousemoveListener);
			window.addEventListener("mouseup", this.mouseupListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.addEventListener("touchmove", this.touchMoveListener);
			(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
		}

		// componentWillReceiveProps(nextProps) {
		// 	if(nextProps.config.identifier !== this.props.config.identifier) {
		// 		console.log(nextProps.api)
		// 		// this.props.api = new Api(this.props.service, nextProps.config);
		// 		this.commitResize();
		// 	}
		// }

	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.width !== nextState.width || this.state.height !== nextState.height;
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("resize", this.resizeListener);
			window.removeEventListener("mousemove", this.mousemoveListener);
			window.removeEventListener("mouseup", this.mouseupListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.removeEventListener("touchmove", this.touchMoveListener);
			this.abortAnimationFrame = true;
			(0, _requestAnimationFrame.cancelAnimationFrame)(this.animationFrameListener);
			// this.unsubscribe();
		}
	}, {
		key: "onAnimationFrame",
		value: function onAnimationFrame() {
			if (this.frameBuffer.length) {
				this.imageCtx.clearRect(0, 0, this.state.width, this.state.height);
				for (var i = 0; i < this.frameBuffer.length; i++) {
					var tileIm = this.frameBuffer[i][0];
					var tile = this.frameBuffer[i][1];
					this.imageCtx.drawImage(tileIm, parseInt(Math.floor(tile.pos.x * this.scale)), parseInt(Math.floor(tile.pos.y * this.scale)), parseInt(Math.ceil(tileIm.width * this.scale)), parseInt(Math.ceil(tileIm.height * this.scale)));
				}
				if (this.frameBuffer.filter(function (x) {
					return x[0].complete && x[0].height > 0 && x[0].width > 0;
				}).length === this.frameBuffer.length) {
					this.frameBuffer = [];
				}
			}

			if (this.resizeDelay === 0) {
				this.commitResize();
				this.resizeDelay = -1;
			} else if (this.resizeDelay > 0) {
				this.resizeDelay -= 1;
			}

			this.interactionCtx.strokeStyle = this.props.rectStroke;
			this.interactionCtx.fillStyle = this.props.rectFill;
			this.interactionCtx.clearRect(0, 0, this.state.width, this.state.height);
			this.interactionCtx.fillRect(Math.floor(this.props.realViewPort.x * this.state.width), Math.floor(this.props.realViewPort.y * this.state.height), Math.ceil(this.props.realViewPort.w * this.state.width), Math.ceil(this.props.realViewPort.h * this.state.height));

			this.interactionCtx.beginPath();
			this.interactionCtx.rect(Math.floor(this.props.realViewPort.x * this.state.width), Math.floor(this.props.realViewPort.y * this.state.height), Math.ceil(this.props.realViewPort.w * this.state.width), Math.ceil(this.props.realViewPort.h * this.state.height));
			this.interactionCtx.stroke();

			if (!this.abortAnimationFrame) {
				(0, _requestAnimationFrame.requestAnimationFrame)(this.animationFrameListener);
			}
		}
	}, {
		key: "onResize",
		value: function onResize() {
			this.resizeDelay = RESIZE_DELAY;
		}
	}, {
		key: "commitResize",
		value: function commitResize() {
			this.resizeDelay = RESIZE_DELAY;
			var _refs$minimap = this.refs.minimap,
			    clientWidth = _refs$minimap.clientWidth,
			    clientHeight = _refs$minimap.clientHeight;

			this.frameBuffer = this.props.api.loadImage({
				viewport: { w: clientWidth, h: clientHeight },
				onScale: this.setScale.bind(this),
				scaleMode: "autoFill",
				position: { x: 0, y: 0 }
			});
		}
	}, {
		key: "setScale",
		value: function setScale(s, l) {
			this.scale = s;
			this.level = l;
			var dims = this.props.api.getRealImagePos({ x: 0, y: 0 }, this.scale, this.level);
			this.setState({ width: dims.w, height: dims.h });
			if (this.props.onDimensions) {
				this.props.onDimensions(dims.w, dims.h);
			}
		}
	}, {
		key: "dispatchReposition",
		value: function dispatchReposition(ev) {
			var doc = document.documentElement;
			var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
			var rect = this.refs.minimap.getBoundingClientRect();
			_store2.default.dispatch((0, _actions.setRealViewPort)({
				x: (ev.pageX - rect.left) / this.state.width - this.props.realViewPort.w / 2,
				y: (ev.pageY - rect.top - scrollTop) / this.state.height - this.props.realViewPort.h / 2,
				reposition: true,
				applyZoom: false
			}));
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchReposition({ pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY });
			return ev.preventDefault();
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchReposition(ev);
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchReposition(ev);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchReposition({ pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY });
				return ev.preventDefault();
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp() {
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "onWheel",
		value: function onWheel(ev) {
			_store2.default.dispatch((0, _actions.sendMouseWheel)({ deltaY: ev.deltaY }));
			return ev.preventDefault();
		}
	}, {
		key: "onTouchEnd",
		value: function onTouchEnd() {
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					className: "hire-djatoka-minimap",
					ref: "minimap"
				},
				_react2.default.createElement("canvas", { className: "image", height: this.state.height, width: this.state.width }),
				_react2.default.createElement("canvas", { className: "interaction",
					height: this.state.height,
					onMouseDown: this.onMouseDown.bind(this),
					onTouchStart: this.onTouchStart.bind(this),
					onWheel: this.onWheel.bind(this),
					width: this.state.width })
			);
		}
	}]);

	return Minimap;
}(_react2.default.Component);

Minimap.propTypes = {
	config: _react2.default.PropTypes.object,
	onDimensions: _react2.default.PropTypes.func,
	rectFill: _react2.default.PropTypes.string,
	rectStroke: _react2.default.PropTypes.string,
	service: _react2.default.PropTypes.string
};

Minimap.defaultProps = {
	rectFill: "rgba(128,128,255,0.1)",
	rectStroke: "rgba(255,255,255,0.8)"
};

exports.default = Minimap;