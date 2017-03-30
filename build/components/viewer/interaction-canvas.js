'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_UP = 0;
var MOUSE_DOWN = 1;
var TOUCH_END = 0;
var TOUCH_START = 1;
var TOUCH_PINCH = 2;

var InteractionCanvas = function (_Component) {
	_inherits(InteractionCanvas, _Component);

	function InteractionCanvas(props) {
		_classCallCheck(this, InteractionCanvas);

		var _this = _possibleConstructorReturn(this, (InteractionCanvas.__proto__ || Object.getPrototypeOf(InteractionCanvas)).call(this, props));

		_this.onMouseDown = function (ev) {
			_this.mousePos.x = ev.clientX;
			_this.mousePos.y = ev.clientY;
			_this.movement = { x: 0, y: 0 };
			_this.mouseState = MOUSE_DOWN;
		};

		_this.onMouseMove = function (ev) {
			switch (_this.mouseState) {
				case MOUSE_DOWN:
					_this.movement.x = _this.mousePos.x - ev.clientX;
					_this.movement.y = _this.mousePos.y - ev.clientY;

					var imgPosX = _this.props.imagePos.x - _this.movement.x / _this.props.scale;
					var imgPosY = _this.props.imagePos.y - _this.movement.y / _this.props.scale;
					_this.props.onSetImagePosition(imgPosX, imgPosY);

					_this.mousePos.x = ev.clientX;
					_this.mousePos.y = ev.clientY;
					_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
					ev.preventDefault();
					break;
				case MOUSE_UP:
					{
						var rect = _this.refs.interactionCanvas.getBoundingClientRect();
						_this.focalPoint = {
							x: ev.clientX - rect.left,
							y: ev.clientY - rect.top
						};
						break;
					}
				default:
			}
		};

		_this.onMouseUp = function () {
			if (_this.mouseState === MOUSE_DOWN) {
				_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
			}
			_this.mouseState = MOUSE_UP;
		};

		_this.onTouchStart = function (ev) {
			if (ev.touches.length > 1) {
				_this.touchState = TOUCH_PINCH;
			} else {
				_this.touchPos.x = ev.touches[0].pageX;
				_this.touchPos.y = ev.touches[0].pageY;
				_this.movement = { x: 0, y: 0 };
				_this.touchState = TOUCH_START;
			}
		};

		_this.onTouchMove = function (ev) {
			for (var i = 0; i < ev.touches.length; i++) {
				var cur = {
					x: ev.touches[i].pageX,
					y: ev.touches[i].pageY
				};
				_this.touchmap.positions[i] = cur;
			}
			if (ev.touches.length === 2 && _this.touchState === TOUCH_PINCH) {
				var oldD = _this.touchmap.pinchDistance;
				_this.touchmap.pinchDistance = parseInt(Math.sqrt((_this.touchmap.positions[0].x - _this.touchmap.positions[1].x) * (_this.touchmap.positions[0].x - _this.touchmap.positions[1].x) + (_this.touchmap.positions[0].y - _this.touchmap.positions[1].y) * (_this.touchmap.positions[0].y - _this.touchmap.positions[1].y)), 10);
				_this.touchmap.pinchDelta = oldD - _this.touchmap.pinchDistance;
				if (_this.touchmap.pinchDelta < 60 && _this.touchmap.pinchDelta > -60) {
					var delta = _this.touchmap.pinchDelta;
					_this.props.onZoom(delta, _this.focalPoint);
					// this.props.api.zoomBy(delta, this.props.scale, this.props.level, this.zoom.bind(this));
				}
			} else if (_this.touchState === TOUCH_START) {
				_this.movement.x = _this.touchPos.x - ev.touches[0].pageX;
				_this.movement.y = _this.touchPos.y - ev.touches[0].pageY;

				var imagePosX = _this.props.imagePos.x - _this.movement.x / _this.props.scale;
				var imagePosY = _this.props.imagePos.y - _this.movement.y / _this.props.scale;
				_this.props.onSetImagePosition(imagePosX, imagePosY);

				_this.touchPos.x = ev.touches[0].pageX;
				_this.touchPos.y = ev.touches[0].pageY;

				_this.props.onLoadImage({ scale: _this.props.scale, level: _this.props.level });
			}
			ev.preventDefault();
			ev.stopPropagation();
		};

		_this.onTouchEnd = function () {
			_this.touchState = TOUCH_END;
		};

		_this.onWheel = function (ev) {
			var delta = ev.nativeEvent.deltaY;
			_this.props.onZoom(delta, _this.focalPoint);

			return ev.preventDefault();
		};

		_this.movement = { x: 0, y: 0 };
		_this.touchPos = { x: 0, y: 0 };
		_this.mousePos = { x: 0, y: 0 };
		_this.mouseState = MOUSE_UP;
		_this.focalPoint = null;
		_this.mousemoveListener = _this.onMouseMove.bind(_this);
		_this.mouseupListener = _this.onMouseUp.bind(_this);
		_this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0
		};
		return _this;
	}

	_createClass(InteractionCanvas, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('mousemove', this.mousemoveListener);
			window.addEventListener('mouseup', this.mouseupListener);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('mousemove', this.mousemoveListener);
			window.removeEventListener('mouseup', this.mouseupListener);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('canvas', {
				className: 'interaction',
				height: this.props.viewportHeight,
				onMouseDown: this.onMouseDown,
				onTouchEnd: this.onTouchEnd,
				onTouchMove: this.onTouchMove,
				onTouchStart: this.onTouchStart,
				onWheel: this.onWheel,
				ref: 'interactionCanvas',
				width: this.props.viewportWidth
			});
		}
	}]);

	return InteractionCanvas;
}(_react.Component);

InteractionCanvas.propTypes = {
	api: _react.PropTypes.object,
	imagePos: _react.PropTypes.object,
	onLoadImage: _react.PropTypes.func,
	onSetImagePosition: _react.PropTypes.func,
	onZoom: _react.PropTypes.func,
	level: _react.PropTypes.number,
	scale: _react.PropTypes.number,
	viewportHeight: _react.PropTypes.number,
	viewportWidth: _react.PropTypes.number
};

InteractionCanvas.defaultProps = {};

exports.default = InteractionCanvas;