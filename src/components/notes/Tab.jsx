// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Tab extends Component {
	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	}

	render() {
		const {
			onClick,
			props: {
				activeTab,
				label,
			},
		} = this;

		let className = 'mb-[-2px] p-1 px-3';

		if (activeTab === label) {
			className += ' tab-list-active';
		}

		return (
			<li className={className} onClick={onClick}>{label}</li>
		)
	}
}

Tab.propTypes = {
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
}

export default Tab;