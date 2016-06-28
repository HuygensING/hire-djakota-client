import qs from 'qs';

const IDX_WIDTH = 1;
const IDX_HEIGHT = 0;
const TILE_SIZE = 512;

// const downScale = function(val, times) { return times > 0 ? downScale(val / 2, --times) : val; };
// const upScale = function(val, times) { return times > 0 ? upScale(val * 2, --times) : val; };
const upScale = (val, times) => Math.pow(2, times) * val;
const downScale = (val, times) => Math.pow(2, -times) * val;

class Api {
	constructor(service, config) {
		this.service = service;
		this.config = config;
		this.params = {
			rft_id: this.config.identifier,
			url_ver: 'Z39.88-2004',
			svc_val_fmt: 'info:ofi/fmt:kev:mtx:jpeg2000',
			'svc.format': 'image/jpeg',
		};
		this.levels = parseInt(this.config.levels, 10);
		this.fullWidth = parseInt(this.config.width, 10);
		this.fullHeight = parseInt(this.config.height, 10);
		this.resolutions = [];
		this.initializeResolutions(this.levels - 1, this.fullWidth, this.fullHeight);
		this.tileMap = {};
	}

	initializeResolutions(level = this.levels - 1, w = this.fullWidth, h = this.fullHeight) {
		this.resolutions.unshift([h, w]);
		if (level > 0) {
			this.initializeResolutions(
				--level,
				parseInt(Math.floor(w / 2), 10),
				parseInt(Math.floor(h / 2), 10)
			);
		}
	}

	findLevel(dim, idx)	{
		let i;
		for (i = 0; i < this.resolutions.length; i++) {
			if (this.resolutions[i][idx] > dim) {
				return i + 1;
			}
		}
		return i;
	}

	makeTileUrl(level, dims) {
		return this.service + '?' +
			qs.stringify({ ...this.params, ...{
				'svc.region': dims.join(','),
				'svc.level': level,
				svc_id: 'info:lanl-repo/svc/getRegion',
			} });
	}


	fetchTile(tile) {
		const key = `${tile.realX}-${tile.realY}-${tile.level}-${tile.url}`;
		if (!this.tileMap[key]) {
			this.tileMap[key] = new Image();
			this.tileMap[key].src = tile.url;
		}
		return [this.tileMap[key], tile];
	}

	getStart(dim) {
		let n = 0;
		while (dim + n < -TILE_SIZE) {
			n += TILE_SIZE;
		}
		return n;
	}

	makeTiles(opts, level, scale) {
		const upscaleFactor = this.resolutions.length - level;
		const yStart = this.getStart(opts.position.y);
		const xStart = this.getStart(opts.position.x);
		const tiles = [];

		for (let y = yStart;
				((y - yStart) * scale) - TILE_SIZE * 2 + opts.position.y < opts.viewport.h &&
				upScale(y, upscaleFactor) < this.fullHeight;
				y += TILE_SIZE) {
			for (let x = xStart;
				((x - xStart) * scale) - TILE_SIZE * 2 + opts.position.x < opts.viewport.w &&
				upScale(x, upscaleFactor) < this.fullWidth;
				x += TILE_SIZE) {
				tiles.push(this.fetchTile({
					realX: x,
					realY: y,
					pos: { x, y },
					level,
					url: this.makeTileUrl(
						level,
						[
							upScale(y, upscaleFactor),
							upScale(x, upscaleFactor),
							TILE_SIZE,
							TILE_SIZE,
						],
					),
				}));
			}
		}

		return tiles;
	}

	findLevelForScale(s, level = this.levels, current = 1) {
		if (s > current / 2 || level === 1) return level;
		return this.findLevelForScale(s, --level, current / 2);
	}

	determineZoomFactor(delta, scale, level) {
		const rev = delta > 0 ? -1 : 1;
		const rs = this.getRealScale(scale, level);
		let factor;

		if (rs >= 0.6) { factor = 0.04 * rev; }
		else if (rs >= 0.3) { factor = 0.02 * rev; }
		else if (rs >= 0.1) { factor = 0.01 * rev; }
		else if (rs >= 0.05) { factor = 0.005 * rev; }
		else { factor = 0.0025 * rev; }

		return factor;
	}

	getZoomData(delta, scale, level) {
		const factor = this.determineZoomFactor(delta, scale, level);
		let viewportScale = this.getRealScale(scale, level) + factor;
		if (viewportScale < 0.01) { viewportScale = 0.01; }
		const newLevel = this.findLevelForScale(viewportScale);
		const newScale = upScale(viewportScale, this.resolutions.length - newLevel);

		return [
			newScale,
			newLevel,
			Math.ceil(this.fullWidth * viewportScale),
			Math.ceil(this.fullHeight * viewportScale),
		];
	}

	getRealScale(scale, level) {
		return downScale(scale, this.resolutions.length - level);
	}

	getRealImagePos(position, scale, level) {
		return {
			x: Math.floor(position.x * scale),
			y: Math.floor(position.y * scale),
			w: Math.ceil(this.fullWidth * this.getRealScale(scale, level)),
			h: Math.ceil(this.fullHeight * this.getRealScale(scale, level)),
		};
	}

	prepareMakeTiles(opts, scale, level) {
		const upscaleFactor = this.resolutions.length - level;
		const viewportScale = downScale(scale, upscaleFactor);

		if (opts.onScale) {
			opts.onScale(
				scale,
				level,
				Math.ceil(this.fullWidth * viewportScale),
				Math.ceil(this.fullHeight * viewportScale)
			);
		}

		return this.makeTiles(opts, level, scale);
	}

	widthFill(opts) {
		const level = this.findLevel(opts.viewport.w, IDX_WIDTH);
		const scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
		return this.prepareMakeTiles(opts, scale, level);
	}

	widthFillTop(opts) {
		const level = this.findLevel(opts.viewport.w, IDX_WIDTH);
		const scale = opts.viewport.w / this.resolutions[level - 1][IDX_WIDTH];
		return this.prepareMakeTiles(opts, scale, level);
	}

	heightFill(opts) {
		const level = this.findLevel(opts.viewport.h, IDX_HEIGHT);
		const scale = opts.viewport.h / this.resolutions[level - 1][IDX_HEIGHT];
		return this.prepareMakeTiles(opts, scale, level);
	}

	autoFill(opts) {
		if (this.fullHeight > this.fullWidth) {
			return this.heightFill(opts);
		} else {
			return this.widthFill(opts);
		}
	}

	fullZoom(opts) {
		const level = this.levels;
		const scale = 1;

		if (opts.onScale) { opts.onScale(scale, level, this.fullWidth, this.fullHeight); }
		return this.makeTiles(opts, level, scale);
	}

	loadImage(opts) {
		if (opts.scaleMode) {
			return this[opts.scaleMode](opts);
		} else {
			return this.makeTiles(opts, opts.level, opts.scale);
		}

	}
}

export default Api;
