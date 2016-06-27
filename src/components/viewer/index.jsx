import React from 'react';
import InteractionCanvas from './interaction-canvas';
import { setRealViewPort } from '../../actions';
import store from '../../store';
import { requestAnimationFrame, cancelAnimationFrame } from '../../util/request-animation-frame';

const RESIZE_DELAY = 5;

const SUPPORTED_SCALE_MODES = [
	'heightFill',
	'widthFill',
	'widthFillTop',
	'autoFill',
	'fullZoom',
];

class Viewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: null,
			height: null,
		};

		this.imagePos = { x: 0, y: 0 };
		this.imageCtx = null;
		this.resizeDelay = 0;
		this.scale = 1.0;
		this.level = null;
		this.width = null;
		this.height = null;
		this.abortAnimationFrame = false;
		this.resizeListener = this.onResize.bind(this);
		this.animationFrameListener = this.onAnimationFrame.bind(this);
		this.frameBuffer = [];
		this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0,
		};
		this.requestAnimationFrame = requestAnimationFrame;
		this.cancelAnimationFrame = cancelAnimationFrame;
	}

	componentDidMount() {
		this.abortAnimationFrame = false;
		this.commitResize();
		this.imageCtx = this.refs.viewer.children[0].getContext('2d');
		window.addEventListener('resize', this.resizeListener);
		this.requestAnimationFrame(this.animationFrameListener);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.api.config.identifier !== this.props.api.config.identifier) {
			this.commitResize();
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return this.state.width !== nextState.width ||
	// 		this.state.height !== nextState.height ||
	// 		this.props.api.config.identifier !== nextProps.api.config.identifier;
	// }

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeListener);
		this.abortAnimationFrame = true;
		this.cancelAnimationFrame(this.animationFrameListener);
	}

	onAnimationFrame() {
		if (this.frameBuffer.length) {
			this.imageCtx.clearRect(0, 0, this.state.width, this.state.height);
			for (let i = 0; i < this.frameBuffer.length; i++) {
				const tileIm = this.frameBuffer[i][0];
				const tile = this.frameBuffer[i][1];
				this.imageCtx.drawImage(
					tileIm,
					parseInt(Math.floor((tile.pos.x + this.imagePos.x) * this.scale)),
					parseInt(Math.floor((tile.pos.y + this.imagePos.y) * this.scale)),
					parseInt(Math.ceil(tileIm.width * this.scale)),
					parseInt(Math.ceil(tileIm.height * this.scale))
				);
			}
			if (this.frameBuffer.filter((x) => x[0].complete && x[0].height > 0 && x[0].width > 0).length === this.frameBuffer.length) {
				this.frameBuffer = [];
			}
		}

		if (this.resizeDelay === 0) {
			this.commitResize();
			this.resizeDelay = -1;
		} else if (this.resizeDelay > 0) {
			this.resizeDelay -= 1;
		}

		if (!this.abortAnimationFrame) {
			this.requestAnimationFrame(this.animationFrameListener);
		}
	}

	onResize() {
		this.resizeDelay = RESIZE_DELAY;
	}

	commitResize() {
		this.resizeDelay = RESIZE_DELAY;
		this.imagePos.x = 0;
		this.imagePos.y = 0;
		this.width = null;
		this.height = null;
		const node = this.refs.viewer;
		this.setState({
			width: node.clientWidth,
			height: node.clientHeight,
		}, this.loadImage.bind(this));
	}

	notifyRealImagePos() {
		const zoom = this.props.api.getRealScale(this.scale, this.level);
		const dims = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);

		store.dispatch(setRealViewPort({
			x: -dims.x / dims.w,
			y: -dims.y / dims.h,
			w: this.state.width / dims.w,
			h: this.state.height / dims.h,
			zoom,
			reposition: false,
			applyZoom: false,
		}));
	}

	loadImage = (opts = { scaleMode: this.props.scaleMode }) => {
		this.notifyRealImagePos();
		this.frameBuffer = this.props.api.loadImage({
			viewport: {
				w: this.state.width,
				h: this.state.height,
			},
			position: this.imagePos,
			onScale: (scale, level, width, height) => {
				this.setDimensions(width, height);
				this.setScale(scale, level);
				this.centerImage(width, height);
				this.notifyRealImagePos();
			},
			...opts,
		});
	}

	setScale = (scale, level) => {
		this.scale = scale;
		this.level = level;
	}

	setDimensions = (width, height) => {
		this.width = width;
		this.height = height;
	}

	// centerImage = (w, h) => {
	// 	if (w > this.state.width) {
	// 		this.imagePos.x = -parseInt((w - this.state.width) / 2) / this.scale;
	// 	} else if (w < this.state.width) {
	// 		this.imagePos.x = parseInt((this.state.width - w) / 2) / this.scale;
	// 	}
	//
	// 	if (h > this.state.height) {
	// 		this.imagePos.y = -parseInt((h - this.state.height) / 2) / this.scale;
	// 	} else if (h < this.state.width) {
	// 		this.imagePos.y = parseInt((this.state.height - h) / 2) / this.scale;
	// 	}
	// }
	//
	centerImage = (w, h) => {
		const x = (w > this.state.width) ?
			-((w - this.state.width) / 2) / this.scale :
			((this.state.width - w) / 2) / this.scale;

		const y = (h > this.state.height) ?
			-((h - this.state.height) / 2) / this.scale :
			((this.state.height - h) / 2) / this.scale;

		this.setImagePosition(x, y);
	}

	correctBounds(x, y) {
		if (this.props.freeMovement) return { x, y };

		let correctedX = x;
		let correctedY = y;

		if (this.width <= this.state.width) {
			if (x < 0) { correctedX = 0; }
			if (x * this.scale + this.width > this.state.width) {
				correctedX = (this.state.width - this.width) / this.scale;
			}
		} else if (this.width > this.state.width) {
			if (x > 0) { correctedX = 0; }
			if (x * this.scale + this.width < this.state.width) {
				correctedX = (this.state.width - this.width) / this.scale;
			}
		}

		if (this.height <= this.state.height) {
			if (y < 0) { correctedY = 0; }
			if (y * this.scale + this.height > this.state.height) {
				correctedY = (this.state.height - this.height) / this.scale;
			}
		} else if (this.height > this.state.height) {
			if (y > 0) { correctedY = 0; }
			if (y * this.scale + this.height < this.state.height) {
				correctedY = (this.state.height - this.height) / this.scale;
			}
		}

		return { x: correctedX, y: correctedY };
	}

	setImagePosition = (x, y) => {
		this.imagePos = this.correctBounds(x, y);
	}

	zoom = (scale, level, width, height, focalPoint) => {
		this.setDimensions(width, height);
		this.setScale(scale, level);

		focalPoint = focalPoint || {
			x: this.state.width / 2,
			y: this.state.height / 2,
		};

		const dX = (focalPoint.x - (this.imagePos.x * scale)) / this.width;
		const dY = (focalPoint.y - (this.imagePos.y * scale)) / this.height;
		console.log(dX)

		if (this.width == null || this.height == null) {
			this.centerImage(width, height);
		} else {
			const x = (focalPoint.x - (dX * this.width)) / scale;
			const y = (focalPoint.y - (dY * this.height)) / scale;
			this.setImagePosition(x, y);
		}

		this.loadImage({ scale, level });
	}

	handleZoom = (delta, focalPoint) => {
		const [scale, level, width, height] = this.props.api.getZoomData(
			delta,
			this.scale,
			this.level
		);

		this.zoom(scale, level, width, height, focalPoint);
	}

	render() {
		return (
			<div
				className="hire-djatoka-client"
				ref="viewer"
			>
				<canvas
					className="image"
					height={this.state.height}
					width={this.state.width}
				/>
				<InteractionCanvas
					{...this.props}
					height={this.height}
					imagePos={this.imagePos}
					level={this.level}
					onCenterImage={this.centerImage}
					onLoadImage={this.loadImage}
					onSetDimensions={this.setDimensions}
					onSetScale={this.setScale}
					onSetImagePosition={this.setImagePosition}
					onZoom={this.handleZoom}
					scale={this.scale}
					width={this.width}
					viewerHeight={this.state.height}
					viewerWidth={this.state.width}
				/>
			</div>
		);
	}
}

Viewer.propTypes = {
	api: React.PropTypes.object,
	config: React.PropTypes.object,
	scaleMode: function(props, propName) {
		if (SUPPORTED_SCALE_MODES.indexOf(props[propName]) < 0) {
			const msg = "Scale mode '" + props[propName] + "' not supported. Modes: " + SUPPORTED_SCALE_MODES.join(", ");
			props[propName] = 'heightFill';
			return new Error(msg);
		}
	},
	service: React.PropTypes.string,
};

Viewer.defaultProps = {
	scaleMode: 'autoFill',
};

export default Viewer;
