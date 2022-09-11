// Packages
import React from 'react'
import PropTypes from 'prop-types'

const NoteInputTitle = ({value, onChangeValue, isError}) => {

  return (
    <>
      <input className={`w-full border mt-1 p-1 note-create__title-input ${(isError) ? '' : 'border-2 border-danger'}`} type="text" onChange={onChangeValue} value={value} />
    </>
  )
}

NoteInputTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired
}

export default NoteInputTitle