// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Tab from './Tab';

class Tabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.children[0].props.label,
		};
	}

	onClickTabItem = (tab) => {
		this.setState({ activeTab: tab });
	}

	render() {
		const {
			onClickTabItem,
			props: {
				children,
			},
			state: {
				activeTab,
			}
		} = this;

		return (
			<div className='w-full'>
				<ol className='flex justify-between border-b-2 border-lightgray pl-0'>
					{children.map((child) => {
						const { label } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTabItem}
							/>
						)
					})}
				</ol>
				<div className='border-2 border-t-0 border-lightgray p-2'>
					{children.map((child) => {
						if (child.props.label !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		)
	}
}

Tabs.propTypes = {
	children: PropTypes.any.isRequired
}


export default Tabs;