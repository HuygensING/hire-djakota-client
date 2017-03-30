"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _freeMovement = require("./icons/free-movement");

var _freeMovement2 = _interopRequireDefault(_freeMovement);

var _actions = require("../actions");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreeMovementButton = function (_React$Component) {
    _inherits(FreeMovementButton, _React$Component);

    function FreeMovementButton(props) {
        _classCallCheck(this, FreeMovementButton);

        var _this = _possibleConstructorReturn(this, (FreeMovementButton.__proto__ || Object.getPrototypeOf(FreeMovementButton)).call(this, props));

        _this.state = _store2.default.getState();
        return _this;
    }

    _createClass(FreeMovementButton, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.unsubscribe = _store2.default.subscribe(function () {
                return _this2.setState(_store2.default.getState());
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.unsubscribe();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            _store2.default.dispatch((0, _actions.setFreeMovement)(!this.state.freeMovement));
        }
    }, {
        key: "render",
        value: function render() {
            var c = "hire-free-movement-button";
            if (!this.state.freeMovement) {
                c += " active";
            }
            return _react2.default.createElement(
                "button",
                { className: c, onClick: this.onClick.bind(this) },
                _react2.default.createElement(_freeMovement2.default, null)
            );
        }
    }]);

    return FreeMovementButton;
}(_react2.default.Component);

exports.default = FreeMovementButton;