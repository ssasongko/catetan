import React, { useContext } from 'react';
import PropTypes from 'prop-types'

// Context
import LocaleContext from '../../contexts/LocaleContext';

const ArchiveButton = ({ id, onArchive, isArchived }) => {

	const { locale } = useContext(LocaleContext)

	return (
		<>
			{(locale === 'id') && (
				<button className='note-item__archive-button' onClick={() => { onArchive(id, isArchived) }}>{isArchived ? 'Aktifkan' : 'Arsipkan'}</button>
			)}

			{(locale === 'en') && (
				<button className='note-item__archive-button' onClick={() => { onArchive(id, isArchived) }}>{isArchived ? 'Active' : 'Archived'}</button>
			)}
		</>
	)
}

ArchiveButton.propTypes = {
	id: PropTypes.string.isRequired,
	onArchive: PropTypes.func.isRequired,
	isArchived: PropTypes.bool.isRequired,
}

export default ArchiveButton;