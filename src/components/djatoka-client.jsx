import React from "react";
import store from "../store";
import {createNextApi} from "../actions";

class DjatokaClient extends React.Component {
	constructor(props) {
		super(props);

		this.state = store.getState();
	}
	componentDidMount() {
		this.unsubscribe = store.subscribe(() =>
			this.setState(store.getState())
		);

		store.dispatch({
			type: "INITIAL",
			config: this.props.config,
			service: this.props.service,
			scaleMode: this.props.scaleMode
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.config.identifier !== this.state.api.config.identifier)	{
			store.dispatch(createNextApi(nextProps.config));
		}
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		let children = React.Children.map(this.props.children, (child) =>
			React.cloneElement(child, this.state)
		);

		return (
			<div	className="facsimile">
				{children}
				{
					this.props.closeButton &&
					<div
						className="close"
						onClick={this.props.onClose}
					>
						x
					</div>
				}
			</div>
		);
	}
}

DjatokaClient.propTypes = {
	children: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(React.PropTypes.node),
		React.PropTypes.node
	]),
	config: React.PropTypes.object,
	scaleMode: React.PropTypes.string,
	service: React.PropTypes.string
};

DjatokaClient.defaultProps = {};

export default DjatokaClient;
