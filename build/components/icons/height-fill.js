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

var HeightFill = function (_React$Component) {
    _inherits(HeightFill, _React$Component);

    function HeightFill() {
        _classCallCheck(this, HeightFill);

        return _possibleConstructorReturn(this, (HeightFill.__proto__ || Object.getPrototypeOf(HeightFill)).apply(this, arguments));
    }

    _createClass(HeightFill, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                { viewBox: "0 0 18 17" },
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("path", { d: "m 7.8735657,3.2305929 0.088125,9.1793421", style: { strokeWidth: 2 } }),
                    _react2.default.createElement("path", { d: "M 4.6336281,3.641452 7.9449077,0.21145225 11.004625,3.6037073", style: { strokeWidth: 0 } }),
                    _react2.default.createElement("path", { d: "m 11.229771,12.149816 -3.3112819,3.43 -3.0597154,-3.392255", style: { strokeWidth: 0 } })
                )
            );
        }
    }]);

    return HeightFill;
}(_react2.default.Component);

exports.default = HeightFill;