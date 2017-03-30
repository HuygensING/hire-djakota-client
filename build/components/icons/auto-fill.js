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

var AutoFill = function (_React$Component) {
  _inherits(AutoFill, _React$Component);

  function AutoFill() {
    _classCallCheck(this, AutoFill);

    return _possibleConstructorReturn(this, (AutoFill.__proto__ || Object.getPrototypeOf(AutoFill)).apply(this, arguments));
  }

  _createClass(AutoFill, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { viewBox: "0 -2 16 20" },
        _react2.default.createElement("path", { d: "M 2.2510028,2.3999952 14.134355,13.976932", style: { strokeWidth: 2 } }),
        _react2.default.createElement("path", { d: "M 0.17726274,4.8389082 0.0558895,0.07290967 4.6198279,0.27222077", style: { strokeWidth: 0 } }),
        _react2.default.createElement("path", {
          d: "m 15.925831,11.287935 0.121374,4.765999 -4.563938,-0.199312",
          style: { strokeWidth: 0 }
        }),
        _react2.default.createElement("path", {
          d: "M 13.731112,2.2550713 2.1257829,14.110698",
          style: { strokeWidth: 2 } }),
        _react2.default.createElement("path", {
          d: "M 11.297166,0.17550349 16.063441,0.06553063 15.853214,4.6289791",
          style: { strokeWidth: 0 }
        }),
        _react2.default.createElement("path", {
          d: "M 4.8104871,15.908601 0.0442114,16.018574 0.2544395,11.455126",
          style: { strokeWidth: 0 }
        })
      );
    }
  }]);

  return AutoFill;
}(_react2.default.Component);

exports.default = AutoFill;