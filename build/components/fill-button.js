"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _heightFill = require("./icons/height-fill");

var _heightFill2 = _interopRequireDefault(_heightFill);

var _widthFill = require("./icons/width-fill");

var _widthFill2 = _interopRequireDefault(_widthFill);

var _autoFill = require("./icons/auto-fill");

var _autoFill2 = _interopRequireDefault(_autoFill);

var _actions = require("../actions");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_SCALE_MODES = ["heightFill", "widthFill", "autoFill", "fullZoom"];

var FillButton = function (_React$Component) {
    _inherits(FillButton, _React$Component);

    function FillButton() {
        _classCallCheck(this, FillButton);

        return _possibleConstructorReturn(this, (FillButton.__proto__ || Object.getPrototypeOf(FillButton)).apply(this, arguments));
    }

    _createClass(FillButton, [{
        key: "renderIcon",
        value: function renderIcon() {
            switch (this.props.scaleMode) {
                case "fullZoom":
                    return "100%";
                case "autoFill":
                    return _react2.default.createElement(_autoFill2.default, null);
                case "heightFill":
                    return _react2.default.createElement(_heightFill2.default, null);
                case "widthFill":
                default:
                    return _react2.default.createElement(_widthFill2.default, null);
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            _store2.default.dispatch((0, _actions.setFill)(this.props.scaleMode));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "button",
                { className: "hire-fill-button", onClick: this.onClick.bind(this) },
                this.renderIcon()
            );
        }
    }]);

    return FillButton;
}(_react2.default.Component);

FillButton.propTypes = {
    scaleMode: function scaleMode(props, propName) {
        if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
            var msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
            props[propName] = "heightFill";
            return new Error(msg);
        }
    }
};

FillButton.defaultProps = {
    scaleMode: "heightFill"
};

exports.default = FillButton;