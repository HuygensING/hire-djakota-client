'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IDX_WIDTH = 1;
var IDX_HEIGHT = 0;
var TILE_SIZE = 512;

// const downScale = function(val, times) { return times > 0 ? downScale(val / 2, --times) : val; };
// const upScale = function(val, times) { return times > 0 ? upScale(val * 2, --times) : val; };
var upScale = function upScale(val, times) {
	return Math.pow(2, times) * val;
};
var downScale = function downScale(val, times) {
	return Math.pow(2, -times) * val;
};

var Api = function () {
	function Api(service, config) {
		_classCallCheck(this, Api);

		this.service = service;
		this.config = config;
		this.params = {
			rft_id: this.config.identifier,
			url_ver: 'Z39.88-2004',
			svc_val_fmt: 'info:ofi/fmt:kev:mtx:jpeg2000',
			'svc.format': 'image/jpeg'
		};
		this.levels = parseInt(this.config.levels, 10);
		this.fullWidth = parseInt(this.config.width, 10);
		this.fullHeight = parseInt(this.config.height, 10);
		this.resolutions = [];
		this.initializeResolutions(this.levels - 1, this.fullWidth, this.fullHeight);
		this.tileMap = {};
	}

	_createClass(Api, [{
		key: 'initializeResolutions',
		value: function initializeResolutions() {
			var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.levels - 1;
			var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fullWidth;
			var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fullHeight;

			this.resolutions.unshift([h, w]);
			if (level > 0) {
				this.initializeResolutions(--level, parseInt(Math.floor(w / 2), 10), parseInt(Math.floor(h / 2), 10));
			}
		}
	}, {
		key: 'findLevel',
		value: function findLevel(dim, idx) {
			var i = void 0;
			for (i = 0; i < this.resolutions.length; i++) {
				if (this.resolutions[i][idx] > dim) {
					return i + 1;
				}
			}
			return i;
		}
	}, {
		key: 'makeTileUrl',
		value: function makeTileUrl(level, dims) {
			return this.service + '?' + _qs2.default.stringify(_extends({}, this.params, {
				'svc.region': dims.join(','),
				'svc.level': level,
				svc_id: 'info:lanl-repo/svc/getRegion'
			}));
		}
	}, {
		key: 'fetchTile',
		value: function fetchTile(tile) {
			var key = tile.realX + '-' + tile.realY + '-' + tile.level + '-' + tile.url;
			if (!this.tileMap[key]) {
				this.tileMap[key] = new Image();
				this.tileMap[key].src = tile.url;
			}
			return [this.tileMap[key], tile];
		}
	}, {
		key: 'getStart',
		value: function getStart(dim) {
			var n = 0;
			while (dim + n < -TILE_SIZE) {
				n += TILE_SIZE;
			}
			return n;
		}
	}, {
		key: 'makeTiles',
		value: function makeTiles(opts, level, scale) {
			var upscaleFactor = this.resolutions.length - level;
			var yStart = this.getStart(opts.position.y);
			var xStart = this.getStart(opts.position.x);
			var tiles = [];

			for (var y = yStart; (y - yStart) * scale - TILE_SIZE * 2 + opts.position.y < opts.viewport.h && upScale(y, upscaleFactor) < this.fullHeight; y += TILE_SIZE) {
				for (var x = xStart; (x - xStart) * scale - TILE_SIZE * 2 + opts.position.x < opts.viewport.w && upScale(x, upscaleFactor) < this.fullWidth; x += TILE_SIZE) {
					tiles.push(this.fetchTile({
						realX: x,
						realY: y,
						pos: { x: x, y: y },
						level: level,
						url: this.makeTileUrl(level, [upScale(y, upscaleFactor), upScale(x, upscaleFactor), TILE_SIZE, TILE_SIZE])
					}));
				}
			}

			return tiles;
		}
	}, {
		key: 'findLevelForScale',
		value: function findLevelForScale(s) {
			var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.levels;
			var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

			if (s > current / 2 || level === 1) return level;
			return this.findLevelForScale(s, --level, current / 2);
		}
	}, {
		key: 'determineZoomFactor',
		value: function determineZoomFactor(delta, scale, level) {
			var rev = delta > 0 ? -1 : 1;
			var rs = this.getRealScale(scale, level);
			var factor = void 0;

			if (rs >= 0.6) {
				factor = 0.04 * rev;
			} else if (rs >= 0.3) {
				factor = 0.02 * rev;
			} else if (rs >= 0.1) {
				factor = 0.01 * rev;
			} else if (rs >= 0.05) {
				factor = 0.005 * rev;
			} else {
				factor = 0.0025 * rev;
			}

			return factor;
		}
	}, {
		key: 'getZoomData',
		value: function getZoomData(delta, scale, level) {
			var factor = this.determineZoomFactor(delta, scale, level);
			var viewportScale = this.getRealScale(scale, level) + factor;
			if (viewportScale < 0.01) {
				viewportScale = 0.01;
			}
			var newLevel = this.findLevelForScale(viewportScale);
			var newScale = upScale(viewportScale, this.resolutions.length - newLevel);

			return [newScale, newLevel, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale)];
		}
	}, {
		key: 'getRealScale',
		value: function getRealScale(scale, level) {
			return downScale(scale, this.resolutions.length - level);
		}
	}, {
		key: 'getRealImagePos',
		value: function getRealImagePos(position, scale, level) {
			return {
				x: Math.floor(position.x * scale),
				y: Math.floor(position.y * scale),
				w: Math.ceil(this.fullWidth * this.getRealScale(scale, level)),
				h: Math.ceil(this.fullHeight * this.getRealScale(scale, level))
			};
		}
	}, {
		key: 'prepareMakeTiles',
		value: function prepareMakeTiles(opts, scale, level) {
			var upscaleFactor = this.resolutions.length - level;
			var viewportScale = downScale(scale, upscaleFactor);

			if (opts.onScale) {
				opts.onScale(scale, level, Math.ceil(this.fullWidth * viewportScale), Math.ceil(this.fullHeight * viewportScale));
			}

			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: 'widthFill',
		value: function widthFill(opts) {
			var level = this.findLevel(opts.viewport.w, IDX_WIDTH);
			var scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'widthFillTop',
		value: function widthFillTop(opts) {
			var level = this.findLevel(opts.viewport.w, IDX_WIDTH);
			var scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'heightFill',
		value: function heightFill(opts) {
			var level = this.findLevel(opts.viewport.h, IDX_HEIGHT);
			var scale = opts.viewport.h / this.resolutions[level - 1][IDX_HEIGHT];
			return this.prepareMakeTiles(opts, scale, level);
		}
	}, {
		key: 'autoFill',
		value: function autoFill(opts) {
			if (this.fullHeight > this.fullWidth) {
				return this.heightFill(opts);
			} else {
				return this.widthFill(opts);
			}
		}
	}, {
		key: 'fullZoom',
		value: function fullZoom(opts) {
			var level = this.levels;
			var scale = 1;

			if (opts.onScale) {
				opts.onScale(scale, level, this.fullWidth, this.fullHeight);
			}
			return this.makeTiles(opts, level, scale);
		}
	}, {
		key: 'loadImage',
		value: function loadImage(opts) {
			if (opts.scaleMode) {
				return this[opts.scaleMode](opts);
			} else {
				return this.makeTiles(opts, opts.level, opts.scale);
			}
		}
	}]);

	return Api;
}();

exports.default = Api;