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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Zoom = function (_React$Component) {
	_inherits(Zoom, _React$Component);

	function Zoom(props) {
		_classCallCheck(this, Zoom);

		var _this = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, props));

		_this.state = _store2.default.getState();

		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.touchMoveListener = _this.onTouchMove.bind(_this);
		return _this;
	}

	_createClass(Zoom, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			window.addEventListener("mouseup", this.mouseupListener);
			window.addEventListener("mousemove", this.mousemoveListener);
			window.addEventListener("touchend", this.mouseupListener);
			window.addEventListener("touchmove", this.touchMoveListener);

			this.unsubscribe = _store2.default.subscribe(function () {
				return _this2.setState(_store2.default.getState());
			});
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("mouseup", this.mouseupListener);
			window.removeEventListener("mousemove", this.mousemoveListener);
			window.removeEventListener("touchend", this.mouseupListener);
			window.removeEventListener("touchmove", this.touchMoveListener);

			this.unsubscribe();
		}
	}, {
		key: "dispatchRealScale",
		value: function dispatchRealScale(pageX) {
			var rect = _react2.default.findDOMNode(this).children[0].getBoundingClientRect();

			if (rect.width > 0 && !this.state.realViewPort.applyZoom) {
				var zoom = (pageX - rect.left) / rect.width * 2;
				if (zoom < 0.01) {
					zoom = 0.01;
				} else if (zoom > 2.0) {
					zoom = 2.0;
				}
				_store2.default.dispatch((0, _actions.setRealViewPort)({
					zoom: zoom,
					applyZoom: true
				}));
			}
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchRealScale(ev.pageX);
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			this.mouseState = MOUSE_DOWN;
			this.dispatchRealScale(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchRealScale(ev.pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.dispatchRealScale(ev.touches[0].pageX);
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
		key: "render",
		value: function render() {
			var zoom = parseInt(this.state.realViewPort.zoom * 100);

			return _react2.default.createElement(
				"span",
				{ className: "hire-zoom-bar", onWheel: this.onWheel.bind(this) },
				_react2.default.createElement(
					"svg",
					{
						onMouseDown: this.onMouseDown.bind(this),
						onTouchStart: this.onTouchStart.bind(this),
						viewBox: "-12 0 224 24" },
					_react2.default.createElement("path", { d: "M0 12 L 200 12 Z" }),
					_react2.default.createElement("circle", { cx: zoom > 200 ? 200 : zoom, cy: "12", r: "12" })
				),
				_react2.default.createElement(
					"label",
					null,
					zoom,
					"%"
				)
			);
		}
	}]);

	return Zoom;
}(_react2.default.Component);

Zoom.propTypes = {
	fill: _react2.default.PropTypes.string,
	stroke: _react2.default.PropTypes.string
};

Zoom.defaultProps = {
	fill: "rgba(0,0,0, 0.7)",
	stroke: "rgba(0,0,0, 1)"
};

exports.default = Zoom;