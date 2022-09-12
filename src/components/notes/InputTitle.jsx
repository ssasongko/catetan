// Packages
import React from 'react'
import PropTypes from 'prop-types'

const InputTitle = ({ value, onChangeValue, isError }) => {

  return (
    <>
      <input className={`w-full border-2 mt-1 p-1 note-create__title-input border-[#aaa] ${(isError) ? '' : 'border-2 border-danger'}`} type='text' onChange={onChangeValue} value={value} />
    </>
  )
}

InputTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired
}

export default InputTitle