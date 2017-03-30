"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidthFill = function (_React$Component) {
    _inherits(WidthFill, _React$Component);

    function WidthFill() {
        _classCallCheck(this, WidthFill);

        return _possibleConstructorReturn(this, (WidthFill.__proto__ || Object.getPrototypeOf(WidthFill)).apply(this, arguments));
    }

    _createClass(WidthFill, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                { viewBox: "0 0 24 17" },
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("path", { d: "m 3.2525423,8.5338983 16.5903457,0", style: { strokeWidth: 2 } }),
                    _react2.default.createElement("path", { d: "M 3.4690633,11.727926 0.0563563,8.3988265 3.4645013,5.3568195", style: { strokeWidth: 0 } }),
                    _react2.default.createElement("path", { d: "m 19.249675,5.3577067 3.412707,3.3291 -3.408145,3.0420063", style: { strokeWidth: 0 } })
                )
            );
        }
    }]);

    return WidthFill;
}(_react2.default.Component);

exports.default = WidthFill;