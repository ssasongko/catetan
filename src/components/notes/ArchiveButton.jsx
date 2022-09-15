import React from 'react';
import PropTypes from 'prop-types'

const ArchiveButton = ({ id, onArchive, isArchived }) => {
	if(isArchived){}

	return <button className='note-item__archive-button' onClick={() => { onArchive(id, isArchived) }}>{isArchived ? 'Active' : 'Archived'}</button>
}

ArchiveButton.propTypes = {
	id: PropTypes.string.isRequired,
	onArchive: PropTypes.func.isRequired,
	isArchived: PropTypes.bool.isRequired,
}

export default ArchiveButton;