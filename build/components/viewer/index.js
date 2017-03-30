'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _interactionCanvas = require('./interaction-canvas');

var _interactionCanvas2 = _interopRequireDefault(_interactionCanvas);

var _actions = require('../../actions');

var _store = require('../../store');

var _store2 = _interopRequireDefault(_store);

var _requestAnimationFrame = require('../../util/request-animation-frame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_SCALE_MODES = ['heightFill', 'widthFill', 'widthFillTop', 'autoFill', 'fullZoom'];

var Viewer = function (_React$Component) {
	_inherits(Viewer, _React$Component);

	function Viewer(props) {
		_classCallCheck(this, Viewer);

		var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

		_this.loadImage = function () {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { scaleMode: _this.props.scaleMode };

			_this.notifyRealImagePos();
			_this.frameBuffer = _this.props.api.loadImage(_extends({
				viewport: {
					w: _this.state.viewportWidth,
					h: _this.state.viewportHeight
				},
				position: _this.imagePos,
				onScale: function onScale(scale, level, width, height) {
					_this.setDimensions(width, height);
					_this.setScale(scale, level);
					_this.centerImage(width, height);
					_this.notifyRealImagePos();
				}
			}, opts));
		};

		_this.setScale = function (scale, level) {
			_this.scale = scale;
			_this.level = level;
		};

		_this.setDimensions = function (width, height) {
			_this.width = width;
			_this.height = height;
		};

		_this.centerImage = function (w, h) {
			var x = w > _this.state.viewportWidth ? -((w - _this.state.viewportWidth) / 2) / _this.scale : (_this.state.viewportWidth - w) / 2 / _this.scale;

			var y = h > _this.state.viewportHeight ? -((h - _this.state.viewportHeight) / 2) / _this.scale : (_this.state.viewportHeight - h) / 2 / _this.scale;

			if (_this.props.scaleMode === 'widthFillTop') y = 0;

			_this.setImagePosition(x, y);
		};

		_this.setImagePosition = function (x, y) {
			_this.imagePos = _this.correctBounds(x, y);
		};

		_this.zoom = function (scale, level, width, height, focalPoint) {
			if (_this.width == null || _this.height == null) {
				_this.centerImage(width, height);
			} else {
				focalPoint = focalPoint || {
					x: _this.state.viewportWidth / 2,
					y: _this.state.viewportHeight / 2
				};

				// Calc Δx and Δy with previous scale, width and height
				var dX = (focalPoint.x - _this.imagePos.x * _this.scale) / _this.width;
				var dY = (focalPoint.y - _this.imagePos.y * _this.scale) / _this.height;

				var x = (focalPoint.x - dX * width) / scale;
				var y = (focalPoint.y - dY * height) / scale;

				_this.setImagePosition(x, y);
			}

			_this.loadImage({ scale: scale, level: level });

			// Set the next scale, level, width and height
			_this.setScale(scale, level);
			_this.setDimensions(width, height);
		};

		_this.handleZoom = function (delta, focalPoint) {
			var _this$props$api$getZo = _this.props.api.getZoomData(delta, _this.scale, _this.level),
			    _this$props$api$getZo2 = _slicedToArray(_this$props$api$getZo, 4),
			    scale = _this$props$api$getZo2[0],
			    level = _this$props$api$getZo2[1],
			    width = _this$props$api$getZo2[2],
			    height = _this$props$api$getZo2[3];

			_this.zoom(scale, level, width, height, focalPoint);
		};

		_this.state = {
			viewportWidth: null,
			vierwPortHeight: null
		};

		_this.imagePos = { x: 0, y: 0 };
		_this.imageCtx = null;
		_this.scale = 1.0;
		_this.level = null;
		_this.width = null;
		_this.height = null;
		_this.abortAnimationFrame = false;
		_this.animationFrameListener = _this.onAnimationFrame.bind(_this);
		_this.frameBuffer = [];
		_this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0
		};
		_this.requestAnimationFrame = _requestAnimationFrame.requestAnimationFrame;
		_this.cancelAnimationFrame = _requestAnimationFrame.cancelAnimationFrame;
		return _this;
	}

	_createClass(Viewer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.abortAnimationFrame = false;
			this.reset();
			this.imageCtx = this.refs.viewer.children[0].getContext('2d');
			this.requestAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.api.config.identifier !== this.props.api.config.identifier) {
				this.reset();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.abortAnimationFrame = true;
			this.cancelAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: 'onAnimationFrame',
		value: function onAnimationFrame() {
			if (this.frameBuffer.length) {
				this.imageCtx.clearRect(0, 0, this.state.viewportWidth, this.state.viewportHeight);
				for (var i = 0; i < this.frameBuffer.length; i++) {
					var tileIm = this.frameBuffer[i][0];
					var tile = this.frameBuffer[i][1];

					this.imageCtx.drawImage(tileIm, parseInt(Math.floor((tile.pos.x + this.imagePos.x) * this.scale), 10), parseInt(Math.floor((tile.pos.y + this.imagePos.y) * this.scale), 10), parseInt(Math.ceil(tileIm.width * this.scale), 10), parseInt(Math.ceil(tileIm.height * this.scale), 10));
				}
				if (this.frameBuffer.filter(function (x) {
					return x[0].complete && x[0].height > 0 && x[0].width > 0;
				}).length === this.frameBuffer.length) {
					this.frameBuffer = [];
				}
			}

			if (!this.abortAnimationFrame) {
				this.requestAnimationFrame(this.animationFrameListener);
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.imagePos.x = 0;
			this.imagePos.y = 0;
			this.width = null;
			this.height = null;
			var node = this.refs.viewer;
			this.setState({
				viewportWidth: node.clientWidth,
				viewportHeight: node.clientHeight
			}, this.loadImage.bind(this));
		}
	}, {
		key: 'notifyRealImagePos',
		value: function notifyRealImagePos() {
			var zoom = this.props.api.getRealScale(this.scale, this.level);
			var dims = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);

			_store2.default.dispatch((0, _actions.setRealViewPort)({
				x: -dims.x / dims.w,
				y: -dims.y / dims.h,
				w: this.state.viewportWidth / dims.w,
				h: this.state.viewportHeight / dims.h,
				zoom: zoom,
				reposition: false,
				applyZoom: false
			}));
		}
	}, {
		key: 'correctBounds',
		value: function correctBounds(x, y) {
			if (this.props.freeMovement) return { x: x, y: y };

			var correctedX = x;
			var correctedY = y;

			if (this.width <= this.state.viewportWidth) {
				if (x < 0) {
					correctedX = 0;
				}
				if (x * this.scale + this.width > this.state.viewportWidth) {
					correctedX = (this.state.viewportWidth - this.width) / this.scale;
				}
			} else if (this.width > this.state.viewportWidth) {
				if (x > 0) {
					correctedX = 0;
				}
				if (x * this.scale + this.width < this.state.viewportWidth) {
					correctedX = (this.state.viewportWidth - this.width) / this.scale;
				}
			}

			if (this.height <= this.state.viewportHeight) {
				if (y < 0) {
					correctedY = 0;
				}
				if (y * this.scale + this.height > this.state.viewportHeight) {
					correctedY = (this.state.viewportHeight - this.height) / this.scale;
				}
			} else if (this.height > this.state.viewportHeight) {
				if (y > 0) {
					correctedY = 0;
				}
				if (y * this.scale + this.height < this.state.viewportHeight) {
					correctedY = (this.state.viewportHeight - this.height) / this.scale;
				}
			}

			return { x: correctedX, y: correctedY };
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: 'hire-djatoka-client',
					ref: 'viewer'
				},
				_react2.default.createElement('canvas', {
					className: 'image',
					height: this.state.viewportHeight,
					width: this.state.viewportWidth
				}),
				_react2.default.createElement(_interactionCanvas2.default, _extends({}, this.props, this.state, {
					height: this.height,
					imagePos: this.imagePos,
					level: this.level,
					onLoadImage: this.loadImage,
					onSetImagePosition: this.setImagePosition,
					onZoom: this.handleZoom,
					scale: this.scale
				}))
			);
		}
	}]);

	return Viewer;
}(_react2.default.Component);

Viewer.propTypes = {
	api: _react2.default.PropTypes.object,
	config: _react2.default.PropTypes.object,
	scaleMode: function scaleMode(props, propName) {
		if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
			var msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
			props[propName] = 'heightFill';
			return new Error(msg);
		}
	},
	service: _react2.default.PropTypes.string
};

Viewer.defaultProps = {
	scaleMode: 'autoFill'
};

exports.default = Viewer;