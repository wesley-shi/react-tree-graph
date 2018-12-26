import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
	mouseoverTextProp: PropTypes.string,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	keyProp: PropTypes.string.isRequired,
	labelProp: PropTypes.string.isRequired,
	offset: PropTypes.number.isRequired,
	radius: PropTypes.number.isRequired,
	circleProps: PropTypes.object.isRequired,
	gProps: PropTypes.object.isRequired,
	textProps: PropTypes.object.isRequired
};

export default class Node extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			mouseOver: false,
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event) {
		this.props.gProps.onClick && this.props.gProps.onClick(this.props[this.props.keyProp], event);
	}
	getTransform() {
		return 'translate(' + this.props.y + ', ' + this.props.x + ')';
	}
	render() {
		return (<g {...this.props.gProps} transform={this.getTransform()} onClick={this.handleClick}>
			<circle {...this.props.circleProps} r={this.props.radius} />
			<text
				{...this.props.textProps}
				dx={this.props.radius + 0.5}
				dy={this.props.offset}
				onMouseEnter={() => {
					this.setState({
						...this.state,
						mouseOver: true,
					});
				}}
				onMouseLeave={() => {
					this.setState({
						...this.state,
						mouseOver: false,
					});
				}}>
				{this.state.mouseOver ? this.props[this.props.mouseoverTextProp] : this.props[this.props.labelProp]}
			</text>
		</g>);
	}
}

Node.propTypes = propTypes;