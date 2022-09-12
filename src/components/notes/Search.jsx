// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import autoBind from 'auto-bind';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: props.search || ''
		}

		autoBind(this)
	}

	onClickDeleteHandler = () => {
		const { onSearch, onKeywordChange } = this.props;
		this.setState({ search: '' })
		onSearch('');
		onKeywordChange('')
	}

	onSearchChangeHandler = (event) => {
		const { onSearch, onKeywordChange } = this.props;
		this.setState({ search: event.target.value })
		onSearch(event.target.value.toLowerCase());
		onKeywordChange(event.target.value.toLowerCase())
	}

	render() {
		const {
			onSearchChangeHandler,
			onClickDeleteHandler,
			state: {
				search
			}

		} = this;

		return (
			<section className='w-full'>
				<div className='relative note-search'>
					<input className='w-full border-none note-search__search-input' type='text' placeholder='Find your notes here....' onChange={onSearchChangeHandler} value={search} />
					<i className='absolute note-search__search-icon'><img src='./icons/search.svg' alt='Search' /></i>
					<i className={`absolute note-search__clear-button ${(search === '') ? 'hidden' : ''}`} onClick={onClickDeleteHandler}><img src='./icons/cancel.svg' alt='Search' /></i>
				</div>
			</section>
		)
	}
}

Search.propTypes = {
	onSearch: PropTypes.func.isRequired,
	onKeywordChange: PropTypes.func.isRequired,
	search: PropTypes.string.isRequired,
}

export default Search