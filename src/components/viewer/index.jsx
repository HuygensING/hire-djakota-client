import React from 'react';
import InteractionCanvas from './interaction-canvas';
import { setRealViewPort } from '../../actions';
import store from '../../store';
import { requestAnimationFrame, cancelAnimationFrame } from '../../util/request-animation-frame';

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
			viewportWidth: null,
			vierwPortHeight: null,
		};

		this.imagePos = { x: 0, y: 0 };
		this.imageCtx = null;
		this.scale = 1.0;
		this.level = null;
		this.width = null;
		this.height = null;
		this.abortAnimationFrame = false;
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
		this.reset();
		this.imageCtx = this.refs.viewer.children[0].getContext('2d');
		this.requestAnimationFrame(this.animationFrameListener);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.api.config.identifier !== this.props.api.config.identifier) {
			this.reset();
		}
	}

	componentWillUnmount() {
		this.abortAnimationFrame = true;
		this.cancelAnimationFrame(this.animationFrameListener);
	}

	onAnimationFrame() {
		if (this.frameBuffer.length) {
			this.imageCtx.clearRect(0, 0, this.state.viewportWidth, this.state.viewportHeight);
			for (let i = 0; i < this.frameBuffer.length; i++) {
				const tileIm = this.frameBuffer[i][0];
				const tile = this.frameBuffer[i][1];

				this.imageCtx.drawImage(
					tileIm,
					parseInt(Math.floor((tile.pos.x + this.imagePos.x) * this.scale), 10),
					parseInt(Math.floor((tile.pos.y + this.imagePos.y) * this.scale), 10),
					parseInt(Math.ceil(tileIm.width * this.scale), 10),
					parseInt(Math.ceil(tileIm.height * this.scale), 10)
				);
			}
			if (
				this.frameBuffer.filter((x) =>
					x[0].complete &&
					x[0].height > 0 &&
					x[0].width > 0
				).length === this.frameBuffer.length) {
				this.frameBuffer = [];
			}
		}

		if (!this.abortAnimationFrame) {
			this.requestAnimationFrame(this.animationFrameListener);
		}
	}

	reset() {
		this.imagePos.x = 0;
		this.imagePos.y = 0;
		this.width = null;
		this.height = null;
		const node = this.refs.viewer;
		this.setState({
			viewportWidth: node.clientWidth,
			viewportHeight: node.clientHeight,
		}, this.loadImage.bind(this));
	}

	notifyRealImagePos() {
		const zoom = this.props.api.getRealScale(this.scale, this.level);
		const dims = this.props.api.getRealImagePos(this.imagePos, this.scale, this.level);

		store.dispatch(setRealViewPort({
			x: -dims.x / dims.w,
			y: -dims.y / dims.h,
			w: this.state.viewportWidth / dims.w,
			h: this.state.viewportHeight / dims.h,
			zoom,
			reposition: false,
			applyZoom: false,
		}));
	}

	loadImage = (opts = { scaleMode: this.props.scaleMode }) => {
		this.notifyRealImagePos();
		this.frameBuffer = this.props.api.loadImage({
			viewport: {
				w: this.state.viewportWidth,
				h: this.state.viewportHeight,
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

	centerImage = (w, h) => {
		const x = (w > this.state.viewportWidth) ?
			-((w - this.state.viewportWidth) / 2) / this.scale :
			((this.state.viewportWidth - w) / 2) / this.scale;

		let y = (h > this.state.viewportHeight) ?
			-((h - this.state.viewportHeight) / 2) / this.scale :
			((this.state.viewportHeight - h) / 2) / this.scale;

		if (this.props.scaleMode === 'widthFillTop') y = 0;

		this.setImagePosition(x, y);
	}

	correctBounds(x, y) {
		if (this.props.freeMovement) return { x, y };

		let correctedX = x;
		let correctedY = y;

		if (this.width <= this.state.viewportWidth) {
			if (x < 0) { correctedX = 0; }
			if (x * this.scale + this.width > this.state.viewportWidth) {
				correctedX = (this.state.viewportWidth - this.width) / this.scale;
			}
		} else if (this.width > this.state.viewportWidth) {
			if (x > 0) { correctedX = 0; }
			if (x * this.scale + this.width < this.state.viewportWidth) {
				correctedX = (this.state.viewportWidth - this.width) / this.scale;
			}
		}

		if (this.height <= this.state.viewportHeight) {
			if (y < 0) { correctedY = 0; }
			if (y * this.scale + this.height > this.state.viewportHeight) {
				correctedY = (this.state.viewportHeight - this.height) / this.scale;
			}
		} else if (this.height > this.state.viewportHeight) {
			if (y > 0) { correctedY = 0; }
			if (y * this.scale + this.height < this.state.viewportHeight) {
				correctedY = (this.state.viewportHeight - this.height) / this.scale;
			}
		}

		return { x: correctedX, y: correctedY };
	}

	setImagePosition = (x, y) => {
		this.imagePos = this.correctBounds(x, y);
	}

	zoom = (scale, level, width, height, focalPoint) => {
		if (this.width == null || this.height == null) {
			this.centerImage(width, height);
		} else {
			focalPoint = focalPoint || {
				x: this.state.viewportWidth / 2,
				y: this.state.viewportHeight / 2,
			};

			// Calc Δx and Δy with previous scale, width and height
			const dX = (focalPoint.x - (this.imagePos.x * this.scale)) / this.width;
			const dY = (focalPoint.y - (this.imagePos.y * this.scale)) / this.height;

			const x = (focalPoint.x - (dX * width)) / scale;
			const y = (focalPoint.y - (dY * height)) / scale;

			this.setImagePosition(x, y);
		}

		this.loadImage({ scale, level });

		// Set the next scale, level, width and height
		this.setScale(scale, level);
		this.setDimensions(width, height);
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
					height={this.state.viewportHeight}
					width={this.state.viewportWidth}
				/>
				<InteractionCanvas
					{...this.props}
					{...this.state}
					height={this.height}
					imagePos={this.imagePos}
					level={this.level}
					onLoadImage={this.loadImage}
					onSetImagePosition={this.setImagePosition}
					onZoom={this.handleZoom}
					scale={this.scale}
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
