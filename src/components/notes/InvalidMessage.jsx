// Packages
import React from 'react'
import PropTypes from 'prop-types'

const NoteInvalidMessage = ({ errorMessage, isError }) => {
  return (
    <>
      <span className={`text-danger ${(isError) ? 'hidden' : ''}`}>{errorMessage}</span>
    </>
  )
}

NoteInvalidMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired
}

export default NoteInvalidMessage