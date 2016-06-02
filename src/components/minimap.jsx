// import React from "react";

// class Minimap extends React.Component {
// 	render() {
// 		return (
// 			<div>MINI</div>
// 		);
// 	}
// }

// Minimap.propTypes = {};

// Minimap.defaultProps = {};

// export default Minimap;

import React from "react";

import { setRealViewPort, sendMouseWheel } from "../actions";
import store from "../store";
import { requestAnimationFrame, cancelAnimationFrame } from "../util/request-animation-frame";

const RESIZE_DELAY = 5;


const MOUSE_UP = 0;
const MOUSE_DOWN = 1;

class Minimap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: null,
			height: null
		};
		this.resizeListener = this.onResize.bind(this);
		this.animationFrameListener = this.onAnimationFrame.bind(this);
		this.abortAnimationFrame = false;
		this.imageCtx = null;
		this.interactionCtx = null;
		this.resizeDelay = -1;
		this.mouseState = MOUSE_UP;
		this.mousemoveListener = this.onMouseMove.bind(this);
		this.mouseupListener = this.onMouseUp.bind(this);
		this.touchMoveListener = this.onTouchMove.bind(this);
		this.frameBuffer = [];
	}

	componentDidMount() {
		this.abortAnimationFrame = false;
		this.onResize();
		this.imageCtx = this.refs.minimap.children[0].getContext("2d");
		this.interactionCtx = this.refs.minimap.children[1].getContext("2d");
		window.addEventListener("resize", this.resizeListener);
		window.addEventListener("mousemove", this.mousemoveListener);
		window.addEventListener("mouseup", this.mouseupListener);
		window.addEventListener("touchend", this.mouseupListener);
		window.addEventListener("touchmove", this.touchMoveListener);
		requestAnimationFrame(this.animationFrameListener);
	}

	// componentWillReceiveProps(nextProps) {
	// 	if(nextProps.config.identifier !== this.props.config.identifier) {
	// 		console.log(nextProps.api)
	// 		// this.props.api = new Api(this.props.service, nextProps.config);
	// 		this.commitResize();
	// 	}
	// }

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.width !== nextState.width ||
			this.state.height !== nextState.height;
	}


	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeListener);
		window.removeEventListener("mousemove", this.mousemoveListener);
		window.removeEventListener("mouseup", this.mouseupListener);
		window.addEventListener("touchend", this.mouseupListener);
		window.removeEventListener("touchmove", this.touchMoveListener);
		this.abortAnimationFrame = true;
		cancelAnimationFrame(this.animationFrameListener);
		// this.unsubscribe();
	}


	onAnimationFrame() {
		if(this.frameBuffer.length) {
			this.imageCtx.clearRect(0, 0, this.state.width, this.state.height);
			for(let i = 0; i < this.frameBuffer.length; i++) {
				let tileIm = this.frameBuffer[i][0];
				let tile = this.frameBuffer[i][1];
				this.imageCtx.drawImage(
					tileIm,
					parseInt(Math.floor((tile.pos.x) * this.scale)),
					parseInt(Math.floor((tile.pos.y) * this.scale)),
					parseInt(Math.ceil(tileIm.width * this.scale)),
					parseInt(Math.ceil(tileIm.height * this.scale))
				);
			}
			if(this.frameBuffer.filter((x) => x[0].complete && x[0].height > 0 && x[0].width > 0).length === this.frameBuffer.length) {
				this.frameBuffer = [];
			}
		}

		if(this.resizeDelay === 0) {
			this.commitResize();
			this.resizeDelay = -1;
		} else if(this.resizeDelay > 0) {
			this.resizeDelay -= 1;
		}

		this.interactionCtx.strokeStyle = this.props.rectStroke;
		this.interactionCtx.fillStyle = this.props.rectFill;
		this.interactionCtx.clearRect(0, 0, this.state.width, this.state.height);
		this.interactionCtx.fillRect(
			Math.floor(this.props.realViewPort.x * this.state.width),
			Math.floor(this.props.realViewPort.y * this.state.height),
			Math.ceil(this.props.realViewPort.w * this.state.width),
			Math.ceil(this.props.realViewPort.h * this.state.height)
		);

		this.interactionCtx.beginPath();
		this.interactionCtx.rect(
			Math.floor(this.props.realViewPort.x * this.state.width),
			Math.floor(this.props.realViewPort.y * this.state.height),
			Math.ceil(this.props.realViewPort.w * this.state.width),
			Math.ceil(this.props.realViewPort.h * this.state.height)
		);
		this.interactionCtx.stroke();

		if(!this.abortAnimationFrame) {	requestAnimationFrame(this.animationFrameListener); }
	}

	onResize() {
		this.resizeDelay = RESIZE_DELAY;
	}

	commitResize() {
		this.resizeDelay = RESIZE_DELAY;
		const { clientWidth, clientHeight } = this.refs.minimap;
		this.frameBuffer = this.props.api.loadImage({
			viewport: {w: clientWidth, h: clientHeight},
			onScale: this.setScale.bind(this),
			scaleMode: "autoFill",
			position: {x: 0, y: 0}
		});
	}

	setScale(s, l) {
		this.scale = s;
		this.level = l;
		let dims = this.props.api.getRealImagePos({x: 0, y: 0}, this.scale, this.level);
		this.setState({width: dims.w, height: dims.h});
		if(this.props.onDimensions) { this.props.onDimensions(dims.w, dims.h); }
	}



	dispatchReposition(ev) {
		let doc = document.documentElement;
		let scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		let rect = this.refs.minimap.getBoundingClientRect();
		store.dispatch(setRealViewPort({
			x: (ev.pageX - rect.left) / this.state.width - (this.props.realViewPort.w / 2),
			y: (ev.pageY - rect.top - scrollTop) / this.state.height - (this.props.realViewPort.h / 2),
			reposition: true,
			applyZoom: false
		}));
	}


	onTouchStart(ev) {
		this.mouseState = MOUSE_DOWN;
		this.dispatchReposition({pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY});
		return ev.preventDefault();
	}


	onMouseDown(ev) {
		this.mouseState = MOUSE_DOWN;
		this.dispatchReposition(ev);
	}

	onMouseMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.dispatchReposition(ev);
			return ev.preventDefault();
		}
	}
	onTouchMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.dispatchReposition({pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY});
			return ev.preventDefault();
		}
	}

	onMouseUp() {
		this.mouseState = MOUSE_UP;
	}

	onWheel(ev) {
		store.dispatch(sendMouseWheel({deltaY: ev.deltaY}));
		return ev.preventDefault();
	}

	onTouchEnd() {
		this.mouseState = MOUSE_UP;
	}

	render() {
		return (
			<div
				className="hire-djatoka-minimap"
				ref="minimap"
			>
				<canvas className="image" height={this.state.height} width={this.state.width} />
				<canvas className="interaction"
					height={this.state.height}
					onMouseDown={this.onMouseDown.bind(this)}
					onTouchStart={this.onTouchStart.bind(this)}
					onWheel={this.onWheel.bind(this)}
					width={this.state.width} />
			</div>
		);
	}
}

Minimap.propTypes = {
	config: React.PropTypes.object,
	onDimensions: React.PropTypes.func,
	rectFill: React.PropTypes.string,
	rectStroke: React.PropTypes.string,
	service: React.PropTypes.string
};

Minimap.defaultProps = {
	rectFill: "rgba(128,128,255,0.1)",
	rectStroke: "rgba(255,255,255,0.8)"
};

export default Minimap;
