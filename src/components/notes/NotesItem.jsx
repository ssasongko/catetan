// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types'

// Components
import { showFormattedDate } from '../../utils';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

class NotesItem extends Component {
	render() {
		const {
			props: {
				onArchive,
				onDelete,
				note
			}
		} = this;

		return (
			<div className='note-item max-h-[300px] flex flex-col dark:bg-dark-primary'>
				<div className='p-6 note-item__content overflow-auto'>
					<Link to={`/notes/${note.id}`}>
						<h3 className='note-item__title font-bold'>{note.title}</h3>
						<span className='note-item__date'>{showFormattedDate(note.createdAt)}</span>
						<div className='mt-3'>
							{parser(note.body)}
						</div>
					</Link>
				</div>
				<div className='note-item__action flex'>
					<DeleteButton id={note.id} onDelete={onDelete} />
					<ArchiveButton id={note.id} onArchive={onArchive} isArchived={note.archived} />
				</div>
			</div>
		)
	}
}

NotesItem.propTypes = {
	onArchive: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	note: PropTypes.object.isRequired
}

export default NotesItem;