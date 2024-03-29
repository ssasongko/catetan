// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types'

// Components
import NotesItem from './NotesItem';

class NotesList extends Component {
	render() {
		const {
			props: {
				onArchive,
				onDelete,
				notes,
				search,
			}
		} = this;

		const filtered = notes.filter((note) => {
			if (search === '') return note;
			else return note.title.toLowerCase().includes(search);
		});

		return (
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
				{(filtered.length > 0)
					? filtered.map((note) => {
						return (
							<NotesItem
								key={note.id}
								note={note}
								onDelete={onDelete}
								onArchive={onArchive}
							/>
						)
					})
					: 'The note was not found based on what you searched for'
				}
			</div>
		)
	}
}

NotesList.propTypes = {
	onArchive: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	search: PropTypes.string.isRequired
}
export default NotesList;

