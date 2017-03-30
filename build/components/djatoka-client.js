"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DjatokaClient = function (_React$Component) {
	_inherits(DjatokaClient, _React$Component);

	function DjatokaClient(props) {
		_classCallCheck(this, DjatokaClient);

		var _this = _possibleConstructorReturn(this, (DjatokaClient.__proto__ || Object.getPrototypeOf(DjatokaClient)).call(this, props));

		_this.state = _store2.default.getState();
		return _this;
	}

	_createClass(DjatokaClient, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.unsubscribe = _store2.default.subscribe(function () {
				return _this2.setState(_store2.default.getState());
			});

			_store2.default.dispatch({
				type: "INITIAL",
				config: this.props.config,
				service: this.props.service,
				scaleMode: this.props.scaleMode
			});
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.config.identifier !== this.state.api.config.identifier) {
				_store2.default.dispatch((0, _actions.createNextApi)(nextProps.config));
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unsubscribe();
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var children = _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, _this3.state);
			});

			return _react2.default.createElement(
				"div",
				{ className: "facsimile" },
				children,
				this.props.closeButton && _react2.default.createElement(
					"div",
					{
						className: "close",
						onClick: this.props.onClose
					},
					"x"
				)
			);
		}
	}]);

	return DjatokaClient;
}(_react2.default.Component);

DjatokaClient.propTypes = {
	children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	config: _react2.default.PropTypes.object,
	scaleMode: _react2.default.PropTypes.string,
	service: _react2.default.PropTypes.string
};

DjatokaClient.defaultProps = {};

exports.default = DjatokaClient;