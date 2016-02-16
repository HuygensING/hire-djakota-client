import React from "react";
import store from "../store";

class DjatokaClient extends React.Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() =>
			this.setState(store.getState())
		);

		store.dispatch({
			type: "INITIAL",
			initialState: {
				config: this.props.config,
				service: this.props.service,
				scaleMode: this.props.scaleMode
			}
		});
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
			</div>
		);
	}
}

DjatokaClient.propTypes = {
	children: React.PropTypes.array,
	config: React.PropTypes.object,
	scaleMode: React.PropTypes.string,
	service: React.PropTypes.string
};

DjatokaClient.defaultProps = {};

export default DjatokaClient;
