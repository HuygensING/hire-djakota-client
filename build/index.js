'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = exports.DjatokaClient = undefined;

var _djatokaClient = require('./components/djatoka-client');

var _djatokaClient2 = _interopRequireDefault(_djatokaClient);

var _viewer = require('./components/viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DjatokaClient = _djatokaClient2.default; // Use require() because brfs cannot handle import
// const fs = require('fs');
// import insertCss from 'insert-css';
// let css = fs.readFileSync(__dirname + '/index.css');
// insertCss(css, { prepend: true });

exports.Viewer = _viewer2.default;
// export Minimap from './components/minimap';
// export Zoom from './components/zoom';
// export FillButton from './components/fill-button';
// export FreeMovementButton from './components/free-movement-button';