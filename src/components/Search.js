import { render } from '@testing-library/react';
import React, {Component} from 'react';

// const Search = () => {

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }

        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
        this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
    }

    onClickDeleteHandler = () => {
        const {onSearch} = this.props;
        this.setState({search: ''})
        onSearch('');
    }

    onSearchChangeHandler = (event) => {
        const {onSearch} = this.props;
        this.setState({search: event.target.value})
        onSearch(event.target.value.toLowerCase());
    }

    render(){
        const {
            onSearchChangeHandler,
            onClickDeleteHandler,
            state:{
                search
            }
            
        } = this;

        return(
            <section className="col-12 mt-1">
                <div className="position-relative note-search">
                    <input className="w-100 border-none note-search__search-input" type="text" placeholder="Find your notes here...." onChange={onSearchChangeHandler} value={search}/>
                    <i className="position-absolute note-search__search-icon"><img src="./icons/search.svg" alt="Search"/></i>
                    <i className={`position-absolute note-search__clear-button ${(search === '') ? 'is_hidden' : ''}`} onClick={onClickDeleteHandler}><img src="./icons/cancel.svg" alt="Search"/></i>
                </div>
            </section>
        )
    }
}

export default Search;