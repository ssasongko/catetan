// Packages
import React from 'react'
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types'

const InputDate = ({ value, onChangeValue, isError }) => {
  return (
    <ContentEditable className={`w-full min-h-[12em] items-center border-2 border-[#aaa] mt-1 p-1 note-create__content-textarea ${(isError) ? '' : 'border-2 border-danger'}`} html={value || ''} onChange={onChangeValue} />
  )
}

InputDate.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired
}

export default InputDate