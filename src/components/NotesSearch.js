import React from 'react';

const NotesSearch = () => {
    return(
        <section className="col-12 mt-1">
            <div className="position-relative note-search">
                <input className="w-100 border-none note-search__search-input" type="text" placeholder="Find your notes here...."/>
                <i className="position-absolute note-search__search-icon"><img src="./icons/search.svg" alt="Search"/></i>
                <i className="position-absolute note-search__clear-button is_hidden"><img src="./icons/cancel.svg" alt="Search"/></i>
            </div>
        </section>
    )
}

export default NotesSearch;