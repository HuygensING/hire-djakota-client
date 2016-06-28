import React, { Component, PropTypes } from 'react';

const MOUSE_UP = 0;
const MOUSE_DOWN = 1;
const TOUCH_END = 0;
const TOUCH_START = 1;
const TOUCH_PINCH = 2;

class InteractionCanvas extends Component {
	constructor(props) {
		super(props);

		this.movement = { x: 0, y: 0 };
		this.touchPos = { x: 0, y: 0 };
		this.mousePos = { x: 0, y: 0 };
		this.mouseState = MOUSE_UP;
		this.focalPoint = null;
		this.mousemoveListener = this.onMouseMove.bind(this);
		this.mouseupListener = this.onMouseUp.bind(this);
		this.touchmap = {
			startPos: false,
			positions: [],
			tapStart: 0,
			lastTap: 0,
			pinchDelta: 0,
			pinchDistance: 0,
		};
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.mousemoveListener);
		window.addEventListener('mouseup', this.mouseupListener);
	}

	componentWillUnmount() {
		window.removeEventListener('mousemove', this.mousemoveListener);
		window.removeEventListener('mouseup', this.mouseupListener);
	}

	onMouseDown = (ev) => {
		this.mousePos.x = ev.clientX;
		this.mousePos.y = ev.clientY;
		this.movement = { x: 0, y: 0 };
		this.mouseState = MOUSE_DOWN;
	}

	onMouseMove = (ev) => {
		switch (this.mouseState) {
			case MOUSE_DOWN:
				this.movement.x = this.mousePos.x - ev.clientX;
				this.movement.y = this.mousePos.y - ev.clientY;

				const imgPosX = this.props.imagePos.x - (this.movement.x / this.props.scale);
				const imgPosY = this.props.imagePos.y - (this.movement.y / this.props.scale);
				this.props.onSetImagePosition(imgPosX, imgPosY);

				this.mousePos.x = ev.clientX;
				this.mousePos.y = ev.clientY;
				this.props.onLoadImage({ scale: this.props.scale, level: this.props.level });
				ev.preventDefault();
				break;
			case MOUSE_UP: {
				const rect = this.refs.interactionCanvas.getBoundingClientRect();
				this.focalPoint = {
					x: ev.clientX - rect.left,
					y: ev.clientY - rect.top,
				};
				break;
			}
			default:
		}
	}

	onMouseUp = () => {
		if (this.mouseState === MOUSE_DOWN) {
			this.props.onLoadImage({ scale: this.props.scale, level: this.props.level });
		}
		this.mouseState = MOUSE_UP;
	}

	onTouchStart = (ev) => {
		if (ev.touches.length > 1) {
			this.touchState = TOUCH_PINCH;
		} else {
			this.touchPos.x = ev.touches[0].pageX;
			this.touchPos.y = ev.touches[0].pageY;
			this.movement = { x: 0, y: 0 };
			this.touchState = TOUCH_START;
		}
	}

	onTouchMove = (ev) => {
		for (let i = 0; i < ev.touches.length; i++) {
			const cur = {
				x: ev.touches[i].pageX,
				y: ev.touches[i].pageY,
			};
			this.touchmap.positions[i] = cur;
		}
		if (ev.touches.length === 2 && this.touchState === TOUCH_PINCH) {
			const oldD = this.touchmap.pinchDistance;
			this.touchmap.pinchDistance = parseInt(Math.sqrt(
				(
					(this.touchmap.positions[0].x - this.touchmap.positions[1].x) *
					(this.touchmap.positions[0].x - this.touchmap.positions[1].x)
				) + (
					(this.touchmap.positions[0].y - this.touchmap.positions[1].y) *
					(this.touchmap.positions[0].y - this.touchmap.positions[1].y)
				)
			), 10);
			this.touchmap.pinchDelta = oldD - this.touchmap.pinchDistance;
			if (this.touchmap.pinchDelta < 60 && this.touchmap.pinchDelta > -60) {
				const delta = this.touchmap.pinchDelta;
				this.props.onZoom(delta, this.focalPoint);
				// this.props.api.zoomBy(delta, this.props.scale, this.props.level, this.zoom.bind(this));
			}
		} else if (this.touchState === TOUCH_START) {
			this.movement.x = this.touchPos.x - ev.touches[0].pageX;
			this.movement.y = this.touchPos.y - ev.touches[0].pageY;

			const imagePosX = this.props.imagePos.x - (this.movement.x / this.props.scale);
			const imagePosY = this.props.imagePos.y - (this.movement.y / this.props.scale);
			this.props.onSetImagePosition(imagePosX, imagePosY);

			this.touchPos.x = ev.touches[0].pageX;
			this.touchPos.y = ev.touches[0].pageY;

			this.props.onLoadImage({ scale: this.props.scale, level: this.props.level });
		}
		ev.preventDefault();
		ev.stopPropagation();
	}

	onTouchEnd = () => {
		this.touchState = TOUCH_END;
	}

	onWheel = (ev) => {
		const delta = ev.nativeEvent.deltaY;
		this.props.onZoom(delta, this.focalPoint);

		return ev.preventDefault();
	}

	render() {
		return (
			<canvas
				className="interaction"
				height={this.props.viewportHeight}
				onMouseDown={this.onMouseDown}
				onTouchEnd={this.onTouchEnd}
				onTouchMove={this.onTouchMove}
				onTouchStart={this.onTouchStart}
				onWheel={this.onWheel}
				ref="interactionCanvas"
				width={this.props.viewportWidth}
			/>
		);
	}
}

InteractionCanvas.propTypes = {
	api: PropTypes.object,
	imagePos: PropTypes.object,
	onLoadImage: PropTypes.func,
	onSetImagePosition: PropTypes.func,
	onZoom: PropTypes.func,
	level: PropTypes.number,
	scale: PropTypes.number,
	viewportHeight: PropTypes.number,
	viewportWidth: PropTypes.number,
};

InteractionCanvas.defaultProps = {
};

export default InteractionCanvas;
