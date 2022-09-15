// Packages
import React, { useContext } from 'react';
import PropTypes from 'prop-types'

// Context
import LocaleContext from '../../contexts/LocaleContext';

const DeleteButton = ({ id, onDelete }) => {
	const { locale } = useContext(LocaleContext)

	return <button className='note-item__delete-button' onClick={() => { onDelete(id) }}>{(locale === 'id' ? 'Hapus' : 'Delete')}</button>
}

DeleteButton.propTypes = {
	id: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
}

export default DeleteButton;