import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from './../utils';
import ActiveButton from './ActiveButton';
import ArchiveButton from './ArchiveButton';
import DeleteButton from './DeleteButton';

class NotesItem extends Component {
	render() {
		const {
			props: {
				onArchive,
				onDelete,
				note
			}
		} = this;

		const Button = (note.archived)
			? <ActiveButton id={note.id} onArchive={onArchive} />
			: <ArchiveButton id={note.id} onArchive={onArchive} />

		return (
			<div className="note-item max-h-[300px] flex flex-col">
				<div className="p-6 note-item__content overflow-auto">
					<Link to={`/notes/${note.id}`}>
						<h3 className="note-item__title font-bold">{note.title}</h3>
						<span className="note-item__date">{showFormattedDate(note.createdAt)}</span>
						<p className='mt-3'>{note.body}</p>
					</Link>
				</div>
				<div className="note-item__action flex">
					<DeleteButton id={note.id} onDelete={onDelete} />
					{Button}
				</div>
			</div>
		)
	}
}

export default NotesItem;